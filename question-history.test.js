const assert = require("node:assert/strict");
const historyApi = require("./question-history.js");

function memoryStorage(seed = {}) {
	const values = new Map(Object.entries(seed));
	return {
		getItem(key) { return values.has(key) ? values.get(key) : null; },
		setItem(key, value) { values.set(key, value); },
		values
	};
}

const storage = memoryStorage();
const firstIds = ["q1", "q2", "q3"];
const firstSnapshot = JSON.stringify(firstIds);
historyApi.recordRun(storage, firstIds);
assert.equal(JSON.stringify(firstIds), firstSnapshot, "recording must not mutate IDs");
assert.deepEqual(historyApi.load(storage).recentRuns, [firstIds]);

historyApi.recordRun(storage, ["q4", "q5"]);
historyApi.recordRun(storage, ["q6"]);
historyApi.recordRun(storage, ["q7"]);
const capped = historyApi.load(storage);
assert.equal(capped.recentRuns.length, 3);
assert.deepEqual(capped.recentRuns[0], ["q7"]);
assert.deepEqual(capped.recentRuns[2], ["q4", "q5"]);
assert.deepEqual(historyApi.getRecentQuestionWeights(capped), {
	q7: 100,
	q6: 35,
	q4: 10,
	q5: 10
});

const malformed = memoryStorage({ [historyApi.STORAGE_KEY]: "not json" });
assert.deepEqual(historyApi.load(malformed), historyApi.emptyHistory());
const invalidShape = memoryStorage({
	[historyApi.STORAGE_KEY]: JSON.stringify({ version: 99, recentRuns: "wrong" })
});
assert.deepEqual(historyApi.load(invalidShape), historyApi.emptyHistory());

const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
assert.doesNotThrow(() => historyApi.load(blocked));
assert.doesNotThrow(() => historyApi.recordRun(blocked, ["q1"]));
assert.equal(historyApi.save(blocked, historyApi.emptyHistory()), false);

console.log("Question history tests passed.");