# Bad Therapist

[**Play the live demo →**](https://weaponxd253.github.io/Bad-therapist/)

A browser-based parody game where you play a spectacularly unhelpful therapist. Choose the worst response to each client, accumulate badness and ethics violations, and try not to destroy the client's mood before the session ends.

> This game is satire for entertainment. It is not therapy or mental-health advice.

## Features

- Ten balanced questions per session selected from a 41-question pool
- Replay-aware selection favors unseen and least-recent questions
- Classic, Speed Session, and Ethics Minefield modes
- Eight persistent, non-blocking achievements
- Four shuffled responses for every question
- Badness, ethics-violation, and client-mood scoring
- Dominant therapist-style summaries, style-mix debriefs, and optional replay case notes
- Lightweight in-run streak feedback for spicy patterns
- Early endings when the client's mood gets too low
- Separate persistent records for highest chaos and completed sessions
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
achievements.js        Achievement evaluation and progress
scoring.js             Scoring and violation rules
persistence.js         Versioned local records
CONTENT.md             Content authoring guidelines
```

## Deployment

The project is compatible with GitHub Pages. In the repository settings, enable Pages and deploy from the `main` branch at the repository root.

## License

No license has been added yet.
