(function (root) {
	"use strict";
	const sheets = {
		bodies: { file: "bodies.png", columns: 3, rows: 2 },
		variants: { file: "variants.png", columns: 5, rows: 3 },
		portraits: { file: "portraits.png", columns: 3, rows: 6 },
		vest: { file: "walk-vest.png", columns: 4, rows: 4 },
		cardigan: { file: "walk-cardigan.png", columns: 4, rows: 4 },
		seated: { file: "seated.png", columns: 4, rows: 4 },
		shirt: { file: "walk-shirt.png", columns: 4, rows: 4 },
		linen: { file: "walk-linen.png", columns: 4, rows: 4 },
		navy: { file: "walk-navy.png", columns: 4, rows: 4 },
		teal: { file: "walk-teal.png", columns: 4, rows: 4 },
		"seated-vest": { file: "seated-vest.png", columns: 4, rows: 4 },
		"emotions-vest": { file: "emotions-vest.png", columns: 4, rows: 3, kind: "portrait" },
		icons: { file: "customization-icons.png", columns: 4, rows: 4, kind: "icon" }
	};
	// Slots are deliberately explicit: never borrow another body's animation.
	const bodies = [
		{ id: "vest", name: "The academic", outfit: "Olive vest", standing: 0, portraits: [0, 1, 2], walking: "vest", seated: "seated-vest", regionMask: null, emotions: "emotions-vest" },
		{ id: "cardigan", name: "The classic", outfit: "Burgundy cardigan", standing: 1, portraits: [3, 4, 5], walking: "cardigan", seated: "seated", regionMask: null, emotions: null },
		{ id: "shirt", name: "The straight talker", outfit: "Blue shirt & tie", standing: 2, portraits: [6, 7, 8], walking: "shirt", seated: null, regionMask: null, emotions: null },
		{ id: "linen", name: "The thoughtful one", outfit: "Linen blazer", standing: 3, portraits: [9, 10, 11], walking: "linen", seated: null, regionMask: null, emotions: null },
		{ id: "navy", name: "The professional", outfit: "Navy blazer", standing: 4, portraits: [12, 13, 14], walking: "navy", seated: null, regionMask: null, emotions: null },
		{ id: "teal", name: "The free spirit", outfit: "Teal jacket", standing: 5, portraits: [15, 16, 17], walking: "teal", seated: null, regionMask: null, emotions: null }
	];
	const looks = ["Original", "Warm ivory", "Golden", "Warm brown", "Deep brown", "Black hair", "Chestnut hair", "Blond hair", "Auburn hair", "Silver hair", "Burgundy", "Forest", "Navy", "Linen", "Charcoal"];
	const defaults = { version: 1, name: "Dr. Morgan", body: "cardigan", look: 0, portrait: 3 };
	function normalize(value) {
		const body = bodies.find(item => item.id === value?.body) || bodies[1];
		return { version: 1, name: typeof value?.name === "string" ? value.name.trim().slice(0, 28) || defaults.name : defaults.name,
			body: body.id, look: body.id === "cardigan" && Number.isInteger(value?.look) && value.look >= 0 && value.look < looks.length ? value.look : 0,
			portrait: body.portraits.includes(value?.portrait) ? value.portrait : body.portraits[0] };
	}
	function canAnimate(character) { return Boolean(bodies.find(body => body.id === character.body)?.walking) && character.look === 0; }
	const emotionNames = ["Neutral", "Speaking", "Thoughtful", "Sympathetic", "Smug", "Calm", "Skeptical", "Confused", "Nervous", "Embarrassed", "Angry", "Shocked"];
	function sessionFrames(phase, frame) {
		if (phase === "responding") return { seated: 4 + frame, emotion: 1 };
		if (phase === "round-complete") return { seated: 8 + frame, emotion: 2 };
		if (phase === "results") return { seated: 12 + frame, emotion: 5 };
		return { seated: frame, emotion: 0 };
	}
	// Feet coordinates, not sprite centers. Rectangles describe furniture footprints.
	const rooms = {
		waiting: { spawn: [790, 900], bounds: [95, 365, 1430, 935], obstacles: [[90, 405, 300, 820], [355, 520, 535, 735], [585, 450, 760, 765], [930, 305, 1490, 545], [275, 280, 640, 390], [1360, 580, 1500, 875]], exit: [650, 330, 875, 410], destination: "therapy" },
		therapy: { spawn: [775, 850], bounds: [100, 420, 1410, 935], obstacles: [[125, 425, 360, 770], [420, 520, 600, 720], [640, 445, 880, 715], [1080, 350, 1480, 530], [1340, 600, 1510, 880]], exit: [650, 895, 880, 955], destination: "waiting" }
	};
	function walkable(room, x, y) {
		const [left, top, right, bottom] = room.bounds;
		return x >= left && x <= right && y >= top && y <= bottom && !room.obstacles.some(([a, b, c, d]) => x >= a - 18 && x <= c + 18 && y >= b && y <= d + 12);
	}
	const api = { sheets, bodies, looks, defaults, normalize, canAnimate, emotionNames, sessionFrames, rooms, walkable };
	if (typeof module !== "undefined") module.exports = api;
	else root.BadTherapistCharacters = api;
})(typeof window === "undefined" ? globalThis : window);
