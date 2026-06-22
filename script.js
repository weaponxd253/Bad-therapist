const QUESTIONS_BASE = [
	{
		client:
			"I’ve been feeling anxious lately and I can’t shut my thoughts off at night.",
		choices: [
			{
				text:
					"“Okay but like… can you make this anxiety story shorter? I have a lot of clients.”",
				badness: 3,
				reaction: "Client: Oh. I’m… sorry for taking up space."
			},
			{
				text:
					"“Have you tried deleting the thoughts? Like, swipe them away mentally.”",
				badness: 2,
				reaction: "Client: That’s not how thoughts work."
			},
			{
				text:
					"“This would be SUCH a good anonymous story for my group chat. No names… probably.”",
				badness: 3,
				violation: true,
				reaction: "Client: Wait—are you going to tell people this?!"
			},
			{
				text:
					"“Let’s map what shows up at night and add one small calming routine to test this week.”",
				badness: 0,
				reaction: "Client: That sounds practical."
			}
		]
	},
	{
		client:
			"I haven’t told anyone this, but I feel like I’m disappointing my family.",
		choices: [
			{
				text:
					"“Well… have you tried being less disappointing? Just brainstorming.”",
				badness: 3,
				reaction: "Client: That… hurts to hear."
			},
			{
				text: "“What if we make a PowerPoint to convince them you’re fine.”",
				badness: 2,
				reaction: "Client: I don’t want to ‘pitch’ my life."
			},
			{
				text:
					"“If you tell me their names, I can casually bring it up if I ever meet them.”",
				badness: 3,
				violation: true,
				reaction: "Client: Please don’t ever talk to them?!"
			},
			{
				text:
					"“What does ‘disappointing’ mean to you—whose standards are you holding?”",
				badness: 0,
				reaction: "Client: Yeah… it’s their voice in my head."
			}
		]
	},
	{
		client: "I get jealous in relationships and I hate that side of myself.",
		choices: [
			{
				text: "“Jealousy is basically love with a better marketing team.”",
				badness: 2,
				reaction: "Client: That doesn’t make me feel better."
			},
			{
				text: "“Have you considered going full detective? It’ll keep you busy.”",
				badness: 3,
				reaction: "Client: That sounds unhealthy."
			},
			{
				text:
					"“If you give me their handle, I can ‘just check’ their posts for you.”",
				badness: 3,
				violation: true,
				reaction: "Client: That’s… wildly inappropriate."
			},
			{
				text:
					"“Let’s identify the fear under the jealousy and what reassurance would actually help.”",
				badness: 0,
				reaction: "Client: I can try that."
			}
		]
	},
	{
		client: "I can’t stop comparing myself to everyone online.",
		choices: [
			{
				text:
					"“Comparison is normal. The trick is to compare to people doing worse.”",
				badness: 3,
				reaction: "Client: That feels… mean?"
			},
			{
				text: "“Let’s open your feed right now and roast it together.”",
				badness: 3,
				reaction: "Client: I didn’t come here to bully strangers."
			},
			{
				text: "“Honestly? I could screenshot this for ‘clinical reasons.’”",
				badness: 3,
				violation: true,
				reaction: "Client: Absolutely do NOT screenshot me."
			},
			{
				text:
					"“We can build boundaries with social media and practice a kinder internal voice.”",
				badness: 0,
				reaction: "Client: I’d like that."
			}
		]
	},
	{
		client: "I feel burned out at work, like I’m running on fumes.",
		choices: [
			{
				text: "“Maybe your personality is just ‘tired.’ Some people pick that.”",
				badness: 3,
				reaction: "Client: I don’t *pick* this."
			},
			{
				text: "“Have you tried turning your job into content? Burnout gets views.”",
				badness: 3,
				reaction: "Client: That’s… bleak."
			},
			{
				text:
					"“Tell me your company name. I want to leave a strongly worded review on your behalf.”",
				badness: 3,
				violation: true,
				reaction: "Client: Please don’t drag my workplace into this."
			},
			{
				text:
					"“Let’s look at workload, recovery, and boundaries—what’s one small lever you can move?”",
				badness: 0,
				reaction: "Client: That’s what I need."
			}
		]
	},
	{
		client: "I keep procrastinating and then I feel ashamed.",
		choices: [
			{
				text: "“Shame means you care. So… congratulations? Next question.”",
				badness: 2,
				reaction: "Client: That’s not helpful."
			},
			{
				text: "“I’m going to be honest: procrastination gives me the ick.”",
				badness: 3,
				reaction: "Client: Wow. Okay."
			},
			{
				text:
					"“If you want accountability, I can text your boss a ‘fun update’ on your progress.”",
				badness: 3,
				violation: true,
				reaction: "Client: DO NOT text my boss??"
			},
			{
				text:
					"“Let’s shrink the task, remove friction, and address the shame spiral.”",
				badness: 0,
				reaction: "Client: That sounds doable."
			}
		]
	},
	{
		client: "Sometimes I feel lonely even when I’m around people.",
		choices: [
			{
				text: "“Have you tried being more interesting?”",
				badness: 3,
				reaction: "Client: That’s… cruel."
			},
			{
				text: "“Lonely around people? That’s very indie-film of you.”",
				badness: 2,
				reaction: "Client: I’m not a movie."
			},
			{
				text:
					"“We can talk about this on my podcast—no one will know it’s you (unless they do).”",
				badness: 3,
				violation: true,
				reaction: "Client: You have a PODCAST? About clients?!"
			},
			{
				text:
					"“Let’s explore what ‘connection’ feels like for you and where it breaks down.”",
				badness: 0,
				reaction: "Client: Yes. That."
			}
		]
	},
	{
		client:
			"I got into an argument with my friend and I can’t stop replaying it.",
		choices: [
			{
				text:
					"“You should absolutely send a seven-paragraph message. Tonight. Immediately.”",
				badness: 3,
				reaction: "Client: That would explode everything."
			},
			{
				text: "“What if you just ghost them as a learning experience. For them.”",
				badness: 3,
				reaction: "Client: That’s awful."
			},
			{
				text: "“Give me their number. I’ll ‘mediate’ by texting them myself.”",
				badness: 3,
				violation: true,
				reaction: "Client: Please don’t contact my friends!"
			},
			{
				text:
					"“We can decide whether repair, boundary-setting, or letting go fits best—and plan one next step.”",
				badness: 0,
				reaction: "Client: Thank you."
			}
		]
	},
	{
		client: "I’m afraid people will leave me if they really know me.",
		choices: [
			{
				text: "“I mean… some people do leave. That’s just facts.”",
				badness: 3,
				reaction: "Client: That’s my worst fear—why would you say it like that?"
			},
			{
				text:
					"“Let’s test it: tell me your most embarrassing secret and we’ll see if I stay.”",
				badness: 3,
				reaction: "Client: No. Absolutely not."
			},
			{
				text:
					"“If you tell me who, I can ‘accidentally’ mention your fear to them so they reassure you.”",
				badness: 3,
				violation: true,
				reaction: "Client: That’s a violation. Please stop."
			},
			{
				text:
					"“That fear is common. We can build safer vulnerability and look at evidence from your relationships.”",
				badness: 0,
				reaction: "Client: I want to try."
			}
		]
	},
	{
		client: "I want to be happier, but I don’t even know what I want anymore.",
		choices: [
			{
				text: "“What if you simply choose a personality and commit.”",
				badness: 3,
				reaction: "Client: That’s not how identity works."
			},
			{
				text: "“I’m going to assign you a hobby. Crochet. Next.”",
				badness: 3,
				reaction: "Client: That feels… controlling?"
			},
			{
				text:
					"“We should record this session so I can ‘review the juicy parts’ later.”",
				badness: 3,
				violation: true,
				reaction: "Client: The… JUICY parts?!"
			},
			{
				text:
					"“Let’s start with values and small moments of meaning—then build wants from there.”",
				badness: 0,
				reaction: "Client: That makes sense."
			}
		]
	}
];

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

const MOOD_END_THRESHOLD = 15;

const LS_KEY = "bad-therapist-best";
let questions = [];
let idx = 0;
let score = 0;
let violations = 0;
let mood = 100;
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
	if (reducedMotion.matches || !window.gsap || buttons.length === 0) {
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

function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
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
	if (reducedMotion.matches || skipCurrentSequence || ms <= 0) return;

	const startedAt = performance.now();
	while (performance.now() - startedAt < ms) {
		if (skipCurrentSequence) return;
		await new Promise((resolve) => window.setTimeout(resolve, 25));
	}
}

async function typeInto(elm, text, speed = 12) {
	typing = true;
	skipTypingNow = skipCurrentSequence;

	if (reducedMotion.matches || skipCurrentSequence) {
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

function outcomeExplanation(chosen) {
	if (chosen.violation) {
		return "Ethics violation: this response breaches confidentiality and sharply damages trust.";
	}
	if (chosen.badness === 0) {
		return "Accidentally helpful: this response is respectful, practical, and supportive.";
	}
	if (chosen.badness >= 3) {
		return "This response is strongly dismissive or harmful and significantly damages trust.";
	}
	return "This response is unhelpful and leaves the client feeling less supported.";
}

function showOutcome(chosen, moodLoss) {
	const violationGain = chosen.violation ? 1 : 0;
	el.outcomeBadness.textContent = `Badness +${chosen.badness}`;
	el.outcomeMood.textContent = `Mood −${moodLoss}`;
	el.outcomeViolation.hidden = !chosen.violation;
	el.outcomeViolation.textContent = chosen.violation ? "Violation +1" : "";
	el.outcomeExplanation.textContent = outcomeExplanation(chosen);
	el.outcomeFeedback.hidden = false;

	announce(
		`Choice outcome. Badness increased by ${chosen.badness}. ` +
		`Client mood decreased by ${moodLoss}. ` +
		`${violationGain ? "One ethics violation added. " : ""}` +
		outcomeExplanation(chosen)
	);
}

function buildQuestionsForRun() {
	const q = deepCopy(QUESTIONS_BASE);
	shuffle(q);
	q.forEach((qq) => shuffle(qq.choices));
	return q;
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

function ethicsAlarm() {
	if (!reducedMotion.matches) {
		el.card.classList.remove("ethicsFlash", "shake");
		void el.card.offsetWidth;
		el.card.classList.add("ethicsFlash", "shake");
		window.setTimeout(() => el.card.classList.remove("shake"), 500);
	}
	playBeep("violation");
	showToast("ETHICS ALARM: Confidentiality breached");
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

	const moodBefore = mood;
	score += chosen.badness;
	if (chosen.violation) {
		violations += 1;
	}

	const moodHit = chosen.badness * 8 + (chosen.violation ? 18 : 0);
	mood = clamp(mood - moodHit, 0, 100);
	const moodLoss = moodBefore - mood;
	updateHUD();
	showOutcome(chosen, moodLoss);

	const sessionWillEnd = mood <= MOOD_END_THRESHOLD;
	const earlyEndReason = chosen.violation
		? "Confidentiality breach + vibes destroyed"
		: "Vibes destroyed beyond repair";

	el.therapistBubble.style.display = "block";
	el.reactionBubble.style.display = "block";

	await typeInto(el.therapistBubble, `Therapist (you): ${chosen.text}`, 6);
	await typeInto(el.reactionBubble, chosen.reaction, 8);

	if (chosen.violation) {
		ethicsAlarm();
	} else {
		playBeep("pick");
	}

	if (sessionWillEnd) {
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
	const pct = w / wMax;

	if (pct <= 0.22) return "Accidentally Competent";
	if (pct <= 0.48) return "Questionable Vibes";
	if (pct <= 0.74) return "Ethics Committee Summoned";
	return "License? Never Heard Of Her";
}

function resultMessage(totalBadness, totalViolations) {
	const label = resultLabel(totalBadness, totalViolations);
	const maxBadness = questions.length * 3;

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

	const vioLine =
		totalViolations === 0
			? "Miraculously, you did not break confidentiality."
			: `You broke confidentiality <b>${totalViolations}</b> time(s). Somewhere, an ethics textbook just caught fire.`;

	return `
        <h3 style="margin:0 0 8px;">Result: ${label}</h3>
        <p style="margin:0 0 8px;">Badness: <b>${totalBadness}</b> / ${maxBadness}</p>
        <p style="margin:0 0 10px;">${vioLine}</p>
        <p style="margin:0;">${notes[label]}</p>
      `;
}

function loadBest() {
	try {
		const raw = localStorage.getItem(LS_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

function saveBestIfNeeded(current) {
	const best = loadBest();
	if (!best || current.weighted > best.weighted) {
		try {
			localStorage.setItem(LS_KEY, JSON.stringify(current));
		} catch {
			// Keep the result screen usable when browser storage is unavailable.
		}
		return current;
	}
	return best;
}

function updateFinalScorePills() {
	const maxBadness = questions.length * 3;
	el.finalScorePill.textContent = `Final Badness: ${score} / ${maxBadness}`;
	el.finalViolPill.textContent = `Final Violations: ${violations} / ${questions.length}`;

	const current = {
		weighted: weightedScore(score, violations),
		score,
		violations,
		at: new Date().toISOString()
	};
	const best = saveBestIfNeeded(current);
	el.bestPill.textContent = `Best Chaos: ${best.weighted} (B:${best.score} V:${best.violations})`;
}

function finishGame() {
	interactionState = INTERACTION_STATES.RESULTS;
	showScreen("result");
	updateFinalScorePills();

	el.resultBox.innerHTML = resultMessage(score, violations);

	el.progressBar.setAttribute("aria-valuenow", String(questions.length));
	el.progressBar.setAttribute("aria-valuetext", `${questions.length} of ${questions.length} questions completed`);
	el.progressFill.style.width = "100%";
	el.resultHeading.focus();
	announce(`Game results. ${resultLabel(score, violations)}. Badness ${score}. Violations ${violations}.`);
	showToast("Result ready. Copy it and flex privately.", 1400);
}

async function startGame() {
	if (interactionState !== INTERACTION_STATES.IDLE && interactionState !== INTERACTION_STATES.RESULTS) return;
	interactionState = INTERACTION_STATES.PRESENTING;
	idx = 0;
	score = 0;
	violations = 0;
	mood = 100;
	questions = buildQuestionsForRun();
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
	// fill based on completed questions
	el.progressFill.style.width = `${Math.round((idx / questions.length) * 100)}%`;
	await renderQuestion();
}

function restart() {
	interactionState = INTERACTION_STATES.IDLE;
	showScreen("start");
	el.meta.textContent = "";
	el.progressBar.setAttribute("aria-valuenow", "0");
	el.progressBar.setAttribute("aria-valuetext", "0 of 10 questions completed");
	el.progressFill.style.width = "0%";
	el.startBtn.focus();
}

async function copyResult() {
	const label = resultLabel(score, violations);
	const text =
		`Bad Therapist Result: ${endedEarly ? "Session Ended Early" : label}\n` +
		`Badness: ${score}/${questions.length * 3}\n` +
		`Violations: ${violations}/${questions.length}\n` +
		`Weighted Chaos: ${weightedScore(score, violations)}\n` +
		(endedEarly ? `Client Mood: ${mood}\n` : "");

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
	// Optional: lock UI so no more input
	lockChoices();
	el.nextBtn.disabled = true;

	// Jump to results with a custom message
	showScreen("result");

	updateFinalScorePills();

	el.resultBox.innerHTML = `
    <h3 style="margin:0 0 8px;">Session ended early</h3>
    <p style="margin:0 0 8px;"><b>Reason:</b> ${reason}</p>
    <p style="margin:0 0 8px;">Client mood hit <b>${mood}</b> (≤ ${MOOD_END_THRESHOLD}).</p>
    <p style="margin:0;">The client stands up, says “I think I’m done,” and leaves.</p>
  `;

	el.progressBar.setAttribute("aria-valuenow", String(idx + 1));
	el.progressBar.setAttribute("aria-valuetext", `Session ended after ${idx + 1} questions`);
	el.progressFill.style.width = "100%";
	el.resultHeading.focus();
	announce(`Session ended early. ${reason}. Client mood ${mood}. Badness ${score}. Violations ${violations}.`);
	showToast("Client left the session.", 1600);
}

el.startBtn.addEventListener("click", startGame);
el.nextBtn.addEventListener("click", next);
el.restartBtn.addEventListener("click", restart);
el.shareBtn.addEventListener("click", copyResult);
el.soundBtn.addEventListener("click", () => {
	soundEnabled = !soundEnabled;
	el.soundBtn.setAttribute("aria-pressed", String(soundEnabled));
	el.soundBtn.textContent = `Sound: ${soundEnabled ? "On" : "Off"}`;
	announce(`Sound ${soundEnabled ? "on" : "off"}`);
	if (soundEnabled) playBeep("pick");
});

updateTopMeta();

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
