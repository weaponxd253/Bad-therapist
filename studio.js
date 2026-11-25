/* Phaser owns the art and rooms; native controls keep the creator accessible. */
(function () {
	"use strict";
	const Data = window.BadTherapistCharacters;
	const $ = id => document.getElementById(id);
	const storageKey = "bad-therapist.character.v1";
	// Place the file beside the room without changing the original gameplay markup.
	document.querySelector(".studioLayout").append($("practiceFile"));
	let character = Data.normalize(Data.defaults);
	try { character = Data.normalize(JSON.parse(localStorage.getItem(storageKey)) || Data.defaults); } catch { /* A private browser can still play. */ }
	let scene, location = "studio", pose = "stand", ready = false, sessionOpen = false, emotion = 0;
	let lastSessionPortrait = "", seatedRow = 0;
	const body = () => Data.bodies.find(item => item.id === character.body);
	const standingKey = () => character.body === "cardigan" ? `variants-${character.look}` : `bodies-${body().standing}`;
	function save() {
		try { localStorage.setItem(storageKey, JSON.stringify(character)); $("saveStatus").textContent = "Your character is saved on this device."; }
		catch { $("saveStatus").textContent = "Storage unavailable. Your character lasts for this visit."; }
	}
	function thumbnail(key) {
		const source = scene.textures.get(key).getSourceImage();
		const canvas = document.createElement("canvas");
		canvas.width = source.width; canvas.height = source.height;
		canvas.getContext("2d").drawImage(source, 0, 0);
		canvas.setAttribute("aria-hidden", "true");
		return canvas;
	}
	function option(key, label, selected, onClick, className, showLabel = false) {
		const button = document.createElement("button");
		button.type = "button"; button.className = className; button.title = label;
		button.setAttribute("aria-label", label); button.setAttribute("aria-pressed", String(selected));
		button.append(thumbnail(key));
		if (showLabel) { const span = document.createElement("span"); span.textContent = label; button.append(span); }
		button.addEventListener("click", onClick);
		return button;
	}
	function renderOptions() {
		$("characterName").value = character.name;
		$("phaserStage").setAttribute("aria-label", `Character preview. ${character.name}, ${body().outfit}.`);
		$("bodyChoices").replaceChildren(...Data.bodies.map(item => option(`bodies-${item.standing}`, item.outfit, character.body === item.id, () => {
			character = Data.normalize({ ...character, body: item.id, look: 0, portrait: item.portraits[0] });
			pose = "stand"; save(); renderOptions(); scene.drawCharacter();
		}, "bodyChoice", true)));
		$("lookSection").hidden = character.body !== "cardigan";
		$("lookChoices").replaceChildren(...Data.looks.map((label, index) => option(`variants-${index}`, label, character.look === index, () => {
			character.look = index; pose = "stand"; save(); renderOptions(); scene.drawCharacter();
		}, "lookChoice")));
		$("portraitChoices").replaceChildren(...body().portraits.map(index => option(`portraits-${index}`, `Portrait style ${index % 3 + 1}`, character.portrait === index, () => {
			character.portrait = index; save(); renderOptions();
		}, "portraitChoice")));
		const animated = Data.canAnimate(character);
		$("availabilityNote").textContent = animated
			? `Four-direction walking${body().seated ? " and seated animation" : ""} available.${body().emotions && character.portrait === body().portraits[0] ? " Emotional portraits available for this style." : " Portrait styles apply to conversations only."}`
			: "Standing art available. This look keeps its standing sprite when moving; matching walking and seated sheets can be added later. Portrait styles apply to conversations only.";
		document.querySelector('[data-pose="walk"]').disabled = !animated;
		document.querySelector('[data-pose="sit"]').disabled = !(body().seated && character.look === 0);
		document.querySelectorAll("[data-pose]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.pose === pose)));
		$("emotionControls").hidden = !body().emotions || character.portrait !== body().portraits[0];
		$("seatedControls").hidden = pose !== "sit" || !body().seated || character.look !== 0;
		$("emotionPreview").replaceChildren(thumbnail(body().emotions && character.portrait === body().portraits[0] ? `${body().emotions}-${emotion}` : `portraits-${character.portrait}`));
	}
	// Extract transparent cells, normalize using one scale per sheet, and anchor at the feet.
	// Fractional grid boundaries handle the supplied 1024-wide / three-column sheet.
	function prepareSheet(scene, key, spec) {
		const image = scene.textures.get(key).getSourceImage();
		const cells = [];
		for (let row = 0; row < spec.rows; row++) for (let col = 0; col < spec.columns; col++) {
			const x = Math.round(col * image.width / spec.columns), y = Math.round(row * image.height / spec.rows);
			const w = Math.round((col + 1) * image.width / spec.columns) - x, h = Math.round((row + 1) * image.height / spec.rows) - y;
			const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
			const ctx = canvas.getContext("2d", { willReadFrequently: true }); ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
			const pixels = ctx.getImageData(0, 0, w, h).data;
			let left = w, top = h, right = 0, bottom = 0;
			for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) if (pixels[(py * w + px) * 4 + 3] > 40) {
				left = Math.min(left, px); right = Math.max(right, px); top = Math.min(top, py); bottom = Math.max(bottom, py);
			}
			if (left > right || top > bottom) throw new Error(`Empty sprite cell in ${key}`);
			cells.push({ canvas, left, top, width: right - left + 1, height: bottom - top + 1 });
		}
		const isPortrait = key === "portraits" || spec.kind === "portrait", isIcon = spec.kind === "icon";
		const scale = Math.min((isIcon ? 240 : 210) / Math.max(...cells.map(c => c.width)), (isPortrait ? 225 : isIcon ? 240 : 330) / Math.max(...cells.map(c => c.height)));
		cells.forEach((cell, index) => {
			const canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = isPortrait || isIcon ? 256 : 384;
			const ctx = canvas.getContext("2d"); ctx.imageSmoothingEnabled = false;
			const w = Math.round(cell.width * scale), h = Math.round(cell.height * scale);
			ctx.drawImage(cell.canvas, cell.left, cell.top, cell.width, cell.height, Math.round((256 - w) / 2), isIcon ? Math.round((256 - h) / 2) : canvas.height - h, w, h);
			scene.textures.addCanvas(`${key}-${index}`, canvas);
		});
	}
	class PracticeScene extends Phaser.Scene {
		constructor() { super("Practice"); }
		preload() {
			["studio", "waiting", "therapy", "rug-oval"].forEach(key => this.load.image(key, `assets/${key}.png`));
			Object.entries(Data.sheets).forEach(([key, sheet]) => this.load.image(key, `assets/${sheet.file}`));
			this.load.on("loaderror", () => { $("assetStatus").textContent = "An asset could not load. Refresh the page to try again."; });
		}
		create() {
			scene = this;
			try { Object.entries(Data.sheets).forEach(([key, sheet]) => prepareSheet(this, key, sheet)); }
			catch (error) { $("assetStatus").textContent = `Could not prepare character art: ${error.message}`; return; }
			this.background = this.add.image(0, 0, "studio").setOrigin(0).setDisplaySize(1536, 1024);
			this.rug = this.add.image(1255, 860, "rug-oval").setDisplaySize(520, 260);
			this.shadow = this.add.ellipse(600, 875, 160, 32, 0x16120c, .26);
			this.actor = this.add.sprite(600, 875, standingKey()).setOrigin(.5, 1);
			this.direction = 0; this.target = null;
			this.cursors = this.input.keyboard.createCursorKeys();
			this.keys = this.input.keyboard.addKeys("W,A,S,D");
			// Keep arrow keys available for inputs, page scrolling and native buttons.
			this.input.keyboard.removeCapture(["UP", "DOWN", "LEFT", "RIGHT", "SPACE"]);
			this.input.on("pointerdown", pointer => {
				if (location === "studio" || sessionOpen) return;
				if (Data.walkable(Data.rooms[location], pointer.x, pointer.y)) this.target = { x: pointer.x, y: pointer.y };
			});
			$("assetStatus").remove(); ready = true; renderOptions(); this.drawCharacter();
			[["resetCharacter",13],["randomCharacter",12],["saveCharacter",14],["enterPractice",15]].forEach(([id,index]) => {
				const icon = thumbnail(`icons-${index}`); icon.className = "controlIcon"; $(id).prepend(icon);
			});
			document.querySelectorAll(".sectionLabel").forEach((label,index) => { const icon = thumbnail(`icons-${[0,8,4][index] ?? 0}`); icon.className = "controlIcon"; label.prepend(icon); });
			$("enterPractice").disabled = false;
			window.BadTherapistStudio = { game: this.game, getCharacter: () => ({ ...character }), getLocation: () => location };
			this.resizeObserver = new ResizeObserver(() => { this.scale.getParentBounds(); this.scale.refresh(); });
			this.resizeObserver.observe($("phaserStage"));
			this.events.once("shutdown", () => this.resizeObserver.disconnect());
		}
		drawCharacter() {
			if (location === "studio") {
				this.actor.setPosition(590, 875).setScale(1.48);
				this.shadow.setPosition(590, 880).setScale(1.4);
			}
			this.actor.setTexture(standingKey());
		}
		enterRoom() {
			this.background.setTexture(location).setDisplaySize(1536, 1024);
			this.rug.setVisible(location === "studio");
			this.target = null; this.direction = 0; this.enteredAt = this.time.now;
			if (location === "studio") { this.drawCharacter(); return; }
			const [x, y] = Data.rooms[location].spawn;
			this.actor.setPosition(x, y); this.drawCharacter();
		}
		update(time, delta) {
			if (!ready) return;
			if (location === "studio") {
				let key = standingKey();
				if (pose === "walk" && Data.canAnimate(character)) key = `${body().walking}-${Math.floor(time / 145) % 4}`;
				if (pose === "sit" && body().seated && character.look === 0) key = `${body().seated}-${seatedRow * 4 + Math.floor(time / 550) % 4}`;
				this.actor.setTexture(key); return;
			}
			if (sessionOpen) {
				const phase = window.BadTherapistSessionVisuals?.() || "idle";
				const frames = Data.sessionFrames(phase, Math.floor(time / 550) % 4);
				this.actor.setTexture(body().seated && character.look === 0 ? `${body().seated}-${frames.seated}` : standingKey());
				const portraitKey = body().emotions && character.portrait === body().portraits[0] ? `${body().emotions}-${frames.emotion}` : `portraits-${character.portrait}`;
				if (lastSessionPortrait !== portraitKey) { $("practiceName").replaceChildren(thumbnail(portraitKey), document.createTextNode(`${character.name} · In session`)); lastSessionPortrait = portraitKey; }
				return;
			}
			let dx = 0, dy = 0, movingToTarget = false;
			if (!/INPUT|TEXTAREA|SELECT|BUTTON/.test(document.activeElement?.tagName)) {
				dx = Number(this.cursors.right.isDown || this.keys.D.isDown) - Number(this.cursors.left.isDown || this.keys.A.isDown);
				dy = Number(this.cursors.down.isDown || this.keys.S.isDown) - Number(this.cursors.up.isDown || this.keys.W.isDown);
				if (dx || dy) this.target = null;
			}
			if (!dx && !dy && this.target) {
				movingToTarget = true;
				dx = this.target.x - this.actor.x; dy = this.target.y - this.actor.y;
				if (Math.hypot(dx, dy) < 6) { this.target = null; dx = dy = 0; }
			}
			const moving = dx !== 0 || dy !== 0;
			if (moving) {
				this.direction = Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 2 : 1 : dy > 0 ? 0 : 3;
				const distance = Math.hypot(dx, dy), step = Math.min(delta, 40) * .29;
				const travel = movingToTarget ? Math.min(step, distance) : step;
				const nextX = this.actor.x + dx / distance * travel, nextY = this.actor.y + dy / distance * travel;
				const room = Data.rooms[location];
				let moved = false;
				if (Data.walkable(room, nextX, this.actor.y)) { this.actor.x = nextX; moved = true; }
				if (Data.walkable(room, this.actor.x, nextY)) { this.actor.y = nextY; moved = true; }
				if (!moved) this.target = null;
			}
			this.actor.setTexture(Data.canAnimate(character) ? `${body().walking}-${this.direction * 4 + (moving ? Math.floor(time / 145) % 4 : 0)}` : standingKey());
			this.actor.setScale(.62 + (this.actor.y - 365) / 570 * .22);
			this.shadow.setPosition(this.actor.x, this.actor.y).setScale(this.actor.scaleX * .8);
			const [a, b, c, d] = Data.rooms[location].exit;
			if (moving && time - this.enteredAt > 1200 && this.actor.x > a && this.actor.x < c && this.actor.y > b && this.actor.y < d) go(Data.rooms[location].destination);
		}
	}
	function go(next) {
		location = next; pose = "stand";
		$("characterPanel").hidden = next !== "studio";
		$("practiceFile").hidden = next === "studio";
		$("fileName").textContent = character.name;
		$("fileOutfit").textContent = body().outfit;
		$("filePortrait").replaceChildren(thumbnail(`portraits-${character.portrait}`));
		$("fileAvailability").textContent = `${Data.canAnimate(character) ? "Walking ready" : "Standing look"}${body().seated && character.look === 0 ? " · Seated ready" : ""}`;
		$("poseButtons").hidden = next !== "studio";
		$("roomControls").hidden = next === "studio";
		$("resetCharacter").hidden = next !== "studio";
		$("studioTitle").textContent = next === "studio" ? "Every practice starts with you." : next === "waiting" ? "Please, make yourself uncomfortable." : "Your next questionable session awaits.";
		$("studioSubtitle").textContent = next === "studio" ? "Look the part. The qualifications are another matter." : "Click the floor to walk, or use the arrow keys / WASD. Furniture has boundaries. You should too.";
		$("sceneLabel").textContent = next === "studio" ? "YOUR NEW PRACTICE" : next === "waiting" ? "THE WAITING ROOM" : "THE THERAPY ROOM";
		$("sceneMode").textContent = next === "studio" ? "Character preview" : character.name;
		$("previewCaption").textContent = next === "waiting" ? "The back hallway leads to your therapy room." : next === "therapy" ? "The bottom doorway leads back to reception." : "A little warmth. A lot of plausible deniability.";
		$("changeRoom").textContent = next === "waiting" ? "Go to therapy room" : "Return to waiting room";
		$("openPractice").hidden = next !== "therapy";
		document.querySelectorAll("[data-step]").forEach(item => item.classList.toggle("current", item.dataset.step === next));
		$("phaserStage").setAttribute("aria-label", `${next === "studio" ? "Character preview" : next + " room"}. ${character.name}, ${body().outfit}.`);
		scene.enterRoom();
		// The side panel is reserved for room guidance after leaving the creator.
		$("studioTitle").setAttribute("tabindex", "-1"); $("studioTitle").focus({ preventScroll: true });
		window.scrollTo(0, 0);
	}
	$("characterName").addEventListener("input", event => { character.name = event.target.value.slice(0, 28); save(); });
	$("characterName").addEventListener("blur", () => { character = Data.normalize(character); $("characterName").value = character.name; save(); });
	$("resetCharacter").addEventListener("click", () => { if (!ready) return; character = Data.normalize(Data.defaults); pose = "stand"; save(); renderOptions(); scene.drawCharacter(); });
	$("randomCharacter").addEventListener("click", () => {
		if (!ready) return;
		const chosen = Data.bodies[Math.floor(Math.random() * Data.bodies.length)];
		character = Data.normalize({ ...character, body: chosen.id, look: 0, portrait: chosen.portraits[Math.floor(Math.random() * chosen.portraits.length)] });
		pose = "stand"; save(); renderOptions(); scene.drawCharacter();
	});
	$("saveCharacter").addEventListener("click", () => { character = Data.normalize(character); save(); $("saveStatus").textContent = "Character saved."; });
	$("emotionSelect").replaceChildren(...Data.emotionNames.map((name,index) => { const option = document.createElement("option"); option.value = index; option.textContent = name; return option; }));
	$("emotionSelect").addEventListener("change", event => { emotion = Number(event.target.value); renderOptions(); });
	$("seatedAction").addEventListener("change", event => { seatedRow = Number(event.target.value); });
	document.querySelectorAll("[data-pose]").forEach(button => button.addEventListener("click", () => { pose = button.dataset.pose; renderOptions(); }));
	$("enterPractice").addEventListener("click", () => { character = Data.normalize(character); save(); go("waiting"); });
	$("editCharacter").addEventListener("click", () => { go("studio"); renderOptions(); });
	$("changeRoom").addEventListener("click", () => go(location === "waiting" ? "therapy" : "waiting"));
	$("openPractice").addEventListener("click", () => {
		sessionOpen = true; scene.target = null; lastSessionPortrait = "";
		scene.actor.setPosition(body().seated && character.look === 0 ? 750 : 970, body().seated && character.look === 0 ? 665 : 760).setScale(.74);
		scene.shadow.setVisible(false);
		$("gameContent").hidden = false; $("practiceBanner").hidden = false;
		$("practiceName").replaceChildren(thumbnail(`portraits-${character.portrait}`), document.createTextNode(`${character.name} · In session`));
		document.body.classList.add("sessionActive");
		document.querySelector("#gameContent .screen.active h2")?.focus();
	});
	$("returnToRoom").addEventListener("click", () => {
		// The existing session stays intact, including career state and in-flight dialogue.
		sessionOpen = false; $("gameContent").hidden = true; $("practiceBanner").hidden = true;
		document.body.classList.remove("sessionActive"); scene.shadow.setVisible(true); go("therapy");
	});
	if (!window.Phaser) { $("assetStatus").textContent = "Phaser could not load. Serve this folder locally and refresh."; return; }
	new Phaser.Game({ type: Phaser.AUTO, parent: "phaserStage", width: 1536, height: 1024, backgroundColor: "#252a20", pixelArt: true,
		scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }, scene: [PracticeScene], audio: { noAudio: true } });
})();
