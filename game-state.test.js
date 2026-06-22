const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const scoring = require("./scoring.js");

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

	const context = {
		console,
		document: {
			getElementById(id) {
				if (!elements.has(id)) elements.set(id, makeElement());
				return elements.get(id);
			},
			addEventListener() {},
			createElement: makeElement
		},
		window: {
			BadTherapistScoring: scoring,
			matchMedia: () => ({ matches: true }),
			setTimeout,
			clearTimeout,
			AudioContext: null,
			webkitAudioContext: null
		},
		setTimeout,
		clearTimeout,
		requestAnimationFrame: (callback) => callback(),
		performance
	};

	vm.createContext(context);
	const gameSource = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
	vm.runInContext(gameSource, context);
	vm.runInContext(
		`questions = [{ client: "Client question", choices: [{ badness: 3, text: "Bad response", reaction: "Client reaction" }] }];` +
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
		client: "Client question",
		response: "Bad response",
		reaction: "Client reaction",
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

	console.log("Game-state interaction and result-history tests passed.");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});