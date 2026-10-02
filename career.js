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
		incidentLimit: 40,
		// Each client's story runs this many visits, then they get an ending.
		arcLength: 3,
		thrivingHelpfulRatio: 0.5,
		thrivingMaxViolations: 1,
		memoirViolationRate: 0.34,
		memoirAverageBadness: 2.2,
		thrivingLicenseBonus: 5,
		memoirInfamyBonus: 15,
		memoirBadPressWeeks: 2,
		blockedBadPressWeeks: 1
	});

	// How a client's story ends. Per-client lines for each live with the client personas.
	const ARC_ENDINGS = Object.freeze({
		thriving: Object.freeze({ title: "Thriving Despite You", effect: "Sends a referral your way." }),
		transferred: Object.freeze({ title: "Transferred to a Real Therapist", effect: "No hard feelings. Mostly." }),
		memoir: Object.freeze({ title: "Wrote a Memoir About You", effect: "Infamy soars. Bad press shrinks your waitlist." }),
		blocked: Object.freeze({ title: "Blocked Your Number", effect: "Word gets around. Bad press shrinks your waitlist." })
	});

	const REFERRAL_LINE = "{referrer} said you were actually worth a try. I’m skeptical, but here I am.";

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
			text: "Every client has moved on: thriving, transferred, memoired, or blocked. The waiting room is just you and a very judgmental fern."
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

	function emptyArc() {
		return { answers: 0, helpful: 0, violations: 0, badness: 0 };
	}

	function emptyClientRecord() {
		return { visits: 0, trust: 100, walkouts: 0, left: false, lastWeek: 0, memories: [], arc: emptyArc(), ending: "", referredBy: "" };
	}

	// The ending a finished arc earns, from every answer across the client's visits.
	function arcEndingFor(arc) {
		const answers = Math.max(1, arc.answers);
		if (arc.violations / answers >= RULES.memoirViolationRate || arc.badness / answers >= RULES.memoirAverageBadness) return "memoir";
		if (arc.helpful / answers >= RULES.thrivingHelpfulRatio && arc.violations <= RULES.thrivingMaxViolations) return "thriving";
		return "transferred";
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

	// Clients still in the practice: not blocked, not finished with their arc.
	function availableClientIds(state, rosterIds) {
		return rosterIds.filter((id) => {
			const record = clientRecord(state, id);
			return !record.left && !record.ending;
		});
	}

	function waitlistSizeFor(state) {
		return Math.max(1, RULES.waitlistSize - ((state.badPressWeeks || 0) > 0 ? 1 : 0));
	}

	// Referred clients first, then a returning client and a new one when both exist, the rest
	// random. Bad press shrinks the list by one.
	function buildWaitlist(state, rosterIds, random = Math.random) {
		const size = waitlistSizeFor(state);
		const available = availableClientIds(state, rosterIds);
		const referred = (state.referrals || [])
			.map((referral) => referral.clientId)
			.filter((id) => available.includes(id) && clientRecord(state, id).visits === 0);
		const returning = shuffle(available.filter((id) => clientRecord(state, id).visits > 0), random);
		const fresh = shuffle(available.filter((id) => clientRecord(state, id).visits === 0 && !referred.includes(id)), random);
		const picks = referred.slice(0, Math.max(1, size - 1));
		if (returning.length && picks.length < size) picks.push(returning.shift());
		if (fresh.length && picks.length < size) picks.push(fresh.shift());
		const rest = shuffle([...returning, ...fresh], random);
		while (picks.length < size && rest.length) picks.push(rest.shift());
		return shuffle(picks, random);
	}

	// Who referred this client, if anyone.
	function referrerFor(state, clientId) {
		return (state.referrals || []).find((referral) => referral.clientId === clientId)?.referrerId || "";
	}

	function referralLine(referrerName) {
		return referrerName ? REFERRAL_LINE.replace("{referrer}", referrerName) : "";
	}

	// A thriving client refers someone new, preferring a client from the same pack.
	function pickReferral(state, rosterIds, samePackIds, random) {
		const referredAlready = new Set((state.referrals || []).map((referral) => referral.clientId));
		const unseen = availableClientIds(state, rosterIds)
			.filter((id) => clientRecord(state, id).visits === 0 && !referredAlready.has(id));
		const samePack = unseen.filter((id) => samePackIds.includes(id));
		const pool = samePack.length ? samePack : unseen;
		return pool.length ? pool[Math.floor(random() * pool.length)] : "";
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
			referrals: [],
			badPressWeeks: 0,
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
		let license = clamp(state.license - licenseLost + licenseRecovered, 0, RULES.licenseStart);

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
		const previousArc = previous.arc || emptyArc();
		const arc = {
			answers: previousArc.answers + (Number.isInteger(session.questionsAnswered) ? session.questionsAnswered : 0),
			helpful: previousArc.helpful + (Number.isInteger(session.helpfulCount) ? session.helpfulCount : 0),
			violations: previousArc.violations + violations,
			badness: previousArc.badness + (Number.isFinite(session.totalBadness) ? session.totalBadness : 0)
		};
		const visits = previous.visits + 1;
		const ending = left ? "blocked" : visits >= RULES.arcLength ? arcEndingFor(arc) : "";
		const clients = {
			...state.clients,
			[session.clientId]: {
				visits, trust, walkouts, left, lastWeek: state.week, memories, arc, ending,
				referredBy: previous.referredBy || referrerFor(state, session.clientId)
			}
		};

		// An ending changes the practice: thriving refers someone, a memoir or a block brings bad press.
		const licenseBonus = ending === "thriving" ? RULES.thrivingLicenseBonus : 0;
		const infamyBonus = ending === "memoir" ? RULES.memoirInfamyBonus : 0;
		const badPressAdded = ending === "memoir" ? RULES.memoirBadPressWeeks : ending === "blocked" ? RULES.blockedBadPressWeeks : 0;
		license = clamp(license + licenseBonus, 0, RULES.licenseStart);

		let next = {
			...state,
			week: state.week + 1,
			infamy: state.infamy + infamyGained + infamyBonus,
			license,
			clients,
			badPressWeeks: Math.max(0, (state.badPressWeeks || 0) - 1) + badPressAdded,
			referrals: (state.referrals || []).filter((referral) => referral.clientId !== session.clientId),
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

		let referral = null;
		if (ending === "thriving") {
			const referredId = pickReferral(next, rosterIds, Array.isArray(session.samePackIds) ? session.samePackIds : [], random);
			if (referredId) {
				referral = { clientId: referredId, referrerId: session.clientId };
				next.referrals = [...next.referrals, referral];
			}
		}
		if (!endReason && availableClientIds(next, rosterIds).length === 0) endReason = "emptyPractice";

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
				visits,
				arcEnding: ending ? { id: ending, title: ARC_ENDINGS[ending].title, effect: ARC_ENDINGS[ending].effect } : null,
				licenseBonus,
				infamyBonus,
				badPressAdded,
				referral,
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
						// Any general question, even off-charge, beats one about an incident this player
						// never committed, so the board doesn't quiz them on someone else's file.
						(related.length > 0 && !committed ? -60 : 0) +
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
			badPressWeeks: Math.max(0, (state.badPressWeeks || 0) - 1),
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
			outcomes: Object.fromEntries(Object.keys(ARC_ENDINGS).map((id) => [
				id, Object.values(state.clients || {}).filter((record) => record.ending === id).length
			])),
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
				: [],
			arc: {
				answers: Number.isInteger(record?.arc?.answers) ? record.arc.answers : 0,
				helpful: Number.isInteger(record?.arc?.helpful) ? record.arc.helpful : 0,
				violations: Number.isInteger(record?.arc?.violations) ? record.arc.violations : 0,
				badness: Number.isFinite(record?.arc?.badness) ? record.arc.badness : 0
			},
			ending: ARC_ENDINGS[record?.ending] ? record.ending : "",
			referredBy: typeof record?.referredBy === "string" ? record.referredBy : ""
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
			referrals: Array.isArray(value.referrals)
				? value.referrals.filter((item) => typeof item?.clientId === "string" && typeof item?.referrerId === "string")
				: [],
			badPressWeeks: Number.isInteger(value.badPressWeeks) && value.badPressWeeks > 0 ? value.badPressWeeks : 0,
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
		ARC_ENDINGS,
		emptyStore,
		newCareer,
		buildWaitlist,
		startingMood,
		returningLine,
		returningGreeting,
		clientMemories,
		arcEndingFor,
		referrerFor,
		referralLine,
		waitlistSizeFor,
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
