(function (root, factory) {
	const callbacks = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = callbacks;
	}
	root.BadTherapistCallbacks = callbacks;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const RULES = Object.freeze({
		// No callbacks before this question number; the opening line covers question 1.
		firstQuestion: 3,
		// A source answer must be at least this many questions back.
		minimumGap: 2,
		maxPerRun: 3,
		fireChance: 0.7,
		// Helpful answers lose no mood, so they get a flat weight to be remembered at all.
		helpfulWeight: 12,
		authoredBonus: 8,
		jitter: 6,
		// How many answers each session leaves behind as memories for later visits.
		memoriesPerVisit: 2,
		// Past-visit memories compete with this session's answers at a discount.
		pastVisitWeight: 0.8
	});

	// Same-session wording reads wrong a week later, so such lines are not reused across visits.
	const SAME_SESSION_WORDS = /\b(earlier|today|after what you said|after you said that)\b/i;

	const TOPIC_PHRASES = Object.freeze({
		anxiety: "the spiraling thing",
		family: "my family stuff",
		relationships: "the relationship thing",
		"social-media": "the phone stuff",
		work: "the work stuff",
		motivation: "the motivation thing",
		loneliness: "the lonely stuff",
		conflict: "that conflict I mentioned",
		identity: "the who-am-I stuff"
	});

	// Generic lines by response archetype. {topic} becomes the earlier question's topic phrase.
	const ARCHETYPE_LINES = Object.freeze({
		helpful: Object.freeze([
			"So I actually tried what you said about {topic}. It kind of helped, which is unsettling.",
			"You were weirdly good about {topic}, so I’m going to risk telling you this.",
			"I did the thing you suggested about {topic}. Don’t let it go to your head.",
			"After {topic}, I’m starting to think you might know what you’re doing. Concerning."
		]),
		dismissive: Object.freeze([
			"I’m going to try again, since {topic} kind of got waved away.",
			"This one’s smaller than {topic}, so maybe it’ll fit in your attention span. Kidding. Mostly."
		]),
		boundaryCross: Object.freeze([
			"Quick thing: after how you handled {topic}, I need this to stay in this room. And you to stay in that chair.",
			"I almost didn’t bring this up, because of {topic}. But here goes."
		]),
		confidentialityBreach: Object.freeze([
			"Before I say anything else — about {topic} from earlier. Is that in a group chat right now? Don’t answer.",
			"I’m going to keep this next part vague, given what you said about {topic}."
		]),
		chaosAdvice: Object.freeze([
			"For the record, I did not do what you suggested about {topic}. Nobody is on fire.",
			"I told a friend your advice about {topic}. They asked if you were licensed. Anyway."
		]),
		fakeDeep: Object.freeze([
			"I’ve been thinking about what you said about {topic}. I still don’t know what it means.",
			"I wrote down your line about {topic}. It looks even less helpful on paper."
		]),
		corporateGoblin: Object.freeze([
			"Not to make this a deliverable, since that’s apparently your whole thing after {topic}, but…",
			"I’m not giving you a status update this time. {topic} already felt like a performance review."
		]),
		influencerBrain: Object.freeze([
			"Please don’t turn this into content, like you tried to with {topic}.",
			"Is the ring light off? After {topic}, I’m checking."
		]),
		coerciveFixer: Object.freeze([
			"I’d like to decide this one myself, if that’s okay. Unlike {topic}.",
			"Before you assign me homework like with {topic} — I just want to be heard on this one."
		]),
		overshare: Object.freeze([
			"Can this part be about me? {topic} kind of turned into your story.",
			"I timed it: you talked about yourself for most of {topic}. Anyway, my turn."
		])
	});

	// Lines for bringing up an answer from a previous visit. {topic} is that question's topic.
	const PAST_ARCHETYPE_LINES = Object.freeze({
		helpful: Object.freeze([
			"I tried what you said last time about {topic}. It actually helped, which I resent a little.",
			"Last time you were weirdly good about {topic}. I’ve been suspicious all week."
		]),
		dismissive: Object.freeze([
			"Last time {topic} kind of got waved away. I’m trying again.",
			"I’ve been thinking about how you brushed off {topic} last time."
		]),
		boundaryCross: Object.freeze([
			"After how you handled {topic} last time, I need you to stay in your chair today.",
			"I almost didn’t come back after {topic} last time."
		]),
		confidentialityBreach: Object.freeze([
			"Before we start: is what I told you about {topic} last time still private? Please say yes.",
			"I’ve been checking group chats all week because of {topic} last time."
		]),
		chaosAdvice: Object.freeze([
			"For the record, I did not follow your advice about {topic} last time. Everyone survived.",
			"I told a friend what you said about {topic} last time. They gasped."
		]),
		fakeDeep: Object.freeze([
			"I’ve thought all week about your line on {topic}. I still don’t know what it means.",
			"I wrote down what you said about {topic} last time. It got worse on paper."
		]),
		corporateGoblin: Object.freeze([
			"Last time {topic} turned into a performance review. Can we not do that again?",
			"I’m not giving you an update on {topic}. Last time was enough."
		]),
		influencerBrain: Object.freeze([
			"Is the ring light off? After {topic} last time, I’m checking.",
			"Please don’t turn {topic} into content again, like last time."
		]),
		coerciveFixer: Object.freeze([
			"I’d like to make my own choices today. Last time, with {topic}, I didn’t get to.",
			"Before you assign me homework about {topic} again, I just want to be heard."
		]),
		overshare: Object.freeze([
			"Last time {topic} turned into your story. Can today be about me?",
			"I counted after last time: you talked about yourself for most of {topic}."
		])
	});

	function capitalize(text) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	function fillTemplate(template, topic) {
		const phrase = TOPIC_PHRASES[topic] || "what we talked about earlier";
		const filled = template.replaceAll("{topic}", phrase);
		// Capitalize the start of the line and of each sentence a phrase may begin.
		return capitalize(filled).replace(/([.!?]\s+)([a-z])/g, (_match, gap, letter) => gap + letter.toUpperCase());
	}

	// Authored lines win; generic templates are not repeated within a run while an unused one remains.
	function lineForEntry(entry, random, usedTemplates, fromPastVisit) {
		const authored = fromPastVisit ? entry.recallLine : entry.callbackLine;
		if (authored) return { line: authored, authored: true, template: "" };
		const templates = (fromPastVisit ? PAST_ARCHETYPE_LINES : ARCHETYPE_LINES)[entry.archetype];
		if (!templates?.length) return null;
		const unused = templates.filter((template) => !usedTemplates.has(template));
		const pool = unused.length > 0 ? unused : templates;
		const template = pool[Math.floor(random() * pool.length)] || pool[0];
		return { line: fillTemplate(template, entry.topic), authored: false, template };
	}

	function memorability(entry) {
		const weight = entry.badness === 0 ? RULES.helpfulWeight : entry.moodLost || 0;
		return weight + (entry.callbackLine || entry.recallLine ? RULES.authoredBonus : 0);
	}

	function memoryKey(memory) {
		return `w${memory.week}:${memory.questionId}`;
	}

	function buildCallback(source, fromPastVisit, questionNumber, previous, random) {
		const usedTemplates = new Set(previous.map((item) => item.template).filter(Boolean));
		const picked = lineForEntry(source, random, usedTemplates, fromPastVisit);
		if (!picked) return null;
		return {
			questionNumber,
			sourceQuestionNumber: fromPastVisit ? null : source.questionNumber,
			sourceKey: fromPastVisit ? memoryKey(source) : `q${source.questionNumber}`,
			fromWeek: fromPastVisit ? source.week : null,
			archetype: source.archetype,
			topic: source.topic,
			response: source.response,
			line: picked.line,
			authored: picked.authored,
			template: picked.template
		};
	}

	// Chooses what a session leaves behind for later visits: its most memorable answers.
	// Follow-up answers are skipped; a follow-up already settled them in the moment.
	function pickMemories(history = [], count = RULES.memoriesPerVisit) {
		return history
			.filter((entry) => !entry.isFollowUp && ARCHETYPE_LINES[entry.archetype])
			.map((entry) => ({ entry, weight: memorability(entry) }))
			.sort((a, b) => b.weight - a.weight)
			.slice(0, count)
			.map(({ entry }) => ({
				questionId: entry.questionId || "",
				archetype: entry.archetype,
				topic: entry.topic,
				response: entry.response || "",
				badness: entry.badness,
				moodLost: entry.moodLost || 0,
				recallLine: entry.recallLine ||
					(entry.callbackLine && !SAME_SESSION_WORDS.test(entry.callbackLine) ? entry.callbackLine : "")
			}));
	}

	// Picks at most one answer for the client to bring up before `questionNumber`: either an
	// earlier answer this session or, with `memories`, something from a previous visit.
	// `previous` lists callbacks already used this run.
	function selectCallback({ history = [], memories = [], questionNumber, previous = [], random = Math.random } = {}) {
		if (!Number.isInteger(questionNumber) || questionNumber < RULES.firstQuestion) return null;
		if (previous.length >= RULES.maxPerRun) return null;
		if (previous.some((item) => item.questionNumber === questionNumber - 1)) return null;

		const usedSources = new Set(previous.map((item) => item.sourceQuestionNumber).filter(Number.isInteger));
		const usedKeys = new Set(previous.map((item) => item.sourceKey).filter(Boolean));
		const current = history
			.filter((entry) =>
				Number.isInteger(entry.questionNumber) &&
				entry.questionNumber <= questionNumber - RULES.minimumGap &&
				!usedSources.has(entry.questionNumber) &&
				// The client already pushed back on this answer in a follow-up.
				!entry.followedUp &&
				(entry.callbackLine || ARCHETYPE_LINES[entry.archetype])
			)
			.map((entry) => ({ entry, fromPastVisit: false, weight: memorability(entry) }));
		const past = memories
			.filter((memory) => !usedKeys.has(memoryKey(memory)) && (memory.recallLine || PAST_ARCHETYPE_LINES[memory.archetype]))
			.map((memory) => ({ entry: memory, fromPastVisit: true, weight: memorability(memory) * RULES.pastVisitWeight }));
		const candidates = [...current, ...past];
		if (candidates.length === 0) return null;
		if (random() >= RULES.fireChance) return null;

		const pick = candidates
			.map((candidate) => ({ ...candidate, weight: candidate.weight + random() * RULES.jitter }))
			.sort((a, b) => b.weight - a.weight)[0];
		return buildCallback(pick.entry, pick.fromPastVisit, questionNumber, previous, random);
	}

	// A returning client's greeting: the most memorable thing from their previous visits.
	function selectOpeningRecall({ memories = [], random = Math.random } = {}) {
		const candidates = memories.filter((memory) => memory.recallLine || PAST_ARCHETYPE_LINES[memory.archetype]);
		if (candidates.length === 0) return null;
		const source = candidates
			.map((memory) => ({ memory, weight: memorability(memory) + random() * RULES.jitter }))
			.sort((a, b) => b.weight - a.weight)[0].memory;
		return buildCallback(source, true, 1, [], random);
	}

	return Object.freeze({
		RULES,
		TOPIC_PHRASES,
		ARCHETYPE_LINES,
		PAST_ARCHETYPE_LINES,
		fillTemplate,
		pickMemories,
		selectCallback,
		selectOpeningRecall
	});
});
