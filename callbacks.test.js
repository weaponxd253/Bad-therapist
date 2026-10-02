const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { RESPONSE_ARCHETYPES, TOPICS } = require("./content-schema.js");
const { RULES, TOPIC_PHRASES, ARCHETYPE_LINES, PAST_ARCHETYPE_LINES, fillTemplate, pickMemories, selectCallback, selectOpeningRecall } = require("./callbacks.js");

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

// --- Memory across visits ---
RESPONSE_ARCHETYPES.forEach((archetype) => {
	assert.ok(PAST_ARCHETYPE_LINES[archetype]?.length >= 2, `${archetype} needs at least two last-visit lines`);
});
questions.flatMap((question) => question.choices).forEach((choice) => {
	if (choice.callback) {
		assert.doesNotMatch(choice.callback, /\b(this week|this weekend|since you said|since last)\b/i,
			`in-session callback describes time passing; move it to recall: ${choice.callback}`);
	}
});

const sessionHistory = [
	entry(1, { questionId: "q-a", archetype: "helpful", badness: 0, moodLost: 0 }),
	entry(2, { questionId: "q-b", moodLost: 25, callbackLine: "You said that earlier and I hated it." }),
	entry(3, { questionId: "q-c", moodLost: 18, recallLine: "I did not take your advice. Everyone is fine." }),
	entry(4, { questionId: "q-d", moodLost: 30, isFollowUp: true })
];
const memories = pickMemories(sessionHistory);
assert.equal(memories.length, RULES.memoriesPerVisit);
assert.deepEqual(memories.map((memory) => memory.questionId), ["q-b", "q-c"], "the most memorable answers are kept, follow-ups skipped");
assert.equal(memories[0].recallLine, "", "same-session wording like ‘earlier’ is not carried into later visits");
assert.equal(memories[1].recallLine, "I did not take your advice. Everyone is fine.", "authored recall lines are kept");
assert.equal(pickMemories([entry(1, { callbackLine: "I’m not doing that. Just so we’re clear." })])[0].recallLine,
	"I’m not doing that. Just so we’re clear.", "stance lines that work in any session can be recalled");

const pastMemories = memories.map((memory) => ({ ...memory, week: 2 }));
const opening = selectOpeningRecall({ memories: pastMemories, random: always });
assert.equal(opening.fromWeek, 2);
assert.equal(opening.sourceQuestionNumber, null);
assert.equal(opening.line, "I did not take your advice. Everyone is fine.");
assert.equal(selectOpeningRecall({ memories: [], random: always }), null, "new clients have nothing to recall");
// Once stored, q-b (25 mood, no carried line) scores below q-c (18 mood + authored recall bonus).
const generic = selectOpeningRecall({ memories: [pastMemories[0]], random: always });
assert.ok(PAST_ARCHETYPE_LINES.chaosAdvice.map((line) => fillTemplate(line, "work")).includes(generic.line),
	"without an authored recall line, a last-visit template is used");

const pastPick = selectCallback({ history: [], memories: pastMemories, questionNumber: 3, random: always });
assert.equal(pastPick.fromWeek, 2, "mid-session callbacks can reach back to previous visits");
assert.equal(
	selectCallback({ history: [], memories: pastMemories, questionNumber: 3, previous: [opening], random: always }).sourceKey === opening.sourceKey,
	false,
	"a memory used in the greeting is not repeated mid-session"
);
const freshBeatsStale = selectCallback({
	history: [entry(1, { moodLost: 30 })],
	memories: [{ ...pastMemories[1], moodLost: 30, recallLine: "" }],
	questionNumber: 3,
	random: always
});
assert.equal(freshBeatsStale.fromWeek, null, "this session's answers outweigh equally memorable older ones");
