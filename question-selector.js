(function (root, factory) {
	const selector = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = selector;
	}
	root.BadTherapistQuestionSelector = selector;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	function clone(value) {
		return JSON.parse(JSON.stringify(value));
	}

	function shuffle(values, random) {
		const result = [...values];
		for (let index = result.length - 1; index > 0; index -= 1) {
			const swapIndex = Math.floor(random() * (index + 1));
			[result[index], result[swapIndex]] = [result[swapIndex], result[index]];
		}
		return result;
	}

	function violationCategories(question) {
		return new Set(question.choices.map((choice) => choice.violation).filter(Boolean));
	}

	function metrics(selected) {
		const topics = new Set(selected.map((question) => question.topic));
		const categories = new Set();
		const topicCounts = new Map();
		selected.forEach((question) => {
			topicCounts.set(question.topic, (topicCounts.get(question.topic) || 0) + 1);
			violationCategories(question).forEach((category) => categories.add(category));
		});
		return { topics, categories, topicCounts };
	}

	function quality(selected, options) {
		const run = metrics(selected);
		const overflow = [...run.topicCounts.values()]
			.reduce((sum, count) => sum + Math.max(0, count - options.maximumPerTopic), 0);
		return (
			selected.length * 1000 +
			Math.min(run.topics.size, options.minimumTopics) * 100 +
			Math.min(run.categories.size, options.minimumViolationCategories) * 40 -
			overflow * 500
		);
	}

	function buildCandidate(pool, options, random) {
		const remaining = shuffle(pool, random);
		const selected = [];

		while (selected.length < options.count && remaining.length > 0) {
			const run = metrics(selected);
			const underCap = remaining.filter(
				(question) => (run.topicCounts.get(question.topic) || 0) < options.maximumPerTopic
			);
			const candidates = underCap.length > 0 ? underCap : remaining;
			let bestScore = -Infinity;
			let bestQuestion = null;

			candidates.forEach((question) => {
				const newTopic = !run.topics.has(question.topic);
				const newCategories = [...violationCategories(question)]
					.filter((category) => !run.categories.has(category)).length;
				const score =
					(newTopic && run.topics.size < options.minimumTopics ? 100 : newTopic ? 18 : 0) +
					(newCategories > 0 && run.categories.size < options.minimumViolationCategories
						? newCategories * 35
						: newCategories * 6) +
					random();
				if (score > bestScore) {
					bestScore = score;
					bestQuestion = question;
				}
			});

			selected.push(bestQuestion);
			remaining.splice(remaining.indexOf(bestQuestion), 1);
		}

		return selected;
	}

	function selectQuestionsForRun(pool, requestedOptions = {}, random = Math.random) {
		if (!Array.isArray(pool)) return [];
		const options = {
			count: Math.max(0, requestedOptions.count ?? 10),
			minimumTopics: Math.max(0, requestedOptions.minimumTopics ?? 6),
			maximumPerTopic: Math.max(1, requestedOptions.maximumPerTopic ?? 2),
			minimumViolationCategories: Math.max(
				0,
				requestedOptions.minimumViolationCategories ?? 3
			),
			attempts: Math.max(1, requestedOptions.attempts ?? 48)
		};
		const targetCount = Math.min(options.count, pool.length);
		const effectiveOptions = { ...options, count: targetCount };
		let best = [];
		let bestQuality = -Infinity;

		for (let attempt = 0; attempt < effectiveOptions.attempts; attempt += 1) {
			const candidate = buildCandidate(pool, effectiveOptions, random);
			const candidateQuality = quality(candidate, effectiveOptions);
			if (candidateQuality > bestQuality) {
				best = candidate;
				bestQuality = candidateQuality;
			}
			const candidateMetrics = metrics(candidate);
			const withinCap = [...candidateMetrics.topicCounts.values()]
				.every((count) => count <= effectiveOptions.maximumPerTopic);
			if (
				candidate.length === targetCount &&
				candidateMetrics.topics.size >= Math.min(effectiveOptions.minimumTopics, targetCount) &&
				candidateMetrics.categories.size >= effectiveOptions.minimumViolationCategories &&
				withinCap
			) {
				best = candidate;
				break;
			}
		}

		return best.map((question) => {
			const copy = clone(question);
			copy.choices = shuffle(copy.choices, random);
			return copy;
		});
	}

	return Object.freeze({ selectQuestionsForRun });
});