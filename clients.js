(function (root, factory) {
	const clients = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = clients;
	}
	root.BadTherapistClients = clients;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	// Backstories stay vague about family and relationship status so any question
	// in a client's pack can come from them without contradicting the persona.
	const CLIENTS = Object.freeze([
		Object.freeze({
			id: "priya",
			name: "Priya",
			avatar: "📎",
			packIds: Object.freeze(["workplace"]),
			backstory: "Senior associate at a company that calls itself a family. Keeps three calendars and trusts none of them.",
			opening: "Sorry, I had to finish one email in the parking lot. Okay, two emails. I’m here now.",
			walkout: "Priya says “I have a hard stop,” and is gone before the calendar invite expires.",
			closing: "Priya leaves on time for once, which feels like a small, suspicious victory."
		}),
		Object.freeze({
			id: "marcus",
			name: "Marcus",
			avatar: "☕",
			packIds: Object.freeze(["workplace"]),
			backstory: "Middle manager who has been “about to take a vacation” since spring.",
			opening: "I blocked this hour as ‘Focus Time’ so nobody would book over it. Please make it count.",
			walkout: "Marcus marks the session ‘Declined’ in real time and walks out mid-sentence.",
			closing: "Marcus thanks you, then quietly schedules a follow-up with a different therapist."
		}),
		Object.freeze({
			id: "jo",
			name: "Jo",
			avatar: "🗂️",
			packIds: Object.freeze(["workplace"]),
			backstory: "Freelancer whose clients all believe they are the only client.",
			opening: "I’m technically on a call right now. Muted. Don’t worry about it.",
			walkout: "Jo unmutes the other call, says “Sorry, I’m back,” and leaves you instead.",
			closing: "Jo invoices nobody for this hour, which is the closest thing to rest all week."
		}),
		Object.freeze({
			id: "theo",
			name: "Theo",
			avatar: "💌",
			packIds: Object.freeze(["relationships"]),
			backstory: "Reads every “k” as a threat assessment. Runs a group chat dedicated to screenshot analysis.",
			opening: "Before we start: if someone says ‘sounds good’ with no punctuation, that’s bad, right?",
			walkout: "Theo leaves you on read. In person. Somehow.",
			closing: "Theo says “sounds good” on the way out, with punctuation, as a kindness."
		}),
		Object.freeze({
			id: "amara",
			name: "Amara",
			avatar: "🌹",
			packIds: Object.freeze(["relationships"]),
			backstory: "Recovering people-pleaser who apologizes to furniture after bumping into it.",
			opening: "Sorry. Sorry I’m late — I wasn’t late. Sorry. Okay.",
			walkout: "Amara leaves without apologizing, which is either growth or a very bad sign for you.",
			closing: "Amara apologizes to the doorframe on the way out. Some things take more than one session."
		}),
		Object.freeze({
			id: "sam",
			name: "Sam",
			avatar: "🎧",
			packIds: Object.freeze(["relationships"]),
			backstory: "Has a carefully curated playlist for every emotional situation, including this one.",
			opening: "I made a playlist for this session. It’s mostly sad indie. That’s fine, right?",
			walkout: "Sam puts both earbuds in, skips to the angriest song available, and leaves.",
			closing: "Sam adds one slightly hopeful song to the playlist. Just one. Don’t make it weird."
		}),
		Object.freeze({
			id: "dev",
			name: "Dev",
			avatar: "🍲",
			packIds: Object.freeze(["family"]),
			backstory: "The designated family fixer. Has the group chat muted and checks it anyway.",
			opening: "My aunt texted ‘call me’ with no context. I’ve been thinking about it for six hours.",
			walkout: "Dev says “I need to take this,” to a phone that is not ringing, and leaves.",
			closing: "Dev leaves the group chat on mute for a whole extra hour. Historic."
		}),
		Object.freeze({
			id: "rosa",
			name: "Rosa",
			avatar: "🧶",
			packIds: Object.freeze(["family"]),
			backstory: "Brings snacks to every gathering so nobody can say Rosa didn’t contribute.",
			opening: "I brought you muffins. It’s not a bribe. It’s a little bit a bribe.",
			walkout: "Rosa takes the muffins back. All of them. That’s how you know.",
			closing: "Rosa leaves one muffin behind, which in this family is a glowing review."
		}),
		Object.freeze({
			id: "kai",
			name: "Kai",
			avatar: "📸",
			packIds: Object.freeze(["family"]),
			backstory: "The family photographer, which conveniently means never being in the photos.",
			opening: "I’m usually the one behind the camera, so being looked at for an hour is new. Go easy.",
			walkout: "Kai steps out of frame, permanently.",
			closing: "Kai pauses at the door like someone who might, one day, be in a photo."
		}),
		Object.freeze({
			id: "riley",
			name: "Riley",
			avatar: "📱",
			packIds: Object.freeze(["internet"]),
			backstory: "Has a screen-time report that sends concerned follow-up notifications.",
			opening: "My phone said my screen time is up 40%. I screenshotted it. Then I scrolled for twenty minutes.",
			walkout: "Riley opens an app mid-sentence and drifts out the door, still scrolling.",
			closing: "Riley puts the phone face down for the walk to the car. A personal best."
		}),
		Object.freeze({
			id: "noor",
			name: "Noor",
			avatar: "✨",
			packIds: Object.freeze(["internet"]),
			backstory: "Has drafted the same post nine times and archived all of them.",
			opening: "I almost posted about coming here. Then I archived the draft. Then I un-archived it. Hi.",
			walkout: "Noor archives you. Emotionally, and then physically, via the door.",
			closing: "Noor deletes one old draft on the way out. Not posts it. Deletes it. Growth."
		}),
		Object.freeze({
			id: "ezra",
			name: "Ezra",
			avatar: "🌀",
			packIds: Object.freeze(["internet"]),
			backstory: "Learns every new slang term two weeks before it turns cringe, and hates knowing that.",
			opening: "Okay, I’m going to try to say all this without a single meme reference. No promises.",
			walkout: "Ezra says “this is giving malpractice” and logs off from reality.",
			closing: "Ezra leaves with zero meme references in the last five minutes. Unprecedented."
		})
	]);

	function getClient(id) {
		return CLIENTS.find((client) => client.id === id) || null;
	}

	// Packs without their own clients (the Chaos Sampler) draw from the full roster.
	function getClientsForPack(packId) {
		const packClients = CLIENTS.filter((client) => client.packIds.includes(packId));
		return packClients.length > 0 ? packClients : [...CLIENTS];
	}

	function pickClient(packId, random = Math.random, excludeId = "") {
		const candidates = getClientsForPack(packId);
		const fresh = candidates.filter((client) => client.id !== excludeId);
		const pool = fresh.length > 0 ? fresh : candidates;
		return pool[Math.floor(random() * pool.length)] || pool[0];
	}

	return Object.freeze({ CLIENTS, getClient, getClientsForPack, pickClient });
});
