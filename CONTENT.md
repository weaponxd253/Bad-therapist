# Content authoring guide

New questions must follow the schema in `questions.js` and pass `content-schema.test.js`.

- Give every question and choice a stable, descriptive ID.
- Use one supported topic and exactly four choices.
- Include exactly one helpful choice with `badness: 0`.
- Write concise client reactions and specific player-facing feedback.
- Give every choice a response `archetype`: `helpful`, `dismissive`, `boundaryCross`, `confidentialityBreach`, `chaosAdvice`, `fakeDeep`, `corporateGoblin`, `influencerBrain`, `coerciveFixer`, or `overshare`.
- Add `clientRead` for how the client interprets the response and `ethicsNote` for the ethical/therapeutic principle behind the feedback.
- Match ethics violations to the configured category: confidentiality, boundaries, judgment, coercion, or harmful advice.
- Avoid crisis, self-harm, diagnosis, medication, and emergency scenarios.
- Do not make parody responses resemble genuine clinical instructions.
- Avoid jokes targeting protected traits or vulnerable identities.
- Structure most response sets around four distinct roles: ethical/helpful, silly bad, emotionally harmful, and ethics disaster.
- Vary answer length and tone so the helpful response is not mechanically obvious. `content-diversity.test.js` fails if the helpful answer is the longest choice in more than half of the questions, follow-ups, or board questions, so give bad answers some extra comic detail and keep repairs tight.
- Give each question’s signature worst choice a `callback`: a line the client might say later in the same session when bringing that answer back up. Write it in the client’s voice, so it works as an opener before any other question. Only minutes have passed, so it must not describe things the client did since (“this week”, “I went to the class”); tests reject that wording.
- Optionally add a `recall`: what the client says about that answer on a later career visit, after time has passed (“I knocked on my neighbor’s door. Zero flyers were involved.”). Without one, a `callback` that does not say “earlier” or “today” is reused, and otherwise a generic “last time” line fills in.
- A clearly bad choice (badness 2 or 3) may carry a `followUp`: an `id` unique among question IDs, a `client` pushback line reacting to that answer, and four `choices` that follow the same rules as any question. Include one genuine repair (`badness: 0`) and at least one badness-3 double-down. Follow-ups inherit the parent's topic and cannot contain follow-ups of their own. In a session, a follow-up replaces the last queued question, so the length stays the same; at most two trigger per run.
- Keep client-facing copy free of gendered pronouns; clients in `clients.js` are referred to by name.
- Use `moodModifier` only for exceptional balance needs and keep it between -10 and 10.

Run-selection goals are ten unique questions, at least six topics, no more than two questions per topic, and at least three violation categories whenever the pool permits.

Replay selection favors unseen questions, then older questions, while preserving topic and violation-category balance. Stable IDs must never be recycled because history is keyed by question ID.

Ethics Minefield prefers judgment, coercion, and harmful-advice content. New content should keep these categories subtle enough that the ethical problem becomes clear after selection rather than through cartoonishly obvious wording.

## Board hearing questions

`board-questions.js` holds the questions the Ethics Board asks in a hearing. They use the same four-choice shape as client questions, with a few differences:

- Use `charge` (a violation category) instead of `topic`, a `speaker` from `BOARD_MEMBERS`, and `prompt` instead of `client`.
- Voice reactions as `Board: …`. The helpful answer is plain accountability; the worst answer usually commits a fresh violation in front of the board.
- If the prompt refers to a specific incident, list the answers it refers to in `relatedChoices` as `questionId/choiceId`, so a hearing can match what the player actually did.
- Keep at least four questions per charge so hearings don't repeat.
- Hearings ask about incidents the player actually committed first, then general questions (no `relatedChoices`) for the charge, then general questions for other charges. They never ask about an incident the player didn’t commit while a general question remains, so keep at least three general questions per charge (`content-diversity.test.js` enforces this).

## Diversity targets

`content-diversity.test.js` simulates consecutive sessions with real replay history. Every topic needs at least 7 questions and 2 follow-ups. No question may repeat within 3 sessions in any pack, 5 sessions must show at least 47 different questions, and the Chaos Sampler must not repeat within 6 sessions. Themed packs are limited by their headline topic, so new content for work, relationships, family, and social media extends their variety the most.
