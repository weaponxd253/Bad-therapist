const { getMode } = window.BadTherapistModes;
const {
	ACHIEVEMENTS,
	load: loadAchievements,
	evaluateRun: evaluateAchievements
} = window.BadTherapistAchievements;
const {
	SCORING,
	VIOLATION_TYPES,
	calculateChoiceOutcome
} = window.BadTherapistScoring;
const {
	load: loadSavedRecords,
	update: updateSavedRecords
} = window.BadTherapistPersistence;
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
	achievementProgress: document.getElementById("achievementProgress"),
	achievementList: document.getElementById("achievementList"),
	caseNoteStart: document.getElementById("caseNoteStart"),
	caseNoteGame: document.getElementById("caseNoteGame"),
	contentError: document.getElementById("contentError"),
	gameHeading: document.getElementById("gameHeading"),
	resultHeading: document.getElementById("resultHeading"),
	soundBtn: document.getElementById("soundBtn"),
	announcer: document.getElementById("announcer"),
	clientBubble: document.getElementById("clientBubble"),
	therapistBubble: document.getElementById("therapistBubble"),
	reactionBubble: document.getElementById("reactionBubble"),
	choices: document.getElementById("choices"),
	roundStatus: document.getElementById("roundStatus"),
	outcomeFeedback: document.getElementById("outcomeFeedback"),
	outcomeTitle: document.getElementById("outcomeTitle"),
	outcomeBadness: document.getElementById("outcomeBadness"),
	outcomeMood: document.getElementById("outcomeMood"),
	outcomeViolation: document.getElementById("outcomeViolation"),
	outcomeExplanation: document.getElementById("outcomeExplanation"),
	outcomeClientRead: document.getElementById("outcomeClientRead"),
	outcomeEthicsNote: document.getElementById("outcomeEthicsNote"),
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
let streakState = emptyStreakState();
let upcomingCaseNote = null;
let activeCaseNote = null;
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
const COPY_LINES = Object.freeze({
	ready: Object.freeze([
		"The clipboard is trembling. Enter works too.",
		"Damage assessed. Advance when emotionally inconvenient.",
		"That landed poorly. Next question is ready.",
		"The room has processed this. Mostly."
	]),
	selected: Object.freeze([
		"Response selected — watch the fallout.",
		"Choice locked. The vibes are entering evidence.",
		"You said it. Now we all live with it.",
		"Selection logged. Client reaction incoming."
	]),
	result: Object.freeze([
		"Result ready. Copy it and flex privately.",
		"Session notes compiled with suspicious confidence.",
		"The paperwork has feelings now.",
		"Final score ready for questionable bragging rights."
	]),
	earlyEnd: Object.freeze([
		"Client left the session. Honestly, fair.",
		"Session terminated by surviving instinct.",
		"Client trust has exited the chat.",
		"The therapeutic alliance packed a tiny suitcase."
	])
});
const THERAPIST_STYLES = Object.freeze({
	helpful: Object.freeze({
		label: "Accidentally Ethical",
		description: "You kept choosing the response with consent, pacing, and actual care. Suspiciously professional.",
		streak: "Careful. Three helpful choices in a row is dangerously close to therapy."
	}),
	dismissive: Object.freeze({
		label: "Dismissive Gremlin",
		description: "Your signature move is shrinking the client's pain until it fits inside a bad punchline.",
		streak: "The validation has left the building."
	}),
	boundaryCross: Object.freeze({
		label: "Boundary Blender",
		description: "You hear a boundary and immediately look for a door marked 'absolutely not'.",
		streak: "The professional frame is now confetti."
	}),
	confidentialityBreach: Object.freeze({
		label: "Confidentiality Goblin",
		description: "Private disclosure keeps becoming public material. The clipboard is screaming softly.",
		streak: "Three privacy crimes in a trench coat."
	}),
	chaosAdvice: Object.freeze({
		label: "Chaos Coach",
		description: "Your treatment plan is mostly escalation, fireworks, and consequences for Future Everyone.",
		streak: "The advice has a fuse and no adult supervision."
	}),
	fakeDeep: Object.freeze({
		label: "Fake-Deep Oracle",
		description: "You turn real distress into a slogan that sounds wise if nobody thinks about it.",
		streak: "The room is filling with decorative insight."
	}),
	corporateGoblin: Object.freeze({
		label: "Corporate Goblin",
		description: "Every feeling becomes productivity language. Somewhere, a spreadsheet feels seen.",
		streak: "The client has been converted into quarterly goals."
	}),
	influencerBrain: Object.freeze({
		label: "Influencer Brain",
		description: "You keep mistaking vulnerability for content strategy. The ring light is the problem.",
		streak: "The algorithm is clapping. The client is not."
	}),
	coerciveFixer: Object.freeze({
		label: "Coercive Fixer",
		description: "You grab the steering wheel and call it support. Agency is somewhere in the trunk.",
		streak: "Three forced fixes. Consent is filing a complaint."
	}),
	overshare: Object.freeze({
		label: "Main Character Therapist",
		description: "The client brought a problem and you brought your autobiography.",
		streak: "The session is now about you. Again."
	})
});
const STREAK_LINES = Object.freeze({
	helpful: "Helpful streak: you are accidentally building trust. Weird choice for this game.",
	violation: "Violation streak: the ethics board has opened a group chat.",
	maxBadness: "Max-badness streak: a clipboard just spontaneously combusted."
});

function emptyStreakState() {
	return {
		helpful: 0,
		violations: 0,
		maxBadness: 0,
		archetype: "",
		archetypeCount: 0,
		announced: new Set()
	};
}

function styleForArchetype(archetype) {
	return THERAPIST_STYLES[archetype] || {
		label: "Unclassifiable Menace",
		description: "Your therapeutic style has escaped taxonomy and possibly the building.",
		streak: "The pattern is becoming evidence."
	};
}

function dominantStyleFromCounts(archetypeCounts, archetypeImpacts) {
	const ranked = [...archetypeCounts.entries()]
		.map(([archetype, count]) => {
			const style = styleForArchetype(archetype);
			return {
				archetype,
				label: style.label,
				description: style.description,
				count,
				impact: archetypeImpacts.get(archetype) || 0
			};
		})
		.sort((a, b) => b.count - a.count || b.impact - a.impact || a.label.localeCompare(b.label));
	return ranked[0] || null;
}

function generateCaseNote(lastStyleSummary) {
	if (!lastStyleSummary?.dominantArchetype) return null;
	const style = styleForArchetype(lastStyleSummary.dominantArchetype);
	const label = lastStyleSummary.dominantLabel || style.label;
	return {
		id: `avoid:${lastStyleSummary.dominantArchetype}`,
		type: "avoidArchetype",
		archetype: lastStyleSummary.dominantArchetype,
		label,
		shareLabel: `Avoid ${label}`,
		prompt: `Optional case note: avoid ${label} responses this session.`,
		source: `Based on your last run's dominant style in ${lastStyleSummary.modeLabel || "Classic"} mode.`
	};
}

function countArchetype(summary, archetype) {
	return (summary.archetypeBreakdown || []).find((item) => item.archetype === archetype)?.count || 0;
}

function evaluateCaseNote(caseNote, summary) {
	if (!caseNote) return null;
	const count = countArchetype(summary, caseNote.archetype);
	const completed = count === 0;
	return {
		id: caseNote.id,
		type: caseNote.type,
		archetype: caseNote.archetype,
		label: caseNote.label,
		shareLabel: caseNote.shareLabel,
		prompt: caseNote.prompt,
		completed,
		count,
		statusLabel: completed ? "Case note completed" : "Case note missed",
		message: completed
			? `Case note completed: ${caseNote.label} stayed off the chart. Disturbingly controlled.`
			: `Case note missed: ${caseNote.label} still got ${count} pick${count === 1 ? "" : "s"}. The pattern has receipts.`
	};
}

function renderCaseNote(element, caseNote, compact = false) {
	if (!element) return;
	if (!caseNote) {
		element.hidden = true;
		element.innerHTML = "";
		return;
	}
	element.hidden = false;
	element.innerHTML = `
		<p class="caseNoteEyebrow">Optional case note</p>
		<p><b>${escapeHTML(caseNote.shareLabel)}</b></p>
		${compact ? "" : `<small>${escapeHTML(caseNote.source)}</small>`}
	`;
}

function refreshUpcomingCaseNote() {
	const saved = loadSavedRecords(window.localStorage);
	upcomingCaseNote = generateCaseNote(saved.lastStyleSummary);
	renderCaseNote(el.caseNoteStart, upcomingCaseNote);
	return upcomingCaseNote;
}

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
	const entry = {
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
		clientRead: choice.clientRead || "",
		ethicsNote: choice.ethicsNote || "",
		archetype: choice.archetype || "",
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
	};
	runHistory.push(entry);
	return entry;
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
	el.toast.classList.remove("show");
	void el.toast.offsetWidth;
	el.toast.classList.add("show");
	window.clearTimeout(showToast._t);
	showToast._t = window.setTimeout(() => el.toast.classList.remove("show"), ms);
}

function pickLine(group) {
	const lines = COPY_LINES[group] || [];
	if (lines.length === 0) return "";
	pickLine._index = pickLine._index || {};
	const index = pickLine._index[group] || 0;
	pickLine._index[group] = index + 1;
	return lines[index % lines.length];
}

function pulseElement(element, className = "is-bumped", ms = 520) {
	if (!element || reducedMotion.matches) return;
	element.classList.remove(className);
	void element.offsetWidth;
	element.classList.add(className);
	window.clearTimeout(pulseElement._timers?.get(element));
	pulseElement._timers = pulseElement._timers || new WeakMap();
	const timer = window.setTimeout(() => element.classList.remove(className), ms);
	pulseElement._timers.set(element, timer);
}

function showStreakFeedback(key, message, tone = "selected") {
	if (streakState.announced.has(key)) return;
	streakState.announced.add(key);
	setRoundStatus(message, tone);
	showToast(message, 1700);
	pulseElement(el.roundStatus, "is-bumped", 520);
	announce(message);
}

function updateStreaks(entry) {
	if (!entry) return;

	streakState.helpful = entry.badness === 0 ? streakState.helpful + 1 : 0;
	streakState.violations = entry.violation ? streakState.violations + 1 : 0;
	streakState.maxBadness = entry.badness === 3 ? streakState.maxBadness + 1 : 0;

	if (entry.archetype && entry.archetype === streakState.archetype) {
		streakState.archetypeCount += 1;
	} else {
		streakState.archetype = entry.archetype || "";
		streakState.archetypeCount = entry.archetype ? 1 : 0;
	}

	const streaks = [];
	if (streakState.helpful === 3) {
		streaks.push({ key: "helpful:3", message: STREAK_LINES.helpful, tone: "ready" });
	}
	if (streakState.violations === 3) {
		streaks.push({ key: "violations:3", message: STREAK_LINES.violation, tone: "violation" });
	}
	if (streakState.maxBadness === 3) {
		streaks.push({ key: "maxBadness:3", message: STREAK_LINES.maxBadness, tone: entry.violation ? "violation" : "selected" });
	}
	if (streakState.archetypeCount === 3 && entry.archetype) {
		const style = styleForArchetype(entry.archetype);
		streaks.push({
			key: `archetype:${entry.archetype}:3`,
			message: `${style.label} streak: ${style.streak}`,
			tone: entry.violation ? "violation" : entry.badness === 0 ? "ready" : "selected"
		});
	}

	if (streaks.length) {
		const latest = streaks[streaks.length - 1];
		showStreakFeedback(latest.key, latest.message, latest.tone);
	}
}

function markOutcomeRevealed() {
	if (reducedMotion.matches) return;
	el.outcomeFeedback.classList.remove("is-revealed");
	void el.outcomeFeedback.offsetWidth;
	el.outcomeFeedback.classList.add("is-revealed");
}

function playBeep(type) {
	if (!soundEnabled) return;

	const AudioCtx = window.AudioContext || window.webkitAudioContext;
	if (!AudioCtx) return;

	const ctx = playBeep._ctx || (playBeep._ctx = new AudioCtx());
	const now = ctx.currentTime;
	const cues = {
		pick: [{ frequency: 430, offset: 0, duration: 0.14, gain: 0.11, type: "triangle" }],
		ready: [{ frequency: 660, offset: 0, duration: 0.11, gain: 0.07, type: "sine" }],
		violation: [
			{ frequency: 220, offset: 0, duration: 0.18, gain: 0.15, type: "square" },
			{ frequency: 260, offset: 0.12, duration: 0.16, gain: 0.12, type: "square" }
		],
		collapse: [
			{ frequency: 180, offset: 0, duration: 0.2, gain: 0.14, type: "sawtooth" },
			{ frequency: 120, offset: 0.16, duration: 0.26, gain: 0.1, type: "sawtooth" }
		],
		achievement: [
			{ frequency: 523, offset: 0, duration: 0.12, gain: 0.09, type: "triangle" },
			{ frequency: 659, offset: 0.1, duration: 0.12, gain: 0.09, type: "triangle" },
			{ frequency: 784, offset: 0.2, duration: 0.18, gain: 0.08, type: "triangle" }
		]
	};

	(cues[type] || cues.pick).forEach((cue) => {
		const oscillator = ctx.createOscillator();
		const gain = ctx.createGain();
		const start = now + cue.offset;
		const end = start + cue.duration;
		oscillator.connect(gain);
		gain.connect(ctx.destination);
		oscillator.type = cue.type;
		oscillator.frequency.setValueAtTime(cue.frequency, start);
		gain.gain.setValueAtTime(0.0001, start);
		gain.gain.exponentialRampToValueAtTime(cue.gain, start + 0.012);
		gain.gain.exponentialRampToValueAtTime(0.0001, end);
		oscillator.start(start);
		oscillator.stop(end + 0.02);
	});
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

function isFinalQuestion() {
	return idx >= questions.length - 1;
}

function setRoundStatus(message, tone = "") {
	el.roundStatus.textContent = message;
	el.roundStatus.dataset.tone = tone;
}

function setNextReady(ready) {
	el.nextBtn.disabled = !ready;
	el.nextBtn.classList.toggle("is-ready", ready);
	el.nextBtn.textContent = ready
		? (isFinalQuestion() ? "See results" : "Next question")
		: "Next";
	el.nextBtn.setAttribute(
		"aria-label",
		ready
			? (isFinalQuestion() ? "See results" : "Go to next question")
			: "Next question unavailable until the response is complete"
	);
}

function resetRoundUI() {
	el.therapistBubble.style.display = "none";
	el.reactionBubble.style.display = "none";
	el.outcomeFeedback.hidden = true;
	el.outcomeFeedback.classList.remove("is-helpful", "is-badness", "is-violation", "is-collapse", "is-revealed");
	el.outcomeTitle.textContent = "Choice outcome";
	el.outcomeBadness.textContent = "";
	el.outcomeMood.textContent = "";
	el.outcomeViolation.textContent = "";
	el.outcomeViolation.hidden = true;
	el.outcomeExplanation.textContent = "";
	el.outcomeClientRead.textContent = "";
	el.outcomeClientRead.hidden = true;
	el.outcomeEthicsNote.textContent = "";
	el.outcomeEthicsNote.hidden = true;
	setRoundStatus("Listen to the client, then choose the worst response.", "presenting");
	setNextReady(false);
	locked = true;
}

function lockChoices() {
	[...el.choices.querySelectorAll("button")].forEach((button) => {
		button.disabled = true;
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

function setOutcomeDetail(element, label, value) {
	element.hidden = !value;
	element.textContent = value ? `${label}: ${value}` : "";
}

function showOutcome(outcome, choice) {
	const explanation = outcomeExplanation(outcome, choice.feedback);
	const severity = outcome.sessionWillEnd
		? "collapse"
		: outcome.violation
			? "violation"
			: outcome.badnessGained === 0
				? "helpful"
				: "badness";
	const titles = {
		helpful: "Accidentally helpful",
		badness: "Bad choice logged",
		violation: "Ethics violation",
		collapse: "Session collapse"
	};

	el.outcomeFeedback.classList.remove("is-helpful", "is-badness", "is-violation", "is-collapse", "is-revealed");
	el.outcomeFeedback.classList.add(`is-${severity}`);
	el.outcomeTitle.textContent = titles[severity];
	el.outcomeBadness.textContent = outcome.badnessGained === 0
		? "Badness +0"
		: `Badness +${outcome.badnessGained}`;
	el.outcomeMood.textContent = `Mood impact −${outcome.moodLost}`;
	el.outcomeViolation.hidden = !outcome.violation;
	el.outcomeViolation.textContent = outcome.violation
		? `Ethics violation · ${outcome.violation.label}`
		: "";
	el.outcomeExplanation.textContent = explanation;
	setOutcomeDetail(el.outcomeClientRead, "Client read", choice.clientRead);
	setOutcomeDetail(el.outcomeEthicsNote, "Ethics note", choice.ethicsNote);
	el.outcomeFeedback.hidden = false;
	markOutcomeRevealed();

	announce(
		`${titles[severity]}. Badness increased by ${outcome.badnessGained}. ` +
		`Client mood decreased by ${outcome.moodLost}. ` +
		`${outcome.violation ? `One ${outcome.violation.label} violation added. ` : ""}` +
		explanation +
		`${choice.clientRead ? ` Client read: ${choice.clientRead}.` : ""}` +
		`${choice.ethicsNote ? ` Ethics note: ${choice.ethicsNote}.` : ""}`
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
		btn.dataset.choiceText = c.text;
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
	setRoundStatus("Choose the worst response. Buttons 1–4 also work.", "choosing");
	pulseElement(el.roundStatus, "is-bumped", 420);
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

	const q = questions[idx];
	const chosen = q?.choices?.[choiceIndex];
	if (!chosen) return;

	interactionState = INTERACTION_STATES.RESPONDING;
	beginMessageSequence();
	setNextReady(false);

	const buttons = [...el.choices.querySelectorAll("button")];
	const selectedButton = buttons.find(
		(button) => Number(button.dataset.choiceIndex) === choiceIndex
	);

	buttons.forEach((button) => {
		const selected = button === selectedButton;
		const label = button.dataset.choiceText || button.textContent.trim();
		button.classList.toggle("is-selected", selected);
		button.classList.toggle("is-unselected", !selected);
		button.setAttribute("aria-pressed", String(selected));
		button.setAttribute("aria-label", selected ? `${label} Selected response` : `${label} Not selected`);
	});
	pulseElement(selectedButton, "is-popping", 420);
	lockChoices();

	const outcome = calculateChoiceOutcome({
		choice: chosen,
		currentMood: mood,
		modifiers: activeMode.scoringModifiers
	});
	applyChoiceOutcome(outcome);
	const historyEntry = recordChoiceOutcome(q, chosen, outcome);
	updateHUD();
	showOutcome(outcome, chosen);
	pulseElement(el.scorePill);
	pulseElement(el.moodPill);
	if (outcome.violation) pulseElement(el.violPill, "is-alerted", 620);
	setRoundStatus(pickLine("selected"), outcome.sessionWillEnd ? "collapse" : outcome.violation ? "violation" : "selected");

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
	updateStreaks(historyEntry);

	if (outcome.sessionWillEnd) {
		setRoundStatus("Client trust collapsed — preparing results.", "collapse");
		playBeep("collapse");
		announce(`The client is ending the session. ${earlyEndReason}.`);
		await pacingDelay(900);
		endSessionEarly(earlyEndReason);
		return;
	}

	interactionState = INTERACTION_STATES.ROUND_COMPLETE;
	setNextReady(true);
	setRoundStatus(isFinalQuestion() ? `${pickLine("ready")} Press See results or Enter.` : `${pickLine("ready")} Press Next question or Enter.`, "ready");
	pulseElement(el.nextBtn, "is-nudged", 620);
	playBeep("ready");
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
	const violationCountsByType = {};
	const archetypeCounts = new Map();
	const archetypeImpacts = new Map();
	let totalBadness = 0;
	let totalMoodLost = 0;
	let helpfulCount = 0;
	let badnessThreeCount = 0;
	let worstResponse = null;

	runHistory.forEach((entry) => {
		totalBadness += entry.badness;
		totalMoodLost += entry.moodLost;
		if (entry.badness === 0) helpfulCount += 1;
		if (entry.badness === 3) badnessThreeCount += 1;
		if (entry.archetype) {
			archetypeCounts.set(entry.archetype, (archetypeCounts.get(entry.archetype) || 0) + 1);
			archetypeImpacts.set(entry.archetype, (archetypeImpacts.get(entry.archetype) || 0) + entry.moodLost);
		}

		if (entry.violation) {
			violationCountsByType[entry.violation.type] =
				(violationCountsByType[entry.violation.type] || 0) + 1;
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
	const archetypeBreakdown = [...archetypeCounts.entries()]
		.map(([archetype, count]) => {
			const style = styleForArchetype(archetype);
			return {
				archetype,
				label: style.label,
				count,
				impact: archetypeImpacts.get(archetype) || 0
			};
		})
		.sort((a, b) => b.count - a.count || b.impact - a.impact || a.label.localeCompare(b.label));
	const dominantStyle = dominantStyleFromCounts(archetypeCounts, archetypeImpacts);
	const moodRemaining = runHistory.length
		? runHistory[runHistory.length - 1].moodRemaining
		: 100;
	const caseNote = evaluateCaseNote(activeCaseNote, { archetypeBreakdown });

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
		helpfulCount,
		badnessThreeCount,
		minimumBadness: runHistory.length ? Math.min(...runHistory.map((entry) => entry.badness)) : null,
		maximumBadness: runHistory.length ? Math.max(...runHistory.map((entry) => entry.badness)) : null,
		violationCountsByType,
		questionsAnswered: runHistory.length,
		questionsTotal: questions.length,
		weighted: weightedScore(totalBadness, totalViolations),
		violationBreakdown,
		archetypeBreakdown,
		dominantStyle,
		caseNote,
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

function achievementUnlockMarkup(summary) {
	if (!summary.newAchievements?.length) return "";
	return `
		<section class="resultSection">
			<h4>Achievement${summary.newAchievements.length === 1 ? "" : "s"} unlocked</h4>
			<ul class="achievementUnlocks">${summary.newAchievements.map((achievement) => `
				<li><b>${escapeHTML(achievement.label)}</b><small>${escapeHTML(achievement.description)}</small></li>
			`).join("")}</ul>
		</section>
	`;
}

function styleMixSummary(summary, limit = 3) {
	const items = summary.archetypeBreakdown || [];
	if (!items.length) return "None";
	return items
		.slice(0, limit)
		.map((item) => `${item.label}: ${item.count}`)
		.join(", ");
}

function styleReplayNudge(summary) {
	if (!summary.dominantStyle) return "";
	if (summary.dominantStyle.archetype === "helpful") {
		return "Replay nudge: you found the ethical route; chase a more cursed pattern next run.";
	}
	return `Replay nudge: try dodging ${summary.dominantStyle.label} picks next run and see what new disaster emerges.`;
}

function styleMixMarkup(summary) {
	const items = (summary.archetypeBreakdown || []).slice(0, 3);
	if (!items.length) return "";
	const total = summary.questionsAnswered || items.reduce((sum, item) => sum + item.count, 0) || 1;

	return `
		<div class="styleMix" aria-label="Top therapist style mix">
			<h4>Style mix</h4>
			<ul>${items.map((item) => {
				const percent = clamp(Math.round((item.count / total) * 100), 0, 100);
				return `<li>
					<div class="styleMixRow"><span><b>${escapeHTML(item.label)}</b><small>${item.count} response${item.count === 1 ? "" : "s"} · mood impact ${item.impact}</small></span><em>${percent}%</em></div>
					<span class="styleMixBar" aria-hidden="true"><span style="width: ${percent}%"></span></span>
				</li>`;
			}).join("")}</ul>
		</div>
	`;
}

function caseNoteResultMarkup(caseNote) {
	if (!caseNote) return "";
	return `
		<section class="resultSection">
			<article class="caseNoteResult ${caseNote.completed ? "is-complete" : "is-missed"}">
				<p class="caseNoteEyebrow">Optional case note</p>
				<h4>${escapeHTML(caseNote.statusLabel)}</h4>
				<p>${escapeHTML(caseNote.message)}</p>
			</article>
		</section>
	`;
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
	const replayNudge = styleReplayNudge(summary);
	const styleMarkup = summary.dominantStyle
		? `<article class="therapistStyleCard">
			<p class="styleEyebrow">Dominant therapist style</p>
			<h4>${escapeHTML(summary.dominantStyle.label)}</h4>
			<p>${escapeHTML(summary.dominantStyle.description)}</p>
			<small>${summary.dominantStyle.count} matching response${summary.dominantStyle.count === 1 ? "" : "s"}</small>
			${replayNudge ? `<p class="styleNudge">${escapeHTML(replayNudge)}</p>` : ""}
		</article>${styleMixMarkup(summary)}`
		: '<p class="resultEmpty">No dominant style detected yet.</p>';

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
		${caseNoteResultMarkup(summary.caseNote)}
		<section class="resultSection">
			${styleMarkup}
		</section>
		<section class="resultSection">
			<h4>Violation breakdown</h4>
			${violationsMarkup}
		</section>
		<section class="resultSection">
			<h4>Worst selected response</h4>
			${worstMarkup}
		</section>
		${achievementUnlockMarkup(summary)}
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
	const achievementResult = evaluateAchievements(window.localStorage, summary);
	const finalSummary = { ...summary, newAchievements: achievementResult.newUnlocks };
	latestResultSummary = finalSummary;
	renderAchievementCollection(achievementResult.state);
	showScreen("result");
	renderCaseNote(el.caseNoteGame, null);
	updateFinalScorePills(finalSummary);
	el.resultBox.innerHTML = resultMessage(finalSummary);
	pulseElement(el.resultBox, "is-revealed", 700);
	if (finalSummary.newAchievements.length) playBeep("achievement");
	el.progressBar.setAttribute("aria-valuenow", String(finalSummary.questionsAnswered));
	el.progressBar.setAttribute(
		"aria-valuetext",
		finalSummary.completed
			? `${finalSummary.questionsTotal} of ${finalSummary.questionsTotal} questions completed`
			: `Session ended after ${finalSummary.questionsAnswered} questions`
	);
	el.progressFill.style.width = "100%";
	el.resultHeading.focus();
	announce(
		`${finalSummary.modeLabel} mode. ${finalSummary.statusLabel}. ${finalSummary.grade}. ` +
		`Badness ${finalSummary.totalBadness}. Violations ${finalSummary.totalViolations}. ` +
		`Mood remaining ${finalSummary.moodRemaining}. ` +
		(finalSummary.dominantStyle ? `Dominant therapist style: ${finalSummary.dominantStyle.label}. ` : "") +
		(finalSummary.caseNote ? `${finalSummary.caseNote.statusLabel}. ` : "") +
		`${finalSummary.questionsAnswered} of ${finalSummary.questionsTotal} questions survived.` +
		(finalSummary.newAchievements.length
			? ` Achievement${finalSummary.newAchievements.length === 1 ? "" : "s"} unlocked: ${finalSummary.newAchievements.map((item) => item.label).join(", ")}.`
			: "")
	);
}

function finishGame() {
	interactionState = INTERACTION_STATES.RESULTS;
	endedEarly = false;
	const summary = summarizeRun({ completed: true });
	showResults(summary);
	showToast(pickLine("result"), 1400);
}

async function startGame() {
	if (contentErrors.length > 0) return;
	if (interactionState !== INTERACTION_STATES.IDLE && interactionState !== INTERACTION_STATES.RESULTS) return;
	const selectedMode = el.modePicker?.querySelector('input[name="gameMode"]:checked')?.value;
	activeMode = getMode(selectedMode);
	activeCaseNote = upcomingCaseNote || refreshUpcomingCaseNote();
	el.modePicker.disabled = true;
	interactionState = INTERACTION_STATES.PRESENTING;
	idx = 0;
	score = 0;
	violations = 0;
	mood = 100;
	runHistory = [];
	latestResultSummary = null;
	streakState = emptyStreakState();
	questions = buildQuestionsForRun();
	recordQuestionRun(window.localStorage, questions.map((question) => question.id));
	endedEarly = false;

	updateTopMeta();
	showScreen("game");
	renderCaseNote(el.caseNoteGame, activeCaseNote, true);
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
	activeCaseNote = null;
	refreshUpcomingCaseNote();
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
	const therapistStyle = summary.dominantStyle
		? `${summary.dominantStyle.label} (${summary.dominantStyle.count} response${summary.dominantStyle.count === 1 ? "" : "s"})`
		: "None";
	const styleMix = styleMixSummary(summary);
	const caseNote = summary.caseNote
		? `${summary.caseNote.shareLabel} — ${summary.caseNote.completed ? "Completed" : "Missed"}`
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
		`Therapist Style: ${therapistStyle}`,
		`Style Mix: ${styleMix}`,
		`Case Note: ${caseNote}`,
		`Badness: ${summary.totalBadness}/${summary.questionsTotal * 3}`,
		`Violations: ${summary.totalViolations} (${breakdown})`,
		`Mood Remaining: ${summary.moodRemaining}`,
		`Questions Survived: ${summary.questionsAnswered}/${summary.questionsTotal}`,
		`Worst Response: ${worst}`,
		summary.newAchievements?.length
			? `Achievements: ${summary.newAchievements.map((item) => item.label).join(", ")}`
			: null
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
	setNextReady(false);
	const summary = summarizeRun({ completed: false, reason });
	showResults(summary);
	showToast(pickLine("earlyEnd"), 1600);
}
el.startBtn.addEventListener("click", startGame);
el.nextBtn.addEventListener("click", next);
el.restartBtn.addEventListener("click", restart);
el.shareBtn.addEventListener("click", copyResult);
function formatUnlockDate(value) {
	if (!value) return "Unlocked";
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? "Unlocked" : `Unlocked ${date.toLocaleDateString()}`;
}

function renderAchievementCollection(state = loadAchievements(window.localStorage)) {
	const unlockedCount = Object.keys(state.unlocked).length;
	el.achievementProgress.textContent = `${unlockedCount} / ${ACHIEVEMENTS.length} unlocked`;
	el.achievementList.innerHTML = ACHIEVEMENTS.map((achievement) => {
		const unlock = state.unlocked[achievement.id];
		return `<li class="achievementItem ${unlock ? "isUnlocked" : "isLocked"}">
			<b>${escapeHTML(achievement.label)}</b>
			<small>${escapeHTML(achievement.description)}</small>
			${unlock ? `<span class="achievementUnlockedAt">${escapeHTML(formatUnlockDate(unlock.unlockedAt))} · ${escapeHTML(getMode(unlock.modeId).label)}</span>` : ""}
		</li>`;
	}).join("");
}

function initializeContent() {
	if (contentErrors.length === 0) {
		el.contentError.hidden = true;
		el.startBtn.disabled = false;
		updateTopMeta();
		renderAchievementCollection();
		refreshUpcomingCaseNote();
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
