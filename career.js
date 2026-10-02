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
		maximumWalkouts: 2
	});

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
		return { visits: 0, trust: 100, walkouts: 0, left: false, lastWeek: 0 };
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
			startedAt: now()
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
		const clients = {
			...state.clients,
			[session.clientId]: { visits: previous.visits + 1, trust, walkouts, left, lastWeek: state.week }
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

		let endReason = "";
		if (license <= 0) endReason = "revoked";
		else if (availableClientIds(next, rosterIds).length === 0) endReason = "emptyPractice";
		else if (next.week > RULES.weeks) endReason = "retired";

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
				ended: Boolean(endReason),
				endReason
			}
		};
	}

	function careerSummary(state) {
		const sessions = state.sessions || [];
		return {
			infamy: state.infamy,
			weeks: sessions.length,
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
			lastWeek: Number.isInteger(record?.lastWeek) ? record.lastWeek : 0
		}]));
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
			startedAt: typeof value.startedAt === "string" ? value.startedAt : ""
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
		emptyStore,
		newCareer,
		buildWaitlist,
		startingMood,
		returningLine,
		applySession,
		endCareer,
		careerSummary,
		load,
		save,
		saveCareer
	});
});
