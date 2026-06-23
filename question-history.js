(function (root, factory) {
	const history = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = history;
	}
	root.BadTherapistQuestionHistory = history;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const VERSION = 1;
	const STORAGE_KEY = "bad-therapist-question-history-v1";
	const MAX_RECENT_RUNS = 3;
	const RECENCY_WEIGHTS = Object.freeze([100, 35, 10]);

	function emptyHistory() {
		return { version: VERSION, recentRuns: [] };
	}

	function normalizeRun(run) {
		if (!Array.isArray(run)) return null;
		const ids = run.filter(
			(id, index) =>
				typeof id === "string" && id.trim().length > 0 && run.indexOf(id) === index
		);
		return ids.length > 0 ? ids : null;
	}

	function normalizeHistory(value) {
		if (!value || value.version !== VERSION || !Array.isArray(value.recentRuns)) {
			return emptyHistory();
		}
		return {
			version: VERSION,
			recentRuns: value.recentRuns
				.map(normalizeRun)
				.filter(Boolean)
				.slice(0, MAX_RECENT_RUNS)
		};
	}

	function load(storage) {
		try {
			const raw = storage?.getItem(STORAGE_KEY);
			return normalizeHistory(raw ? JSON.parse(raw) : null);
		} catch {
			return emptyHistory();
		}
	}

	function save(storage, history) {
		const normalized = normalizeHistory(history);
		try {
			storage?.setItem(STORAGE_KEY, JSON.stringify(normalized));
			return true;
		} catch {
			return false;
		}
	}

	function recordRun(storage, questionIds) {
		const run = normalizeRun(questionIds);
		const history = load(storage);
		if (!run) return history;

		const next = {
			version: VERSION,
			recentRuns: [run, ...history.recentRuns].slice(0, MAX_RECENT_RUNS)
		};
		save(storage, next);
		return next;
	}

	function getRecentQuestionWeights(history) {
		const normalized = normalizeHistory(history);
		const weights = {};
		normalized.recentRuns.forEach((run, runIndex) => {
			const weight = RECENCY_WEIGHTS[runIndex] || 0;
			run.forEach((id) => {
				weights[id] = Math.max(weights[id] || 0, weight);
			});
		});
		return weights;
	}

	return Object.freeze({
		VERSION,
		STORAGE_KEY,
		MAX_RECENT_RUNS,
		RECENCY_WEIGHTS,
		emptyHistory,
		normalizeHistory,
		load,
		save,
		recordRun,
		getRecentQuestionWeights
	});
});