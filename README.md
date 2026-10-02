# Bad Therapist

[**Play the live demo →**](https://weaponxd253.github.io/Bad-therapist/)

A browser-based parody game where you play a spectacularly unhelpful therapist. Choose the worst response to each client, accumulate badness and ethics violations, and try not to destroy the client's mood before the session ends.

> This game is satire for entertainment. It is not therapy or mental-health advice.

## Features

- Ten balanced questions per session selected from a 68-question pool, with 23 branching follow-ups
- Replay-aware selection remembers your last six sessions and favors unseen and least-recent questions
- Classic, Speed Session, and Ethics Minefield modes
- Career mode: run a practice for twelve weeks, pick clients from a waitlist, and balance Infamy against your License. Returning clients remember how the last visit went, two walkouts lose a client for good, and the career ends in retirement, a revoked license, an empty practice, or early retirement
- Themed session packs with authored case-file previews, in-run context, and closing notes
- A named client for every session, with a backstory, opening line, and walkout or closing farewell
- Client callbacks: later in a session, the client brings up something you said earlier
- Branching follow-ups: some bad answers make the client push back right away, and you can repair it or double down
- Eight persistent, non-blocking achievements
- Four shuffled responses for every question
- Badness, ethics-violation, and client-mood scoring
- Ethics Board finale verdicts for post-run comedy payoff
- Dominant therapist-style summaries, style-mix debriefs, and optional replay case notes
- Lightweight in-run streak feedback for spicy patterns
- Early endings when the client's mood gets too low
- Separate persistent records for highest chaos, completed sessions, and completed packs
- Keyboard controls and skippable typing animation
- Responsive layout for phones, tablets, and desktop
- No build process or runtime dependencies

## Controls

- **1–4:** Choose a response
- **Enter:** Continue to the next question
- **Space:** Skip the current typing animation

## Run locally

Clone the repository and open `index.html` in a browser:

```bash
git clone https://github.com/weaponxd253/Bad-therapist.git
cd Bad-therapist
```

You can also serve it locally:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Tests

The tests use Node's built-in test runner (Node 18+) and need no dependencies:

```bash
npm test
```

## Project structure

```text
index.html             Page structure
styles.css             Visual design and responsive layout
script.js              Game state and interactions
questions.js           Validated question content
content-schema.js      Runtime content validation
question-selector.js   Balanced, replay-aware run selection
question-history.js    Versioned recent-run history
game-modes.js          Declarative game mode configuration
session-packs.js       Declarative themed session pack configuration
clients.js             Named client personas for each pack
callbacks.js           When and how clients bring up earlier answers
follow-ups.js          When a bad answer branches into a client pushback
board-questions.js     Ethics Board hearing questions (for upcoming career hearings)
career.js              Career rules, waitlist, trust carry-over, endings, and saved careers
achievements.js        Achievement evaluation and progress
scoring.js             Scoring and violation rules
persistence.js         Versioned local records
CONTENT.md             Content authoring guidelines
```

## Deployment

The project is compatible with GitHub Pages. In the repository settings, enable Pages and deploy from the `main` branch at the repository root.

## License

No license has been added yet.
