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

const smallPool = questions.slice(0, 4);
const smallRun = selectQuestionsForRun(smallPool, { count: 10 }, seededRandom(7));
assert.equal(smallRun.length, 4);
assert.equal(new Set(smallRun.map((question) => question.id)).size, 4);

console.log("Question selector tests passed.");