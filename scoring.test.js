const assert = require("node:assert/strict");
const {
	SCORING,
	VIOLATION_TYPES,
	getViolationDefinition,
	calculateChoiceOutcome
} = require("./scoring.js");

const helpfulChoice = { badness: 0 };
const helpfulSnapshot = JSON.stringify(helpfulChoice);
assert.deepEqual(calculateChoiceOutcome({ choice: helpfulChoice, currentMood: 100 }), {
	badnessGained: 0,
	moodLost: 0,
	moodRemaining: 100,
	violation: null,
	violationPenalty: 0,
	sessionWillEnd: false
});
assert.equal(JSON.stringify(helpfulChoice), helpfulSnapshot, "calculator must not mutate choices");

const severe = calculateChoiceOutcome({ choice: { badness: 3 }, currentMood: 100 });
assert.equal(severe.moodLost, 3 * SCORING.moodLossPerBadness);
assert.equal(severe.sessionWillEnd, false);

const confidentiality = calculateChoiceOutcome({
	choice: { badness: 3, violation: "confidentiality" },
	currentMood: 100
});
assert.equal(confidentiality.violation.label, "Confidentiality");
assert.equal(confidentiality.violationPenalty, VIOLATION_TYPES.confidentiality.moodPenalty);
assert.equal(confidentiality.moodLost, 27);

const modified = calculateChoiceOutcome({ choice: { badness: 2, moodModifier: 4 }, currentMood: 100 });
assert.equal(modified.moodLost, 14);

const boundaries = calculateChoiceOutcome({
	choice: { badness: 3, violation: "boundaries" },
	currentMood: 100
});
assert.equal(boundaries.violation.label, "Professional Boundaries");
assert.notEqual(
	boundaries.violationPenalty,
	confidentiality.violationPenalty,
	"categories should be able to carry different penalties"
);

assert.equal(getViolationDefinition(true).type, "confidentiality", "legacy booleans remain supported");
assert.equal(getViolationDefinition("unknown").label, "Ethics Violation");
assert.equal(calculateChoiceOutcome({ choice: {}, currentMood: 10 }).sessionWillEnd, true);
assert.equal(
	calculateChoiceOutcome({ choice: { badness: 3, violation: "confidentiality" }, currentMood: 12 }).moodLost,
	12,
	"reported mood loss must reflect clamping"
);

console.log("Scoring tests passed.");