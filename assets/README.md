# Asset inventory

Attachment numbers below refer to the second batch of eleven images supplied on November 25, 2026. Original source images are preserved; grid extraction happens at runtime.

| Attachment | File | Grid / dimensions | Placement |
| --- | --- | --- | --- |
| 1 | `walk-cardigan.png` | 4 × 4, 1024 × 1536 | Replaces the original cardigan walk; creator and both rooms |
| 2 | `walk-shirt.png` | 4 × 4, 1024 × 1536 | Blue-shirt body walking |
| 3 | `walk-linen.png` | 4 × 4, 1024 × 1536 | Tan-outfit body walking |
| 4 | `emotions-vest.png` | 4 × 3, 1448 × 1086 | Vest's original portrait style; expression preview and session portrait |
| 5 | `seated-vest.png` | 4 × 4, 1024 × 1536 | Vest seated preview and therapy chair |
| 6 | `walk-teal.png` | 4 × 4, 1024 × 1536 | Teal-jacket body walking |
| 7 | `walk-navy.png` | 4 × 4, 1024 × 1536 | Navy-blazer body walking |
| 8 | `reference-sit-transition.png` | 4 × 2 reference, 1448 × 1086 | Preserved as reference only: visible gray background/shadow and inconsistent frame baselines; excluded from runtime loading |
| 9 | `rug-oval.png` | 1774 × 887 | Additional rug on the creator office's bare right-hand floor |
| 10 | `clipboard.png` | 1086 × 1448 | Therapist file beside waiting/therapy room previews |
| 11 | `customization-icons.png` | 4 × 4, 1254 × 1254 | Body, standing-look and portrait labels; randomize, reset, save, open-practice buttons |

Walking rows are down, left, right, up, each with four frames. Seated rows are listening, speaking, note-taking, and explaining. The creator can preview all four seated actions. Sessions select these rows from the gameplay phase. Emotion cells, read left to right then top to bottom, are neutral, speaking, thoughtful, sympathetic, smug, calm, skeptical, confused, nervous, embarrassed, angry, and shocked. These names describe the visible expressions rather than a supplied metadata file.

The vest emotional sheet matches the original hairstyle. Alternative portrait hairstyles retain their selected static portrait, rather than switching identity during speech. Other bodies have no emotional sheets yet. Cardigan standing color presets still need matching animated sheets or region masks. No region mask or separate hair animation layer was supplied in this batch.

Icons are artwork for controls, not recoloring masks. Only controls with implemented behavior use them. All sixteen icon cells are extracted, so the unused skin, hair, clothing and glasses icons remain available for later customization controls.

Source declarations and body associations live in `../character-data.js`; extraction and placement live in `../studio.js`. The transition reference should be replaced with an aligned transparent export before adding a runtime transition animation.
