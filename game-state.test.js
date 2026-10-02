const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const scoring = require("./scoring.js");
const persistence = require("./persistence.js");
const questionsContent = require("./questions.js");
const contentSchema = require("./content-schema.js");
const questionSelector = require("./question-selector.js");
const questionHistory = require("./question-history.js");
const gameModes = require("./game-modes.js");
const sessionPacks = require("./session-packs.js");
const achievements = require("./achievements.js");
const clients = require("./clients.js");
const callbacks = require("./callbacks.js");
const followUps = require("./follow-ups.js");
const career = require("./career.js");

function makeElement() {
	const attributes = {};
	const listeners = {};
	const classNames = new Set();
	const children = [];
	let html = "";
	const element = {
		attributes,
		children,
		dataset: {},
		className: "",
		classList: {
			add(...names) { names.forEach((name) => classNames.add(name)); },
			remove(...names) { names.forEach((name) => classNames.delete(name)); },
			toggle(name, force) {
				const shouldAdd = force === undefined ? !classNames.has(name) : Boolean(force);
				if (shouldAdd) classNames.add(name);
				else classNames.delete(name);
				return shouldAdd;
			},
			contains(name) { return classNames.has(name); }
		},
		style: {},
		setAttribute(name, value) { attributes[name] = String(value); },
		addEventListener(type, handler) { listeners[type] = handler; },
		click() {
			if (listeners.click) listeners.click({ preventDefault() {} });
		},
		querySelectorAll(selector) {
			if (selector === "button") return children.filter((child) => child.type === "button");
			return [];
		},
		querySelector(selector) {
			if (selector.startsWith("button[data-choice-index=")) {
				const match = selector.match(/"(\d+)"/);
				return children.find((child) => child.type === "button" && child.dataset.choiceIndex === match?.[1]) || null;
			}
			return null;
		},
		focus() { element.focused = true; },
		appendChild(child) { children.push(child); return child; },
		textContent: "",
		hidden: false,
		disabled: false,
		get innerHTML() { return html; },
		set innerHTML(value) {
			html = String(value);
			if (html === "") children.length = 0;
		},
		offsetWidth: 0,
		focused: false
	};
	return element;
}

async function main() {
	const elements = new Map();
	const selectedButton = makeElement();
	selectedButton.dataset = { choiceIndex: "0", choiceText: "Bad response" };

	const choices = makeElement();
	choices.querySelectorAll = () => [selectedButton];
	elements.set("choices", choices);

	const storageValues = new Map();
	const localStorage = {
		getItem(key) { return storageValues.has(key) ? storageValues.get(key) : null; },
		setItem(key, value) { storageValues.set(key, value); }
	};
	let clipboardText = "";
	const documentListeners = {};

	const mediaPreference = { matches: true };
	const context = {
		console: { ...console, error() {} },
		document: {
			getElementById(id) {
				if (!elements.has(id)) elements.set(id, makeElement());
				return elements.get(id);
			},
			addEventListener(type, handler) { documentListeners[type] = handler; },
			createElement: makeElement
		},
		window: {
			BadTherapistModes: gameModes,
			BadTherapistSessionPacks: sessionPacks,
			BadTherapistClients: clients,
			BadTherapistCallbacks: callbacks,
			BadTherapistFollowUps: followUps,
			BadTherapistCareer: career,
			BadTherapistAchievements: achievements,
			BadTherapistScoring: scoring,
			BadTherapistPersistence: persistence,
			BadTherapistQuestions: questionsContent,
			BadTherapistContentSchema: contentSchema,
			BadTherapistQuestionSelector: questionSelector,
			BadTherapistQuestionHistory: questionHistory,
			localStorage,
			matchMedia: () => mediaPreference,
			setTimeout,
			clearTimeout,
			AudioContext: null,
			webkitAudioContext: null
		},
		setTimeout,
		clearTimeout,
		requestAnimationFrame: (callback) => callback(),
		performance,
		localStorage,
		navigator: {
			clipboard: {
				async writeText(value) { clipboardText = value; }
			}
		}
	};

	vm.createContext(context);
	const gameSource = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
	vm.runInContext(gameSource, context);

	function pressKey(event) {
		let defaultPrevented = false;
		documentListeners.keydown({
			code: "",
			key: "",
			...event,
			preventDefault() { defaultPrevented = true; }
		});
		return defaultPrevented;
	}
	vm.runInContext(
		`questions = [{ id: "test-question", topic: "work", client: "Client question", choices: [{ id: "bad-response", badness: 3, text: "Bad response", reaction: "Client reaction", feedback: "Authored feedback.", archetype: "dismissive", clientRead: "They feel dismissed.", ethicsNote: "Dismissal damages safety." }] }];` +
		`idx = 0; interactionState = INTERACTION_STATES.CHOOSING; locked = false;`,
		context
	);

	await vm.runInContext("onPick(0)", context);
	const state = JSON.parse(JSON.stringify(vm.runInContext(
		`({ score, mood, violations, runHistory, interactionState, roundComplete: INTERACTION_STATES.ROUND_COMPLETE })`,
		context
	)));

	assert.equal(state.score, 3);
	assert.equal(state.mood, 85);
	assert.equal(state.violations, 0);
	assert.equal(state.interactionState, state.roundComplete);
	assert.equal(elements.get("outcomeFeedback").hidden, false);
	assert.equal(elements.get("therapistBubble").style.display, "block");
	assert.equal(elements.get("reactionBubble").style.display, "block");
	assert.equal(elements.get("nextBtn").disabled, false);
	assert.equal(elements.get("nextBtn").textContent, "See results");
	assert.equal(elements.get("nextBtn").classList.contains("is-ready"), true);
	assert.match(elements.get("roundStatus").textContent, /Press See results or Enter\./);
	assert.equal(elements.get("roundStatus").dataset.tone, "ready");
	assert.equal(elements.get("outcomeTitle").textContent, "Bad choice logged");
	assert.equal(elements.get("outcomeMood").textContent, "Mood impact −15");
	assert.equal(elements.get("outcomeClientRead").hidden, false);
	assert.equal(elements.get("outcomeClientRead").textContent, "Client read: They feel dismissed.");
	assert.equal(elements.get("outcomeEthicsNote").hidden, false);
	assert.equal(elements.get("outcomeEthicsNote").textContent, "Ethics note: Dismissal damages safety.");
	assert.equal(elements.get("outcomeFeedback").classList.contains("is-badness"), true);
	assert.equal(selectedButton.disabled, true);
	assert.equal(selectedButton.attributes["aria-pressed"], "true");
	assert.equal(selectedButton.attributes["aria-label"], "Bad response Selected response");
	assert.deepEqual(state.runHistory, [{
		questionNumber: 1,
		modeId: "classic",
		modeLabel: "Classic",
		client: "Client question",
		response: "Bad response",
		questionId: "test-question",
		choiceId: "bad-response",
		topic: "work",
		reaction: "Client reaction",
		feedback: "Authored feedback.",
		clientRead: "They feel dismissed.",
		ethicsNote: "Dismissal damages safety.",
		archetype: "dismissive",
		callbackLine: "",
		recallLine: "",
		isFollowUp: false,
		followedUp: false,
		badness: 3,
		moodLost: 15,
		moodRemaining: 85,
		violation: null
	}]);

	await vm.runInContext("onPick(0)", context);
	const duplicateGuard = JSON.parse(JSON.stringify(vm.runInContext(
		`({ score, mood, runHistoryLength: runHistory.length, interactionState })`,
		context
	)));
	assert.deepEqual(duplicateGuard, {
		score: 3,
		mood: 85,
		runHistoryLength: 1,
		interactionState: "round-complete"
	}, "completed rounds must ignore duplicate answer input");

	vm.runInContext(
		`score = 0; mood = 100; violations = 0; runHistory = []; idx = 0;` +
		`questions = [{ id: "locked-question", topic: "work", client: "Locked", choices: [{ id: "locked-choice", badness: 3, text: "Locked bad", reaction: "Nope", feedback: "Should not apply." }] }];` +
		`interactionState = INTERACTION_STATES.CHOOSING; locked = true; typing = false;`,
		context
	);
	await vm.runInContext("onPick(0)", context);
	assert.equal(vm.runInContext("runHistory.length", context), 0, "locked choices must not record answers");

	vm.runInContext(`locked = false; typing = true; interactionState = INTERACTION_STATES.CHOOSING;`, context);
	await vm.runInContext("onPick(0)", context);
	assert.equal(vm.runInContext("runHistory.length", context), 0, "typing choices must not record answers");

	vm.runInContext(`
		streakState = emptyStreakState();
		updateStreaks({ badness: 3, moodLost: 15, violation: null, archetype: "chaosAdvice" });
		updateStreaks({ badness: 3, moodLost: 15, violation: null, archetype: "chaosAdvice" });
		updateStreaks({ badness: 3, moodLost: 15, violation: null, archetype: "chaosAdvice" });
	`, context);
	assert.match(elements.get("toast").textContent, /Chaos Coach streak/);
	assert.match(elements.get("roundStatus").textContent, /Chaos Coach streak/);
	assert.equal(elements.get("roundStatus").dataset.tone, "selected");

	const generatedCaseNote = JSON.parse(JSON.stringify(vm.runInContext(`
		generateCaseNote({ dominantArchetype: "boundaryCross", dominantLabel: "Boundary Blender", modeLabel: "Classic" })
	`, context)));
	assert.equal(generatedCaseNote.shareLabel, "Avoid Boundary Blender");
	assert.match(generatedCaseNote.prompt, /avoid Boundary Blender/);

	const cleanVerdict = JSON.parse(JSON.stringify(vm.runInContext(`
		ethicsBoardVerdict({ completed: true, totalViolations: 0, violationBreakdown: [], questionsAnswered: 3, dominantStyle: { archetype: "helpful", label: "Accidentally Ethical" } })
	`, context)));
	assert.equal(cleanVerdict.title, "Suspiciously Clean");
	assert.match(cleanVerdict.body, /no formal ethics violations/i);

	const maximumVerdict = JSON.parse(JSON.stringify(vm.runInContext(`
		ethicsBoardVerdict({ completed: false, totalViolations: 5, violationBreakdown: [{ label: "Confidentiality", count: 3 }], questionsAnswered: 5, dominantStyle: { archetype: "confidentialityBreach", label: "Confidentiality Goblin" } })
	`, context)));
	assert.equal(maximumVerdict.title, "License Launched Into the Sea");
	assert.match(maximumVerdict.body, /Confidentiality has been asked/);

	const summary = JSON.parse(JSON.stringify(vm.runInContext(`
		activeCaseNote = generateCaseNote({ dominantArchetype: "boundaryCross", dominantLabel: "Boundary Blender", modeLabel: "Classic" });
		questions = [{}, {}, {}];
		runHistory = [
			{ questionNumber: 1, response: "Mild", archetype: "boundaryCross", badness: 1, moodLost: 5, moodRemaining: 95, violation: null },
			{ questionNumber: 2, response: "Shared secret", archetype: "confidentialityBreach", badness: 3, moodLost: 27, moodRemaining: 68, violation: { type: "confidentiality", label: "Confidentiality", penalty: 12 } },
			{ questionNumber: 3, response: "Called employer", archetype: "boundaryCross", badness: 3, moodLost: 25, moodRemaining: 43, violation: { type: "boundaries", label: "Professional Boundaries", penalty: 10 } }
		];
		summarizeRun({ completed: false, reason: "Trust collapsed" });
	`, context)));

	assert.equal(summary.statusLabel, "Session ended early");
	assert.equal(summary.packLabel, "Chaos Sampler");
	assert.equal(summary.totalBadness, 7);
	assert.equal(summary.totalViolations, 2);
	assert.equal(summary.moodRemaining, 43);
	assert.equal(summary.questionsAnswered, 3);
	assert.equal(summary.worstResponse.response, "Shared secret");
	assert.deepEqual(summary.violationBreakdown, [
		{ label: "Confidentiality", count: 1 },
		{ label: "Professional Boundaries", count: 1 }
	]);
	assert.equal(summary.dominantStyle.label, "Boundary Blender");
	assert.equal(summary.dominantStyle.count, 2);
	assert.deepEqual(summary.archetypeBreakdown.map((item) => ({ label: item.label, count: item.count })), [
		{ label: "Boundary Blender", count: 2 },
		{ label: "Confidentiality Goblin", count: 1 }
	]);
	assert.equal(summary.caseNote.statusLabel, "Case note missed");
	assert.equal(summary.caseNote.completed, false);
	assert.equal(summary.caseNote.count, 2);
	const summaryVerdict = JSON.parse(JSON.stringify(vm.runInContext(`ethicsBoardVerdict(${JSON.stringify(summary)})`, context)));
	assert.equal(summaryVerdict.title, "Clipboard Probation");
	assert.match(summaryVerdict.body, /early ending/);
	const markup = vm.runInContext(`resultMessage(${JSON.stringify(summary)})`, context);
	assert.match(markup, /Questions survived/);
	assert.match(markup, /Pack: <b>Chaos Sampler<\/b>/);
	assert.match(markup, /Dominant therapist style/);
	assert.match(markup, /Boundary Blender/);
	assert.match(markup, /Style mix/);
	assert.match(markup, /Ethics Board finale/);
	assert.match(markup, /Case file closing note/);
	assert.match(markup, /Case File: Broad-Spectrum Chaos/);
	assert.match(markup, /Verdict: Clipboard Probation/);
	assert.match(markup, /No, You Cannot Text the Client’s Boss/);
	assert.match(markup, /Case note missed/);
	assert.match(markup, /Boundary Blender still got 2 picks/);
	assert.match(markup, /Replay nudge: try dodging Boundary Blender picks/);
	assert.match(markup, /Confidentiality Goblin/);
	assert.match(markup, /67%/);
	assert.match(markup, /Worst selected response/);
	assert.match(markup, /Confidentiality/);

	const shareText = vm.runInContext(`formatShareText(${JSON.stringify(summary)})`, context);
	assert.match(shareText, /Mode: Classic/);
	assert.match(shareText, /Pack: Chaos Sampler/);
	assert.match(shareText, /Case File: Broad-Spectrum Chaos/);
	assert.match(shareText, /Status: Session ended early/);
	assert.match(shareText, /Reason: Trust collapsed/);
	assert.match(shareText, /Therapist Style: Boundary Blender \(2 responses\)/);
	assert.match(shareText, /Style Mix: Boundary Blender: 2, Confidentiality Goblin: 1/);
	assert.match(shareText, /Case Note: Avoid Boundary Blender — Missed/);
	assert.match(shareText, /Ethics Board: Clipboard Probation — Attend one seminar titled/);
	assert.match(shareText, /Violations: 2 \(Confidentiality: 1, Professional Boundaries: 1\)/);
	assert.match(shareText, /Worst Response: Shared secret .*Confidentiality/);

	vm.runInContext(`latestResultSummary = ${JSON.stringify(summary)}`, context);
	await vm.runInContext("copyResult()", context);
	assert.equal(clipboardText, shareText);

	vm.runInContext(`updateFinalScorePills(${JSON.stringify({ ...summary, completed: true })})`, context);
	const saved = persistence.load(localStorage);
	assert.equal(saved.recordsByMode.classic.highestChaos.weighted, summary.weighted);
	assert.equal(saved.recordsByMode.classic.bestCompleted.weighted, summary.weighted);
	assert.equal(saved.lastStyleSummary.dominantArchetype, "boundaryCross");
	assert.match(elements.get("bestPill").textContent, /Highest Chaos/);
	assert.match(elements.get("bestPill").textContent, /Best Completed/);

	const achievementSummary = {
		...summary,
		completed: false,
		modeId: "classic",
		modeLabel: "Classic",
		questionsAnswered: 4,
		questionsTotal: 10,
		violationCountsByType: {},
		helpfulCount: 0,
		badnessThreeCount: 0
	};
	vm.runInContext(`showResults(${JSON.stringify(achievementSummary)})`, context);
	await new Promise((resolve) => setTimeout(resolve, 30));
	const achievementState = achievements.load(localStorage);
	assert.ok(achievementState.unlocked.walkoutSpeedrun);
	assert.match(elements.get("resultBox").innerHTML, /Walkout Speedrun/);
	assert.match(elements.get("achievementProgress").textContent, /1 \/ 8 unlocked/);
	assert.match(elements.get("announcer").textContent, /Achievement unlocked: Walkout Speedrun/);
	const achievementShare = vm.runInContext("formatShareText(latestResultSummary)", context);
	assert.match(achievementShare, /Achievements: Walkout Speedrun/);
	vm.runInContext(`showResults(${JSON.stringify(achievementSummary)})`, context);
	assert.equal(achievements.load(localStorage).unlocked.walkoutSpeedrun.unlockedAt, achievementState.unlocked.walkoutSpeedrun.unlockedAt);

	vm.runInContext(`score = 42; interactionState = INTERACTION_STATES.CHOOSING;`, context);
	await vm.runInContext("startGame()", context);
	assert.equal(vm.runInContext("score", context), 42, "startGame must ignore attempts while a round is active");

	elements.get("modePicker").querySelector = () => ({ value: "speed" });
	elements.get("packPicker").querySelector = () => ({ value: "workplace" });
	vm.runInContext(`interactionState = INTERACTION_STATES.RESULTS; latestResultSummary = { stale: true };`, context);
	await vm.runInContext("startGame()", context);
	const startedSpeedRun = JSON.parse(JSON.stringify(vm.runInContext(
		`({
			modeId: activeMode.id,
			packId: activePack.id,
			questionCount: questions.length,
			idx,
			score,
			violations,
			mood,
			runHistoryLength: runHistory.length,
			latestResultSummary,
			interactionState,
			modePickerDisabled: el.modePicker.disabled,
			packPickerDisabled: el.packPicker.disabled
		})`,
		context
	)));
	assert.deepEqual(startedSpeedRun, {
		modeId: "speed",
		packId: "workplace",
		questionCount: gameModes.GAME_MODES.speed.questionCount,
		idx: 0,
		score: 0,
		violations: 0,
		mood: 100,
		runHistoryLength: 0,
		latestResultSummary: null,
		interactionState: "choosing",
		modePickerDisabled: true,
		packPickerDisabled: true
	}, "starting a run must reset gameplay state and lock mode and pack changes");

	const startedClient = JSON.parse(JSON.stringify(vm.runInContext(`activeClient`, context)));
	assert.ok(
		clients.getClientsForPack("workplace").some((client) => client.id === startedClient.id),
		"a run's client comes from the selected pack"
	);
	assert.equal(elements.get("leadInBubble").hidden, false, "question 1 opens with the client's greeting");
	assert.equal(elements.get("leadInBubble").textContent, `${startedClient.name}: ${startedClient.opening}`);
	assert.match(elements.get("clientBubble").textContent, new RegExp(`^${startedClient.name} \\(confidential\\): `));
	assert.match(elements.get("caseFileGame").innerHTML, new RegExp(`Client: ${startedClient.name}`));
	assert.equal(
		vm.runInContext(`voicedReaction("Client: That stung.")`, context),
		`${startedClient.name}: That stung.`
	);

	const calledBack = JSON.parse(JSON.stringify(vm.runInContext(`
		const realRandom = Math.random;
		Math.random = () => 0;
		idx = 2;
		callbackLog = [];
		runHistory = [
			{ questionNumber: 1, topic: "work", archetype: "confidentialityBreach", response: "Posted it", badness: 3, moodLost: 27, callbackLine: "Is that group chat real?" },
			{ questionNumber: 2, topic: "family", archetype: "helpful", response: "Kind", badness: 0, moodLost: 0, callbackLine: "" }
		];
		const leadIn = leadInForQuestion();
		Math.random = realRandom;
		({ leadIn, callbackLog });
	`, context)));
	assert.deepEqual(calledBack.leadIn, { type: "callback", line: "Is that group chat real?" });
	assert.equal(calledBack.callbackLog.length, 1);
	assert.equal(calledBack.callbackLog[0].sourceQuestionNumber, 1);

	const clientSummary = JSON.parse(JSON.stringify(vm.runInContext(`summarizeRun({ completed: false, reason: "Trust collapsed" })`, context)));
	assert.equal(clientSummary.client.name, startedClient.name);
	assert.equal(clientSummary.client.farewell, startedClient.walkout, "early endings use the walkout line");
	assert.equal(clientSummary.callbacks.length, 1);
	const clientMarkup = vm.runInContext(`resultMessage(${JSON.stringify(clientSummary)})`, context);
	assert.match(clientMarkup, new RegExp(`Client: <b>${startedClient.name}</b>`));
	assert.match(clientMarkup, new RegExp(`What ${startedClient.name} brought back up`));
	assert.match(clientMarkup, /Is that group chat real\?/);
	assert.match(clientMarkup, /Recalling question 1/);
	const clientShare = vm.runInContext(`formatShareText(${JSON.stringify(clientSummary)})`, context);
	assert.match(clientShare, new RegExp(`Client: ${startedClient.name}`));
	assert.match(clientShare, /Callbacks: 1/);
	assert.equal(
		JSON.parse(JSON.stringify(vm.runInContext(`summarizeRun({ completed: true })`, context))).client.farewell,
		startedClient.closing,
		"completed sessions use the closing line"
	);

	const followUpParent = questionsContent.find((question) => question.choices.some((choice) => choice.followUp));
	const followUpTrigger = followUpParent.choices.findIndex((choice) => choice.followUp);
	const fillers = questionsContent.filter((question) => question !== followUpParent).slice(0, 2);
	context.followUpRun = JSON.parse(JSON.stringify([followUpParent, ...fillers]));
	vm.runInContext(
		`questions = followUpRun; idx = 0; score = 0; violations = 0; mood = 100; runHistory = []; callbackLog = []; followUpCount = 0;` +
		`typing = false; locked = false; interactionState = INTERACTION_STATES.CHOOSING;`,
		context
	);
	await vm.runInContext(`onPick(${followUpTrigger})`, context);
	const branched = JSON.parse(JSON.stringify(vm.runInContext(
		`({ length: questions.length, next: questions[1], followUpCount, followedUp: runHistory[0].followedUp, interactionState })`,
		context
	)));
	assert.equal(branched.length, 3, "a follow-up keeps the session length");
	assert.equal(branched.next.isFollowUp, true, "the follow-up is queued as the next question");
	assert.equal(branched.next.id, followUpParent.choices[followUpTrigger].followUp.id);
	assert.equal(branched.next.topic, followUpParent.topic);
	assert.equal(branched.followUpCount, 1);
	assert.equal(branched.followedUp, true);
	assert.equal(branched.interactionState, "round-complete");
	assert.match(elements.get("roundStatus").textContent, new RegExp(`${startedClient.name} isn’t letting that go`));

	await vm.runInContext("next()", context);
	assert.match(elements.get("clientBubble").textContent, new RegExp(`^${startedClient.name} \\(pushing back\\): `));
	assert.equal(elements.get("clientBubble").classList.contains("is-followUp"), true);
	assert.equal(elements.get("leadInBubble").hidden, true, "follow-ups are not preceded by callbacks");
	assert.match(elements.get("progressPill").textContent, /Question 2\/3 · Follow-up/);
	assert.match(elements.get("roundStatus").textContent, /is pushing back/);

	const repairIndex = vm.runInContext(`questions[1].choices.findIndex((choice) => choice.badness === 0)`, context);
	await vm.runInContext(`onPick(${repairIndex})`, context);
	assert.equal(vm.runInContext("questions.length", context), 3, "follow-ups never chain");
	const followUpSummary = JSON.parse(JSON.stringify(vm.runInContext(`summarizeRun({ completed: true })`, context)));
	assert.deepEqual(followUpSummary.followUps.map((item) => ({ questionNumber: item.questionNumber, repaired: item.repaired })), [
		{ questionNumber: 2, repaired: true }
	]);
	const followUpMarkup = vm.runInContext(`resultMessage(${JSON.stringify(followUpSummary)})`, context);
	assert.match(followUpMarkup, /Pushback: repaired 1 of 1/);
	assert.match(followUpMarkup, /You repaired it/);
	assert.match(vm.runInContext(`formatShareText(${JSON.stringify(followUpSummary)})`, context), /Follow-ups: repaired 1 of 1/);

	vm.runInContext(
		`activeMode = getMode("classic"); score = 0; violations = 0; mood = 9; idx = 0; runHistory = []; latestResultSummary = null; endedEarly = false; typing = false; locked = false;` +
		`questions = [{ id: "collapse-question", topic: "work", client: "I am barely here.", choices: [{ id: "collapse-choice", badness: 3, violation: "confidentiality", text: "I am posting this whole session.", reaction: "I am leaving.", feedback: "A catastrophic breach." }] }];` +
		`interactionState = INTERACTION_STATES.CHOOSING;`,
		context
	);
	await vm.runInContext("onPick(0)", context);
	const earlyEndState = JSON.parse(JSON.stringify(vm.runInContext(
		`({
			interactionState,
			endedEarly,
			nextDisabled: el.nextBtn.disabled,
			resultVisible: el.resultScreen.classList.contains("active") && !el.resultScreen.hidden,
			latestCompleted: latestResultSummary.completed,
			questionsAnswered: latestResultSummary.questionsAnswered,
			moodRemaining: latestResultSummary.moodRemaining,
			reason: latestResultSummary.reason
		})`,
		context
	)));
	assert.deepEqual(earlyEndState, {
		interactionState: "results",
		endedEarly: true,
		nextDisabled: true,
		resultVisible: true,
		latestCompleted: false,
		questionsAnswered: 1,
		moodRemaining: 0,
		reason: "Confidentiality violation and client trust collapsed"
	}, "early-ending sequences must land on locked results, not a dead round screen");
	await vm.runInContext("next()", context);
	assert.equal(vm.runInContext("interactionState", context), "results", "next must be ignored after early ending");

	vm.runInContext("restart()", context);
	const restarted = JSON.parse(JSON.stringify(vm.runInContext(
		`({
			interactionState,
			modePickerDisabled: el.modePicker.disabled,
			packPickerDisabled: el.packPicker.disabled,
			startVisible: el.startScreen.classList.contains("active") && !el.startScreen.hidden,
			gameHidden: el.gameScreen.hidden,
			resultHidden: el.resultScreen.hidden,
			progressNow: el.progressBar.attributes["aria-valuenow"],
			progressText: el.progressBar.attributes["aria-valuetext"],
			progressWidth: el.progressFill.style.width
		})`,
		context
	)));
	assert.deepEqual(restarted, {
		interactionState: "idle",
		modePickerDisabled: false,
		packPickerDisabled: false,
		startVisible: true,
		gameHidden: true,
		resultHidden: true,
		progressNow: "0",
		progressText: "0 of 10 questions completed",
		progressWidth: "0%"
	}, "restart must return to a clean start screen");

	selectedButton.addEventListener("click", () => { vm.runInContext("onPick(0)", context); });
	choices.querySelector = () => selectedButton;
	elements.get("gameScreen").classList.add("active");
	elements.get("gameScreen").hidden = false;
	vm.runInContext(
		`activeMode = getMode("classic"); score = 0; violations = 0; mood = 100; idx = 0; runHistory = []; typing = false; locked = false;` +
		`questions = [{ id: "keyboard-question", topic: "work", client: "Keyboard", choices: [{ id: "keyboard-choice", badness: 3, text: "Keyboard bad", reaction: "Keyboard reaction", feedback: "Keyboard feedback." }] }];` +
		`interactionState = INTERACTION_STATES.PRESENTING; skipCurrentSequence = false; skipTypingNow = false;`,
		context
	);
	assert.equal(pressKey({ code: "Space", key: " " }), true, "space should prevent scrolling while skipping message pacing");
	assert.deepEqual(JSON.parse(JSON.stringify(vm.runInContext(
		`({ skipCurrentSequence, skipTypingNow })`,
		context
	))), { skipCurrentSequence: true, skipTypingNow: true });

	vm.runInContext(`interactionState = INTERACTION_STATES.CHOOSING; skipCurrentSequence = false; skipTypingNow = false; locked = false; typing = false;`, context);
	selectedButton.disabled = false;
	selectedButton.setAttribute("aria-disabled", "false");
	assert.equal(pressKey({ key: "1", code: "Digit1" }), false);
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.equal(vm.runInContext("runHistory.length", context), 1, "number hotkeys must pick the matching answer");
	assert.equal(vm.runInContext("interactionState", context), "round-complete");

	assert.equal(pressKey({ key: "Enter", code: "Enter" }), true, "enter should activate Next after a completed round");
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.equal(vm.runInContext("interactionState", context), "results");
	assert.equal(vm.runInContext("latestResultSummary.completed", context), true);

	// Career mode: start, play a session, return to the practice, carry trust, retire.
	async function playUntilResults(pickExpression) {
		for (let guard = 0; guard < 30; guard += 1) {
			const state = vm.runInContext("interactionState", context);
			if (state === "results") return;
			if (state === "choosing") {
				// Take the first matching choice for each predicate in order, so a fallback always exists.
				const index = vm.runInContext(
					`[${pickExpression}].map((test) => questions[idx].choices.findIndex(test)).find((found) => found >= 0)`,
					context
				);
				if (!Number.isInteger(index)) throw new Error("no choice matched the pick strategy");
				await vm.runInContext(`onPick(${index})`, context);
			} else if (state === "round-complete") {
				await vm.runInContext("next()", context);
			} else {
				throw new Error(`unexpected state ${state}`);
			}
		}
		throw new Error("session did not finish");
	}
	vm.runInContext(`interactionState = INTERACTION_STATES.IDLE; careerState = null; typing = false; locked = false;`, context);
	vm.runInContext("openCareer()", context);
	const newCareer = JSON.parse(JSON.stringify(vm.runInContext("careerState", context)));
	assert.equal(newCareer.status, "active");
	assert.equal(newCareer.week, 1);
	assert.equal(newCareer.modeId, "speed", "a career locks in the selected mode");
	assert.equal(newCareer.waitlist.length, career.RULES.waitlistSize);
	assert.equal(elements.get("careerScreen").hidden, false);
	const firstClient = clients.getClient(newCareer.waitlist[0]);
	assert.match(elements.get("careerBody").innerHTML, new RegExp(firstClient.name));
	assert.match(elements.get("careerBody").innerHTML, /New client/);
	assert.match(elements.get("careerStatus").innerHTML, /Week 1 of 12/);
	assert.match(elements.get("meta").textContent, /^Career • Week 1 of 12 • Speed Session$/);
	assert.equal(career.load(localStorage).current.week, 1, "starting a career saves it");

	await vm.runInContext(`startGame({ careerClientId: "${firstClient.id}" })`, context);
	const careerSession = JSON.parse(JSON.stringify(vm.runInContext(
		`({ length: questions.length, mood, client: activeClient.id, pack: activePack.id, mode: activeMode.id })`,
		context
	)));
	assert.deepEqual(careerSession, {
		length: career.RULES.sessionLength,
		mood: 100,
		client: firstClient.id,
		pack: firstClient.packIds[0],
		mode: "speed"
	}, "career sessions use the chosen client, their pack, the career mode, and a shorter length");
	assert.match(elements.get("meta").textContent, /Career • Week 1 of 12/);
	assert.equal(elements.get("leadInBubble").textContent, `${firstClient.name}: ${firstClient.opening}`);

	const speedRecordsBefore = JSON.stringify(persistence.load(localStorage).recordsByMode.speed);
	await playUntilResults("(choice) => choice.badness === 0");
	const firstResult = JSON.parse(JSON.stringify(vm.runInContext("latestResultSummary.career", context)));
	assert.equal(firstResult.week, 1);
	assert.equal(firstResult.ended, false);
	assert.equal(firstResult.infamyGained, 0, "an all-helpful session earns no infamy");
	assert.equal(firstResult.license, career.RULES.licenseStart);
	assert.match(elements.get("resultBox").innerHTML, /Practice update/);
	assert.match(elements.get("restartBtn").textContent, /Back to the practice/);
	assert.match(elements.get("bestPill").textContent, /Career: Infamy 0 · License 100/);
	assert.equal(JSON.stringify(persistence.load(localStorage).recordsByMode.speed), speedRecordsBefore,
		"career sessions do not touch per-mode records");
	assert.match(vm.runInContext("formatShareText(latestResultSummary)", context), /Career: Week 1 · Infamy 0 · License 100/);

	vm.runInContext("restart()", context);
	assert.equal(elements.get("careerScreen").hidden, false, "restart after a career session returns to the practice");
	assert.equal(elements.get("restartBtn").textContent, "Restart");
	const weekTwo = JSON.parse(JSON.stringify(vm.runInContext("careerState", context)));
	assert.equal(weekTwo.week, 2);
	assert.equal(weekTwo.clients[firstClient.id].visits, 1);
	const returningId = weekTwo.waitlist.find((id) => weekTwo.clients[id]?.visits > 0);
	assert.ok(returningId, "the week 2 waitlist includes a returning client");
	assert.match(elements.get("careerBody").innerHTML, /Visit 2 · Starts at mood/);
	const firstMemories = weekTwo.clients[firstClient.id].memories;
	assert.equal(firstMemories.length, 2, "each session leaves two memories behind");
	assert.ok(firstMemories.every((memory) => memory.week === 1 && memory.archetype === "helpful"));
	assert.ok(firstMemories.every((memory) => !/\b(earlier|today)\b/i.test(memory.recallLine)),
		"same-session wording is never carried into a later visit");
	assert.match(elements.get("careerBody").innerHTML, /Remembers you said: “/);

	// Lower the returning client's trust, then walk them out.
	vm.runInContext(`careerState.clients["${returningId}"].trust = 45;`, context);
	await vm.runInContext(`startGame({ careerClientId: "${returningId}" })`, context);
	assert.equal(vm.runInContext("mood", context), 45, "returning clients start at their carried trust");
	const returningName = clients.getClient(returningId).name;
	assert.ok(
		elements.get("leadInBubble").textContent.startsWith(`${returningName}: ${career.RETURNING_LINES.guarded} `),
		"returning clients greet you based on how last time went"
	);
	const openingRecall = JSON.parse(JSON.stringify(vm.runInContext("callbackLog[0]", context)));
	assert.ok(Number.isInteger(openingRecall.fromWeek), "the greeting brings up something from a previous visit");
	assert.ok(elements.get("leadInBubble").textContent.endsWith(openingRecall.line));
	assert.equal(elements.get("leadInBubble").classList.contains("is-callback"), true);
	await playUntilResults(
		"(choice) => choice.badness === 3 && !choice.followUp, (choice) => choice.badness >= 2 && !choice.followUp, (choice) => choice.badness >= 1"
	);
	const walkoutResult = JSON.parse(JSON.stringify(vm.runInContext("latestResultSummary", context)));
	assert.ok(walkoutResult.callbacks.some((item) => item.fromWeek), "results list what the client remembered");
	assert.match(elements.get("resultBox").innerHTML, /Remembering week \d+/);
	assert.equal(walkoutResult.completed, false);
	assert.equal(walkoutResult.career.walkouts, 1);
	assert.ok(walkoutResult.career.licenseLost >= career.RULES.walkoutPenalty);
	assert.equal(walkoutResult.career.trust, career.RULES.minimumTrust);
	vm.runInContext("restart()", context);
	assert.equal(vm.runInContext("careerState.week", context), 3);

	// Retiring takes two taps and shows the career summary.
	vm.runInContext("retireCareer()", context);
	assert.equal(vm.runInContext("careerState.status", context), "active", "the first tap only arms retirement");
	assert.match(elements.get("careerRetireBtn").textContent, /Tap again/);
	vm.runInContext("retireCareer()", context);
	assert.equal(vm.runInContext("careerState.status", context), "ended");
	assert.match(elements.get("careerBody").innerHTML, /Early Retirement/);
	assert.match(elements.get("careerBody").innerHTML, /Start a new career/);
	assert.equal(elements.get("careerRetireBtn").hidden, true);
	assert.equal(career.load(localStorage).best.endReason, "quit", "an ended career is saved as the best so far");
	await vm.runInContext(`startGame({ careerClientId: "${returningId}" })`, context);
	assert.equal(vm.runInContext("careerSessionClientId", context), "", "an ended career cannot start sessions");
	vm.runInContext(`interactionState = INTERACTION_STATES.IDLE;`, context);
	vm.runInContext("leaveCareerScreen()", context);
	assert.equal(elements.get("startScreen").hidden, false);
	assert.equal(elements.get("careerBtn").textContent, "Start a new career");
	assert.doesNotMatch(elements.get("meta").textContent, /^Career/, "leaving the practice restores the normal header");
	assert.match(elements.get("careerPanelStatus").textContent, /Best career/);

	assert.equal(elements.get("start").disabled, false);
	vm.runInContext(`contentErrors.push({ path: "questions", message: "Broken" }); initializeContent();`, context);
	assert.equal(elements.get("start").disabled, true);
	assert.equal(elements.get("contentError").hidden, false);
	assert.match(elements.get("packPreview").innerHTML, /Selected case file|Case File:/);

	mediaPreference.matches = false;
	const speedTarget = makeElement();
	context.speedTarget = speedTarget;
	vm.runInContext(`activeMode = getMode("speed")`, context);
	const speedStarted = performance.now();
	await vm.runInContext(`typeInto(speedTarget, "This should appear immediately", 40)`, context);
	await vm.runInContext(`pacingDelay(500)`, context);
	assert.ok(performance.now() - speedStarted < 100, "Speed mode must bypass artificial delays");
	assert.equal(speedTarget.textContent, "This should appear immediately");

	console.log("Game-state, modes, history, persistence, sharing, and content-gating tests passed.");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});