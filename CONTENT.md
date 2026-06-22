# Content authoring guide

New questions must follow the schema in `questions.js` and pass `content-schema.test.js`.

- Give every question and choice a stable, descriptive ID.
- Use one supported topic and exactly four choices.
- Include exactly one helpful choice with `badness: 0`.
- Write concise client reactions and specific player-facing feedback.
- Match ethics violations to the configured category: confidentiality, boundaries, judgment, coercion, or harmful advice.
- Avoid crisis, self-harm, diagnosis, medication, and emergency scenarios.
- Do not make parody responses resemble genuine clinical instructions.
- Avoid jokes targeting protected traits or vulnerable identities.
- Vary answer length and tone so the helpful response is not mechanically obvious.
- Use `moodModifier` only for exceptional balance needs and keep it between -10 and 10.

Run-selection goals are ten unique questions, at least six topics, no more than two questions per topic, and at least three violation categories whenever the pool permits.