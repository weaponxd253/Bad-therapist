# Bad Therapist

[**Play the live demo →**](https://weaponxd253.github.io/Bad-therapist/)

A browser-based parody game where you play a spectacularly unhelpful therapist. Choose the worst response to each client, accumulate badness and ethics violations, and try not to destroy the client's mood before the session ends.

> This game is satire for entertainment. It is not therapy or mental-health advice.

## Features

- Ten randomized client questions per session
- Four shuffled responses for every question
- Badness, ethics-violation, and client-mood scoring
- Early endings when the client's mood gets too low
- Persistent local high score
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
index.html   Page structure
styles.css   Visual design and responsive layout
script.js    Questions, scoring, state, and interactions
```

## Deployment

The project is compatible with GitHub Pages. In the repository settings, enable Pages and deploy from the `main` branch at the repository root.

## License

No license has been added yet.
