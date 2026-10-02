// Every achievement must be unlockable by actual play: real question content,
// real scoring, real early-ending rules. Hand-built summaries can describe runs
// the game can never produce, so these tests drive the scoring engine instead.
const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { SCORING, calculateChoiceOutcome } = require("./scoring.js");
const { selectQuestionsForRun } = require("./question-selector.js");
const { getMode } = require("./game-modes.js");
const achievements = require("./achievements.js");
const { shouldFollowUp, buildFollowUpQuestion, insertFollowUp } = require("./follow-ups.js");

function memoryStorage() {
	const values = new Map();
	return {
		getItem(key) { return values.has(key) ? values.get(key) : null; },
		setItem(key, value) { values.set(key, value); }
	};
}

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

function runQuestions(mode, seed) {
	return selectQuestionsForRun(
		questions,
		{
			count: mode.questionCount,
			minimumTopics: 6,
			maximumPerTopic: 2,
			minimumViolationCategories: mode.minimumViolationCategories,
			preferredViolationCategories: mode.preferredViolationCategories
		},
		seededRandom(seed)
	);
}

function outcomeFor(choice, mood, mode) {
	return calculateChoiceOutcome({ choice, currentMood: mood, modifiers: mode.scoringModifiers });
}

// Plays a run, asking `pick` for a choice at each question, and stops on early ending.
// Follow-ups are inserted exactly as the game does, so strategies face them too.
function playRun(mode, initialQs, pick) {
	let runQs = initialQs;
	let mood = 100;
	let followUps = 0;
	const history = [];
	for (let index = 0; index < runQs.length; index += 1) {
		const question = runQs[index];
		const choice = pick(question, mood, index);
		const outcome = outcomeFor(choice, mood, mode);
		mood = outcome.moodRemaining;
		history.push({ choice, outcome });
		if (outcome.sessionWillEnd) break;
		if (shouldFollowUp({ questions: runQs, index, choice, outcome, followUpsSoFar: followUps })) {
			runQs = insertFollowUp(runQs, index, buildFollowUpQuestion(question, choice, () => 0));
			followUps += 1;
		}
	}
	return summarize(mode, runQs, history);
}

function summarize(mode, runQs, history) {
	const violationCountsByType = {};
	history.forEach(({ outcome }) => {
		if (outcome.violation) {
			violationCountsByType[outcome.violation.type] =
				(violationCountsByType[outcome.violation.type] || 0) + 1;
		}
	});
	const last = history[history.length - 1];
	return {
		completed: history.length === runQs.length && !last.outcome.sessionWillEnd,
		modeId: mode.id,
		totalViolations: Object.values(violationCountsByType).reduce((sum, n) => sum + n, 0),
		violationCountsByType,
		questionsAnswered: history.length,
		badnessThreeCount: history.filter(({ choice }) => choice.badness === 3).length,
		helpfulCount: history.filter(({ choice }) => choice.badness === 0).length,
		moodRemaining: last ? last.outcome.moodRemaining : 100
	};
}

function cheapest(choices, mood, mode) {
	return choices.reduce((best, choice) =>
		outcomeFor(choice, mood, mode).moodLost < outcomeFor(best, mood, mode).moodLost ? choice : best
	);
}

const helpful = (question) => question.choices.find((choice) => choice.badness === 0);

// Finds choices that complete the run with mood inside [low, high], via DP over mood values.
// Only non-branching choices are searched, so the question list stays fixed.
function playToMoodRange(mode, runQs, low, high) {
	let frontier = new Map([[100, []]]);
	for (const question of runQs) {
		const nextFrontier = new Map();
		frontier.forEach((path, mood) => {
			question.choices.filter((choice) => !choice.followUp).forEach((choice) => {
				const outcome = outcomeFor(choice, mood, mode);
				if (outcome.sessionWillEnd || nextFrontier.has(outcome.moodRemaining)) return;
				nextFrontier.set(outcome.moodRemaining, [...path, choice]);
			});
		});
		frontier = nextFrontier;
	}
	const hit = [...frontier.entries()].find(([mood]) => mood >= low && mood <= high);
	if (!hit) return null;
	const picks = hit[1];
	return playRun(mode, runQs, (_question, _mood, index) => picks[index]);
}

const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];
const classic = getMode("classic");

// For each achievement, a strategy that tries to earn it on a given seeded run.
// The shared category-collector state is built across runs below.
const strategies = {
	accidentallyEthical: (mode, runQs) => playRun(mode, runQs, helpful),
	cleanSweep: (mode, runQs) => playRun(mode, runQs, helpful),
	mineSweeper: (_mode, _runQs, seed) => {
		const minefield = getMode("minefield");
		return playRun(minefield, runQuestions(minefield, seed), helpful);
	},
	confidentialityHatTrick: (mode, runQs) =>
		playRun(mode, runQs, (question, mood) => {
			const leaks = question.choices.filter((choice) => choice.violation === "confidentiality");
			return leaks.length ? cheapest(leaks, mood, mode) : helpful(question);
		}),
	maximumMenace: (mode, runQs) =>
		playRun(mode, runQs, (question, mood) =>
			cheapest(question.choices.filter((choice) => choice.badness === 3), mood, mode)
		),
	walkoutSpeedrun: (mode, runQs) =>
		playRun(mode, runQs, (question, mood) =>
			question.choices.reduce((worst, choice) =>
				outcomeFor(choice, mood, mode).moodLost > outcomeFor(worst, mood, mode).moodLost ? choice : worst
			)
		),
	lastNerve: (mode, runQs) => playToMoodRange(mode, runQs, SCORING.earlyEndMood + 1, 15)
};

const byId = Object.fromEntries(achievements.ACHIEVEMENTS.map((item) => [item.id, item]));
const covered = new Set(Object.keys(strategies).concat("categoryCollector"));
assert.deepEqual(
	[...covered].sort(),
	Object.keys(byId).sort(),
	"every achievement needs a reachability strategy"
);

Object.entries(strategies).forEach(([id, strategy]) => {
	const unlocked = SEEDS.some((seed) => {
		const summary = strategy(classic, runQuestions(classic, seed), seed);
		return summary && byId[id].evaluate(summary, achievements.emptyState());
	});
	assert.ok(unlocked, `${id} is not reachable with real question content and scoring`);
});

// Category Collector: across several sessions, commit one violation of each category.
const storage = memoryStorage();
achievements.ALL_VIOLATION_TYPES.forEach((type) => {
	const unlockedType = SEEDS.some((seed) => {
		const summary = playRun(classic, runQuestions(classic, seed), (question, mood) => {
			const matching = question.choices.filter((choice) => choice.violation === type);
			return matching.length ? cheapest(matching, mood, classic) : helpful(question);
		});
		if (!summary.violationCountsByType[type]) return false;
		achievements.evaluateRun(storage, summary);
		return true;
	});
	assert.ok(unlockedType, `no run produced a ${type} violation`);
});
assert.ok(achievements.load(storage).unlocked.categoryCollector, "categoryCollector is not reachable");

