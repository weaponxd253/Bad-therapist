(function (root, factory) {
	const packs = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = packs;
	}
	root.BadTherapistSessionPacks = packs;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const DEFAULT_PACK_ID = "chaos";
	const SESSION_PACKS = Object.freeze([
		Object.freeze({
			id: "chaos",
			label: "Chaos Sampler",
			shortLabel: "Chaos",
			description: "The full mixed case file: every topic, every flavor of therapeutic nonsense.",
			preferredTopics: Object.freeze([]),
			requiredTopics: Object.freeze([]),
			intro: "10 confidential questions • choose the worst replies",
			outro: "The board recommends filing this whole session under ‘broad-spectrum chaos.’",
			accent: "indigo",
			topicsLabel: "all available topics",
			caseFileTitle: "Case File: Broad-Spectrum Chaos",
			boardNote: "The board found no single theme, which somehow makes the paperwork worse."
		}),
		Object.freeze({
			id: "workplace",
			label: "Workplace Damage",
			shortLabel: "Work",
			description: "Burnout, boss texts, productivity shame, and professional-grade coping crimes.",
			preferredTopics: Object.freeze(["work", "motivation", "identity"]),
			requiredTopics: Object.freeze(["work"]),
			intro: "10 confidential questions • productivity crimes edition",
			outro: "The board recommends logging off and touching one legally distinct grass.",
			accent: "green",
			topicsLabel: "work, motivation, identity",
			caseFileTitle: "Case File: Reply-All Incident",
			boardNote: "The board recommends one boundary, one lunch break, and zero motivational acronyms."
		}),
		Object.freeze({
			id: "relationships",
			label: "Relationship Crimes",
			shortLabel: "Relations",
			description: "Jealousy, dating ambiguity, friend conflict, and reciprocity misfires.",
			preferredTopics: Object.freeze(["relationships", "conflict", "loneliness"]),
			requiredTopics: Object.freeze(["relationships"]),
			intro: "10 confidential questions • attachment gremlin edition",
			outro: "The board recommends communicating like a mammal with calendar access.",
			accent: "rose",
			topicsLabel: "relationships, conflict, loneliness",
			caseFileTitle: "Case File: Attachment Gremlin",
			boardNote: "The board recommends fewer tests, clearer asks, and no surprise emotional obstacle courses."
		}),
		Object.freeze({
			id: "family",
			label: "Family Systems Error",
			shortLabel: "Family",
			description: "Expectations, guilt, boundaries, comparison, and emotional tech debt.",
			preferredTopics: Object.freeze(["family", "identity", "conflict"]),
			requiredTopics: Object.freeze(["family"]),
			intro: "10 confidential questions • family group chat containment protocol",
			outro: "The board recommends one boundary and zero surprise interventions.",
			accent: "violet",
			topicsLabel: "family, identity, conflict",
			caseFileTitle: "Case File: Group Chat Containment",
			boardNote: "The board recommends declining one ritual, muting one thread, and hydrating after Thanksgiving."
		}),
		Object.freeze({
			id: "internet",
			label: "Internet Brainrot",
			shortLabel: "Internet",
			description: "Comparison, posting, labels, spirals, and algorithm-flavored self-worth.",
			preferredTopics: Object.freeze(["social-media", "anxiety", "identity", "motivation"]),
			requiredTopics: Object.freeze(["social-media"]),
			intro: "10 confidential questions • feed-poisoned nervous system edition",
			outro: "The board recommends closing the app before the app develops opinions.",
			accent: "cyan",
			topicsLabel: "social media, anxiety, identity, motivation",
			caseFileTitle: "Case File: Algorithmic Feelings",
			boardNote: "The board recommends logging off before the rectangle starts assigning homework."
		})
	]);

	function getPack(id) {
		return SESSION_PACKS.find((pack) => pack.id === id) || SESSION_PACKS[0];
	}

	return Object.freeze({ DEFAULT_PACK_ID, SESSION_PACKS, getPack });
});