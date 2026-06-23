const assert = require("node:assert/strict");
const { GAME_MODES, getMode } = require("./game-modes.js");

assert.equal(getMode("classic"), GAME_MODES.classic);
assert.equal(getMode("speed").instantPacing, true);
assert.equal(getMode("minefield").scoringModifiers.violationPenaltyMultiplier, 1.25);
assert.ok(getMode("minefield").preferredViolationCategories.includes("coercion"));
assert.equal(getMode("unknown"), GAME_MODES.classic);
assert.equal(getMode(), GAME_MODES.classic);

console.log("Game mode tests passed.");