(function (root, factory) {
	const schema = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = schema;
	}
	root.BadTherapistContentSchema = schema;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const TOPICS = Object.freeze([
		"anxiety",
		"family",
		"relationships",
		"social-media",
		"work",
		"motivation",
		"loneliness",
		"conflict",
		"identity"
	]);
	const RESPONSE_ARCHETYPES = Object.freeze([
		"helpful",
		"dismissive",
		"boundaryCross",
		"confidentialityBreach",
		"chaosAdvice",
		"fakeDeep",
		"corporateGoblin",
		"influencerBrain",
		"coerciveFixer",
		"overshare"
	]);

	// Shared state and per-item checks for questions, follow-ups and board questions.
	function createValidator(violationTypes) {
		const errors = [];
		const questionIds = new Set();
		const allowedTopics = new Set(TOPICS);
		const allowedArchetypes = new Set(RESPONSE_ARCHETYPES);
		const allowedViolations = new Set(Object.keys(violationTypes));
		const add = (path, message) => errors.push({ path, message });
		const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;

		// Validates a question, follow-up or board question: all share the four-choice shape.
		// kind: "question" (has a topic), "followUp" (inherits one), or "board" (has a charge).
		function validateBody(body, path, kind) {
			const isFollowUp = kind === "followUp";
			const isBoard = kind === "board";
			if (!nonEmpty(body.id)) {
				add(`${path}.id`, "Expected a non-empty stable ID.");
			} else if (questionIds.has(body.id)) {
				add(`${path}.id`, `Duplicate question ID: ${body.id}.`);
			} else {
				questionIds.add(body.id);
			}

			if (kind === "question" && !allowedTopics.has(body.topic)) {
				add(`${path}.topic`, `Unsupported topic: ${body.topic}.`);
			}
			if (isBoard) {
				if (!allowedViolations.has(body.charge)) {
					add(`${path}.charge`, `Unknown board charge: ${body.charge}.`);
				}
				if (!nonEmpty(body.speaker)) {
					add(`${path}.speaker`, "Expected a non-empty board speaker.");
				}
				if (!nonEmpty(body.prompt)) {
					add(`${path}.prompt`, "Expected a non-empty board prompt.");
				}
			} else if (!nonEmpty(body.client)) {
				add(`${path}.client`, "Expected a non-empty client prompt.");
			}
			if (!Array.isArray(body.choices) || body.choices.length !== 4) {
				add(`${path}.choices`, "Expected exactly four choices.");
				return;
			}

			const choiceIds = new Set();
			let helpfulChoices = 0;
			let maxBadnessChoices = 0;
			body.choices.forEach((choice, choiceIndex) => {
				const choicePath = `${path}.choices[${choiceIndex}]`;
				if (!choice || typeof choice !== "object") {
					add(choicePath, "Expected a choice object.");
					return;
				}
				if (!nonEmpty(choice.id)) {
					add(`${choicePath}.id`, "Expected a non-empty stable ID.");
				} else if (choiceIds.has(choice.id)) {
					add(`${choicePath}.id`, `Duplicate choice ID: ${choice.id}.`);
				} else {
					choiceIds.add(choice.id);
				}
				["text", "reaction", "feedback"].forEach((field) => {
					if (!nonEmpty(choice[field])) {
						add(`${choicePath}.${field}`, `Expected a non-empty ${field}.`);
					}
				});
				if (!allowedArchetypes.has(choice.archetype)) {
					add(`${choicePath}.archetype`, `Unsupported response archetype: ${choice.archetype}.`);
				}
				["clientRead", "ethicsNote", "callback", "recall"].forEach((field) => {
					if (choice[field] !== undefined && !nonEmpty(choice[field])) {
						add(`${choicePath}.${field}`, `Expected a non-empty ${field} when provided.`);
					}
				});
				if (!Number.isInteger(choice.badness) || choice.badness < 0 || choice.badness > 3) {
					add(`${choicePath}.badness`, "Expected an integer from 0 to 3.");
				} else if (choice.badness === 0) {
					helpfulChoices += 1;
				} else if (choice.badness === 3) {
					maxBadnessChoices += 1;
				}
				if (choice.violation && !allowedViolations.has(choice.violation)) {
					add(`${choicePath}.violation`, `Unknown violation category: ${choice.violation}.`);
				}
				if (
					choice.moodModifier !== undefined &&
					(!Number.isInteger(choice.moodModifier) || choice.moodModifier < -10 || choice.moodModifier > 10)
				) {
					add(`${choicePath}.moodModifier`, "Expected an integer from -10 to 10.");
				}
				if (choice.followUp !== undefined) {
					if (isBoard) {
						add(`${choicePath}.followUp`, "Board questions cannot have follow-ups.");
					} else if (isFollowUp) {
						add(`${choicePath}.followUp`, "Follow-ups cannot trigger further follow-ups.");
					} else if (choice.badness === 0) {
						add(`${choicePath}.followUp`, "Follow-ups belong on bad responses, not the helpful one.");
					} else if (!choice.followUp || typeof choice.followUp !== "object") {
						add(`${choicePath}.followUp`, "Expected a follow-up object.");
					} else {
						validateBody(choice.followUp, `${choicePath}.followUp`, "followUp");
					}
				}
			});

			if (helpfulChoices !== 1) {
				add(`${path}.choices`, "Expected exactly one choice with badness 0.");
			}
			// Keeps all-badness-3 runs (Maximum Menace) possible when a follow-up is inserted.
			if (isFollowUp && maxBadnessChoices === 0) {
				add(`${path}.choices`, "Expected a follow-up to include at least one badness-3 choice.");
			}
		}

		function validateList(items, label, kind) {
			if (!Array.isArray(items)) {
				add(label, `Expected an array of ${label}.`);
				return errors;
			}
			items.forEach((item, index) => {
				const path = `${label}[${index}]`;
				if (!item || typeof item !== "object") {
					add(path, "Expected a question object.");
					return;
				}
				validateBody(item, path, kind);
			});
			return errors;
		}

		return { validateList };
	}

	function validateQuestions(questions, violationTypes = {}) {
		return createValidator(violationTypes).validateList(questions, "questions", "question");
	}

	function validateBoardQuestions(boardQuestions, violationTypes = {}) {
		return createValidator(violationTypes).validateList(boardQuestions, "boardQuestions", "board");
	}

	return Object.freeze({ TOPICS, RESPONSE_ARCHETYPES, validateQuestions, validateBoardQuestions });
});