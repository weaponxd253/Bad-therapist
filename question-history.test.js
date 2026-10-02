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
["q6", "q7", "q8", "q9", "q10"].forEach((id) => historyApi.recordRun(storage, [id]));
const capped = historyApi.load(storage);
assert.equal(capped.recentRuns.length, historyApi.MAX_RECENT_RUNS);
assert.deepEqual(capped.recentRuns[0], ["q10"]);
assert.deepEqual(capped.recentRuns[5], ["q4", "q5"], "the oldest kept run is the sixth most recent");
assert.deepEqual(historyApi.getRecentQuestionWeights(capped), {
	q10: 100,
	q9: 60,
	q8: 35,
	q7: 20,
	q6: 10,
	q4: 5,
	q5: 5
});

// Histories saved under the old three-run limit still load unchanged.
const legacy = memoryStorage({
	[historyApi.STORAGE_KEY]: JSON.stringify({ version: 1, recentRuns: [["a"], ["b"], ["c"]] })
});
assert.deepEqual(historyApi.load(legacy).recentRuns, [["a"], ["b"], ["c"]]);

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