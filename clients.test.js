const assert = require("node:assert/strict");
const { CLIENTS, getClient, getClientsForPack, pickClient } = require("./clients.js");
const { SESSION_PACKS } = require("./session-packs.js");

const packIds = SESSION_PACKS.map((pack) => pack.id);
const ids = CLIENTS.map((client) => client.id);
assert.equal(new Set(ids).size, ids.length, "client IDs must be unique");

const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
CLIENTS.forEach((client) => {
	["id", "name", "avatar", "backstory", "opening", "walkout", "closing"].forEach((field) => {
		assert.ok(nonEmpty(client[field]), `${client.id}.${field} must be a non-empty string`);
	});
	assert.ok(client.packIds.length > 0, `${client.id} must belong to a pack`);
	client.packIds.forEach((packId) => assert.ok(packIds.includes(packId), `${client.id}: unknown pack ${packId}`));
	// Persona copy refers to clients by name, never by guessed pronouns.
	const copy = [client.backstory, client.opening, client.walkout, client.closing].join(" ");
	assert.doesNotMatch(copy, /\b(he|she|him|her|his|hers|himself|herself)\b/i, `${client.id} copy must not use gendered pronouns`);
});

SESSION_PACKS.filter((pack) => pack.id !== "chaos").forEach((pack) => {
	assert.ok(getClientsForPack(pack.id).length >= 2, `${pack.id} needs at least two clients for replay variety`);
});
assert.equal(getClientsForPack("chaos").length, CLIENTS.length, "the Chaos Sampler draws from the full roster");

assert.equal(getClient("priya").name, "Priya");
assert.equal(getClient("missing"), null);

const workplace = getClientsForPack("workplace").map((client) => client.id);
assert.ok(workplace.includes(pickClient("workplace", () => 0).id));
assert.ok(workplace.includes(pickClient("workplace", () => 0.999).id));
for (let step = 0; step < 10; step += 1) {
	const random = () => step / 10;
	assert.notEqual(pickClient("workplace", random, "priya").id, "priya", "the previous client is skipped when possible");
}
