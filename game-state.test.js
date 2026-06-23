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
const achievements = require("./achievements.js");

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

	const summary = JSON.parse(JSON.stringify(vm.runInContext(`
		questions = [{}, {}, {}];
		runHistory = [
			{ questionNumber: 1, response: "Mild", archetype: "boundaryCross", badness: 1, moodLost: 5, moodRemaining: 95, violation: null },
			{ questionNumber: 2, response: "Shared secret", archetype: "confidentialityBreach", badness: 3, moodLost: 27, moodRemaining: 68, violation: { type: "confidentiality", label: "Confidentiality", penalty: 12 } },
			{ questionNumber: 3, response: "Called employer", archetype: "boundaryCross", badness: 3, moodLost: 25, moodRemaining: 43, violation: { type: "boundaries", label: "Professional Boundaries", penalty: 10 } }
		];
		summarizeRun({ completed: false, reason: "Trust collapsed" });
	`, context)));

	assert.equal(summary.statusLabel, "Session ended early");
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
	const markup = vm.runInContext(`resultMessage(${JSON.stringify(summary)})`, context);
	assert.match(markup, /Questions survived/);
	assert.match(markup, /Dominant therapist style/);
	assert.match(markup, /Boundary Blender/);
	assert.match(markup, /Style mix/);
	assert.match(markup, /Replay nudge: try dodging Boundary Blender picks/);
	assert.match(markup, /Confidentiality Goblin/);
	assert.match(markup, /67%/);
	assert.match(markup, /Worst selected response/);
	assert.match(markup, /Confidentiality/);

	const shareText = vm.runInContext(`formatShareText(${JSON.stringify(summary)})`, context);
	assert.match(shareText, /Mode: Classic/);
	assert.match(shareText, /Status: Session ended early/);
	assert.match(shareText, /Reason: Trust collapsed/);
	assert.match(shareText, /Therapist Style: Boundary Blender \(2 responses\)/);
	assert.match(shareText, /Style Mix: Boundary Blender: 2, Confidentiality Goblin: 1/);
	assert.match(shareText, /Violations: 2 \(Confidentiality: 1, Professional Boundaries: 1\)/);
	assert.match(shareText, /Worst Response: Shared secret .*Confidentiality/);

	vm.runInContext(`latestResultSummary = ${JSON.stringify(summary)}`, context);
	await vm.runInContext("copyResult()", context);
	assert.equal(clipboardText, shareText);

	vm.runInContext(`updateFinalScorePills(${JSON.stringify({ ...summary, completed: true })})`, context);
	const saved = persistence.load(localStorage);
	assert.equal(saved.recordsByMode.classic.highestChaos.weighted, summary.weighted);
	assert.equal(saved.recordsByMode.classic.bestCompleted.weighted, summary.weighted);
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
	vm.runInContext(`interactionState = INTERACTION_STATES.RESULTS; latestResultSummary = { stale: true };`, context);
	await vm.runInContext("startGame()", context);
	const startedSpeedRun = JSON.parse(JSON.stringify(vm.runInContext(
		`({
			modeId: activeMode.id,
			questionCount: questions.length,
			idx,
			score,
			violations,
			mood,
			runHistoryLength: runHistory.length,
			latestResultSummary,
			interactionState,
			modePickerDisabled: el.modePicker.disabled
		})`,
		context
	)));
	assert.deepEqual(startedSpeedRun, {
		modeId: "speed",
		questionCount: gameModes.GAME_MODES.speed.questionCount,
		idx: 0,
		score: 0,
		violations: 0,
		mood: 100,
		runHistoryLength: 0,
		latestResultSummary: null,
		interactionState: "choosing",
		modePickerDisabled: true
	}, "starting a run must reset gameplay state and lock mode changes");

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

	assert.equal(elements.get("start").disabled, false);
	vm.runInContext(`contentErrors.push({ path: "questions", message: "Broken" }); initializeContent();`, context);
	assert.equal(elements.get("start").disabled, true);
	assert.equal(elements.get("contentError").hidden, false);

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