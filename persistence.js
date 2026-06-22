(function (root, factory) {
	const persistence = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = persistence;
	}
	root.BadTherapistPersistence = persistence;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const VERSION = 2;
	const STORAGE_KEY = "bad-therapist-records-v2";
	const LEGACY_KEY = "bad-therapist-best";

	function emptyRecords() {
		return {
			version: VERSION,
			records: {
				highestChaos: null,
				bestCompleted: null
			}
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
			questionsAnswered: Number.isFinite(value.questionsAnswered)
				? value.questionsAnswered
				: 0,
			moodRemaining: Number.isFinite(value.moodRemaining) ? value.moodRemaining : null,
			grade: typeof value.grade === "string" ? value.grade : "",
			at: typeof value.at === "string" ? value.at : ""
		};
	}

	function normalizeStore(value) {
		if (!value || value.version !== VERSION || !value.records) return null;
		return {
			version: VERSION,
			records: {
				highestChaos: normalizeRecord(value.records.highestChaos),
				bestCompleted: normalizeRecord(value.records.bestCompleted)
			}
		};
	}

	function parse(raw) {
		if (!raw) return null;
		try {
			return JSON.parse(raw);
		} catch {
			return null;
		}
	}

	function save(storage, data) {
		try {
			storage?.setItem(STORAGE_KEY, JSON.stringify(data));
			return true;
		} catch {
			return false;
		}
	}

	function load(storage) {
		try {
			const current = normalizeStore(parse(storage?.getItem(STORAGE_KEY)));
			if (current) return current;

			const legacy = normalizeRecord(parse(storage?.getItem(LEGACY_KEY)));
			const migrated = emptyRecords();
			if (legacy) {
				migrated.records.highestChaos = legacy;
				if (legacy.completed) migrated.records.bestCompleted = legacy;
				save(storage, migrated);
			}
			return migrated;
		} catch {
			return emptyRecords();
		}
	}

	function recordFromSummary(summary) {
		return {
			weighted: summary.weighted,
			score: summary.totalBadness,
			violations: summary.totalViolations,
			completed: summary.completed,
			questionsAnswered: summary.questionsAnswered,
			moodRemaining: summary.moodRemaining,
			grade: summary.grade,
			at: new Date().toISOString()
		};
	}

	function isBetter(candidate, existing) {
		if (!existing) return true;
		if (candidate.weighted !== existing.weighted) {
			return candidate.weighted > existing.weighted;
		}
		if (candidate.questionsAnswered !== existing.questionsAnswered) {
			return candidate.questionsAnswered > existing.questionsAnswered;
		}
		return (candidate.moodRemaining ?? 100) < (existing.moodRemaining ?? 100);
	}

	function update(storage, summary) {
		const data = load(storage);
		const candidate = recordFromSummary(summary);

		if (isBetter(candidate, data.records.highestChaos)) {
			data.records.highestChaos = candidate;
		}
		if (candidate.completed && isBetter(candidate, data.records.bestCompleted)) {
			data.records.bestCompleted = candidate;
		}

		save(storage, data);
		return data;
	}

	return Object.freeze({
		VERSION,
		STORAGE_KEY,
		LEGACY_KEY,
		emptyRecords,
		load,
		save,
		update
	});
});