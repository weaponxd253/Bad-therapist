(function (root, factory) {
	const modes = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = modes;
	}
	root.BadTherapistModes = modes;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const GAME_MODES = Object.freeze({
		classic: Object.freeze({
			id: "classic",
			label: "Classic",
			description: "Choose the worst responses with the original pacing and balance.",
			questionCount: 10,
			instantPacing: false,
			minimumViolationCategories: 3,
			preferredViolationCategories: Object.freeze([]),
			scoringModifiers: Object.freeze({ violationPenaltyMultiplier: 1 })
		}),
		speed: Object.freeze({
			id: "speed",
			label: "Speed Session",
			description: "No typing, entrance, or transition delays. Immediate chaos.",
			questionCount: 10,
			instantPacing: true,
			minimumViolationCategories: 3,
			preferredViolationCategories: Object.freeze([]),
			scoringModifiers: Object.freeze({ violationPenaltyMultiplier: 1 })
		}),
		minefield: Object.freeze({
			id: "minefield",
			label: "Ethics Minefield",
			description: "Subtler ethics traps appear more often and violations cost 25% more mood.",
			questionCount: 10,
			instantPacing: false,
			minimumViolationCategories: 4,
			preferredViolationCategories: Object.freeze([
				"judgment",
				"coercion",
				"harmfulAdvice"
			]),
			scoringModifiers: Object.freeze({ violationPenaltyMultiplier: 1.25 })
		})
	});

	function getMode(value) {
		return GAME_MODES[value] || GAME_MODES.classic;
	}

	return Object.freeze({ GAME_MODES, getMode });
});