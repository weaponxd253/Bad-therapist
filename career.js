(function (root, factory) {
	const career = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = career;
	}
	root.BadTherapistCareer = career;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const VERSION = 1;
	const STORAGE_KEY = "bad-therapist-career-v1";
	const MODE_IDS = Object.freeze(["classic", "speed", "minefield"]);

	const RULES = Object.freeze({
		weeks: 12,
		sessionLength: 6,
		waitlistSize: 3,
		licenseStart: 100,
		violationPenalty: 6,
		walkoutPenalty: 12,
		cleanSessionRecovery: 5,
		// A returning client starts at the mood they left with, plus some time-heals recovery.
		trustRecovery: 25,
		minimumTrust: 30,
		maximumWalkouts: 2,
		// Memories kept per client across visits, newest first.
		memoryLimit: 4,
		// The board calls a hearing the first time the license drops below each threshold.
		hearingThresholds: Object.freeze([70, 40]),
		hearingLength: 3,
		accountableReward: 6,
		hearingViolationPenalty: 10,
		hearingBadAnswerPenalty: 4,
		clearedThreshold: 12,
		incidentLimit: 40
	});

	const HEARING_VERDICTS = Object.freeze({
		cleared: Object.freeze({
			title: "Cleared with a Note",
			text: "The board accepts your accountability, suspiciously. Your license recovers a little. Everyone is uneasy."
		}),
		warning: Object.freeze({
			title: "Formal Warning",
			text: "The board files a formal warning and a sigh so long it gets its own paperwork."
		}),
		sanctioned: Object.freeze({
			title: "Sanctioned",
			text: "You committed fresh violations in front of the Ethics Board. Bold. Costly. Recorded in triplicate."
		})
	});

	const VIOLATION_TYPE_IDS = Object.freeze(["confidentiality", "boundaries", "judgment", "coercion", "harmfulAdvice"]);

	const ENDINGS = Object.freeze({
		revoked: Object.freeze({
			title: "License Revoked",
			text: "The Ethics Board has launched your license into the sea. Practice restricted to houseplants."
		}),
		emptyPractice: Object.freeze({
			title: "Practice Closed",
			text: "Every client has walked out for good. The waiting room is just you and a very judgmental fern."
		}),
		retired: Object.freeze({
			title: "Retired, Somehow Licensed",
			text: "You made it to retirement with your license intact. Nobody can explain it, least of all the board."
		}),
		quit: Object.freeze({
			title: "Early Retirement",
			text: "You closed the practice before anyone could close it for you. A strategic, cowardly masterpiece."
		})
	});

	const RETURNING_LINES = Object.freeze({
		warm: "I’m back. Last time was… weirdly okay? Let’s not ruin it.",
		neutral: "Back again. I’m still deciding how I feel about last time.",
		guarded: "I almost canceled. Let’s just try to get through this one."
	});

	function clamp(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}

	function shuffle(values, random) {
		const result = [...values];
		for (let index = result.length - 1; index > 0; index -= 1) {
			const swapIndex = Math.floor(random() * (index + 1));
			[result[index], result[swapIndex]] = [result[swapIndex], result[index]];
		}
		return result;
	}

	function emptyStore() {
		return { version: VERSION, current: null, best: null };
	}

	function emptyClientRecord() {
		return { visits: 0, trust: 100, walkouts: 0, left: false, lastWeek: 0, memories: [] };
	}

	function normalizeMemory(value) {
		if (!value || typeof value !== "object" || typeof value.archetype !== "string") return null;
		return {
			week: Number.isInteger(value.week) ? value.week : 0,
			questionId: typeof value.questionId === "string" ? value.questionId : "",
			archetype: value.archetype,
			topic: typeof value.topic === "string" ? value.topic : "",
			response: typeof value.response === "string" ? value.response : "",
			badness: Number.isInteger(value.badness) ? value.badness : 0,
			moodLost: Number.isFinite(value.moodLost) ? value.moodLost : 0,
			recallLine: typeof value.recallLine === "string" ? value.recallLine : ""
		};
	}

	// Memories a client keeps of the therapist across visits, newest first.
	function clientMemories(state, clientId) {
		return clientRecord(state, clientId).memories || [];
	}

	function clientRecord(state, clientId) {
		return state.clients[clientId] || emptyClientRecord();
	}

	function availableClientIds(state, rosterIds) {
		return rosterIds.filter((id) => !clientRecord(state, id).left);
	}

	// Up to three clients: a returning client and a new one when both exist, the rest random.
	function buildWaitlist(state, rosterIds, random = Math.random) {
		const available = availableClientIds(state, rosterIds);
		const returning = shuffle(available.filter((id) => clientRecord(state, id).visits > 0), random);
		const fresh = shuffle(available.filter((id) => clientRecord(state, id).visits === 0), random);
		const picks = [];
		if (returning.length) picks.push(returning.shift());
		if (fresh.length) picks.push(fresh.shift());
		const rest = shuffle([...returning, ...fresh], random);
		while (picks.length < RULES.waitlistSize && rest.length) picks.push(rest.shift());
		return shuffle(picks, random);
	}

	function newCareer({ modeId = "classic", rosterIds = [], random = Math.random, now = () => new Date().toISOString() } = {}) {
		const state = {
			status: "active",
			modeId: MODE_IDS.includes(modeId) ? modeId : "classic",
			week: 1,
			infamy: 0,
			license: RULES.licenseStart,
			clients: {},
			sessions: [],
			waitlist: [],
			endReason: "",
			startedAt: now(),
			violationCounts: {},
			incidents: [],
			hearings: [],
			pendingHearing: null,
			hearingThresholdsCrossed: [],
			usedBoardQuestionIds: []
		};
		state.waitlist = buildWaitlist(state, rosterIds, random);
		return state;
	}

	function startingMood(state, clientId) {
		return clientRecord(state, clientId).visits > 0 ? clientRecord(state, clientId).trust : 100;
	}

	function returningLine(state, clientId) {
		const record = clientRecord(state, clientId);
		if (record.visits === 0) return "";
		if (record.trust >= 75) return RETURNING_LINES.warm;
		if (record.trust >= 50) return RETURNING_LINES.neutral;
		return RETURNING_LINES.guarded;
	}

	// The greeting for a returning client, toned to match what they bring up: a warm
	// "last time was okay" never introduces a memory of a bad answer.
	function returningGreeting(state, clientId, recall = null) {
		const line = returningLine(state, clientId);
		if (line === RETURNING_LINES.warm && recall && recall.archetype !== "helpful") return RETURNING_LINES.neutral;
		return line;
	}

	function endCareer(state, reason) {
		return { ...state, status: "ended", endReason: ENDINGS[reason] ? reason : "quit", waitlist: [] };
	}

	// Applies one finished session and returns the next state plus a readable update.
	function applySession(state, session, rosterIds, random = Math.random) {
		const completed = session.completed === true;
		const violations = Number.isFinite(session.totalViolations) ? session.totalViolations : 0;
		const infamyGained = Number.isFinite(session.weighted) ? session.weighted : 0;
		const licenseLost = violations * RULES.violationPenalty + (completed ? 0 : RULES.walkoutPenalty);
		const licenseRecovered = completed && violations === 0 ? RULES.cleanSessionRecovery : 0;
		const license = clamp(state.license - licenseLost + licenseRecovered, 0, RULES.licenseStart);

		const previous = clientRecord(state, session.clientId);
		const walkouts = previous.walkouts + (completed ? 0 : 1);
		const left = walkouts >= RULES.maximumWalkouts;
		const trust = completed
			? clamp((session.moodRemaining ?? 100) + RULES.trustRecovery, RULES.minimumTrust, 100)
			: RULES.minimumTrust;
		const newMemories = (Array.isArray(session.memories) ? session.memories : [])
			.map((memory) => normalizeMemory({ ...memory, week: state.week }))
			.filter(Boolean);
		const memories = [...newMemories, ...(previous.memories || [])].slice(0, RULES.memoryLimit);
		const clients = {
			...state.clients,
			[session.clientId]: { visits: previous.visits + 1, trust, walkouts, left, lastWeek: state.week, memories }
		};

		let next = {
			...state,
			week: state.week + 1,
			infamy: state.infamy + infamyGained,
			license,
			clients,
			sessions: [...state.sessions, {
				week: state.week,
				clientId: session.clientId,
				completed,
				violations,
				infamyGained,
				licenseChange: licenseRecovered - licenseLost
			}]
		};

		const violationCounts = { ...(state.violationCounts || {}) };
		Object.entries(session.violationCountsByType || {}).forEach(([type, count]) => {
			if (VIOLATION_TYPE_IDS.includes(type) && Number.isInteger(count)) violationCounts[type] = (violationCounts[type] || 0) + count;
		});
		next.violationCounts = violationCounts;
		const incidents = (Array.isArray(session.incidents) ? session.incidents : []).filter((key) => typeof key === "string");
		next.incidents = [...new Set([...incidents, ...(state.incidents || [])])].slice(0, RULES.incidentLimit);

		// Crossing a license threshold for the first time calls a hearing for next week.
		const crossed = RULES.hearingThresholds.filter((threshold) =>
			state.license > threshold && license <= threshold && !(state.hearingThresholdsCrossed || []).includes(threshold)
		);
		next.hearingThresholdsCrossed = [...(state.hearingThresholdsCrossed || []), ...crossed];

		let endReason = "";
		if (license <= 0) endReason = "revoked";
		else if (availableClientIds(next, rosterIds).length === 0) endReason = "emptyPractice";
		else if (next.week > RULES.weeks) endReason = "retired";

		const hearingCalled = !endReason && crossed.length > 0;
		if (hearingCalled) {
			next.pendingHearing = { charge: topCharge(violationCounts, random), threshold: Math.min(...crossed), calledWeek: state.week };
		}

		if (endReason) next = endCareer(next, endReason);
		else next.waitlist = buildWaitlist(next, rosterIds, random);

		return {
			state: next,
			update: {
				infamyGained,
				licenseLost,
				licenseRecovered,
				license,
				trust,
				clientLeft: left,
				walkouts,
				hearingCalled,
				ended: Boolean(endReason),
				endReason
			}
		};
	}

	// The violation type the player has committed most, which the board will focus on.
	function topCharge(violationCounts = {}, random = Math.random) {
		const ranked = VIOLATION_TYPE_IDS
			.map((type) => ({ type, count: violationCounts[type] || 0 }))
			.filter((item) => item.count > 0)
			.sort((a, b) => b.count - a.count);
		if (ranked.length === 0) return VIOLATION_TYPE_IDS[Math.floor(random() * VIOLATION_TYPE_IDS.length)] || "judgment";
		const tied = ranked.filter((item) => item.count === ranked[0].count);
		return tied[Math.floor(random() * tied.length)]?.type || ranked[0].type;
	}

	// Picks the hearing's questions: incidents the player actually committed first, then the
	// charge (general questions before other players' incidents), never repeating within a career.
	function selectHearingQuestions(state, boardQuestions = [], random = Math.random) {
		const used = new Set(state.usedBoardQuestionIds || []);
		const fresh = boardQuestions.filter((question) => !used.has(question.id));
		const pool = fresh.length >= RULES.hearingLength ? fresh : boardQuestions;
		const incidents = new Set(state.incidents || []);
		const charge = state.pendingHearing?.charge;
		return pool
			.map((question) => {
				const related = question.relatedChoices || [];
				const committed = related.some((key) => incidents.has(key));
				return {
					question,
					score:
						(committed ? 100 : 0) +
						(question.charge === charge ? 50 : 0) +
						// A general question beats one about an incident this player never committed.
						(related.length > 0 && !committed ? -20 : 0) +
						random() * 10
				};
			})
			.sort((a, b) => b.score - a.score)
			.slice(0, RULES.hearingLength)
			.map(({ question }) => question);
	}

	function hearingVerdictId(answers, licenseChange) {
		if (answers.some((answer) => answer.violation)) return "sanctioned";
		if (licenseChange >= RULES.clearedThreshold) return "cleared";
		return "warning";
	}

	// Applies a finished hearing. `hearing.answers` lists { badness, violation } per answered question.
	function applyHearing(state, hearing, rosterIds, random = Math.random) {
		const answers = Array.isArray(hearing.answers) ? hearing.answers : [];
		const accountable = answers.filter((answer) => answer.badness === 0).length;
		const violations = answers.filter((answer) => answer.violation).length;
		const otherBad = answers.length - accountable - violations;
		const walkedOut = hearing.completed === false;
		const licenseChange =
			accountable * RULES.accountableReward -
			violations * RULES.hearingViolationPenalty -
			otherBad * RULES.hearingBadAnswerPenalty -
			(walkedOut ? RULES.walkoutPenalty : 0);
		const license = clamp(state.license + licenseChange, 0, RULES.licenseStart);
		const infamyGained = Number.isFinite(hearing.weighted) ? hearing.weighted : 0;
		const verdict = hearingVerdictId(answers, licenseChange);

		let next = {
			...state,
			week: state.week + 1,
			infamy: state.infamy + infamyGained,
			license,
			pendingHearing: null,
			usedBoardQuestionIds: [...new Set([...(state.usedBoardQuestionIds || []), ...(hearing.questionIds || [])])],
			hearings: [...(state.hearings || []), {
				week: state.week,
				charge: state.pendingHearing?.charge || "",
				verdict,
				licenseChange,
				infamyGained
			}]
		};

		let endReason = "";
		if (license <= 0) endReason = "revoked";
		else if (next.week > RULES.weeks) endReason = "retired";
		if (endReason) next = endCareer(next, endReason);
		else next.waitlist = buildWaitlist(next, rosterIds, random);

		return {
			state: next,
			update: {
				verdict,
				verdictTitle: HEARING_VERDICTS[verdict].title,
				verdictText: HEARING_VERDICTS[verdict].text,
				accountable,
				violations,
				licenseChange,
				license,
				infamyGained,
				ended: Boolean(endReason),
				endReason
			}
		};
	}

	function careerSummary(state) {
		const sessions = state.sessions || [];
		return {
			infamy: state.infamy,
			weeks: sessions.length + (state.hearings || []).length,
			hearings: (state.hearings || []).length,
			sessionsCompleted: sessions.filter((item) => item.completed).length,
			walkouts: sessions.filter((item) => !item.completed).length,
			clientsSeen: Object.keys(state.clients || {}).length,
			clientsLost: Object.values(state.clients || {}).filter((item) => item.left).length,
			license: state.license,
			endReason: state.endReason,
			modeId: state.modeId
		};
	}

	function isBetterCareer(candidate, existing) {
		if (!existing) return true;
		if (candidate.infamy !== existing.infamy) return candidate.infamy > existing.infamy;
		return candidate.weeks > existing.weeks;
	}

	function normalizeClients(value) {
		if (!value || typeof value !== "object" || Array.isArray(value)) return {};
		return Object.fromEntries(Object.entries(value).map(([id, record]) => [id, {
			visits: Number.isInteger(record?.visits) && record.visits >= 0 ? record.visits : 0,
			trust: Number.isFinite(record?.trust) ? clamp(record.trust, RULES.minimumTrust, 100) : 100,
			walkouts: Number.isInteger(record?.walkouts) && record.walkouts >= 0 ? record.walkouts : 0,
			left: record?.left === true,
			lastWeek: Number.isInteger(record?.lastWeek) ? record.lastWeek : 0,
			memories: Array.isArray(record?.memories)
				? record.memories.map(normalizeMemory).filter(Boolean).slice(0, RULES.memoryLimit)
				: []
		}]));
	}

	function normalizeViolationCounts(value) {
		if (!value || typeof value !== "object") return {};
		return Object.fromEntries(
			VIOLATION_TYPE_IDS.filter((type) => Number.isInteger(value[type]) && value[type] > 0).map((type) => [type, value[type]])
		);
	}

	function normalizeCareer(value) {
		if (!value || typeof value !== "object") return null;
		if (value.status !== "active" && value.status !== "ended") return null;
		if (!Number.isInteger(value.week) || value.week < 1) return null;
		return {
			status: value.status,
			modeId: MODE_IDS.includes(value.modeId) ? value.modeId : "classic",
			week: value.week,
			infamy: Number.isFinite(value.infamy) ? value.infamy : 0,
			license: Number.isFinite(value.license) ? clamp(value.license, 0, RULES.licenseStart) : RULES.licenseStart,
			clients: normalizeClients(value.clients),
			sessions: Array.isArray(value.sessions) ? value.sessions.filter((item) => item && typeof item === "object") : [],
			waitlist: Array.isArray(value.waitlist) ? value.waitlist.filter((id) => typeof id === "string") : [],
			endReason: ENDINGS[value.endReason] ? value.endReason : "",
			startedAt: typeof value.startedAt === "string" ? value.startedAt : "",
			violationCounts: normalizeViolationCounts(value.violationCounts),
			incidents: Array.isArray(value.incidents) ? value.incidents.filter((key) => typeof key === "string").slice(0, RULES.incidentLimit) : [],
			hearings: Array.isArray(value.hearings) ? value.hearings.filter((item) => item && HEARING_VERDICTS[item.verdict]) : [],
			pendingHearing: value.pendingHearing && VIOLATION_TYPE_IDS.includes(value.pendingHearing.charge)
				? {
					charge: value.pendingHearing.charge,
					threshold: Number.isFinite(value.pendingHearing.threshold) ? value.pendingHearing.threshold : 0,
					calledWeek: Number.isInteger(value.pendingHearing.calledWeek) ? value.pendingHearing.calledWeek : 0
				}
				: null,
			hearingThresholdsCrossed: Array.isArray(value.hearingThresholdsCrossed)
				? value.hearingThresholdsCrossed.filter((threshold) => RULES.hearingThresholds.includes(threshold))
				: [],
			usedBoardQuestionIds: Array.isArray(value.usedBoardQuestionIds) ? value.usedBoardQuestionIds.filter((id) => typeof id === "string") : []
		};
	}

	function normalizeStore(value) {
		if (!value || value.version !== VERSION) return emptyStore();
		const best = value.best && Number.isFinite(value.best.infamy) ? value.best : null;
		return { version: VERSION, current: normalizeCareer(value.current), best };
	}

	function load(storage) {
		try {
			const raw = storage?.getItem(STORAGE_KEY);
			return normalizeStore(raw ? JSON.parse(raw) : null);
		} catch {
			return emptyStore();
		}
	}

	function save(storage, store) {
		try {
			storage?.setItem(STORAGE_KEY, JSON.stringify(normalizeStore(store)));
			return true;
		} catch {
			return false;
		}
	}

	// Saves a career state, recording it as the best career when it ends with a new high.
	function saveCareer(storage, state, now = () => new Date().toISOString()) {
		const store = load(storage);
		store.current = state;
		if (state?.status === "ended") {
			const summary = { ...careerSummary(state), at: now() };
			if (isBetterCareer(summary, store.best)) store.best = summary;
		}
		save(storage, store);
		return store;
	}

	return Object.freeze({
		VERSION,
		STORAGE_KEY,
		RULES,
		ENDINGS,
		RETURNING_LINES,
		HEARING_VERDICTS,
		emptyStore,
		newCareer,
		buildWaitlist,
		startingMood,
		returningLine,
		returningGreeting,
		clientMemories,
		applySession,
		topCharge,
		selectHearingQuestions,
		applyHearing,
		endCareer,
		careerSummary,
		load,
		save,
		saveCareer
	});
});
