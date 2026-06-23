(function (root, factory) {
	const achievements = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = achievements;
	}
	root.BadTherapistAchievements = achievements;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const VERSION = 1;
	const STORAGE_KEY = "bad-therapist-achievements-v1";
	const ALL_VIOLATION_TYPES = Object.freeze([
		"confidentiality", "boundaries", "judgment", "coercion", "harmfulAdvice"
	]);

	const ACHIEVEMENTS = Object.freeze([
		Object.freeze({
			id: "accidentallyEthical",
			label: "Accidentally Ethical",
			description: "Complete a session with zero ethics violations.",
			evaluate: (summary) => summary.completed && summary.totalViolations === 0
		}),
		Object.freeze({
			id: "confidentialityHatTrick",
			label: "Group Chat Material",
			description: "Commit three confidentiality violations in one session.",
			evaluate: (summary) => (summary.violationCountsByType.confidentiality || 0) >= 3
		}),
		Object.freeze({
			id: "categoryCollector",
			label: "Category Collector",
			description: "Encounter every ethics-violation category across your sessions.",
			evaluate: (_summary, state) =>
				ALL_VIOLATION_TYPES.every((type) => state.categoryProgress.includes(type))
		}),
		Object.freeze({
			id: "maximumMenace",
			label: "Maximum Menace",
			description: "Use only badness-3 responses for at least four questions.",
			evaluate: (summary) =>
				summary.completed &&
				summary.questionsAnswered > 0 &&
				summary.badnessThreeCount === summary.questionsAnswered
		}),
		Object.freeze({
			id: "lastNerve",
			label: "Last Nerve",
			description: "Complete a session with client mood at 15 or lower.",
			evaluate: (summary) => summary.completed && summary.moodRemaining <= 15
		}),
		Object.freeze({
			id: "walkoutSpeedrun",
			label: "Walkout Speedrun",
			description: "End a session within four questions.",
			evaluate: (summary) => !summary.completed && summary.questionsAnswered <= 4
		}),
		Object.freeze({
			id: "mineSweeper",
			label: "Mine Sweeper",
			description: "Complete Ethics Minefield mode.",
			evaluate: (summary) => summary.completed && summary.modeId === "minefield"
		}),
		Object.freeze({
			id: "cleanSweep",
			label: "Clean Sweep",
			description: "Complete a session using every helpful response.",
			evaluate: (summary) =>
				summary.completed &&
				summary.questionsAnswered > 0 &&
				summary.helpfulCount === summary.questionsAnswered
		})
	]);

	function emptyState() {
		return { version: VERSION, unlocked: {}, categoryProgress: [] };
	}

	function normalizeState(value) {
		if (!value || value.version !== VERSION) return emptyState();
		const unlocked = {};
		if (value.unlocked && typeof value.unlocked === "object") {
			ACHIEVEMENTS.forEach((achievement) => {
				const entry = value.unlocked[achievement.id];
				if (!entry || typeof entry !== "object") return;
				unlocked[achievement.id] = {
					unlockedAt: typeof entry.unlockedAt === "string" ? entry.unlockedAt : "",
					modeId: typeof entry.modeId === "string" ? entry.modeId : "classic"
				};
			});
		}
		const categoryProgress = Array.isArray(value.categoryProgress)
			? [...new Set(value.categoryProgress.filter((type) => ALL_VIOLATION_TYPES.includes(type)))]
			: [];
		return { version: VERSION, unlocked, categoryProgress };
	}

	function load(storage) {
		try {
			const raw = storage?.getItem(STORAGE_KEY);
			return normalizeState(raw ? JSON.parse(raw) : null);
		} catch {
			return emptyState();
		}
	}

	function save(storage, state) {
		const normalized = normalizeState(state);
		try {
			storage?.setItem(STORAGE_KEY, JSON.stringify(normalized));
			return true;
		} catch {
			return false;
		}
	}

	function evaluateRun(storage, summary, now = () => new Date().toISOString()) {
		const state = load(storage);
		const categories = Object.keys(summary.violationCountsByType || {})
			.filter((type) => ALL_VIOLATION_TYPES.includes(type));
		state.categoryProgress = [...new Set([...state.categoryProgress, ...categories])];
		const newUnlocks = [];

		ACHIEVEMENTS.forEach((achievement) => {
			if (state.unlocked[achievement.id]) return;
			if (!achievement.evaluate(summary, state)) return;
			state.unlocked[achievement.id] = {
				unlockedAt: now(),
				modeId: summary.modeId || "classic"
			};
			newUnlocks.push({
				id: achievement.id,
				label: achievement.label,
				description: achievement.description
			});
		});

		save(storage, state);
		return { state, newUnlocks };
	}

	return Object.freeze({
		VERSION, STORAGE_KEY, ALL_VIOLATION_TYPES, ACHIEVEMENTS,
		emptyState, normalizeState, load, save, evaluateRun
	});
});