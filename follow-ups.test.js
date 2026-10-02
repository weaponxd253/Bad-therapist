const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { VIOLATION_TYPES } = require("./scoring.js");
const { validateQuestions } = require("./content-schema.js");
const { RULES, shouldFollowUp, buildFollowUpQuestion, insertFollowUp } = require("./follow-ups.js");

const authored = questions.flatMap((question) =>
	question.choices.filter((choice) => choice.followUp).map((choice) => ({ question, choice }))
);
assert.ok(authored.length >= 10, "expected a meaningful set of authored follow-ups");
authored.forEach(({ question, choice }) => {
	assert.ok(choice.badness >= 2, `${question.id}/${choice.id}: follow-ups should come from clearly bad answers`);
	choice.followUp.choices.forEach((followChoice) => {
		assert.match(followChoice.reaction, /^Client: /, `${choice.followUp.id}: reactions are voiced as "Client: …"`);
	});
});

// Validator rules specific to follow-ups.
function withFollowUp(mutate) {
	const copy = JSON.parse(JSON.stringify(questions));
	const target = copy.find((question) => question.choices.some((choice) => choice.followUp));
	mutate(target, target.choices.find((choice) => choice.followUp));
	return validateQuestions(copy, VIOLATION_TYPES).map((error) => error.message);
}
assert.ok(
	withFollowUp((_question, choice) => { choice.followUp.choices[0].followUp = choice.followUp; })
		.includes("Follow-ups cannot trigger further follow-ups.")
);
assert.ok(
	withFollowUp((question, choice) => {
		question.choices.find((other) => other.badness === 0).followUp = choice.followUp;
	}).includes("Follow-ups belong on bad responses, not the helpful one.")
);
assert.ok(
	withFollowUp((_question, choice) => {
		choice.followUp.choices.forEach((followChoice) => { if (followChoice.badness === 3) followChoice.badness = 2; });
	}).includes("Expected a follow-up to include at least one badness-3 choice.")
);
assert.ok(
	withFollowUp((question, choice) => { choice.followUp.id = question.id; })
		.some((message) => message.startsWith("Duplicate question ID")),
	"follow-up IDs share the question ID namespace"
);

// Triggering rules.
const { question: parent, choice: trigger } = authored[0];
const run = [parent, ...questions.filter((question) => question !== parent).slice(0, 9)];
const ok = { sessionWillEnd: false };
assert.equal(shouldFollowUp({ questions: run, index: 0, choice: trigger, outcome: ok }), true);
assert.equal(shouldFollowUp({ questions: run, index: 0, choice: { id: "plain" }, outcome: ok }), false);
assert.equal(
	shouldFollowUp({ questions: run, index: 0, choice: trigger, outcome: { sessionWillEnd: true } }),
	false,
	"early endings take priority over follow-ups"
);
assert.equal(shouldFollowUp({ questions: run, index: 9, choice: trigger, outcome: ok }), false, "the final question never branches");
assert.equal(
	shouldFollowUp({ questions: run, index: 0, choice: trigger, outcome: ok, followUpsSoFar: RULES.maxPerRun }),
	false,
	"follow-ups are capped per run"
);
const chained = [...run];
chained[0] = { ...parent, isFollowUp: true };
assert.equal(shouldFollowUp({ questions: chained, index: 0, choice: trigger, outcome: ok }), false, "follow-ups never chain");

// Building and inserting.
const snapshot = JSON.stringify(trigger.followUp);
const built = buildFollowUpQuestion(parent, trigger, () => 0);
assert.equal(JSON.stringify(trigger.followUp), snapshot, "building must not mutate authored content");
assert.equal(built.id, trigger.followUp.id);
assert.equal(built.topic, parent.topic, "follow-ups inherit the parent's topic");
assert.equal(built.isFollowUp, true);
assert.equal(built.parentQuestionId, parent.id);
assert.equal(built.parentChoiceId, trigger.id);
assert.deepEqual(
	built.choices.map((choice) => choice.id).sort(),
	trigger.followUp.choices.map((choice) => choice.id).sort()
);

const inserted = insertFollowUp(run, 0, built);
assert.equal(inserted.length, run.length, "a follow-up keeps the session length");
assert.equal(inserted[1], built, "the follow-up comes immediately after its parent");
assert.equal(inserted[0], run[0]);
assert.deepEqual(inserted.slice(2), run.slice(1, -1), "the last queued question is the one dropped");
assert.equal(run.length, 10, "insertion must not mutate the original run");
