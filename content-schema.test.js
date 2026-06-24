const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { VIOLATION_TYPES } = require("./scoring.js");
const { RESPONSE_ARCHETYPES, validateQuestions } = require("./content-schema.js");

assert.deepEqual(validateQuestions(questions, VIOLATION_TYPES), []);
assert.ok(questions.length >= 40 && questions.length <= 45);
const representedTopics = new Set(questions.map((question) => question.topic));
assert.deepEqual([...representedTopics].sort(), [
	"anxiety", "conflict", "family", "identity", "loneliness",
	"motivation", "relationships", "social-media", "work"
]);
const representedViolations = new Set(
	questions.flatMap((question) => question.choices.map((choice) => choice.violation).filter(Boolean))
);
assert.deepEqual([...representedViolations].sort(), Object.keys(VIOLATION_TYPES).sort());
const representedArchetypes = new Set(
	questions.flatMap((question) => question.choices.map((choice) => choice.archetype))
);
assert.deepEqual([...representedArchetypes].sort(), RESPONSE_ARCHETYPES.slice().sort());
for (const archetype of representedArchetypes) {
	assert.ok(RESPONSE_ARCHETYPES.includes(archetype), `Unexpected archetype: ${archetype}`);
}
questions.forEach((question) => question.choices.forEach((choice) => {
	assert.equal(typeof choice.clientRead, "string");
	assert.equal(typeof choice.ethicsNote, "string");
}));
const snapshot = JSON.stringify(questions);
validateQuestions(questions, VIOLATION_TYPES);
assert.equal(JSON.stringify(questions), snapshot, "validation must not mutate content");

function clone() {
	return JSON.parse(JSON.stringify(questions));
}

let invalid = clone();
invalid[1].id = invalid[0].id;
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path === "questions[1].id"));

invalid = clone();
invalid[0].topic = "unsupported";
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path === "questions[0].topic"));

invalid = clone();
invalid[0].choices.pop();
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path === "questions[0].choices"));

invalid = clone();
invalid[0].choices[1].id = invalid[0].choices[0].id;
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path.endsWith("choices[1].id")));

for (const badness of [-1, 1.5, 4]) {
	invalid = clone();
	invalid[0].choices[0].badness = badness;
	assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path.endsWith("badness")));
}

invalid = clone();
invalid[0].choices[0].violation = "unknown";
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path.endsWith("violation")));

invalid = clone();
invalid[0].choices[0].archetype = "unknown";
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path.endsWith("archetype")));

for (const field of ["clientRead", "ethicsNote"]) {
	invalid = clone();
	invalid[0].choices[0][field] = "";
	assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path.endsWith(field)));
}

for (const field of ["reaction", "feedback", "text"]) {
	invalid = clone();
	invalid[0].choices[0][field] = "";
	assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path.endsWith(field)));
}

invalid = clone();
invalid[0].choices[0].moodModifier = 4;
assert.deepEqual(validateQuestions(invalid, VIOLATION_TYPES), []);

invalid = clone();
invalid[0].choices[0].moodModifier = 12;
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.path.endsWith("moodModifier")));

invalid = clone();
invalid[0].choices[0].badness = 0;
assert.ok(validateQuestions(invalid, VIOLATION_TYPES).some((error) => error.message.includes("exactly one")));

console.log("Content schema tests passed.");