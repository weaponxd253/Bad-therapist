const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { RESPONSE_ARCHETYPES, TOPICS } = require("./content-schema.js");
const { RULES, TOPIC_PHRASES, ARCHETYPE_LINES, fillTemplate, selectCallback } = require("./callbacks.js");

// Content coverage: every archetype and topic can produce a line, and templates use only {topic}.
RESPONSE_ARCHETYPES.forEach((archetype) => {
	assert.ok(ARCHETYPE_LINES[archetype]?.length >= 2, `${archetype} needs at least two callback lines`);
	ARCHETYPE_LINES[archetype].forEach((line) => {
		assert.equal(line.replaceAll("{topic}", "").includes("{"), false, `unknown token in: ${line}`);
	});
});
TOPICS.forEach((topic) => assert.ok(TOPIC_PHRASES[topic], `${topic} needs a callback phrase`));
questions.forEach((question) => {
	assert.ok(
		question.choices.some((choice) => typeof choice.callback === "string"),
		`${question.id} needs an authored callback on at least one choice`
	);
});

assert.equal(
	fillTemplate("{topic} kind of turned into your story.", "work"),
	"The work stuff kind of turned into your story."
);
assert.equal(
	fillTemplate("I’d like to decide this one myself. Unlike {topic}.", "conflict"),
	"I’d like to decide this one myself. Unlike that conflict I mentioned."
);

function entry(questionNumber, overrides = {}) {
	return {
		questionNumber,
		topic: "work",
		archetype: "chaosAdvice",
		response: `Response ${questionNumber}`,
		badness: 3,
		moodLost: 20,
		callbackLine: "",
		...overrides
	};
}

const always = () => 0;
const never = () => 0.99;
const history = [entry(1), entry(2), entry(3), entry(4)];

assert.equal(selectCallback({ history, questionNumber: 2, random: always }), null, "no callbacks before question 3");
assert.equal(selectCallback({ history, questionNumber: 5, random: never }), null, "callbacks respect the fire chance");

const first = selectCallback({ history: [entry(1)], questionNumber: 3, random: always });
assert.equal(first.sourceQuestionNumber, 1);
assert.equal(first.questionNumber, 3);
assert.equal(first.authored, false);
assert.match(first.line, /the work stuff/);

assert.equal(
	selectCallback({ history: [entry(1), entry(2)], questionNumber: 3, random: always }).sourceQuestionNumber,
	1,
	"the previous question is too recent to call back"
);
assert.equal(
	selectCallback({ history, questionNumber: 5, previous: [{ questionNumber: 4, sourceQuestionNumber: 1 }], random: always }),
	null,
	"callbacks never land on back-to-back questions"
);
assert.notEqual(
	selectCallback({ history, questionNumber: 6, previous: [{ questionNumber: 3, sourceQuestionNumber: 1 }], random: always })
		.sourceQuestionNumber,
	1,
	"an answer is only called back once"
);
const full = Array.from({ length: RULES.maxPerRun }, (_unused, index) => ({ questionNumber: 3 + index * 2, sourceQuestionNumber: index + 1 }));
assert.equal(selectCallback({ history, questionNumber: 10, previous: full, random: always }), null, "callbacks are capped per run");

const authored = selectCallback({
	history: [entry(1, { moodLost: 22 }), entry(2, { moodLost: 18, callbackLine: "About the group chat. Is it real?" })],
	questionNumber: 4,
	random: always
});
assert.equal(authored.sourceQuestionNumber, 2, "authored lines outweigh a slightly worse generic answer");
assert.equal(authored.line, "About the group chat. Is it real?");
assert.equal(authored.authored, true);

const helpful = selectCallback({
	history: [entry(1, { archetype: "helpful", badness: 0, moodLost: 0 })],
	questionNumber: 3,
	random: always
});
assert.equal(helpful.archetype, "helpful", "helpful answers can be remembered too");
assert.ok(ARCHETYPE_LINES.helpful.map((line) => fillTemplate(line, "work")).includes(helpful.line));

assert.equal(
	selectCallback({ history: [entry(1, { archetype: "unknown" })], questionNumber: 3, random: always }),
	null,
	"answers with no available line are skipped"
);

const helpfulHistory = [1, 2, 3].map((n) => entry(n, { archetype: "helpful", badness: 0, moodLost: 0 }));
const firstHelpful = selectCallback({ history: helpfulHistory, questionNumber: 4, random: always });
const secondHelpful = selectCallback({ history: helpfulHistory, questionNumber: 6, previous: [firstHelpful], random: always });
assert.notEqual(secondHelpful.template, firstHelpful.template, "generic lines are not repeated while another remains");

assert.equal(
	selectCallback({ history: [entry(1, { followedUp: true })], questionNumber: 3, random: always }),
	null,
	"answers the client already pushed back on in a follow-up are not called back"
);
