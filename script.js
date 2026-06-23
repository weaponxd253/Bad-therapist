const { getMode } = window.BadTherapistModes;
const {
	SCORING,
	VIOLATION_TYPES,
	calculateChoiceOutcome
} = window.BadTherapistScoring;
const { update: updateSavedRecords } = window.BadTherapistPersistence;
const { validateQuestions } = window.BadTherapistContentSchema;
const { selectQuestionsForRun } = window.BadTherapistQuestionSelector;
const {
	load: loadQuestionHistory,
	recordRun: recordQuestionRun,
	getRecentQuestionWeights
} = window.BadTherapistQuestionHistory;
const QUESTIONS_BASE = window.BadTherapistQuestions;
const contentErrors = validateQuestions(QUESTIONS_BASE, VIOLATION_TYPES);
const el = {
	card: document.getElementById("card"),
	startBtn: document.getElementById("start"),
	startScreen: document.getElementById("startScreen"),
	gameScreen: document.getElementById("gameScreen"),
	resultScreen: document.getElementById("resultScreen"),
	meta: document.getElementById("meta"),
	progressBar: document.getElementById("progressBar"),
	progressFill: document.getElementById("progressFill"),
	startHeading: document.getElementById("startHeading"),
	modePicker: document.getElementById("modePicker"),
	contentError: document.getElementById("contentError"),
	gameHeading: document.getElementById("gameHeading"),
	resultHeading: document.getElementById("resultHeading"),
	soundBtn: document.getElementById("soundBtn"),
	announcer: document.getElementById("announcer"),
	clientBubble: document.getElementById("clientBubble"),
	therapistBubble: document.getElementById("therapistBubble"),
	reactionBubble: document.getElementById("reactionBubble"),
	choices: document.getElementById("choices"),
	outcomeFeedback: document.getElementById("outcomeFeedback"),
	outcomeBadness: document.getElementById("outcomeBadness"),
	outcomeMood: document.getElementById("outcomeMood"),
	outcomeViolation: document.getElementById("outcomeViolation"),
	outcomeExplanation: document.getElementById("outcomeExplanation"),
	progressPill: document.getElementById("progressPill"),
	scorePill: document.getElementById("scorePill"),
	violPill: document.getElementById("violPill"),
	moodPill: document.getElementById("moodPill"),
	nextBtn: document.getElementById("nextBtn"),
	resultBox: document.getElementById("resultBox"),
	finalScorePill: document.getElementById("finalScorePill"),
	finalViolPill: document.getElementById("finalViolPill"),
	bestPill: document.getElementById("bestPill"),
	restartBtn: document.getElementById("restartBtn"),
	shareBtn: document.getElementById("shareBtn"),
	toast: document.getElementById("toast"),
	skipHint: document.getElementById("skipHint")
};



let questions = [];
let idx = 0;
let score = 0;
let violations = 0;
let mood = 100;
let runHistory = [];
let latestResultSummary = null;
const INTERACTION_STATES = Object.freeze({
	IDLE: "idle",
	PRESENTING: "presenting",
	CHOOSING: "choosing",
	RESPONDING: "responding",
	ROUND_COMPLETE: "round-complete",
	RESULTS: "results"
});

let locked = false;
let typing = false;
let skipTypingNow = false;
let skipCurrentSequence = false;
let interactionState = INTERACTION_STATES.IDLE;
let activeMode = getMode("classic");
let endedEarly = false;
let soundEnabled = true;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function announce(message) {
	el.announcer.textContent = "";
	window.setTimeout(() => {
		el.announcer.textContent = message;
	}, 20);
}

function animateChoicesIn(buttons) {
	if (activeMode.instantPacing || reducedMotion.matches || !window.gsap || buttons.length === 0) {
		return Promise.resolve();
	}

	el.choices.style.pointerEvents = "none";
	gsap.killTweensOf(buttons);
	gsap.set(buttons, { autoAlpha: 0, y: 10 });

	return new Promise((resolve) => {
		gsap.to(buttons, {
			autoAlpha: 1,
			y: 0,
			duration: 0.28,
			ease: "power2.out",
			stagger: 0.12,
			onComplete: () => {
				el.choices.style.pointerEvents = "";
				resolve();
			}
		});
	});
}

function showScreen(name) {
	const screens = {
		start: el.startScreen,
		game: el.gameScreen,
		result: el.resultScreen
	};

	Object.entries(screens).forEach(([screenName, screen]) => {
		const active = screenName === name;
		screen.classList.toggle("active", active);
		screen.hidden = !active;
	});
}

function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}

function applyChoiceOutcome(outcome) {
	score += outcome.badnessGained;
	mood = outcome.moodRemaining;
	if (outcome.violation) violations += 1;
}

function recordChoiceOutcome(question, choice, outcome) {
	runHistory.push({
		questionNumber: idx + 1,
		modeId: activeMode.id,
		modeLabel: activeMode.label,
		client: question.client,
		response: choice.text,
		questionId: question.id,
		choiceId: choice.id,
		topic: question.topic,
		reaction: choice.reaction,
		feedback: choice.feedback,
		badness: outcome.badnessGained,
		moodLost: outcome.moodLost,
		moodRemaining: outcome.moodRemaining,
		violation: outcome.violation
			? {
				type: outcome.violation.type,
				label: outcome.violation.label,
				penalty: outcome.violationPenalty
			}
			: null
	});
}

function moodEmoji(v) {
	if (v >= 80) return "🙂";
	if (v >= 60) return "😐";
	if (v >= 40) return "😬";
	if (v >= 20) return "😟";
	return "😵";
}

function showToast(msg, ms = 1200) {
	el.toast.textContent = msg;
	el.toast.classList.add("show");
	window.clearTimeout(showToast._t);
	showToast._t = window.setTimeout(() => el.toast.classList.remove("show"), ms);
}

function playBeep(type) {
	if (!soundEnabled) return;

	const AudioCtx = window.AudioContext || window.webkitAudioContext;
	if (!AudioCtx) return;

	const ctx = playBeep._ctx || (playBeep._ctx = new AudioCtx());
	const o = ctx.createOscillator();
	const g = ctx.createGain();
	o.connect(g);
	g.connect(ctx.destination);

	const now = ctx.currentTime;
	const base = type === "violation" ? 220 : 440;

	o.type = "square";
	o.frequency.setValueAtTime(base, now);
	g.gain.setValueAtTime(0.0001, now);
	g.gain.exponentialRampToValueAtTime(0.15, now + 0.01);
	g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

	o.start(now);
	o.stop(now + 0.2);

	if (type === "violation") {
		// quick 2nd chirp
		const o2 = ctx.createOscillator();
		const g2 = ctx.createGain();
		o2.connect(g2);
		g2.connect(ctx.destination);
		o2.type = "square";
		o2.frequency.setValueAtTime(260, now + 0.12);
		g2.gain.setValueAtTime(0.0001, now + 0.12);
		g2.gain.exponentialRampToValueAtTime(0.12, now + 0.13);
		g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
		o2.start(now + 0.12);
		o2.stop(now + 0.28);
	}
}

function beginMessageSequence() {
	skipCurrentSequence = false;
	skipTypingNow = false;
}

function requestSkipTyping() {
	skipTypingNow = true;
	skipCurrentSequence = true;
}

async function pacingDelay(ms) {
	if (activeMode.instantPacing || reducedMotion.matches || skipCurrentSequence || ms <= 0) return;

	const startedAt = performance.now();
	while (performance.now() - startedAt < ms) {
		if (skipCurrentSequence) return;
		await new Promise((resolve) => window.setTimeout(resolve, 25));
	}
}

async function typeInto(elm, text, speed = 12) {
	typing = true;
	skipTypingNow = skipCurrentSequence;

	if (activeMode.instantPacing || reducedMotion.matches || skipCurrentSequence) {
		elm.textContent = text;
		typing = false;
		announce(text);
		return;
	}

	if (el.skipHint) el.skipHint.style.display = "block";
	elm.textContent = "";

	for (let i = 0; i < text.length; i++) {
		if (skipTypingNow) {
			elm.textContent = text;
			break;
		}
		elm.textContent += text[i];
		const jitter = Math.random() * 10;
		await new Promise((r) => setTimeout(r, speed + jitter));
	}

	typing = false;
	if (el.skipHint) el.skipHint.style.display = "none";
	announce(text);
}

function updateTopMeta() {
	el.meta.textContent = "10 confidential questions • choose the worst replies";
}

function updateHUD() {
	const questionNumber = Math.min(idx + 1, questions.length);
	el.progressPill.textContent = `Question ${questionNumber}/${questions.length}`;
	el.scorePill.textContent = `Badness: ${score}`;
	el.violPill.textContent = `Violations: ${violations}`;
	el.moodPill.textContent = `Mood: ${moodEmoji(mood)} ${mood}`;
	el.gameHeading.textContent = `Question ${questionNumber} of ${questions.length}`;
	el.progressBar.setAttribute("aria-valuemax", String(questions.length));
	el.progressBar.setAttribute("aria-valuenow", String(idx));
	el.progressBar.setAttribute("aria-valuetext", `${idx} of ${questions.length} questions completed`);
	el.progressFill.style.width = `${Math.round((idx / questions.length) * 100)}%`;
}

function resetRoundUI() {
	el.therapistBubble.style.display = "none";
	el.reactionBubble.style.display = "none";
	el.outcomeFeedback.hidden = true;
	el.outcomeBadness.textContent = "";
	el.outcomeMood.textContent = "";
	el.outcomeViolation.textContent = "";
	el.outcomeViolation.hidden = true;
	el.outcomeExplanation.textContent = "";
	el.nextBtn.disabled = true;
	locked = true;
}

function lockChoices() {
	[...el.choices.querySelectorAll("button")].forEach((button) => {
		button.setAttribute("aria-disabled", "true");
	});
	locked = true;
}

function outcomeExplanation(outcome, feedback) {
	if (outcome.violation) {
		return `Ethics violation — ${outcome.violation.label}: ${outcome.violation.explanation} ${feedback}`;
	}
	return feedback;
}

function showOutcome(outcome, feedback) {
	const explanation = outcomeExplanation(outcome, feedback);
	el.outcomeBadness.textContent = `Badness +${outcome.badnessGained}`;
	el.outcomeMood.textContent = `Mood −${outcome.moodLost}`;
	el.outcomeViolation.hidden = !outcome.violation;
	el.outcomeViolation.textContent = outcome.violation
		? `Violation +1 · ${outcome.violation.label}`
		: "";
	el.outcomeExplanation.textContent = explanation;
	el.outcomeFeedback.hidden = false;

	announce(
		`Choice outcome. Badness increased by ${outcome.badnessGained}. ` +
		`Client mood decreased by ${outcome.moodLost}. ` +
		`${outcome.violation ? `One ${outcome.violation.label} violation added. ` : ""}` +
		explanation
	);
}

function buildQuestionsForRun() {
	const recentHistory = loadQuestionHistory(window.localStorage);
	return selectQuestionsForRun(
		QUESTIONS_BASE,
		{
			count: activeMode.questionCount,
			minimumTopics: 6,
			maximumPerTopic: 2,
			minimumViolationCategories: activeMode.minimumViolationCategories,
			preferredViolationCategories: activeMode.preferredViolationCategories,
			recentQuestionWeights: getRecentQuestionWeights(recentHistory)
		},
		Math.random
	);
}

async function renderQuestion() {
	const q = questions[idx];
	interactionState = INTERACTION_STATES.PRESENTING;
	beginMessageSequence();

	updateHUD();
	resetRoundUI();
	el.gameHeading.focus();

	el.choices.classList.add("hidden");
	el.choices.innerHTML = "";

	el.clientBubble.textContent = "";
	el.therapistBubble.textContent = "";
	el.reactionBubble.textContent = "";

	// Let browser apply hidden state before typing
	await new Promise(requestAnimationFrame);

	await typeInto(el.clientBubble, `Client (confidential): ${q.client}`, 14);
	await pacingDelay(250);

	// Build choices AFTER typing finishes
	const buttons = [];
	q.choices.forEach((c, i) => {
		const btn = document.createElement("button");
		btn.className = "choiceBtn";
		btn.type = "button";
		btn.dataset.choiceIndex = String(i);
		btn.setAttribute("aria-pressed", "false");
		btn.setAttribute("aria-disabled", "false");
		btn.textContent = c.text;

		const k = document.createElement("span");
		k.className = "kbd";
		k.setAttribute("aria-hidden", "true");
		k.textContent = `${i + 1}`;
		btn.appendChild(k);

		btn.addEventListener("click", () => onPick(i));
		el.choices.appendChild(btn);
		buttons.push(btn);
	});

	// Reveal container, then animate each button in
	el.choices.classList.remove("hidden");
	await animateChoicesIn(buttons);
	locked = false;
	interactionState = INTERACTION_STATES.CHOOSING;
}

function ethicsAlarm(violation) {
	if (!reducedMotion.matches) {
		el.card.classList.remove("ethicsFlash", "shake");
		void el.card.offsetWidth;
		el.card.classList.add("ethicsFlash", "shake");
		window.setTimeout(() => el.card.classList.remove("shake"), 500);
	}
	playBeep("violation");
	showToast(`ETHICS ALARM: ${violation.label}`);
}

async function onPick(choiceIndex) {
	if (interactionState !== INTERACTION_STATES.CHOOSING || locked || typing) return;
	interactionState = INTERACTION_STATES.RESPONDING;
	beginMessageSequence();

	const q = questions[idx];
	const chosen = q.choices[choiceIndex];
	const buttons = [...el.choices.querySelectorAll("button")];
	const selectedButton = buttons.find(
		(button) => Number(button.dataset.choiceIndex) === choiceIndex
	);

	buttons.forEach((button) => {
		const selected = button === selectedButton;
		button.classList.toggle("is-selected", selected);
		button.classList.toggle("is-unselected", !selected);
		button.setAttribute("aria-pressed", String(selected));
	});
	selectedButton?.setAttribute("aria-label", `${chosen.text} Selected response`);
	lockChoices();

	const outcome = calculateChoiceOutcome({
		choice: chosen,
		currentMood: mood,
		modifiers: activeMode.scoringModifiers
	});
	applyChoiceOutcome(outcome);
	recordChoiceOutcome(q, chosen, outcome);
	updateHUD();
	showOutcome(outcome, chosen.feedback);

	const earlyEndReason = outcome.violation
		? `${outcome.violation.label} violation and client trust collapsed`
		: "Client trust collapsed beyond repair";

	el.therapistBubble.style.display = "block";
	el.reactionBubble.style.display = "block";

	await typeInto(el.therapistBubble, `Therapist (you): ${chosen.text}`, 6);
	await typeInto(el.reactionBubble, chosen.reaction, 8);

	if (outcome.violation) {
		ethicsAlarm(outcome.violation);
	} else {
		playBeep("pick");
	}

	if (outcome.sessionWillEnd) {
		announce(`The client is ending the session. ${earlyEndReason}.`);
		await pacingDelay(900);
		endSessionEarly(earlyEndReason);
		return;
	}

	interactionState = INTERACTION_STATES.ROUND_COMPLETE;
	el.nextBtn.disabled = false;
	announce("Response complete. Next question is available.");
}

function weightedScore(totalBadness, totalViolations) {
	return totalBadness + totalViolations * 2;
}

function resultLabel(totalBadness, totalViolations) {
	const maxBadness = questions.length * 3;
	const maxViolations = questions.length;
	const w = weightedScore(totalBadness, totalViolations);
	const wMax = maxBadness + maxViolations * 2;
	const pct = wMax === 0 ? 0 : w / wMax;

	if (pct <= 0.22) return "Accidentally Competent";
	if (pct <= 0.48) return "Questionable Vibes";
	if (pct <= 0.74) return "Ethics Committee Summoned";
	return "License? Never Heard Of Her";
}

function summarizeRun({ completed, reason = "" } = {}) {
	const violationCounts = new Map();
	let totalBadness = 0;
	let totalMoodLost = 0;
	let worstResponse = null;

	runHistory.forEach((entry) => {
		totalBadness += entry.badness;
		totalMoodLost += entry.moodLost;

		if (entry.violation) {
			violationCounts.set(
				entry.violation.label,
				(violationCounts.get(entry.violation.label) || 0) + 1
			);
		}

		const impact = entry.moodLost;
		if (!worstResponse || impact > worstResponse.impact) {
			worstResponse = { ...entry, impact };
		}
	});

	const violationBreakdown = [...violationCounts.entries()]
		.map(([label, count]) => ({ label, count }))
		.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
	const totalViolations = violationBreakdown.reduce((sum, item) => sum + item.count, 0);
	const moodRemaining = runHistory.length
		? runHistory[runHistory.length - 1].moodRemaining
		: 100;

	return {
		completed,
		modeId: activeMode.id,
		modeLabel: activeMode.label,
		statusLabel: completed ? "Session completed" : "Session ended early",
		reason,
		grade: resultLabel(totalBadness, totalViolations),
		totalBadness,
		totalViolations,
		totalMoodLost,
		moodRemaining,
		questionsAnswered: runHistory.length,
		questionsTotal: questions.length,
		weighted: weightedScore(totalBadness, totalViolations),
		violationBreakdown,
		worstResponse
	};
}

function escapeHTML(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}

function resultMessage(summary) {
	const notes = {
		"Accidentally Competent":
			"You kept stumbling into empathy. This game is disappointed in you (respectfully).",
		"Questionable Vibes":
			"You said some things that will echo in that client's mind forever. Probably not in a good way.",
		"Ethics Committee Summoned":
			"A mysterious clipboard person has entered the room and is taking notes aggressively.",
		"License? Never Heard Of Her":
			"You have achieved peak chaos. The client has spiritually teleported out of the session."
	};
	const violationsMarkup = summary.violationBreakdown.length
		? `<ul class="resultBreakdown">${summary.violationBreakdown
			.map((item) => `<li><span>${escapeHTML(item.label)}</span><b>${item.count}</b></li>`)
			.join("")}</ul>`
		: '<p class="resultEmpty">No formal ethics violations.</p>';
	const worstMarkup = summary.worstResponse
		? `<blockquote class="worstResponse">
			<p>${escapeHTML(summary.worstResponse.response)}</p>
			<footer>Badness +${summary.worstResponse.badness} · Mood −${summary.worstResponse.moodLost}${
				summary.worstResponse.violation
					? ` · ${escapeHTML(summary.worstResponse.violation.label)}`
					: ""
			}</footer>
		</blockquote>`
		: '<p class="resultEmpty">No responses recorded.</p>';

	return `
		<header class="resultHeader">
			<p class="resultStatus">${escapeHTML(summary.statusLabel)}</p>
			<p class="resultMode">Mode: <b>${escapeHTML(summary.modeLabel)}</b></p>
			<h3>Result: ${escapeHTML(summary.grade)}</h3>
			<p>${escapeHTML(notes[summary.grade])}</p>
			${summary.reason ? `<p class="resultReason"><b>Reason:</b> ${escapeHTML(summary.reason)}</p>` : ""}
		</header>
		<div class="resultMetrics">
			<div><span>Badness</span><b>${summary.totalBadness} / ${summary.questionsTotal * 3}</b></div>
			<div><span>Violations</span><b>${summary.totalViolations}</b></div>
			<div><span>Mood remaining</span><b>${summary.moodRemaining}</b></div>
			<div><span>Questions survived</span><b>${summary.questionsAnswered} / ${summary.questionsTotal}</b></div>
		</div>
		<section class="resultSection">
			<h4>Violation breakdown</h4>
			${violationsMarkup}
		</section>
		<section class="resultSection">
			<h4>Worst selected response</h4>
			${worstMarkup}
		</section>
	`;
}
function formatSavedRecord(label, record) {
	return record
		? `${label}: ${record.weighted} (B:${record.score} V:${record.violations})`
		: `${label}: —`;
}

function updateFinalScorePills(summary) {
	el.finalScorePill.textContent = `Final Badness: ${summary.totalBadness} / ${summary.questionsTotal * 3}`;
	el.finalViolPill.textContent = `Final Violations: ${summary.totalViolations}`;

	const saved = updateSavedRecords(window.localStorage, summary);
	const modeRecords = saved.recordsByMode[summary.modeId];
	el.bestPill.textContent = [
		formatSavedRecord("Highest Chaos", modeRecords.highestChaos),
		formatSavedRecord("Best Completed", modeRecords.bestCompleted)
	].join(" · ");
}

function showResults(summary) {
	latestResultSummary = summary;
	showScreen("result");
	updateFinalScorePills(summary);
	el.resultBox.innerHTML = resultMessage(summary);
	el.progressBar.setAttribute("aria-valuenow", String(summary.questionsAnswered));
	el.progressBar.setAttribute(
		"aria-valuetext",
		summary.completed
			? `${summary.questionsTotal} of ${summary.questionsTotal} questions completed`
			: `Session ended after ${summary.questionsAnswered} questions`
	);
	el.progressFill.style.width = "100%";
	el.resultHeading.focus();
	announce(
		`${summary.modeLabel} mode. ${summary.statusLabel}. ${summary.grade}. ` +
		`Badness ${summary.totalBadness}. Violations ${summary.totalViolations}. ` +
		`Mood remaining ${summary.moodRemaining}. ` +
		`${summary.questionsAnswered} of ${summary.questionsTotal} questions survived.`
	);
}

function finishGame() {
	interactionState = INTERACTION_STATES.RESULTS;
	endedEarly = false;
	const summary = summarizeRun({ completed: true });
	showResults(summary);
	showToast("Result ready. Copy it and flex privately.", 1400);
}

async function startGame() {
	if (contentErrors.length > 0) return;
	if (interactionState !== INTERACTION_STATES.IDLE && interactionState !== INTERACTION_STATES.RESULTS) return;
	const selectedMode = el.modePicker?.querySelector('input[name="gameMode"]:checked')?.value;
	activeMode = getMode(selectedMode);
	el.modePicker.disabled = true;
	interactionState = INTERACTION_STATES.PRESENTING;
	idx = 0;
	score = 0;
	violations = 0;
	mood = 100;
	runHistory = [];
	latestResultSummary = null;
	questions = buildQuestionsForRun();
	recordQuestionRun(window.localStorage, questions.map((question) => question.id));
	endedEarly = false;

	updateTopMeta();
	showScreen("game");
	el.progressFill.style.width = "0%";
	updateHUD();
	await renderQuestion();
}

async function next() {
	if (interactionState !== INTERACTION_STATES.ROUND_COMPLETE || typing) return;
	interactionState = INTERACTION_STATES.PRESENTING;
	idx += 1;
	if (idx >= questions.length) {
		finishGame();
		return;
	}
	el.progressFill.style.width = `${Math.round((idx / questions.length) * 100)}%`;
	await renderQuestion();
}

function restart() {
	interactionState = INTERACTION_STATES.IDLE;
	el.modePicker.disabled = false;
	showScreen("start");
	el.meta.textContent = "";
	el.progressBar.setAttribute("aria-valuenow", "0");
	el.progressBar.setAttribute("aria-valuetext", "0 of 10 questions completed");
	el.progressFill.style.width = "0%";
	el.startBtn.focus();
}

function formatShareText(summary) {
	const breakdown = summary.violationBreakdown.length
		? summary.violationBreakdown.map((item) => `${item.label}: ${item.count}`).join(", ")
		: "None";
	const worst = summary.worstResponse
		? `${summary.worstResponse.response} (Badness +${summary.worstResponse.badness}, Mood −${summary.worstResponse.moodLost}${
			summary.worstResponse.violation
				? `, ${summary.worstResponse.violation.label}`
				: ""
		})`
		: "None";

	return [
		`Bad Therapist Result: ${summary.grade}`,
		`Mode: ${summary.modeLabel}`,
		`Status: ${summary.statusLabel}`,
		summary.reason ? `Reason: ${summary.reason}` : null,
		`Badness: ${summary.totalBadness}/${summary.questionsTotal * 3}`,
		`Violations: ${summary.totalViolations} (${breakdown})`,
		`Mood Remaining: ${summary.moodRemaining}`,
		`Questions Survived: ${summary.questionsAnswered}/${summary.questionsTotal}`,
		`Worst Response: ${worst}`
	].filter(Boolean).join("\n") + "\n";
}

async function copyResult() {
	const summary = latestResultSummary || summarizeRun({ completed: !endedEarly });
	const text = formatShareText(summary);

	try {
		await navigator.clipboard.writeText(text);
		showToast("✅ Copied to clipboard");
		playBeep("pick");
	} catch {
		showToast("❌ Couldn’t copy (browser blocked it)");
	}
}

function endSessionEarly(reason) {
	interactionState = INTERACTION_STATES.RESULTS;
	endedEarly = true;
	lockChoices();
	el.nextBtn.disabled = true;
	const summary = summarizeRun({ completed: false, reason });
	showResults(summary);
	showToast("Client left the session.", 1600);
}
el.startBtn.addEventListener("click", startGame);
el.nextBtn.addEventListener("click", next);
el.restartBtn.addEventListener("click", restart);
el.shareBtn.addEventListener("click", copyResult);
function initializeContent() {
	if (contentErrors.length === 0) {
		el.contentError.hidden = true;
		el.startBtn.disabled = false;
		updateTopMeta();
		return;
	}

	el.startBtn.disabled = true;
	el.contentError.hidden = false;
	el.meta.textContent = "Game content unavailable";
	console.error("Bad Therapist content validation failed:", contentErrors);
}

el.soundBtn.addEventListener("click", () => {
	soundEnabled = !soundEnabled;
	el.soundBtn.setAttribute("aria-pressed", String(soundEnabled));
	el.soundBtn.textContent = `Sound: ${soundEnabled ? "On" : "Off"}`;
	announce(`Sound ${soundEnabled ? "on" : "off"}`);
	if (soundEnabled) playBeep("pick");
});

initializeContent();

document.addEventListener("keydown", (e) => {
	if (!el.gameScreen.classList.contains("active")) return;

	const canSkip =
		interactionState === INTERACTION_STATES.PRESENTING ||
		interactionState === INTERACTION_STATES.RESPONDING;

	if (e.code === "Space" && canSkip) {
		e.preventDefault();
		requestSkipTyping();
		return;
	}

	if (typing) return;

	if (e.key === "Enter" && interactionState === INTERACTION_STATES.ROUND_COMPLETE) {
		e.preventDefault();
		el.nextBtn.click();
		return;
	}

	const n = Number(e.key);
	if (
		!Number.isNaN(n) &&
		n >= 1 &&
		n <= 4 &&
		interactionState === INTERACTION_STATES.CHOOSING
	) {
		const btn = el.choices.querySelector(`button[data-choice-index="${n - 1}"]`);
		if (btn && !btn.disabled) btn.click();
	}
});
