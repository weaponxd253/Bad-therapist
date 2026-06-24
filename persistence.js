(function (root, factory) {
	const persistence = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = persistence;
	}
	root.BadTherapistPersistence = persistence;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const VERSION = 3;
	const STORAGE_KEY = "bad-therapist-records-v3";
	const PREVIOUS_KEY = "bad-therapist-records-v2";
	const LEGACY_KEY = "bad-therapist-best";
	const MODE_IDS = Object.freeze(["classic", "speed", "minefield"]);

	function emptyModeRecords() {
		return { highestChaos: null, bestCompleted: null };
	}

	function emptyRecords() {
		return {
			version: VERSION,
			recordsByMode: Object.fromEntries(MODE_IDS.map((id) => [id, emptyModeRecords()])),
			lastStyleSummary: null
		};
	}

	function normalizeRecord(value) {
		if (!value || typeof value !== "object") return null;
		if (!Number.isFinite(value.weighted) || !Number.isFinite(value.score)) return null;
		return {
			weighted: value.weighted,
			score: value.score,
			violations: Number.isFinite(value.violations) ? value.violations : 0,
			completed: value.completed === true,
			questionsAnswered: Number.isFinite(value.questionsAnswered) ? value.questionsAnswered : 0,
			moodRemaining: Number.isFinite(value.moodRemaining) ? value.moodRemaining : null,
			grade: typeof value.grade === "string" ? value.grade : "",
			modeId: MODE_IDS.includes(value.modeId) ? value.modeId : "classic",
			modeLabel: typeof value.modeLabel === "string" ? value.modeLabel : "Classic",
			at: typeof value.at === "string" ? value.at : ""
		};
	}

	function normalizeModeRecords(value) {
		return {
			highestChaos: normalizeRecord(value?.highestChaos),
			bestCompleted: normalizeRecord(value?.bestCompleted)
		};
	}

	function normalizeStyleMix(value) {
		if (!Array.isArray(value)) return [];
		return value
			.filter((item) => item && typeof item === "object" && typeof item.archetype === "string")
			.map((item) => ({
				archetype: item.archetype,
				label: typeof item.label === "string" ? item.label : item.archetype,
				count: Number.isFinite(item.count) ? item.count : 0
			}))
			.slice(0, 5);
	}

	function normalizeStyleSummary(value) {
		if (!value || typeof value !== "object" || typeof value.dominantArchetype !== "string") return null;
		return {
			modeId: MODE_IDS.includes(value.modeId) ? value.modeId : "classic",
			modeLabel: typeof value.modeLabel === "string" ? value.modeLabel : "Classic",
			completed: value.completed === true,
			questionsAnswered: Number.isFinite(value.questionsAnswered) ? value.questionsAnswered : 0,
			dominantArchetype: value.dominantArchetype,
			dominantLabel: typeof value.dominantLabel === "string" ? value.dominantLabel : value.dominantArchetype,
			dominantCount: Number.isFinite(value.dominantCount) ? value.dominantCount : 0,
			styleMix: normalizeStyleMix(value.styleMix),
			at: typeof value.at === "string" ? value.at : ""
		};
	}

	function normalizeStore(value) {
		if (!value || value.version !== VERSION || !value.recordsByMode) return null;
		const normalized = emptyRecords();
		MODE_IDS.forEach((id) => {
			normalized.recordsByMode[id] = normalizeModeRecords(value.recordsByMode[id]);
		});
		normalized.lastStyleSummary = normalizeStyleSummary(value.lastStyleSummary);
		return normalized;
	}

	function parse(raw) {
		if (!raw) return null;
		try { return JSON.parse(raw); } catch { return null; }
	}

	function save(storage, data) {
		try {
			storage?.setItem(STORAGE_KEY, JSON.stringify(data));
			return true;
		} catch {
			return false;
		}
	}

	function migrateV2(value) {
		if (!value || value.version !== 2 || !value.records) return null;
		const migrated = emptyRecords();
		migrated.recordsByMode.classic = normalizeModeRecords(value.records);
		return migrated;
	}

	function load(storage) {
		try {
			const current = normalizeStore(parse(storage?.getItem(STORAGE_KEY)));
			if (current) return current;

			const previous = migrateV2(parse(storage?.getItem(PREVIOUS_KEY)));
			if (previous) {
				save(storage, previous);
				return previous;
			}

			const legacy = normalizeRecord(parse(storage?.getItem(LEGACY_KEY)));
			const migrated = emptyRecords();
			if (legacy) {
				migrated.recordsByMode.classic.highestChaos = legacy;
				if (legacy.completed) migrated.recordsByMode.classic.bestCompleted = legacy;
				save(storage, migrated);
			}
			return migrated;
		} catch {
			return emptyRecords();
		}
	}

	function recordFromSummary(summary) {
		const modeId = MODE_IDS.includes(summary.modeId) ? summary.modeId : "classic";
		return {
			weighted: summary.weighted,
			score: summary.totalBadness,
			violations: summary.totalViolations,
			completed: summary.completed,
			questionsAnswered: summary.questionsAnswered,
			moodRemaining: summary.moodRemaining,
			grade: summary.grade,
			modeId,
			modeLabel: summary.modeLabel || "Classic",
			at: new Date().toISOString()
		};
	}

	function styleSummaryFromRun(summary) {
		if (!summary?.dominantStyle?.archetype) return null;
		return {
			modeId: MODE_IDS.includes(summary.modeId) ? summary.modeId : "classic",
			modeLabel: summary.modeLabel || "Classic",
			completed: summary.completed === true,
			questionsAnswered: Number.isFinite(summary.questionsAnswered) ? summary.questionsAnswered : 0,
			dominantArchetype: summary.dominantStyle.archetype,
			dominantLabel: summary.dominantStyle.label || summary.dominantStyle.archetype,
			dominantCount: Number.isFinite(summary.dominantStyle.count) ? summary.dominantStyle.count : 0,
			styleMix: normalizeStyleMix(summary.archetypeBreakdown),
			at: new Date().toISOString()
		};
	}

	function isBetter(candidate, existing) {
		if (!existing) return true;
		if (candidate.weighted !== existing.weighted) return candidate.weighted > existing.weighted;
		if (candidate.questionsAnswered !== existing.questionsAnswered) {
			return candidate.questionsAnswered > existing.questionsAnswered;
		}
		return (candidate.moodRemaining ?? 100) < (existing.moodRemaining ?? 100);
	}

	function update(storage, summary) {
		const data = load(storage);
		const candidate = recordFromSummary(summary);
		const modeRecords = data.recordsByMode[candidate.modeId];
		if (isBetter(candidate, modeRecords.highestChaos)) modeRecords.highestChaos = candidate;
		if (candidate.completed && isBetter(candidate, modeRecords.bestCompleted)) {
			modeRecords.bestCompleted = candidate;
		}
		data.lastStyleSummary = styleSummaryFromRun(summary) || data.lastStyleSummary;
		save(storage, data);
		return data;
	}

	return Object.freeze({
		VERSION, STORAGE_KEY, PREVIOUS_KEY, LEGACY_KEY, MODE_IDS,
		emptyRecords, load, save, update
	});
});