const assert = require("node:assert/strict");
const persistence = require("./persistence.js");

function memoryStorage(seed = {}) {
	const values = new Map(Object.entries(seed));
	return {
		getItem(key) { return values.has(key) ? values.get(key) : null; },
		setItem(key, value) { values.set(key, value); },
		values
	};
}

const legacyStorage = memoryStorage({
	[persistence.LEGACY_KEY]: JSON.stringify({ weighted: 22, score: 18, violations: 2 })
});
const migrated = persistence.load(legacyStorage);
assert.equal(migrated.version, 2);
assert.equal(migrated.records.highestChaos.weighted, 22);
assert.equal(migrated.records.bestCompleted, null);
assert.ok(legacyStorage.values.has(persistence.STORAGE_KEY));

const completedSummary = {
	weighted: 28,
	totalBadness: 24,
	totalViolations: 2,
	completed: true,
	questionsAnswered: 10,
	moodRemaining: 12,
	grade: "Ethics Committee Summoned"
};
const updated = persistence.update(legacyStorage, completedSummary);
assert.equal(updated.records.highestChaos.weighted, 28);
assert.equal(updated.records.bestCompleted.weighted, 28);

const earlySummary = {
	...completedSummary,
	weighted: 31,
	totalBadness: 27,
	completed: false,
	questionsAnswered: 7,
	moodRemaining: 7
};
const afterEarly = persistence.update(legacyStorage, earlySummary);
assert.equal(afterEarly.records.highestChaos.weighted, 31);
assert.equal(afterEarly.records.bestCompleted.weighted, 28);

const malformed = persistence.load(memoryStorage({
	[persistence.STORAGE_KEY]: "not json",
	[persistence.LEGACY_KEY]: JSON.stringify({ nope: true })
}));
assert.deepEqual(malformed, persistence.emptyRecords());

const blockedStorage = {
	getItem() { throw new Error("blocked"); },
	setItem() { throw new Error("blocked"); }
};
assert.doesNotThrow(() => persistence.load(blockedStorage));
assert.doesNotThrow(() => persistence.update(blockedStorage, completedSummary));
assert.equal(persistence.save(blockedStorage, persistence.emptyRecords()), false);

console.log("Persistence tests passed.");