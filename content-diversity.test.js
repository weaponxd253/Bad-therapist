// Guards against content feeling repetitive or mechanically solvable: pool depth per
// topic, follow-up and board coverage, the "helpful answer is the longest" tell, and
// how many sessions a player gets before questions start repeating.
const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { VIOLATION_TYPES } = require("./scoring.js");
const { TOPICS, validateBoardQuestions } = require("./content-schema.js");
const { BOARD_MEMBERS, BOARD_QUESTIONS, getBoardMember, questionsForCharge } = require("./board-questions.js");
const { selectQuestionsForRun } = require("./question-selector.js");
const questionHistory = require("./question-history.js");
const { SESSION_PACKS } = require("./session-packs.js");
const { getMode } = require("./game-modes.js");

const followUps = questions.flatMap((question) =>
	question.choices.filter((choice) => choice.followUp).map((choice) => ({ question, followUp: choice.followUp }))
);

// Depth: every topic can fill several sessions, and every topic can branch.
TOPICS.forEach((topic) => {
	assert.ok(questions.filter((q) => q.topic === topic).length >= 7, `${topic} needs at least 7 questions`);
	assert.ok(followUps.filter(({ question }) => question.topic === topic).length >= 2, `${topic} needs at least 2 follow-ups`);
});

// Board hearings: valid, varied per charge, and incident references resolve.
assert.deepEqual(validateBoardQuestions(BOARD_QUESTIONS, VIOLATION_TYPES), []);
Object.keys(VIOLATION_TYPES).forEach((charge) => {
	assert.ok(questionsForCharge(charge).length >= 4, `${charge} needs at least 4 board questions`);
});
const allIds = new Set([...questions.map((q) => q.id), ...followUps.map(({ followUp }) => followUp.id)]);
BOARD_QUESTIONS.forEach((boardQuestion) => {
	assert.ok(getBoardMember(boardQuestion.speaker), `${boardQuestion.id}: unknown speaker ${boardQuestion.speaker}`);
	assert.equal(allIds.has(boardQuestion.id), false, `${boardQuestion.id} collides with a question ID`);
	boardQuestion.choices.forEach((choice) => {
		assert.match(choice.reaction, /^Board: /, `${boardQuestion.id}/${choice.id}: reactions are voiced as "Board: …"`);
	});
	(boardQuestion.relatedChoices || []).forEach((reference) => {
		const [id, choiceId] = reference.split("/");
		const source = questions.find((q) => q.id === id) || followUps.find(({ followUp }) => followUp.id === id)?.followUp;
		assert.ok(source?.choices.some((choice) => choice.id === choiceId), `${boardQuestion.id}: unresolved reference ${reference}`);
	});
});
assert.ok(BOARD_MEMBERS.every((member) => BOARD_QUESTIONS.some((q) => q.speaker === member.id)), "every board member asks something");
// Board members are named, never gendered (same rule as client personas).
BOARD_MEMBERS.forEach((member) => assert.doesNotMatch(member.style, /\b(he|she|him|her|his|hers)\b/i));

// The repair should not be findable by length alone.
function longestIsHelpfulRate(list) {
	const tells = list.filter((item) => {
		const helpful = item.choices.find((choice) => choice.badness === 0);
		return item.choices.every((choice) => choice === helpful || choice.text.length < helpful.text.length);
	}).length;
	return tells / list.length;
}
assert.ok(longestIsHelpfulRate(questions) <= 0.5, "the helpful answer is the longest in too many questions");
assert.ok(longestIsHelpfulRate(followUps.map(({ followUp }) => followUp)) <= 0.5, "the repair is the longest in too many follow-ups");
assert.ok(longestIsHelpfulRate(BOARD_QUESTIONS) <= 0.5, "the honest answer is the longest in too many board questions");

// Replay variety: simulate consecutive sessions with real replay history.
function seededRandom(seed) {
	let state = seed >>> 0;
	return () => {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
function memoryStorage() {
	const values = new Map();
	return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}
function playSessions(pack, mode, seed, sessions) {
	const storage = memoryStorage();
	const random = seededRandom(seed);
	const runs = [];
	for (let session = 0; session < sessions; session += 1) {
		const run = selectQuestionsForRun(questions, {
			count: mode.questionCount,
			minimumTopics: 6,
			maximumPerTopic: 2,
			minimumViolationCategories: mode.minimumViolationCategories,
			preferredViolationCategories: mode.preferredViolationCategories,
			preferredTopics: pack.preferredTopics,
			requiredTopics: pack.requiredTopics,
			recentQuestionWeights: questionHistory.getRecentQuestionWeights(questionHistory.load(storage))
		}, random);
		const ids = run.map((question) => question.id);
		runs.push(ids);
		questionHistory.recordRun(storage, ids);
	}
	return runs;
}

const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];
["classic", "minefield"].map(getMode).forEach((mode) => {
	SESSION_PACKS.forEach((pack) => {
		SEEDS.forEach((seed) => {
			const runs = playSessions(pack, mode, seed, 5);
			const label = `${mode.id}/${pack.id}/seed ${seed}`;
			assert.equal(new Set(runs.slice(0, 3).flat()).size, 30, `${label}: no question should repeat within 3 sessions`);
			assert.ok(new Set(runs.flat()).size >= 47, `${label}: 5 sessions should show at least 47 different questions`);
			if (pack.id === "chaos") {
				const sixRuns = playSessions(pack, mode, seed, 6);
				assert.equal(new Set(sixRuns.flat()).size, 60, `${label}: the Chaos Sampler should not repeat within 6 sessions`);
			}
		});
	});
});
