const assert = require("node:assert/strict");
const career = require("./career.js");
const { CLIENTS } = require("./clients.js");

const { RULES } = career;
const roster = CLIENTS.map((client) => client.id);
const fixedNow = () => "2026-10-02T00:00:00.000Z";

function memoryStorage(seed = {}) {
	const values = new Map(Object.entries(seed));
	return { getItem: (key) => (values.has(key) ? values.get(key) : null), setItem: (key, value) => values.set(key, value) };
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

// A new career starts clean, with a full waitlist of new clients.
const start = career.newCareer({ modeId: "minefield", rosterIds: roster, random: seededRandom(1), now: fixedNow });
assert.equal(start.status, "active");
assert.equal(start.modeId, "minefield");
assert.equal(start.week, 1);
assert.equal(start.license, RULES.licenseStart);
assert.equal(start.infamy, 0);
assert.equal(start.waitlist.length, RULES.waitlistSize);
assert.equal(new Set(start.waitlist).size, RULES.waitlistSize, "waitlist clients are distinct");
start.waitlist.forEach((id) => assert.ok(roster.includes(id)));
assert.equal(career.newCareer({ modeId: "nonsense", rosterIds: roster }).modeId, "classic");

const clientId = start.waitlist[0];
assert.equal(career.startingMood(start, clientId), 100, "new clients start at full mood");
assert.equal(career.returningLine(start, clientId), "", "new clients get their own opening line");

// A finished session with violations: infamy up, license down, trust carries over.
const after = career.applySession(start, {
	clientId, completed: true, totalViolations: 2, weighted: 14, moodRemaining: 40
}, roster, seededRandom(2));
assert.equal(after.state.week, 2);
assert.equal(after.state.infamy, 14);
assert.equal(after.update.licenseLost, 2 * RULES.violationPenalty);
assert.equal(after.state.license, RULES.licenseStart - 2 * RULES.violationPenalty);
assert.equal(after.update.trust, 40 + RULES.trustRecovery);
assert.equal(career.startingMood(after.state, clientId), 40 + RULES.trustRecovery, "returning clients start at their carried trust");
assert.equal(career.returningLine(after.state, clientId), career.RETURNING_LINES.neutral);
assert.equal(after.state.sessions.length, 1);
assert.equal(after.state.sessions[0].licenseChange, -2 * RULES.violationPenalty);
assert.ok(after.state.waitlist.includes(clientId) || after.state.waitlist.some((id) => after.state.clients[id]?.visits > 0),
	"the next waitlist includes a returning client");
assert.equal(start.week, 1, "applySession must not mutate the previous state");

// A clean finished session recovers license, capped at the start value.
const clean = career.applySession(after.state, { clientId, completed: true, totalViolations: 0, weighted: 4, moodRemaining: 90 }, roster);
assert.equal(clean.update.licenseRecovered, RULES.cleanSessionRecovery);
assert.equal(clean.state.license, after.state.license + RULES.cleanSessionRecovery);
assert.equal(clean.update.trust, 100, "trust is capped at 100");
assert.equal(career.returningLine(clean.state, clientId), career.RETURNING_LINES.warm);
const capped = career.applySession(start, { clientId, completed: true, totalViolations: 0, weighted: 0, moodRemaining: 100 }, roster);
assert.equal(capped.state.license, RULES.licenseStart, "license never exceeds its starting value");

// Walkouts cost license, drop trust to the floor, and a second walkout loses the client.
const walkout = career.applySession(start, { clientId, completed: false, totalViolations: 1, weighted: 9, moodRemaining: 0 }, roster);
assert.equal(walkout.update.licenseLost, RULES.violationPenalty + RULES.walkoutPenalty);
assert.equal(walkout.update.trust, RULES.minimumTrust);
assert.equal(walkout.update.clientLeft, false);
assert.equal(career.returningLine(walkout.state, clientId), career.RETURNING_LINES.guarded);
const secondWalkout = career.applySession(walkout.state, { clientId, completed: false, totalViolations: 0, weighted: 3, moodRemaining: 5 }, roster);
assert.equal(secondWalkout.update.clientLeft, true);
assert.equal(secondWalkout.state.clients[clientId].left, true);
assert.equal(secondWalkout.state.waitlist.includes(clientId), false, "clients who left never return to the waitlist");

// Ending: license revoked.
const doomed = { ...start, license: RULES.violationPenalty };
const revoked = career.applySession(doomed, { clientId, completed: true, totalViolations: 1, weighted: 5, moodRemaining: 50 }, roster);
assert.equal(revoked.update.ended, true);
assert.equal(revoked.update.endReason, "revoked");
assert.equal(revoked.state.status, "ended");
assert.deepEqual(revoked.state.waitlist, []);

// Ending: every client gone.
const lastClient = { ...start, clients: Object.fromEntries(roster.slice(1).map((id) => [id, { visits: 2, trust: 30, walkouts: 2, left: true, lastWeek: 1 }])) };
lastClient.clients[roster[0]] = { visits: 1, trust: 30, walkouts: 1, left: false, lastWeek: 1 };
const emptied = career.applySession(lastClient, { clientId: roster[0], completed: false, totalViolations: 0, weighted: 2, moodRemaining: 0 }, roster);
assert.equal(emptied.update.endReason, "emptyPractice");

// Ending: retirement after the final week, even with a perfect record.
const finalWeek = { ...start, week: RULES.weeks };
const retired = career.applySession(finalWeek, { clientId, completed: true, totalViolations: 0, weighted: 3, moodRemaining: 80 }, roster);
assert.equal(retired.update.endReason, "retired");
assert.equal(career.endCareer(start, "quit").endReason, "quit");
assert.equal(career.endCareer(start, "made-up").endReason, "quit", "unknown endings fall back to quitting");

// A full career played by a seeded strategy always terminates in one of the endings.
for (let seed = 1; seed <= 20; seed += 1) {
	const random = seededRandom(seed);
	let state = career.newCareer({ rosterIds: roster, random });
	let guard = 0;
	while (state.status === "active" && guard < 100) {
		const pick = state.waitlist[Math.floor(random() * state.waitlist.length)];
		const violationsThisWeek = Math.floor(random() * 3);
		const completed = random() > 0.3;
		state = career.applySession(state, {
			clientId: pick,
			completed,
			totalViolations: violationsThisWeek,
			weighted: 6 + violationsThisWeek * 2,
			moodRemaining: completed ? Math.floor(random() * 80) + 11 : 0
		}, roster, random).state;
		guard += 1;
	}
	assert.equal(state.status, "ended", `seed ${seed}: the career should end`);
	assert.ok(Object.keys(career.ENDINGS).includes(state.endReason));
	assert.ok(state.sessions.length <= RULES.weeks);
}

// Persistence: round trip, best career tracking, and resilience.
const storage = memoryStorage();
assert.deepEqual(career.load(storage), career.emptyStore());
career.saveCareer(storage, after.state, fixedNow);
assert.equal(career.load(storage).current.week, 2);
assert.equal(career.load(storage).best, null, "active careers are not records yet");
career.saveCareer(storage, revoked.state, fixedNow);
assert.equal(career.load(storage).best.endReason, "revoked");
assert.equal(career.load(storage).best.infamy, revoked.state.infamy);
const weaker = career.endCareer({ ...start, infamy: 1 }, "quit");
career.saveCareer(storage, weaker, fixedNow);
assert.equal(career.load(storage).best.endReason, "revoked", "a weaker career does not replace the best");

assert.deepEqual(career.load(memoryStorage({ [career.STORAGE_KEY]: "not json" })), career.emptyStore());
assert.equal(
	career.load(memoryStorage({ [career.STORAGE_KEY]: JSON.stringify({ version: 1, current: { status: "weird", week: 1 } }) })).current,
	null,
	"malformed careers are discarded"
);
const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
assert.doesNotThrow(() => career.saveCareer(blocked, start));
assert.deepEqual(career.load(blocked), career.emptyStore());
