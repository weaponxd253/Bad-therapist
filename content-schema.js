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

	function validateQuestions(questions, violationTypes = {}) {
		const errors = [];
		const questionIds = new Set();
		const allowedTopics = new Set(TOPICS);
		const allowedArchetypes = new Set(RESPONSE_ARCHETYPES);
		const allowedViolations = new Set(Object.keys(violationTypes));
		const add = (path, message) => errors.push({ path, message });
		const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;

		if (!Array.isArray(questions)) {
			return [{ path: "questions", message: "Expected an array of questions." }];
		}

		questions.forEach((question, questionIndex) => {
			const questionPath = `questions[${questionIndex}]`;
			if (!question || typeof question !== "object") {
				add(questionPath, "Expected a question object.");
				return;
			}

			if (!nonEmpty(question.id)) {
				add(`${questionPath}.id`, "Expected a non-empty stable ID.");
			} else if (questionIds.has(question.id)) {
				add(`${questionPath}.id`, `Duplicate question ID: ${question.id}.`);
			} else {
				questionIds.add(question.id);
			}

			if (!allowedTopics.has(question.topic)) {
				add(`${questionPath}.topic`, `Unsupported topic: ${question.topic}.`);
			}
			if (!nonEmpty(question.client)) {
				add(`${questionPath}.client`, "Expected a non-empty client prompt.");
			}
			if (!Array.isArray(question.choices) || question.choices.length !== 4) {
				add(`${questionPath}.choices`, "Expected exactly four choices.");
				return;
			}

			const choiceIds = new Set();
			let helpfulChoices = 0;
			question.choices.forEach((choice, choiceIndex) => {
				const choicePath = `${questionPath}.choices[${choiceIndex}]`;
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
				["clientRead", "ethicsNote"].forEach((field) => {
					if (choice[field] !== undefined && !nonEmpty(choice[field])) {
						add(`${choicePath}.${field}`, `Expected a non-empty ${field} when provided.`);
					}
				});
				if (!Number.isInteger(choice.badness) || choice.badness < 0 || choice.badness > 3) {
					add(`${choicePath}.badness`, "Expected an integer from 0 to 3.");
				} else if (choice.badness === 0) {
					helpfulChoices += 1;
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
			});

			if (helpfulChoices !== 1) {
				add(`${questionPath}.choices`, "Expected exactly one choice with badness 0.");
			}
		});

		return errors;
	}

	return Object.freeze({ TOPICS, RESPONSE_ARCHETYPES, validateQuestions });
});