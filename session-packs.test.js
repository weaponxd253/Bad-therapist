const assert = require("node:assert/strict");
const questions = require("./questions.js");
const { DEFAULT_PACK_ID, SESSION_PACKS, getPack } = require("./session-packs.js");

const topics = new Set(questions.map((question) => question.topic));
const ids = new Set();

assert.equal(DEFAULT_PACK_ID, "chaos");
assert.ok(SESSION_PACKS.length >= 5, "phase 7D should expose several themed session packs");
assert.equal(getPack("missing").id, DEFAULT_PACK_ID, "unknown pack IDs should fall back to the default pack");
assert.ok(Object.isFrozen(SESSION_PACKS), "pack registry should be immutable");

SESSION_PACKS.forEach((pack) => {
	assert.ok(pack.id, "pack needs an id");
	assert.ok(pack.label, `${pack.id} needs a label`);
	assert.ok(pack.description, `${pack.id} needs a description`);
	assert.ok(pack.intro, `${pack.id} needs intro copy`);
	assert.ok(pack.outro, `${pack.id} needs result outro copy`);
	assert.ok(Array.isArray(pack.preferredTopics), `${pack.id} preferredTopics must be an array`);
	assert.ok(Array.isArray(pack.requiredTopics), `${pack.id} requiredTopics must be an array`);
	assert.equal(ids.has(pack.id), false, `duplicate pack id: ${pack.id}`);
	ids.add(pack.id);

	[...pack.preferredTopics, ...pack.requiredTopics].forEach((topic) => {
		assert.ok(topics.has(topic), `${pack.id} references unknown topic: ${topic}`);
	});
});

console.log("Session pack tests passed.");