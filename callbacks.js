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
		jitter: 6
	});

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
			"You were weirdly good about {topic}, so I’m going to risk telling you this."
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

	function capitalize(text) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	function fillTemplate(template, topic) {
		const phrase = TOPIC_PHRASES[topic] || "what we talked about earlier";
		const filled = template.replaceAll("{topic}", phrase);
		// Capitalize the start of the line and of each sentence a phrase may begin.
		return capitalize(filled).replace(/([.!?]\s+)([a-z])/g, (_match, gap, letter) => gap + letter.toUpperCase());
	}

	// Generic templates are not repeated within a run while an unused one remains.
	function lineForEntry(entry, random, usedTemplates) {
		if (entry.callbackLine) return { line: entry.callbackLine, authored: true, template: "" };
		const templates = ARCHETYPE_LINES[entry.archetype];
		if (!templates?.length) return null;
		const unused = templates.filter((template) => !usedTemplates.has(template));
		const pool = unused.length > 0 ? unused : templates;
		const template = pool[Math.floor(random() * pool.length)] || pool[0];
		return { line: fillTemplate(template, entry.topic), authored: false, template };
	}

	function memorability(entry) {
		const weight = entry.badness === 0 ? RULES.helpfulWeight : entry.moodLost || 0;
		return weight + (entry.callbackLine ? RULES.authoredBonus : 0);
	}

	// Picks at most one earlier answer for the client to bring up before `questionNumber`.
	// `previous` lists callbacks already used this run: [{ questionNumber, sourceQuestionNumber }].
	function selectCallback({ history = [], questionNumber, previous = [], random = Math.random } = {}) {
		if (!Number.isInteger(questionNumber) || questionNumber < RULES.firstQuestion) return null;
		if (previous.length >= RULES.maxPerRun) return null;
		if (previous.some((item) => item.questionNumber === questionNumber - 1)) return null;

		const usedSources = new Set(previous.map((item) => item.sourceQuestionNumber));
		const candidates = history.filter((entry) =>
			Number.isInteger(entry.questionNumber) &&
			entry.questionNumber <= questionNumber - RULES.minimumGap &&
			!usedSources.has(entry.questionNumber) &&
			(entry.callbackLine || ARCHETYPE_LINES[entry.archetype])
		);
		if (candidates.length === 0) return null;
		if (random() >= RULES.fireChance) return null;

		const source = candidates
			.map((entry) => ({ entry, weight: memorability(entry) + random() * RULES.jitter }))
			.sort((a, b) => b.weight - a.weight)[0].entry;
		const usedTemplates = new Set(previous.map((item) => item.template).filter(Boolean));
		const picked = lineForEntry(source, random, usedTemplates);
		if (!picked) return null;
		return {
			questionNumber,
			sourceQuestionNumber: source.questionNumber,
			archetype: source.archetype,
			topic: source.topic,
			response: source.response,
			line: picked.line,
			authored: picked.authored,
			template: picked.template
		};
	}

	return Object.freeze({ RULES, TOPIC_PHRASES, ARCHETYPE_LINES, fillTemplate, selectCallback });
});
