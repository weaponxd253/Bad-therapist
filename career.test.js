const assert = require("node:assert/strict");
const career = require("./career.js");
const { CLIENTS } = require("./clients.js");
const { BOARD_QUESTIONS } = require("./board-questions.js");

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
		guard += 1;
		if (state.pendingHearing) {
			const hearingQuestions = career.selectHearingQuestions(state, BOARD_QUESTIONS, random);
			state = career.applyHearing(state, {
				completed: true,
				weighted: 4,
				questionIds: hearingQuestions.map((question) => question.id),
				answers: hearingQuestions.map(() => (random() > 0.5 ? { badness: 0 } : { badness: 3, violation: "judgment" }))
			}, roster, random).state;
			continue;
		}
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
	}
	assert.equal(state.status, "ended", `seed ${seed}: the career should end`);
	assert.ok(state.hearings.length <= RULES.hearingThresholds.length, "at most one hearing per threshold");
	assert.ok(Object.keys(career.ENDINGS).includes(state.endReason));
	assert.ok(state.sessions.length + state.hearings.length <= RULES.weeks, "hearings take up weeks");
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

// Memories: stamped with the visit's week, newest first, capped, and saved.
const remembered = career.applySession(start, {
	clientId, completed: true, totalViolations: 0, weighted: 3, moodRemaining: 80,
	memories: [{ questionId: "q1", archetype: "helpful", topic: "work", response: "Kind thing", badness: 0, moodLost: 0, recallLine: "" }]
}, roster);
assert.deepEqual(career.clientMemories(remembered.state, clientId).map((memory) => [memory.week, memory.questionId]), [[1, "q1"]]);
let stacked = remembered.state;
for (let visit = 0; visit < 4; visit += 1) {
	stacked = career.applySession(stacked, {
		clientId, completed: true, totalViolations: 0, weighted: 1, moodRemaining: 80,
		memories: [{ questionId: `later-${visit}`, archetype: "dismissive", topic: "work", badness: 2, moodLost: 10 }]
	}, roster).state;
}
const kept = career.clientMemories(stacked, clientId);
assert.equal(kept.length, RULES.memoryLimit, "memories are capped per client");
assert.equal(kept[0].questionId, "later-3", "the newest memory comes first");
assert.equal(kept.some((memory) => memory.questionId === "q1"), false, "the oldest memory is dropped first");
assert.deepEqual(career.clientMemories(start, "nobody"), []);
const memoryStore = memoryStorage();
career.saveCareer(memoryStore, stacked, fixedNow);
assert.deepEqual(career.clientMemories(career.load(memoryStore).current, clientId), kept, "memories survive saving");
const junk = memoryStorage({ [career.STORAGE_KEY]: JSON.stringify({ version: 1, current: { ...stacked, clients: { [clientId]: { visits: 1, memories: ["junk", { archetype: 5 }] } } } }) });
assert.deepEqual(career.clientMemories(career.load(junk).current, clientId), [], "malformed memories are discarded");

// Greetings match what the client brings up.
const warmState = clean.state;
assert.equal(career.returningLine(warmState, clientId), career.RETURNING_LINES.warm);
assert.equal(career.returningGreeting(warmState, clientId, { archetype: "helpful" }), career.RETURNING_LINES.warm);
assert.equal(career.returningGreeting(warmState, clientId, { archetype: "boundaryCross" }), career.RETURNING_LINES.neutral,
	"a warm greeting never introduces a memory of a bad answer");
assert.equal(career.returningGreeting(warmState, clientId, null), career.RETURNING_LINES.warm);
assert.equal(career.returningGreeting(walkout.state, clientId, { archetype: "helpful" }), career.RETURNING_LINES.guarded,
	"low trust stays guarded even when recalling something kind");

// --- Board hearings ---
const hearingStart = career.newCareer({ rosterIds: roster, random: seededRandom(5) });
const hearingClient = hearingStart.waitlist[0];
assert.equal(hearingStart.pendingHearing, null);
// 100 → 64: crosses 70, so a hearing is called; violations and incidents are tracked.
const summoned = career.applySession(hearingStart, {
	clientId: hearingClient, completed: true, totalViolations: 6, weighted: 30, moodRemaining: 40,
	violationCountsByType: { confidentiality: 4, boundaries: 2 },
	incidents: ["unclear-values/record-session", "night-anxiety/group-chat"]
}, roster, seededRandom(6));
assert.equal(summoned.update.hearingCalled, true);
assert.deepEqual(summoned.state.pendingHearing, { charge: "confidentiality", threshold: 70, calledWeek: 1 },
	"the hearing focuses on the most frequent violation");
assert.deepEqual(summoned.state.violationCounts, { confidentiality: 4, boundaries: 2 });
assert.deepEqual(summoned.state.hearingThresholdsCrossed, [70]);
assert.ok(summoned.state.incidents.includes("unclear-values/record-session"));

const panel = career.selectHearingQuestions(summoned.state, BOARD_QUESTIONS, seededRandom(7));
assert.equal(panel.length, RULES.hearingLength);
assert.equal(new Set(panel.map((question) => question.id)).size, RULES.hearingLength);
const incidentQuestions = panel.filter((question) => (question.relatedChoices || []).some((key) => summoned.state.incidents.includes(key)));
assert.deepEqual(incidentQuestions.map((question) => question.id).sort(),
	["board-confidentiality-group-chat", "board-confidentiality-recording"],
	"board questions about incidents the player actually committed come first");
assert.equal(panel.filter((question) => question.charge === "confidentiality").length, 3, "the rest follow the charge");

// An all-accountable hearing clears the therapist and recovers license.
const cleared = career.applyHearing(summoned.state, {
	completed: true, weighted: 0, questionIds: panel.map((question) => question.id),
	answers: [{ badness: 0 }, { badness: 0 }, { badness: 0 }]
}, roster, seededRandom(8));
assert.equal(cleared.update.verdict, "cleared");
assert.equal(cleared.update.licenseChange, 3 * RULES.accountableReward);
assert.equal(cleared.state.license, summoned.state.license + 3 * RULES.accountableReward);
assert.equal(cleared.state.week, summoned.state.week + 1, "a hearing takes up a week");
assert.equal(cleared.state.pendingHearing, null);
assert.equal(cleared.state.hearings.length, 1);
assert.equal(cleared.state.hearings[0].charge, "confidentiality");
assert.equal(cleared.state.waitlist.length, RULES.waitlistSize, "clients return after the hearing");
const nextPanel = career.selectHearingQuestions({ ...cleared.state, pendingHearing: { charge: "confidentiality" } }, BOARD_QUESTIONS, seededRandom(9));
assert.equal(nextPanel.some((question) => cleared.state.usedBoardQuestionIds.includes(question.id)), false,
	"board questions never repeat within a career");

// Mixed answers: a warning. Fresh violations: sanctioned.
const warned = career.applyHearing(summoned.state, { completed: true, weighted: 4, answers: [{ badness: 0 }, { badness: 1 }, { badness: 0 }] }, roster);
assert.equal(warned.update.verdict, "warning");
assert.equal(warned.update.licenseChange, 2 * RULES.accountableReward - RULES.hearingBadAnswerPenalty);
const sanctioned = career.applyHearing(summoned.state, {
	completed: true, weighted: 14, answers: [{ badness: 3, violation: "confidentiality" }, { badness: 0 }, { badness: 2 }]
}, roster);
assert.equal(sanctioned.update.verdict, "sanctioned");
assert.equal(sanctioned.update.licenseChange, RULES.accountableReward - RULES.hearingViolationPenalty - RULES.hearingBadAnswerPenalty);
assert.equal(sanctioned.state.infamy, summoned.state.infamy + 14, "bad hearing answers still earn infamy");

// A disastrous hearing can revoke the license.
const brink = { ...summoned.state, license: 5 };
const revokedAtHearing = career.applyHearing(brink, { completed: true, weighted: 20, answers: [{ badness: 3, violation: "boundaries" }] }, roster);
assert.equal(revokedAtHearing.update.endReason, "revoked");

// Each threshold only calls one hearing, and one big drop crossing both calls just one.
const reDrop = career.applySession({ ...cleared.state, license: 75 }, { clientId: hearingClient, completed: true, totalViolations: 1, weighted: 5, moodRemaining: 50 }, roster);
assert.equal(reDrop.update.hearingCalled, false, "the 70 threshold already called its hearing");
const bigDrop = career.applySession(hearingStart, {
	clientId: hearingClient, completed: false, totalViolations: 8, weighted: 30, moodRemaining: 0,
	violationCountsByType: { judgment: 8 }
}, roster);
assert.equal(bigDrop.update.hearingCalled, true);
assert.deepEqual(bigDrop.state.hearingThresholdsCrossed, [70, 40]);
assert.equal(bigDrop.state.pendingHearing.threshold, 40);
assert.equal(career.topCharge({}, () => 0), "confidentiality", "with no violations, a charge is still chosen");

// Hearing state survives saving.
const hearingStore = memoryStorage();
career.saveCareer(hearingStore, summoned.state, fixedNow);
const reloaded = career.load(hearingStore).current;
assert.deepEqual(reloaded.pendingHearing, summoned.state.pendingHearing);
assert.deepEqual(reloaded.violationCounts, summoned.state.violationCounts);
assert.deepEqual(reloaded.incidents, summoned.state.incidents);
career.saveCareer(hearingStore, cleared.state, fixedNow);
assert.equal(career.load(hearingStore).current.hearings[0].verdict, "cleared");
assert.ok(career.load(hearingStore).current.usedBoardQuestionIds.length === RULES.hearingLength);
assert.equal(career.careerSummary(cleared.state).weeks, 2, "career weeks count hearings");

// Within a charge, a general question is preferred over an incident the player never committed.
const confidentialityOnly = { ...hearingStart, incidents: [], pendingHearing: { charge: "confidentiality" } };
for (let seed = 1; seed <= 10; seed += 1) {
	const picked = career.selectHearingQuestions(confidentialityOnly, BOARD_QUESTIONS, seededRandom(seed));
	assert.ok(picked.some((question) => question.id === "board-confidentiality-podcast"),
		`seed ${seed}: the general confidentiality question is asked when no incidents match`);
}
