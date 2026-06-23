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

function makeElement() {
	const attributes = {};
	return {
		attributes,
		classList: { add() {}, remove() {}, toggle() {} },
		style: {},
		setAttribute(name, value) { attributes[name] = String(value); },
		addEventListener() {},
		querySelectorAll() { return []; },
		querySelector() { return null; },
		focus() {},
		appendChild() {},
		textContent: "",
		hidden: false,
		disabled: false,
		innerHTML: "",
		offsetWidth: 0
	};
}

async function main() {
	const elements = new Map();
	const selectedButton = makeElement();
	selectedButton.dataset = { choiceIndex: "0" };

	const choices = makeElement();
	choices.querySelectorAll = () => [selectedButton];
	elements.set("choices", choices);

	const storageValues = new Map();
	const localStorage = {
		getItem(key) { return storageValues.has(key) ? storageValues.get(key) : null; },
		setItem(key, value) { storageValues.set(key, value); }
	};
	let clipboardText = "";

	const mediaPreference = { matches: true };
	const context = {
		console: { ...console, error() {} },
		document: {
			getElementById(id) {
				if (!elements.has(id)) elements.set(id, makeElement());
				return elements.get(id);
			},
			addEventListener() {},
			createElement: makeElement
		},
		window: {
			BadTherapistModes: gameModes,
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
	vm.runInContext(
		`questions = [{ id: "test-question", topic: "work", client: "Client question", choices: [{ id: "bad-response", badness: 3, text: "Bad response", reaction: "Client reaction", feedback: "Authored feedback." }] }];` +
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
	assert.equal(selectedButton.attributes["aria-pressed"], "true");
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
		badness: 3,
		moodLost: 15,
		moodRemaining: 85,
		violation: null
	}]);

	const summary = JSON.parse(JSON.stringify(vm.runInContext(`
		questions = [{}, {}, {}];
		runHistory = [
			{ questionNumber: 1, response: "Mild", badness: 1, moodLost: 5, moodRemaining: 95, violation: null },
			{ questionNumber: 2, response: "Shared secret", badness: 3, moodLost: 27, moodRemaining: 68, violation: { type: "confidentiality", label: "Confidentiality", penalty: 12 } },
			{ questionNumber: 3, response: "Called employer", badness: 3, moodLost: 25, moodRemaining: 43, violation: { type: "boundaries", label: "Professional Boundaries", penalty: 10 } }
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
	const markup = vm.runInContext(`resultMessage(${JSON.stringify(summary)})`, context);
	assert.match(markup, /Questions survived/);
	assert.match(markup, /Worst selected response/);
	assert.match(markup, /Confidentiality/);

	const shareText = vm.runInContext(`formatShareText(${JSON.stringify(summary)})`, context);
	assert.match(shareText, /Mode: Classic/);
	assert.match(shareText, /Status: Session ended early/);
	assert.match(shareText, /Reason: Trust collapsed/);
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