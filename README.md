# Bad Therapist

[**Play the live demo →**](https://weaponxd253.github.io/Bad-therapist/)

A browser-based parody game where you play a spectacularly unhelpful therapist. Choose the worst response to each client, accumulate badness and ethics violations, and try not to destroy the client's mood before the session ends.

> This game is satire for entertainment. It is not therapy or mental-health advice.

## Features

- Ten balanced questions per session selected from a 68-question pool, with 23 branching follow-ups
- Replay-aware selection remembers your last six sessions and favors unseen and least-recent questions
- Classic, Speed Session, and Ethics Minefield modes
- Career mode: run a practice for twelve weeks and balance Infamy against your License
  - Pick clients from a waitlist; returning clients remember what you said on earlier visits and bring it up
  - Each client's story ends after three visits: Thriving Despite You (they refer someone new), Transferred, Wrote a Memoir About You (infamy plus bad press), or Blocked Your Number after two walkouts
  - The Ethics Board calls a hearing when your license first drops below 70, and again below 40
  - Careers end in retirement, a revoked license, an empty practice, or early retirement
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
- Phaser 3 character creator with six body/outfit choices, fifteen standing presets for the cardigan body, and eighteen conversation portraits
- Connected waiting and therapy rooms, with click-to-walk, keyboard movement, furniture collision, and perspective scaling
- Locally saved character name and appearance; matching walking and seated previews where sheets are available
- No build process; Phaser is bundled locally for offline use and GitHub Pages

## Controls

- **1–4:** Choose a response
- **Enter:** Continue to the next question
- **Space:** Skip the current typing animation

## Run locally

Clone the repository and start the local server (Node 18+):

```bash
git clone https://github.com/weaponxd253/Bad-therapist.git
cd Bad-therapist
npm start
```

Visit [http://127.0.0.1:8000](http://127.0.0.1:8000). Use an HTTP server rather than opening `index.html` directly, because Phaser loads image assets. The checked-in `vendor/` runtime means no dependency installation or build is needed to play.

You can also use another static server:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

The opening screen creates your therapist. **Open your practice** enters the waiting room; walk into the back hallway or use **Go to therapy room**. In the therapy room, **Begin a session** opens the existing session and career controls beside the room. **Return to room** preserves the current game. Click accessible floor areas to walk in a straight line, or use arrows / WASD to navigate around furniture. Room buttons also work with keyboard and touch.

## Character assets and expansion

`character-data.js` is the asset manifest: each body has its own standing frame, conversation portraits, and optional `walking`, `seated`, `emotions`, and `regionMask` slots. Missing assets remain `null`; a body never uses another body's animation. Add a sheet entry with its file and grid dimensions, then point the appropriate body slot to it. Walking sheets use four columns and four rows: down, left, right, up. Seated sheets have listening, speaking, note-taking and explaining rows, selectable in the creator and driven by gameplay phases in sessions. Emotional portraits are active for the original vest portrait style; region-mask recoloring remains reserved for future assets.

The supplied art is preserved in `assets/`. Runtime extraction handles fractional cell widths, trims transparent padding, uses a shared scale within each sheet, and aligns all frames at their feet. Rooms use the backgrounds' native 1536 × 1024 coordinates, with furniture footprints, door trigger rectangles, and depth scaling defined in the manifest.

Available now: all six original bodies have walking sheets. Vest and original cardigan bodies also have seated art. Non-original cardigan presets use standing sprites while moving. Portrait hairstyle choices affect only conversation UI because matching walking hairstyles were not supplied. The fifteen supplied presets are complete standing looks, not independently mixable skin, hair, and garment layers. Mask-driven recoloring can be added once aligned masks exist for each animation sheet. See [the asset inventory](assets/README.md) for all eleven additional attachments, their body associations, and the sit/stand transition reference that needs cleanup before use. The creator includes randomize and explicit save buttons as well as automatic saving.

Phaser 3.90.0 is pinned in `package.json`; `vendor/phaser.min.js` and its MIT license are checked in for static hosting. After intentionally updating Phaser, replace the vendored runtime from the installed package as well.

## Tests

The tests use Node's built-in test runner (Node 18+) and need no dependencies:

```bash
npm test
```

## Project structure

```text
index.html             Page structure
studio.js              Phaser preview, connected rooms, and existing-game handoff
studio.css             Character creator and room presentation
character-data.js      Character assets, saved appearance validation, room geometry
assets/                Supplied backgrounds and transparent sprite sheets
vendor/                Local Phaser runtime and license
tools/serve.js         Local static preview server
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
board-questions.js     Ethics Board hearing questions and panel
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
