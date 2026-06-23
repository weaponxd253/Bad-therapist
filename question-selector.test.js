const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { selectQuestionsForRun } = require("./question-selector.js");

function seededRandom(seed) {
	let state = seed >>> 0;
	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 4294967296;
	};
}

function runMetrics(run) {
	const topics = new Set(run.map((question) => question.topic));
	const topicCounts = new Map();
	const violations = new Set();
	run.forEach((question) => {
		topicCounts.set(question.topic, (topicCounts.get(question.topic) || 0) + 1);
		question.choices.forEach((choice) => {
			if (choice.violation) violations.add(choice.violation);
		});
	});
	return { topics, topicCounts, violations };
}

const sourceSnapshot = JSON.stringify(questions);
for (let seed = 1; seed <= 100; seed += 1) {
	const run = selectQuestionsForRun(questions, {
		count: 10,
		minimumTopics: 6,
		maximumPerTopic: 2,
		minimumViolationCategories: 3
	}, seededRandom(seed));
	const metrics = runMetrics(run);
	assert.equal(run.length, 10);
	assert.equal(new Set(run.map((question) => question.id)).size, 10);
	assert.ok(metrics.topics.size >= 6, `seed ${seed} should include at least six topics`);
	assert.ok([...metrics.topicCounts.values()].every((count) => count <= 2));
	assert.ok(metrics.violations.size >= 3, `seed ${seed} should include at least three categories`);
	assert.ok(run.every((question) => question.choices.length === 4));
}
assert.equal(JSON.stringify(questions), sourceSnapshot, "selection must not mutate source content");

const first = selectQuestionsForRun(questions, {}, seededRandom(42));
const second = selectQuestionsForRun(questions, {}, seededRandom(42));
assert.deepEqual(first, second, "seeded selection should be deterministic");

const replayFirst = selectQuestionsForRun(questions, {}, seededRandom(1001));
const firstWeights = Object.fromEntries(replayFirst.map((question) => [question.id, 100]));
const replaySecond = selectQuestionsForRun(
	questions,
	{ recentQuestionWeights: firstWeights },
	seededRandom(1002)
);
const firstIds = new Set(replayFirst.map((question) => question.id));
assert.equal(
	replaySecond.filter((question) => firstIds.has(question.id)).length,
	0,
	"the second run should avoid the first when enough unseen content exists"
);

const secondIds = new Set(replaySecond.map((question) => question.id));
const thirdWeights = {
	...Object.fromEntries(replayFirst.map((question) => [question.id, 35])),
	...Object.fromEntries(replaySecond.map((question) => [question.id, 100]))
};
const replayThird = selectQuestionsForRun(
	questions,
	{ recentQuestionWeights: thirdWeights },
	seededRandom(1003)
);
assert.equal(
	replayThird.filter((question) => secondIds.has(question.id)).length,
	0,
	"the third run should prefer older questions before the immediately previous run"
);
assert.ok(
	new Set([...replayFirst, ...replaySecond, ...replayThird].map((question) => question.id)).size >= 27,
	"the first three runs should cover nearly the full pool"
);
const replayMetrics = runMetrics(replayThird);
assert.ok(replayMetrics.topics.size >= 6);
assert.ok(replayMetrics.violations.size >= 3);

const weightedA = selectQuestionsForRun(
	questions,
	{ recentQuestionWeights: thirdWeights },
	seededRandom(77)
);
const weightedB = selectQuestionsForRun(
	questions,
	{ recentQuestionWeights: thirdWeights },
	seededRandom(77)
);
assert.deepEqual(weightedA, weightedB, "weighted seeded selection should remain deterministic");

const minefieldRun = selectQuestionsForRun(
	questions,
	{
		minimumViolationCategories: 4,
		preferredViolationCategories: ["judgment", "coercion", "harmfulAdvice"]
	},
	seededRandom(909)
);
const minefieldCategories = new Set(
	minefieldRun.flatMap((question) => question.choices.map((choice) => choice.violation).filter(Boolean))
);
assert.ok(minefieldCategories.size >= 4);
assert.ok(["judgment", "coercion", "harmfulAdvice"].every((category) => minefieldCategories.has(category)));

const smallPool = questions.slice(0, 4);
const smallRun = selectQuestionsForRun(smallPool, { count: 10 }, seededRandom(7));
assert.equal(smallRun.length, 4);
assert.equal(new Set(smallRun.map((question) => question.id)).size, 4);

console.log("Question selector tests passed.");