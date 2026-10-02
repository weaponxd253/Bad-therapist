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
			closing: "Priya leaves on time for once, which feels like a small, suspicious victory.",
			endings: Object.freeze({
				thriving: "Priya set one boundary, then another, and took a real vacation. The postcard just says ‘out of office.’",
				transferred: "Priya transferred to a therapist with a stricter calendar. The handoff email was polite and heavily cc’d.",
				memoir: "Priya published ‘Per My Last Session,’ a memoir about you. Three HR departments made it required reading.",
				blocked: "Priya blocked your number and set an auto-reply: ‘No longer accepting your meeting requests.’"
			})
		}),
		Object.freeze({
			id: "marcus",
			name: "Marcus",
			avatar: "☕",
			packIds: Object.freeze(["workplace"]),
			backstory: "Middle manager who has been “about to take a vacation” since spring.",
			opening: "I blocked this hour as ‘Focus Time’ so nobody would book over it. Please make it count.",
			walkout: "Marcus marks the session ‘Declined’ in real time and walks out mid-sentence.",
			closing: "Marcus thanks you, then quietly schedules a follow-up with a different therapist.",
			endings: Object.freeze({
				thriving: "Marcus finally took the vacation. Came back rested and suspiciously calm in meetings.",
				transferred: "Marcus moved to a therapist the insurance likes better and rated you ‘meets expectations.’",
				memoir: "Marcus wrote ‘Focus Time,’ a memoir about the hour a week you made worse. It sells well in airports.",
				blocked: "Marcus declined all future invites, permanently, with one-word feedback: ‘No.’"
			})
		}),
		Object.freeze({
			id: "jo",
			name: "Jo",
			avatar: "🗂️",
			packIds: Object.freeze(["workplace"]),
			backstory: "Freelancer whose clients all believe they are the only client.",
			opening: "I’m technically on a call right now. Muted. Don’t worry about it.",
			walkout: "Jo unmutes the other call, says “Sorry, I’m back,” and leaves you instead.",
			closing: "Jo invoices nobody for this hour, which is the closest thing to rest all week.",
			endings: Object.freeze({
				thriving: "Jo raised rates, fired one client, and took a whole weekend off. Fully unmuted.",
				transferred: "Jo found a therapist who bills by the minute. Jo respects the efficiency.",
				memoir: "Jo freelanced a memoir about you, ‘Billable Trauma.’ There is an invoice in the appendix.",
				blocked: "Jo marked you as spam on every channel. Even the fax."
			})
		}),
		Object.freeze({
			id: "theo",
			name: "Theo",
			avatar: "💌",
			packIds: Object.freeze(["relationships"]),
			backstory: "Reads every “k” as a threat assessment. Runs a group chat dedicated to screenshot analysis.",
			opening: "Before we start: if someone says ‘sounds good’ with no punctuation, that’s bad, right?",
			walkout: "Theo leaves you on read. In person. Somehow.",
			closing: "Theo says “sounds good” on the way out, with punctuation, as a kindness.",
			endings: Object.freeze({
				thriving: "Theo now reads ‘k’ as just a letter. Mostly. The screenshot group chat has been archived.",
				transferred: "Theo transferred to a therapist who texts back with full punctuation. A clear upgrade.",
				memoir: "Theo released ‘Left on Read,’ a memoir about you told entirely in screenshots.",
				blocked: "Theo left you on read. Forever. You can see the receipt from here."
			})
		}),
		Object.freeze({
			id: "amara",
			name: "Amara",
			avatar: "🌹",
			packIds: Object.freeze(["relationships"]),
			backstory: "Recovering people-pleaser who apologizes to furniture after bumping into it.",
			opening: "Sorry. Sorry I’m late — I wasn’t late. Sorry. Okay.",
			walkout: "Amara leaves without apologizing, which is either growth or a very bad sign for you.",
			closing: "Amara apologizes to the doorframe on the way out. Some things take more than one session.",
			endings: Object.freeze({
				thriving: "Amara went a full week without apologizing to furniture. The furniture noticed.",
				transferred: "Amara transferred to a new therapist and apologized to you about it. Twice.",
				memoir: "Amara wrote ‘Sorry, Not Sorry,’ a memoir about you. It contains zero apologies.",
				blocked: "Amara blocked your number without apologizing. Growth, technically."
			})
		}),
		Object.freeze({
			id: "sam",
			name: "Sam",
			avatar: "🎧",
			packIds: Object.freeze(["relationships"]),
			backstory: "Has a carefully curated playlist for every emotional situation, including this one.",
			opening: "I made a playlist for this session. It’s mostly sad indie. That’s fine, right?",
			walkout: "Sam puts both earbuds in, skips to the angriest song available, and leaves.",
			closing: "Sam adds one slightly hopeful song to the playlist. Just one. Don’t make it weird.",
			endings: Object.freeze({
				thriving: "Sam’s playlist now has a whole hopeful section. You get a song credit. A small one.",
				transferred: "Sam found a therapist with better taste in music and made you a goodbye playlist. It’s short.",
				memoir: "Sam released a concept album about you. Track seven is just a door closing.",
				blocked: "Sam added your name to the skip list. On every platform."
			})
		}),
		Object.freeze({
			id: "dev",
			name: "Dev",
			avatar: "🍲",
			packIds: Object.freeze(["family"]),
			backstory: "The designated family fixer. Has the group chat muted and checks it anyway.",
			opening: "My aunt texted ‘call me’ with no context. I’ve been thinking about it for six hours.",
			walkout: "Dev says “I need to take this,” to a phone that is not ringing, and leaves.",
			closing: "Dev leaves the group chat on mute for a whole extra hour. Historic.",
			endings: Object.freeze({
				thriving: "Dev let the family group chat solve one problem alone. Nobody perished. Dev is thriving.",
				transferred: "Dev transferred to a family therapist. Dev’s aunt has opinions about it.",
				memoir: "Dev wrote ‘Call Me (No Context),’ a memoir about you. The family group chat is reading it together.",
				blocked: "Dev muted you. Not the group chat. You."
			})
		}),
		Object.freeze({
			id: "rosa",
			name: "Rosa",
			avatar: "🧶",
			packIds: Object.freeze(["family"]),
			backstory: "Brings snacks to every gathering so nobody can say Rosa didn’t contribute.",
			opening: "I brought you muffins. It’s not a bribe. It’s a little bit a bribe.",
			walkout: "Rosa takes the muffins back. All of them. That’s how you know.",
			closing: "Rosa leaves one muffin behind, which in this family is a glowing review.",
			endings: Object.freeze({
				thriving: "Rosa went to a gathering empty-handed and was welcomed anyway. Rosa sent you muffins about it.",
				transferred: "Rosa moved to a therapist closer to home and left one farewell muffin. Just one.",
				memoir: "Rosa wrote ‘Crumbs,’ a memoir about you. Every chapter ends with you not deserving a muffin.",
				blocked: "Rosa took back the muffins, the tin, and the recipe. You are no longer muffin-eligible."
			})
		}),
		Object.freeze({
			id: "kai",
			name: "Kai",
			avatar: "📸",
			packIds: Object.freeze(["family"]),
			backstory: "The family photographer, which conveniently means never being in the photos.",
			opening: "I’m usually the one behind the camera, so being looked at for an hour is new. Go easy.",
			walkout: "Kai steps out of frame, permanently.",
			closing: "Kai pauses at the door like someone who might, one day, be in a photo.",
			endings: Object.freeze({
				thriving: "Kai appeared in a family photo. Front row. Smiling, slightly.",
				transferred: "Kai transferred to a new therapist and sent a framed photo of your empty office as a goodbye.",
				memoir: "Kai published a photo essay about you. Every picture is slightly out of focus, on purpose.",
				blocked: "Kai cropped you out. Of everything."
			})
		}),
		Object.freeze({
			id: "riley",
			name: "Riley",
			avatar: "📱",
			packIds: Object.freeze(["internet"]),
			backstory: "Has a screen-time report that sends concerned follow-up notifications.",
			opening: "My phone said my screen time is up 40%. I screenshotted it. Then I scrolled for twenty minutes.",
			walkout: "Riley opens an app mid-sentence and drifts out the door, still scrolling.",
			closing: "Riley puts the phone face down for the walk to the car. A personal best.",
			endings: Object.freeze({
				thriving: "Riley’s screen time dropped by a third. The phone sent a congratulations notification. Riley ignored it.",
				transferred: "Riley found a therapist through an app, which feels like a step sideways. Riley is fine with it.",
				memoir: "Riley posted a 47-part thread about you. You trended for a day, not in a good way.",
				blocked: "Riley blocked you on every app at once. It was fast. Riley has practice."
			})
		}),
		Object.freeze({
			id: "noor",
			name: "Noor",
			avatar: "✨",
			packIds: Object.freeze(["internet"]),
			backstory: "Has drafted the same post nine times and archived all of them.",
			opening: "I almost posted about coming here. Then I archived the draft. Then I un-archived it. Hi.",
			walkout: "Noor archives you. Emotionally, and then physically, via the door.",
			closing: "Noor deletes one old draft on the way out. Not posts it. Deletes it. Growth.",
			endings: Object.freeze({
				thriving: "Noor finally posted something, then logged off without checking the likes. A triumph.",
				transferred: "Noor transferred to a new therapist after drafting a goodbye post to you nine times.",
				memoir: "Noor posted a memoir-style carousel about you. It’s the first thing Noor never archived.",
				blocked: "Noor archived you. All of you. Permanently."
			})
		}),
		Object.freeze({
			id: "ezra",
			name: "Ezra",
			avatar: "🌀",
			packIds: Object.freeze(["internet"]),
			backstory: "Learns every new slang term two weeks before it turns cringe, and hates knowing that.",
			opening: "Okay, I’m going to try to say all this without a single meme reference. No promises.",
			walkout: "Ezra says “this is giving malpractice” and logs off from reality.",
			closing: "Ezra leaves with zero meme references in the last five minutes. Unprecedented.",
			endings: Object.freeze({
				thriving: "Ezra went a whole day without irony. It was terrifying, then nice. Ezra says you’re ‘lowkey goated.’",
				transferred: "Ezra transferred to a therapist who gets the references. No hard feelings, ‘fr.’",
				memoir: "Ezra wrote a memoir about you entirely in slang that will be cringe in two weeks. That’s the point.",
				blocked: "Ezra blocked you and called it ‘giving malpractice.’ It is now slang."
			})
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
