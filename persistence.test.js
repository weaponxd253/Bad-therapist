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

const v2Storage = memoryStorage({
	[persistence.PREVIOUS_KEY]: JSON.stringify({
		version: 2,
		records: {
			highestChaos: { weighted: 22, score: 18, violations: 2 },
			bestCompleted: { weighted: 20, score: 16, violations: 2, completed: true }
		}
	})
});
const migratedV2 = persistence.load(v2Storage);
assert.equal(migratedV2.version, 3);
assert.equal(migratedV2.recordsByMode.classic.highestChaos.weighted, 22);
assert.equal(migratedV2.recordsByMode.classic.bestCompleted.weighted, 20);
assert.equal(migratedV2.recordsByMode.speed.highestChaos, null);
assert.ok(v2Storage.values.has(persistence.STORAGE_KEY));

const legacyStorage = memoryStorage({
	[persistence.LEGACY_KEY]: JSON.stringify({ weighted: 19, score: 17, violations: 1 })
});
const migratedLegacy = persistence.load(legacyStorage);
assert.equal(migratedLegacy.recordsByMode.classic.highestChaos.weighted, 19);
assert.equal(migratedLegacy.recordsByMode.classic.bestCompleted, null);

const summary = (modeId, weighted, completed = true, style = null) => ({
	modeId,
	modeLabel: modeId === "speed" ? "Speed Session" : modeId === "minefield" ? "Ethics Minefield" : "Classic",
	weighted,
	totalBadness: weighted - 2,
	totalViolations: 1,
	completed,
	questionsAnswered: completed ? 10 : 6,
	moodRemaining: completed ? 20 : 8,
	grade: "Questionable Vibes",
	dominantStyle: style,
	archetypeBreakdown: style ? [{ archetype: style.archetype, label: style.label, count: style.count }] : []
});
const storage = memoryStorage();
persistence.update(storage, summary("classic", 24, true, { archetype: "boundaryCross", label: "Boundary Blender", count: 4 }));
persistence.update(storage, summary("speed", 30));
persistence.update(storage, summary("minefield", 35, false));
const separated = persistence.load(storage);
assert.equal(separated.recordsByMode.classic.highestChaos.weighted, 24);
assert.equal(separated.recordsByMode.speed.highestChaos.weighted, 30);
assert.equal(separated.recordsByMode.minefield.highestChaos.weighted, 35);
assert.equal(separated.recordsByMode.minefield.bestCompleted, null);
assert.equal(separated.lastStyleSummary.dominantArchetype, "boundaryCross");
assert.equal(separated.lastStyleSummary.dominantLabel, "Boundary Blender");
assert.equal(separated.lastStyleSummary.dominantCount, 4);

const malformed = persistence.load(memoryStorage({ [persistence.STORAGE_KEY]: "not json" }));
assert.deepEqual(malformed, persistence.emptyRecords());
const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
assert.doesNotThrow(() => persistence.load(blocked));
assert.doesNotThrow(() => persistence.update(blocked, summary("classic", 10)));
assert.equal(persistence.save(blocked, persistence.emptyRecords()), false);

console.log("Persistence tests passed.");