const { test } = require("node:test");
const assert = require("node:assert/strict");
const Data = require("./character-data.js");

test("saved characters recover from invalid or stale data", () => {
	assert.deepEqual(Data.normalize(null), Data.defaults);
	assert.deepEqual(Data.normalize({ body: "removed", look: 80, portrait: 99, name: "   " }), Data.defaults);
	const value = Data.normalize({ body: "teal", look: 8, portrait: 1, name: "A".repeat(50) });
	assert.equal(value.look, 0);
	assert.equal(value.portrait, 15);
	assert.equal(value.name.length, 28);
});
test("animation availability never substitutes another character or standing variant", () => {
	assert.equal(Data.canAnimate(Data.defaults), true);
	assert.equal(Data.canAnimate({ body: "cardigan", look: 5 }), false);
	assert.equal(Data.canAnimate({ body: "missing", look: 0 }), false);
	for (const body of Data.bodies) {
		assert.equal(Data.canAnimate({ body: body.id, look: 0 }), true);
		for (const key of [body.walking, body.seated, body.emotions].filter(Boolean)) assert.ok(Data.sheets[key]);
		assert.ok(body.portraits.every(index => index >= 0 && index < 18));
	}
});
test("session visuals select speaking, note-taking and idle rows within supplied grids", () => {
	for (const phase of ["idle", "presenting", "choosing", "responding", "round-complete", "results"]) {
		for (let frame = 0; frame < 4; frame++) {
			const visual = Data.sessionFrames(phase, frame);
			assert.ok(visual.seated >= 0 && visual.seated < 16);
			assert.ok(visual.emotion >= 0 && visual.emotion < Data.emotionNames.length);
		}
	}
	assert.equal(Data.sessionFrames("responding", 0).seated, 4);
	assert.equal(Data.sessionFrames("round-complete", 0).seated, 8);
	assert.equal(Data.sessionFrames("results", 0).seated, 12);
});
test("every registered sheet exists and has enough pixels for its grid", () => {
	const fs = require("node:fs"), path = require("node:path");
	for (const sheet of Object.values(Data.sheets)) {
		const bytes = fs.readFileSync(path.join(__dirname, "assets", sheet.file));
		assert.equal(bytes.toString("ascii", 1, 4), "PNG");
		assert.ok(bytes.readUInt32BE(16) >= sheet.columns);
		assert.ok(bytes.readUInt32BE(20) >= sheet.rows);
	}
});
test("room spawns and doorways are reachable without walking through furniture", () => {
	for (const room of Object.values(Data.rooms)) {
		assert.ok(Data.walkable(room, ...room.spawn));
		const [a,b,c,d] = room.exit;
		assert.ok(Data.walkable(room, (a+c)/2, (b+d)/2));
		assert.equal(Data.walkable(room, -10, 900), false);
		const [left,top,right,bottom] = room.obstacles[0];
		assert.equal(Data.walkable(room, (left+right)/2, (top+bottom)/2), false);
	}
});
