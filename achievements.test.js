const assert = require("node:assert/strict");
const achievements = require("./achievements.js");

function memoryStorage(seed = {}) {
	const values = new Map(Object.entries(seed));
	return {
		getItem(key) { return values.has(key) ? values.get(key) : null; },
		setItem(key, value) { values.set(key, value); },
		values
	};
}

function summary(overrides = {}) {
	return {
		completed: true,
		modeId: "classic",
		totalViolations: 0,
		violationCountsByType: {},
		questionsAnswered: 10,
		badnessThreeCount: 0,
		helpfulCount: 0,
		moodRemaining: 50,
		...overrides
	};
}

const sourceSummary = summary({ violationCountsByType: { confidentiality: 1 } });
const sourceSnapshot = JSON.stringify(sourceSummary);
achievements.evaluateRun(memoryStorage(), sourceSummary);
assert.equal(JSON.stringify(sourceSummary), sourceSnapshot, "achievement evaluation must not mutate summaries");

const storage = memoryStorage();
const ethical = achievements.evaluateRun(storage, summary({ helpfulCount: 10 }), () => "2026-01-01T00:00:00.000Z");
assert.deepEqual(ethical.newUnlocks.map((item) => item.id).sort(), ["accidentallyEthical", "cleanSweep"]);
const repeated = achievements.evaluateRun(storage, summary({ helpfulCount: 10 }));
assert.deepEqual(repeated.newUnlocks, [], "achievements unlock only once");

const hatTrick = achievements.evaluateRun(storage, summary({
	totalViolations: 3,
	violationCountsByType: { confidentiality: 3 }
}));
assert.ok(hatTrick.newUnlocks.some((item) => item.id === "confidentialityHatTrick"));

for (const type of ["boundaries", "judgment", "coercion", "harmfulAdvice"]) {
	achievements.evaluateRun(storage, summary({
		totalViolations: 1,
		violationCountsByType: { [type]: 1 }
	}));
}
const state = achievements.load(storage);
assert.ok(state.unlocked.categoryCollector);
assert.equal(state.categoryProgress.length, 5);

const multi = achievements.evaluateRun(memoryStorage(), summary({
	modeId: "minefield",
	badnessThreeCount: 10,
	moodRemaining: 10,
	totalViolations: 1,
	violationCountsByType: { coercion: 1 }
}));
assert.deepEqual(
	multi.newUnlocks.map((item) => item.id).sort(),
	["lastNerve", "maximumMenace", "mineSweeper"]
);

const walkout = achievements.evaluateRun(memoryStorage(), summary({
	completed: false,
	questionsAnswered: 4,
	moodRemaining: 0
}));
assert.ok(walkout.newUnlocks.some((item) => item.id === "walkoutSpeedrun"));

const malformed = achievements.load(memoryStorage({ [achievements.STORAGE_KEY]: "bad json" }));
assert.deepEqual(malformed, achievements.emptyState());
const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
assert.doesNotThrow(() => achievements.evaluateRun(blocked, summary()));
assert.equal(achievements.save(blocked, achievements.emptyState()), false);

console.log("Achievement tests passed.");