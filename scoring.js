(function (root, factory) {
	const scoring = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = scoring;
	}
	root.BadTherapistScoring = scoring;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const SCORING = Object.freeze({
		moodLossPerBadness: 5,
		earlyEndMood: 10
	});

	const VIOLATION_TYPES = Object.freeze({
		confidentiality: Object.freeze({
			label: "Confidentiality",
			moodPenalty: 12,
			explanation: "Shared, recorded, or threatened to share private client information."
		}),
		boundaries: Object.freeze({
			label: "Professional Boundaries",
			moodPenalty: 10,
			explanation: "Crossed the therapist-client relationship boundary."
		}),
		judgment: Object.freeze({
			label: "Judgment",
			moodPenalty: 6,
			explanation: "Shamed or demeaned the client instead of supporting them."
		}),
		coercion: Object.freeze({
			label: "Coercion",
			moodPenalty: 10,
			explanation: "Pressured the client or ignored their right to choose."
		}),
		harmfulAdvice: Object.freeze({
			label: "Harmful Advice",
			moodPenalty: 8,
			explanation: "Encouraged behavior likely to make the situation worse."
		})
	});

	const FALLBACK_VIOLATION = Object.freeze({
		label: "Ethics Violation",
		moodPenalty: 10,
		explanation: "Violated professional ethics and damaged client trust."
	});

	function clamp(n, min, max) {
		return Math.max(min, Math.min(max, n));
	}

	function getViolationDefinition(value) {
		if (!value) return null;

		const type = value === true ? "confidentiality" : String(value);
		const definition = VIOLATION_TYPES[type] || FALLBACK_VIOLATION;
		return {
			type,
			label: definition.label,
			moodPenalty: definition.moodPenalty,
			explanation: definition.explanation
		};
	}

	function calculateChoiceOutcome({ choice = {}, currentMood = 100 } = {}) {
		const safeMood = Number.isFinite(currentMood) ? currentMood : 100;
		const badnessGained = Number.isFinite(choice.badness) ? choice.badness : 0;
		const violation = getViolationDefinition(choice.violation);
		const violationPenalty = violation?.moodPenalty || 0;
		const rawMoodLoss =
			badnessGained * SCORING.moodLossPerBadness + violationPenalty;
		const moodRemaining = clamp(safeMood - rawMoodLoss, 0, 100);

		return {
			badnessGained,
			moodLost: safeMood - moodRemaining,
			moodRemaining,
			violation,
			violationPenalty,
			sessionWillEnd: moodRemaining <= SCORING.earlyEndMood
		};
	}

	return Object.freeze({
		SCORING,
		VIOLATION_TYPES,
		getViolationDefinition,
		calculateChoiceOutcome
	});
});