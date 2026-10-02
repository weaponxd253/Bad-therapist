(function (root, factory) {
	const followUps = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = followUps;
	}
	root.BadTherapistFollowUps = followUps;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	const RULES = Object.freeze({
		maxPerRun: 2
	});

	function shuffle(values, random) {
		const result = [...values];
		for (let index = result.length - 1; index > 0; index -= 1) {
			const swapIndex = Math.floor(random() * (index + 1));
			[result[index], result[swapIndex]] = [result[swapIndex], result[index]];
		}
		return result;
	}

	// Whether picking `choice` on questions[index] should insert its follow-up next.
	// The final question never branches, follow-ups never chain, and early endings win.
	function shouldFollowUp({ questions = [], index, choice, outcome, followUpsSoFar = 0 } = {}) {
		if (!choice?.followUp || outcome?.sessionWillEnd) return false;
		if (followUpsSoFar >= RULES.maxPerRun) return false;
		if (!Number.isInteger(index) || index >= questions.length - 1) return false;
		return !questions[index]?.isFollowUp;
	}

	// Turns a choice's authored follow-up into a playable question with shuffled choices.
	function buildFollowUpQuestion(parentQuestion, choice, random = Math.random) {
		const followUp = JSON.parse(JSON.stringify(choice.followUp));
		return {
			...followUp,
			topic: parentQuestion.topic,
			isFollowUp: true,
			parentQuestionId: parentQuestion.id,
			parentChoiceId: choice.id,
			choices: shuffle(followUp.choices, random)
		};
	}

	// Inserts the follow-up right after `index` and drops the last queued question,
	// so a session keeps its length and scoring balance.
	function insertFollowUp(questions, index, followUpQuestion) {
		const next = [...questions];
		next.splice(index + 1, 0, followUpQuestion);
		next.pop();
		return next;
	}

	return Object.freeze({ RULES, shouldFollowUp, buildFollowUpQuestion, insertFollowUp });
});
