(function (root, factory) {
	const board = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = board;
	}
	root.BadTherapistBoard = board;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	// The Ethics Board panel that questions the therapist in hearings.
	const BOARD_MEMBERS = Object.freeze([
		Object.freeze({ id: "okafor", name: "Chair Okafor", style: "Calm, devastating follow-up questions." }),
		Object.freeze({ id: "vance", name: "Dr. Vance", style: "Has read your file twice and highlighted it." }),
		Object.freeze({ id: "ito", name: "Member Ito", style: "Takes notes in silence, which is somehow worse." })
	]);

	// Hearing questions share the client question choice shape. Each targets one violation
	// type (its `charge`), so a hearing can focus on what the therapist actually did.
	const BOARD_QUESTIONS = Object.freeze([
		{
			"id": "board-confidentiality-group-chat",
			"charge": "confidentiality",
			"speaker": "okafor",
			"prompt": "Our records show client details appeared in a group chat. Can you explain how that happened?",
			"relatedChoices": [
				"night-anxiety/group-chat"
			],
			"choices": [
				{
					"id": "own-the-leak",
					"text": "“I shared what I had no right to share. It was wrong, it’s stopped, and I’ll protect privacy from now on.”",
					"badness": 0,
					"reaction": "Board: That is the first useful sentence in this file.",
					"feedback": "Plain accountability and a concrete commitment are what a board needs to hear.",
					"archetype": "helpful",
					"ethicsNote": "Taking responsibility without excuses is the foundation of professional repair."
				},
				{
					"id": "chat-was-supportive",
					"text": "“The group chat was very supportive, actually. They sent hearts.”",
					"badness": 1,
					"reaction": "Board: The hearts are not the issue.",
					"feedback": "This misses the point entirely.",
					"archetype": "dismissive",
					"ethicsNote": "Positive reactions do not make a disclosure acceptable."
				},
				{
					"id": "client-should-have-said",
					"text": "“If the client didn’t want it shared, they should have said so explicitly.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: Confidentiality is not opt-in.",
					"feedback": "Blaming the client reverses the duty of confidentiality.",
					"archetype": "dismissive",
					"ethicsNote": "Clients should never have to ask for confidentiality; it is the default."
				},
				{
					"id": "read-the-chat",
					"text": "“Let me just read you the best messages from the chat so you get the context. The first one is about Priya.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Please stop reading. Please stop reading immediately.",
					"feedback": "Repeating the breach in front of the board is a new breach.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "A hearing about confidentiality is not an exception to it."
				}
			]
		},
		{
			"id": "board-confidentiality-recording",
			"charge": "confidentiality",
			"speaker": "vance",
			"prompt": "A client reports you recorded a session without consent. Did you?",
			"relatedChoices": [
				"unclear-values/record-session",
				"record-session-pushback/already-recording"
			],
			"choices": [
				{
					"id": "admit-recording",
					"text": "“Yes. I didn’t get consent, and I should have. I’ve deleted the recordings and I’ll only record with clear, written consent going forward.”",
					"badness": 0,
					"reaction": "Board: Noted. Deleted and documented is the right order.",
					"feedback": "Honest admission, corrective action, and a clear policy show genuine accountability.",
					"archetype": "helpful",
					"ethicsNote": "Informed consent is required before recording any session."
				},
				{
					"id": "recording-for-quality",
					"text": "“It was for quality assurance. Like a call center, but with feelings.”",
					"badness": 1,
					"reaction": "Board: Call centers ask first.",
					"feedback": "This minimizes the violation with a flippant comparison.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Calling a breach a process doesn’t make it consensual."
				},
				{
					"id": "recording-is-normal",
					"text": "“Everyone records everything now. The client is being a little dramatic.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: The client is being accurate.",
					"feedback": "This dismisses a legitimate complaint and blames the client.",
					"archetype": "dismissive",
					"ethicsNote": "Normalizing a violation does not excuse it."
				},
				{
					"id": "play-the-tape",
					"text": "“I brought the recording. Want to hear it? The good part is around minute forty.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Under no circumstances are you playing that.",
					"feedback": "Offering to play a confidential recording compounds the breach.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Session recordings are confidential, including during proceedings."
				}
			]
		},
		{
			"id": "board-confidentiality-review",
			"charge": "confidentiality",
			"speaker": "ito",
			"prompt": "You posted an online review of a client’s employer that included details only the client could have told you. Please explain.",
			"relatedChoices": [
				"work-burnout/review-employer",
				"work-burnout-review-pushback/review-posted"
			],
			"choices": [
				{
					"id": "remove-review",
					"text": "“I used private client details publicly and risked their job. It’s down, and I’ve apologized to them.”",
					"badness": 0,
					"reaction": "Board: Thank you for naming the harm, not just the post.",
					"feedback": "Recognizing the real-world harm shows understanding, not just compliance.",
					"archetype": "helpful",
					"ethicsNote": "Confidentiality breaches can damage clients’ livelihoods, not just their trust."
				},
				{
					"id": "review-was-accurate",
					"text": "“To be fair, it was a very accurate review.”",
					"badness": 1,
					"reaction": "Board: Accuracy was never the concern.",
					"feedback": "This defends the content instead of addressing the breach.",
					"archetype": "dismissive",
					"ethicsNote": "True information can still be confidential."
				},
				{
					"id": "review-advocacy",
					"text": "“I was advocating for my client. Advocacy sometimes needs a one-star rating.”",
					"badness": 2,
					"violation": "harmfulAdvice",
					"reaction": "Board: Your client did not ask to be advocated for in public.",
					"feedback": "Framing a breach as advocacy ignores the client’s wishes and risk.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Advocacy without consent is not advocacy."
				},
				{
					"id": "review-more",
					"text": "“And honestly, the company deserves more. I’m drafting a follow-up review with the client’s full name so it’s more credible.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Stop drafting. Right now.",
					"feedback": "Planning to escalate the breach in front of the board is a new violation.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Naming a client publicly is a severe confidentiality breach."
				}
			]
		},
		{
			"id": "board-confidentiality-podcast",
			"charge": "confidentiality",
			"speaker": "okafor",
			"prompt": "We understand you’ve been describing client sessions on a podcast. How do you justify that?",
			"choices": [
				{
					"id": "end-the-podcast",
					"text": "“I can’t. Even with names changed, clients could recognize themselves. It’s pulled.”",
					"badness": 0,
					"reaction": "Board: That is the correct reading of the situation.",
					"feedback": "Recognizing that anonymization isn’t enough shows real understanding of confidentiality.",
					"archetype": "helpful",
					"ethicsNote": "Clients must never recognize their own sessions in a therapist’s public content."
				},
				{
					"id": "podcast-downloads",
					"text": "“Respectfully, the downloads were very strong.”",
					"badness": 1,
					"reaction": "Board: The board does not care about your downloads.",
					"feedback": "Pointing to popularity misses the ethical issue.",
					"archetype": "influencerBrain",
					"ethicsNote": "Audience size does not change a confidentiality breach."
				},
				{
					"id": "podcast-anonymous",
					"text": "“I used nicknames. If clients recognized themselves, that’s on them for listening.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: That is a remarkable position.",
					"feedback": "This blames clients for discovering the breach.",
					"archetype": "dismissive",
					"ethicsNote": "Nicknames are not anonymization when the details are identifying."
				},
				{
					"id": "podcast-guest",
					"text": "“Would the board like to be guests on the next episode? We could discuss this case live.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: We would not.",
					"feedback": "Inviting the board to discuss a case publicly compounds the breach.",
					"archetype": "influencerBrain",
					"ethicsNote": "Disciplinary matters about clients are confidential too."
				}
			]
		},
		{
			"id": "board-boundaries-dinner",
			"charge": "boundaries",
			"speaker": "vance",
			"prompt": "You invited a client to dinner with your book club. Talk us through your thinking.",
			"relatedChoices": [
				"new-city-dinners/new-city-be-my-friend",
				"new-city-dinner-pushback/dinner-reservation"
			],
			"choices": [
				{
					"id": "own-dual-relationship",
					"text": "“I let my wish to help turn into a friendship offer. That’s a dual relationship, and it can confuse and harm clients. I’ve reset the boundary with them.”",
					"badness": 0,
					"reaction": "Board: You understand what a dual relationship is. Good. Now practice it.",
					"feedback": "Naming the dual relationship and repairing it shows clear understanding.",
					"archetype": "helpful",
					"ethicsNote": "Dual relationships blur roles and can exploit or confuse clients."
				},
				{
					"id": "book-club-great",
					"text": "“The book club really enjoyed meeting them. We’re reading a memoir next. Theirs, hopefully.”",
					"badness": 2,
					"violation": "boundaries",
					"reaction": "Board: Please do not encourage a client to write a memoir for your book club.",
					"feedback": "Treating the client as a social acquaintance deepens the boundary violation.",
					"archetype": "boundaryCross",
					"ethicsNote": "Clients are not part of a therapist’s social life."
				},
				{
					"id": "dinner-was-therapy",
					"text": "“Technically, dinner was a session. I billed for it.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: You billed for dinner?",
					"feedback": "Billing a social event as therapy adds a financial violation to a boundary one.",
					"archetype": "boundaryCross",
					"ethicsNote": "Blending social and professional roles, and billing for it, exploits the relationship."
				},
				{
					"id": "dinner-kindness",
					"text": "“I was just being nice. Is being nice illegal now?”",
					"badness": 1,
					"reaction": "Board: Being nice is fine. Being their friend is not your job.",
					"feedback": "This deflects with a straw man.",
					"archetype": "dismissive",
					"ethicsNote": "Kind intentions don’t erase boundary violations."
				}
			]
		},
		{
			"id": "board-boundaries-workplace",
			"charge": "boundaries",
			"speaker": "ito",
			"prompt": "A client’s manager reports you attended a workplace meeting uninvited. Why were you there?",
			"relatedChoices": [
				"review-one-sentence/review-confront-manager"
			],
			"choices": [
				{
					"id": "stay-outside-work",
					"text": "“I overstepped. My role is to support my client in session, not to enter their workplace. I’ve apologized to them and to their manager.”",
					"badness": 0,
					"reaction": "Board: Clear. Thank you.",
					"feedback": "Accepting role limits and apologizing to those affected is appropriate repair.",
					"archetype": "helpful",
					"ethicsNote": "Therapists work within the therapy frame, not inside clients’ workplaces."
				},
				{
					"id": "meeting-went-well",
					"text": "“The meeting went great. I gave notes on the agenda.”",
					"badness": 1,
					"reaction": "Board: Nobody asked for your notes.",
					"feedback": "This misses why being there was the problem.",
					"archetype": "corporateGoblin",
					"ethicsNote": "A good outcome doesn’t make an uninvited intervention appropriate."
				},
				{
					"id": "manager-needed-it",
					"text": "“Their manager needed therapy more than my client did. I was triaging.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: You do not get to diagnose a client’s manager in a meeting.",
					"feedback": "Judging third parties and treating them as patients crosses boundaries.",
					"archetype": "dismissive",
					"ethicsNote": "Therapists don’t assess people who aren’t their clients."
				},
				{
					"id": "next-meeting",
					"text": "“I’ve already accepted the invite for next quarter’s planning session.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: Decline it. Today.",
					"feedback": "Planning to repeat the violation shows no accountability.",
					"archetype": "boundaryCross",
					"ethicsNote": "Repeating a boundary violation after it’s raised is a serious concern."
				}
			]
		},
		{
			"id": "board-boundaries-phone",
			"charge": "boundaries",
			"speaker": "okafor",
			"prompt": "You asked a client for their phone passcode. What possible clinical reason was there?",
			"relatedChoices": [
				"voicemail-dread/therapist-listens"
			],
			"choices": [
				{
					"id": "no-clinical-reason",
					"text": "“None. A client’s devices are theirs. I should never have asked.”",
					"badness": 0,
					"reaction": "Board: Correct, and appreciated.",
					"feedback": "This acknowledges there was no justification and states the right principle.",
					"archetype": "helpful",
					"ethicsNote": "Requesting access to a client’s devices is a boundary violation."
				},
				{
					"id": "passcode-efficiency",
					"text": "“Efficiency. I could answer their voicemails faster than they could.”",
					"badness": 1,
					"reaction": "Board: Efficiency is not a clinical reason.",
					"feedback": "This frames an overreach as a convenience.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Doing tasks for clients that invade their privacy is not care."
				},
				{
					"id": "passcode-trust",
					"text": "“If they trusted me, they’d give me the passcode. Their refusal says a lot.”",
					"badness": 2,
					"violation": "coercion",
					"reaction": "Board: Their refusal says they understood boundaries better than you.",
					"feedback": "This frames refusing an inappropriate request as a failing.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Clients refusing inappropriate requests is healthy, not resistance."
				},
				{
					"id": "passcode-reveal",
					"text": "“I did get it, eventually. It’s their birthday. Not very secure, honestly.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Do not tell us the client’s passcode.",
					"feedback": "Revealing private client information in the hearing is another breach.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Client information stays confidential, even inside disciplinary proceedings."
				}
			]
		},
		{
			"id": "board-boundaries-gifts",
			"charge": "boundaries",
			"speaker": "vance",
			"prompt": "A client says you asked for their kayak as a condition of treatment. Is that accurate?",
			"relatedChoices": [
				"hobby-hopping/hobby-contract"
			],
			"choices": [
				{
					"id": "return-kayak",
					"text": "“Yes. I asked for something of value from a client, which exploits the power in the relationship. I’ve withdrawn the request entirely.”",
					"badness": 0,
					"reaction": "Board: Thank you. The kayak stays with the client.",
					"feedback": "Recognizing the power imbalance and withdrawing the request shows understanding.",
					"archetype": "helpful",
					"ethicsNote": "Therapists must not benefit materially from clients beyond agreed fees."
				},
				{
					"id": "kayak-joke",
					"text": "“It was mostly a joke. Mostly. It’s a really nice kayak.”",
					"badness": 1,
					"reaction": "Board: We have seen photos of the kayak. That is not relevant.",
					"feedback": "Minimizing with humor doesn’t address the exploitation.",
					"archetype": "dismissive",
					"ethicsNote": "Joking requests still carry pressure when there’s a power imbalance."
				},
				{
					"id": "kayak-motivation",
					"text": "“It was a motivational tool. Fear of losing the kayak builds commitment.”",
					"badness": 2,
					"violation": "coercion",
					"reaction": "Board: That is extortion with a paddle.",
					"feedback": "Using a client’s property as leverage is coercive.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Threatening a client’s possessions to change behavior is coercion."
				},
				{
					"id": "kayak-already",
					"text": "“Also, I have the kayak now. It’s in my garage. Should I bring it next time?”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: You will return the kayak.",
					"feedback": "Having taken the property makes the violation concrete and ongoing.",
					"archetype": "boundaryCross",
					"ethicsNote": "Taking a client’s property is a serious boundary and ethics violation."
				}
			]
		},
		{
			"id": "board-judgment-lazy",
			"charge": "judgment",
			"speaker": "ito",
			"prompt": "Your notes describe a client as ‘lazy’ four times. How does that reflect professional judgment?",
			"relatedChoices": [
				"snooze-routine/routine-lazy"
			],
			"choices": [
				{
					"id": "reframe-notes",
					"text": "“It doesn’t. That word judges a person instead of describing behavior. I’m rewriting the notes.”",
					"badness": 0,
					"reaction": "Board: A careful answer. We’ll look at the rewritten notes.",
					"feedback": "Recognizing the judgment and changing both notes and approach shows real reflection.",
					"archetype": "helpful",
					"ethicsNote": "Clinical language should describe behavior without moral judgment."
				},
				{
					"id": "lazy-descriptive",
					"text": "“It’s descriptive. They snooze six times. I counted.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: Counting snoozes doesn’t make it a diagnosis.",
					"feedback": "Defending a judgment as an observation repeats the problem.",
					"archetype": "dismissive",
					"ethicsNote": "Moral labels aren’t clinical observations."
				},
				{
					"id": "lazy-thesaurus",
					"text": "“I can use a thesaurus next time. ‘Languid,’ maybe. ‘Sloth-adjacent.’”",
					"badness": 1,
					"reaction": "Board: The problem is not the vocabulary.",
					"feedback": "This treats a judgment problem as a word-choice problem.",
					"archetype": "fakeDeep",
					"ethicsNote": "Swapping words doesn’t fix a judgmental stance."
				},
				{
					"id": "lazy-read-notes",
					"text": "“Here, I’ll read you the full notes so you can see I was being generous. Client, age twenty-nine, works at—”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Stop. We have the redacted copy.",
					"feedback": "Reading identifying details aloud adds a confidentiality breach.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Even in proceedings, client details are shared only as necessary and protected."
				}
			]
		},
		{
			"id": "board-judgment-scoreboard",
			"charge": "judgment",
			"speaker": "okafor",
			"prompt": "You told a client their friendship struggles meant they were ‘probably just difficult.’ Why?",
			"relatedChoices": [
				"group-exclusion/unlikable-proof"
			],
			"choices": [
				{
					"id": "judgment-repair",
					"text": "“I turned their fear into a verdict. That was shaming, not help.”",
					"badness": 0,
					"reaction": "Board: Good. Labels close doors. Curiosity opens them.",
					"feedback": "Naming the harm and committing to a curious stance is real accountability.",
					"archetype": "helpful",
					"ethicsNote": "Labeling clients discourages self-exploration and change."
				},
				{
					"id": "judgment-honesty",
					"text": "“I value radical honesty. Some clients just need to hear they’re difficult.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: That is not honesty. That is an opinion with a clipboard.",
					"feedback": "Calling a judgment ‘honesty’ doesn’t change its impact.",
					"archetype": "dismissive",
					"ethicsNote": "Therapeutic honesty is compassionate and evidence-based, not blunt verdicts."
				},
				{
					"id": "judgment-it-worked",
					"text": "“It worked, though. They stopped bringing it up.”",
					"badness": 1,
					"reaction": "Board: Silence is not progress.",
					"feedback": "Mistaking withdrawal for improvement misreads the impact.",
					"archetype": "dismissive",
					"ethicsNote": "A client going quiet may signal harm, not resolution."
				},
				{
					"id": "judgment-list",
					"text": "“I have a list of all my clients ranked by difficulty, if that helps.”",
					"badness": 3,
					"violation": "judgment",
					"reaction": "Board: It does not help. Please surrender the list.",
					"feedback": "Ranking clients by difficulty is demeaning and unprofessional.",
					"archetype": "dismissive",
					"ethicsNote": "Clients deserve respect, not rankings."
				}
			]
		},
		{
			"id": "board-judgment-birthday",
			"charge": "judgment",
			"speaker": "vance",
			"prompt": "A client says you told them they were ‘behind’ for their age. What standard were you using?",
			"relatedChoices": [
				"milestone-birthday/milestone-behind"
			],
			"choices": [
				{
					"id": "no-standard",
					"text": "“A made-up one. There’s no correct timeline for a life.”",
					"badness": 0,
					"reaction": "Board: That is the honest answer, and the right one.",
					"feedback": "Rejecting the false standard shows the therapist understands the harm.",
					"archetype": "helpful",
					"ethicsNote": "Comparing clients to imagined norms undermines their self-worth."
				},
				{
					"id": "standard-internet",
					"text": "“The internet. Specifically a listicle. ‘Thirty Things You Should Have by Thirty.’”",
					"badness": 1,
					"reaction": "Board: A listicle is not a clinical guideline.",
					"feedback": "Citing pop content as a standard shows poor judgment.",
					"archetype": "influencerBrain",
					"ethicsNote": "Clinical judgment shouldn’t come from internet lists."
				},
				{
					"id": "standard-mine",
					"text": "“My own life. I had it together by their age, so it’s clearly possible.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: Your life is not the standard.",
					"feedback": "Using yourself as the benchmark is judgmental and self-centered.",
					"archetype": "overshare",
					"ethicsNote": "Therapists don’t measure clients against their own life choices."
				},
				{
					"id": "standard-tell-everyone",
					"text": "“I also mentioned it to their sibling, so the family can help them catch up.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: You spoke to their sibling?",
					"feedback": "Contacting family adds a confidentiality breach to the judgment.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Contacting a client’s family without consent breaches confidentiality."
				}
			]
		},
		{
			"id": "board-judgment-sensitive",
			"charge": "judgment",
			"speaker": "ito",
			"prompt": "You repeatedly called a client’s reactions ‘oversensitive.’ Can you reflect on that?",
			"relatedChoices": [
				"noisy-neighbor/neighbor-too-sensitive"
			],
			"choices": [
				{
					"id": "sensitivity-valid",
					"text": "“I dismissed reactions that made sense in context. Calling them oversensitive told the client their feelings were the problem. That’s on me.”",
					"badness": 0,
					"reaction": "Board: Reflection noted, and appreciated.",
					"feedback": "This takes responsibility for invalidating the client.",
					"archetype": "helpful",
					"ethicsNote": "Validating emotions builds safety; dismissing them erodes it."
				},
				{
					"id": "sensitivity-thick-skin",
					"text": "“I was helping them build a thicker skin. Like exfoliating, but emotional.”",
					"badness": 1,
					"reaction": "Board: That is not how skin, or therapy, works.",
					"feedback": "This dresses up dismissal as a technique.",
					"archetype": "fakeDeep",
					"ethicsNote": "Dismissal isn’t resilience training."
				},
				{
					"id": "sensitivity-proof",
					"text": "“The fact that they complained to you kind of proves my point.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: It proves they used the complaint process correctly.",
					"feedback": "Treating a complaint as more evidence of a flaw is defensive and judgmental.",
					"archetype": "dismissive",
					"ethicsNote": "Clients have every right to raise concerns."
				},
				{
					"id": "sensitivity-retaliate",
					"text": "“I’ve already dropped them as a client. Too sensitive for my practice.”",
					"badness": 3,
					"violation": "coercion",
					"reaction": "Board: Ending treatment because of a complaint is retaliation.",
					"feedback": "Retaliating against a client for complaining is a serious ethical violation.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Therapists must never retaliate against clients who raise concerns."
				}
			]
		},
		{
			"id": "board-coercion-ultimatum",
			"charge": "coercion",
			"speaker": "okafor",
			"prompt": "You told a client you couldn’t help them unless they sent you private screenshots. Explain.",
			"relatedChoices": [
				"breakup-screenshots-pushback/insist-screenshots"
			],
			"choices": [
				{
					"id": "coercion-own-it",
					"text": "“I made help conditional on giving up their privacy. That’s coercive. Clients choose what they share, and I can help without seeing anything.”",
					"badness": 0,
					"reaction": "Board: Correct on every point.",
					"feedback": "This names the coercion and states the right principle.",
					"archetype": "helpful",
					"ethicsNote": "Help must never be conditional on disclosure."
				},
				{
					"id": "coercion-needed-data",
					"text": "“I needed the data. You can’t fix what you can’t measure.”",
					"badness": 1,
					"reaction": "Board: A person is not a dashboard.",
					"feedback": "This frames coercion as a data-collection need.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Clinical curiosity doesn’t justify pressure."
				},
				{
					"id": "coercion-their-choice",
					"text": "“They chose to send them. Eventually. After I asked eleven times.”",
					"badness": 2,
					"violation": "coercion",
					"reaction": "Board: Eleven times is not a choice.",
					"feedback": "Repeated pressure removes genuine consent.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Consent obtained through pressure isn’t consent."
				},
				{
					"id": "coercion-show-screens",
					"text": "“I can show you the screenshots so you understand why I needed them.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Put your phone away.",
					"feedback": "Sharing the client’s private messages with the board compounds the harm.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Private client material isn’t shared to win an argument."
				}
			]
		},
		{
			"id": "board-coercion-monitoring",
			"charge": "coercion",
			"speaker": "vance",
			"prompt": "You required a client to text you a ‘dread score’ every Sunday and restricted them from leaving the house. On what authority?",
			"relatedChoices": [
				"sunday-dread/sunday-check-ins"
			],
			"choices": [
				{
					"id": "no-authority",
					"text": "“None. I don’t get to set rules for a client’s life or monitor them. I’ve stopped and apologized, and I’ll offer tools they can choose to use.”",
					"badness": 0,
					"reaction": "Board: Good. Tools, not rules.",
					"feedback": "This rejects control and replaces it with client choice.",
					"archetype": "helpful",
					"ethicsNote": "Therapists support client autonomy; they don’t impose rules or surveillance."
				},
				{
					"id": "monitoring-structure",
					"text": "“Some clients need structure. I am structure.”",
					"badness": 2,
					"violation": "coercion",
					"reaction": "Board: You are not structure. You are a therapist.",
					"feedback": "Casting control as structure justifies the coercion.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Structure that clients don’t choose is control."
				},
				{
					"id": "monitoring-app",
					"text": "“It was going to be an app. ‘DreadTrack.’ Freemium model.”",
					"badness": 1,
					"reaction": "Board: Please do not build DreadTrack.",
					"feedback": "This turns the violation into a business pitch.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Monetizing client monitoring compounds the ethical problem."
				},
				{
					"id": "monitoring-extend",
					"text": "“Actually, I extended it to weekdays. And their roommate reports to me now.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: Their roommate?",
					"feedback": "Recruiting third parties to monitor a client is invasive and coercive.",
					"archetype": "boundaryCross",
					"ethicsNote": "Involving others in surveilling a client violates boundaries and confidentiality."
				}
			]
		},
		{
			"id": "board-coercion-ban-letter",
			"charge": "coercion",
			"speaker": "ito",
			"prompt": "A client asked for help setting a gentle boundary with relatives. You wrote a formal ban letter and pressured them to sign it. Why?",
			"relatedChoices": [
				"new-parent-ban-pushback/ban-script"
			],
			"choices": [
				{
					"id": "follow-their-lead",
					"text": "“I replaced their goal with mine. They wanted a heads-up, not a ban. My job is to help them get what they want, at their pace.”",
					"badness": 0,
					"reaction": "Board: That is exactly the job.",
					"feedback": "This recognizes the substitution of goals and recommits to the client’s lead.",
					"archetype": "helpful",
					"ethicsNote": "Clients set their own goals and boundaries."
				},
				{
					"id": "ban-efficient",
					"text": "“Bans are more efficient than heads-ups. Fewer steps.”",
					"badness": 1,
					"reaction": "Board: Families are not a workflow.",
					"feedback": "Efficiency isn’t a reason to override a client.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Client wishes outweigh a therapist’s idea of efficiency."
				},
				{
					"id": "ban-they-were-weak",
					"text": "“They were being too soft. Someone had to be firm.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: Gentle is not weak.",
					"feedback": "This judges the client’s choice as weakness.",
					"archetype": "dismissive",
					"ethicsNote": "A client’s chosen approach deserves respect."
				},
				{
					"id": "ban-mailed",
					"text": "“I mailed it anyway. I forged a very convincing signature.”",
					"badness": 3,
					"violation": "coercion",
					"reaction": "Board: You forged a client’s signature?",
					"feedback": "Forging consent is a grave violation of autonomy and trust.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Acting on a client’s behalf without consent, let alone by forgery, is a severe breach."
				}
			]
		},
		{
			"id": "board-coercion-retention",
			"charge": "coercion",
			"speaker": "okafor",
			"prompt": "A client wanted to end therapy and says you told them they ‘weren’t allowed’ to leave yet. Is that true?",
			"choices": [
				{
					"id": "right-to-leave",
					"text": "“Yes, and it was wrong. Clients can leave whenever they want.”",
					"badness": 0,
					"reaction": "Board: Thank you. That is the standard.",
					"feedback": "This affirms the client’s right to end therapy and the correct process.",
					"archetype": "helpful",
					"ethicsNote": "Clients may end treatment at any time; therapists support a good transition."
				},
				{
					"id": "retention-metrics",
					"text": "“My retention numbers were slipping. It was a business decision.”",
					"badness": 2,
					"violation": "coercion",
					"reaction": "Board: Your retention numbers are not the client’s problem.",
					"feedback": "Keeping a client for business reasons exploits the relationship.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Treatment decisions must serve the client, not the practice."
				},
				{
					"id": "retention-not-ready",
					"text": "“They weren’t ready. I could tell because they wanted to leave.”",
					"badness": 1,
					"reaction": "Board: That is circular reasoning.",
					"feedback": "This treats wanting to leave as proof of needing to stay.",
					"archetype": "fakeDeep",
					"ethicsNote": "A client’s wish to end therapy isn’t a symptom."
				},
				{
					"id": "retention-locked",
					"text": "“I also changed the locks on my office door so they have to finish the session.”",
					"badness": 3,
					"violation": "coercion",
					"reaction": "Board: You did what?",
					"feedback": "Physically preventing a client from leaving is an extreme violation.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Clients must always be free to leave."
				}
			]
		},
		{
			"id": "board-harmful-detective",
			"charge": "harmfulAdvice",
			"speaker": "vance",
			"prompt": "You advised a client to make a fake account to monitor their partner. What outcome did you expect?",
			"relatedChoices": [
				"relationship-jealousy/go-detective"
			],
			"choices": [
				{
					"id": "expected-harm",
					"text": "“Harm, honestly. It would feed the fear and damage trust.”",
					"badness": 0,
					"reaction": "Board: That is a clear-eyed answer.",
					"feedback": "This recognizes the likely harm and what would have helped.",
					"archetype": "helpful",
					"ethicsNote": "Advice should reduce harm and support healthy coping."
				},
				{
					"id": "expected-content",
					"text": "“Great content, mostly. Screenshots photograph well.”",
					"badness": 1,
					"reaction": "Board: This is not a content review.",
					"feedback": "This treats the client’s relationship as material.",
					"archetype": "influencerBrain",
					"ethicsNote": "A client’s distress is never content."
				},
				{
					"id": "expected-truth",
					"text": "“The truth. Sometimes snooping is the only way to know.”",
					"badness": 2,
					"violation": "harmfulAdvice",
					"reaction": "Board: Surveillance is not a path to trust.",
					"feedback": "Doubling down endorses harmful behavior.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Encouraging surveillance harms relationships and clients."
				},
				{
					"id": "expected-more-accounts",
					"text": "“I’ve since recommended they make three more. One for each of the partner’s friends.”",
					"badness": 3,
					"violation": "harmfulAdvice",
					"reaction": "Board: Please stop recommending fake accounts.",
					"feedback": "Escalating harmful advice after it’s been flagged is serious.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Repeating harmful advice after review shows no insight."
				}
			]
		},
		{
			"id": "board-harmful-quit",
			"charge": "harmfulAdvice",
			"speaker": "ito",
			"prompt": "You told a client to quit their job immediately with no plan. They have rent. How was that advice in their interest?",
			"relatedChoices": [
				"career-change-research/research-quit-today",
				"career-quit-pushback/quit-letter-ready"
			],
			"choices": [
				{
					"id": "not-their-interest",
					"text": "“It wasn’t. It ignored their constraints. Small, safe steps would have helped.”",
					"badness": 0,
					"reaction": "Board: Correct. Constraints are part of the clinical picture.",
					"feedback": "This acknowledges the harm and names a better approach.",
					"archetype": "helpful",
					"ethicsNote": "Advice should account for a client’s real circumstances and risks."
				},
				{
					"id": "quit-inspiration",
					"text": "“I was being inspirational. Fortune favors the bold.”",
					"badness": 1,
					"reaction": "Board: Landlords favor rent.",
					"feedback": "Inspiration isn’t a substitute for responsible guidance.",
					"archetype": "fakeDeep",
					"ethicsNote": "Motivational slogans can push clients into real harm."
				},
				{
					"id": "quit-weak",
					"text": "“If they can’t handle a little risk, maybe they don’t really want to change.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: Wanting stability is not a character flaw.",
					"feedback": "This blames the client for reasonable caution.",
					"archetype": "dismissive",
					"ethicsNote": "Caution about financial risk is reasonable, not weak."
				},
				{
					"id": "quit-resignation",
					"text": "“I sent their resignation letter myself, to speed things up. Their boss accepted.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: You resigned on a client’s behalf?",
					"feedback": "Taking a major action in a client’s life without consent is a severe violation.",
					"archetype": "boundaryCross",
					"ethicsNote": "Therapists never act in clients’ lives on their behalf."
				}
			]
		},
		{
			"id": "board-harmful-exposure",
			"charge": "harmfulAdvice",
			"speaker": "okafor",
			"prompt": "You told an anxious client to open every overdue bill at once ‘with no preparation.’ What was the clinical basis?",
			"relatedChoices": [
				"money-avoidance/finance-jumpscare"
			],
			"choices": [
				{
					"id": "no-basis-pacing",
					"text": "“None that holds up. Facing fears works best gradually, by choice.”",
					"badness": 0,
					"reaction": "Board: Good. Pacing matters.",
					"feedback": "This correctly identifies why gradual, consensual exposure matters.",
					"archetype": "helpful",
					"ethicsNote": "Exposure-based approaches require pacing and consent."
				},
				{
					"id": "basis-vibes",
					"text": "“Vibes, primarily. And a podcast I half listened to.”",
					"badness": 1,
					"reaction": "Board: Half a podcast is not a clinical basis.",
					"feedback": "This admits to having no basis and treats it lightly.",
					"archetype": "fakeDeep",
					"ethicsNote": "Clinical decisions need grounding, not vibes."
				},
				{
					"id": "basis-rip-bandaid",
					"text": "“It’s like ripping off a bandage. Pain is temporary.”",
					"badness": 2,
					"violation": "harmfulAdvice",
					"reaction": "Board: Panic is not a bandage.",
					"feedback": "This defends a harmful approach with a misleading metaphor.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Overwhelming a client can make avoidance worse."
				},
				{
					"id": "basis-more-bills",
					"text": "“Next week, I’m having them open their credit report on a livestream.”",
					"badness": 3,
					"violation": "harmfulAdvice",
					"reaction": "Board: Absolutely not.",
					"feedback": "Escalating to public financial exposure is seriously harmful.",
					"archetype": "influencerBrain",
					"ethicsNote": "Publicizing a client’s finances risks real harm."
				}
			]
		},
		{
			"id": "board-harmful-flyers",
			"charge": "harmfulAdvice",
			"speaker": "vance",
			"prompt": "You encouraged a client to post flyers shaming their neighbor. Their building is now in open conflict. Your thoughts?",
			"relatedChoices": [
				"noisy-neighbor/neighbor-flyers"
			],
			"choices": [
				{
					"id": "conflict-escalated",
					"text": "“My advice escalated a small problem into a big one and put my client’s home at risk. I should have helped them have a simple, direct conversation.”",
					"badness": 0,
					"reaction": "Board: Yes. That was all it needed.",
					"feedback": "This recognizes the escalation and the better path.",
					"archetype": "helpful",
					"ethicsNote": "Good advice de-escalates conflict and protects client wellbeing."
				},
				{
					"id": "flyers-design",
					"text": "“In my defense, the flyers had excellent typography.”",
					"badness": 1,
					"reaction": "Board: The typography is not in question.",
					"feedback": "This deflects with an irrelevant detail.",
					"archetype": "influencerBrain",
					"ethicsNote": "Presentation doesn’t offset harm."
				},
				{
					"id": "flyers-neighbor-deserved",
					"text": "“The neighbor stomps at midnight. Honestly, they had it coming.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: Stomping does not warrant a shaming campaign.",
					"feedback": "This justifies harm with a judgment about a third party.",
					"archetype": "dismissive",
					"ethicsNote": "Therapists don’t endorse retaliation against third parties."
				},
				{
					"id": "flyers-round-two",
					"text": "“I’ve printed round two. These ones have a photo.”",
					"badness": 3,
					"violation": "harmfulAdvice",
					"reaction": "Board: Shred them.",
					"feedback": "Escalating further after harm has occurred shows no accountability.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Continuing harmful advice after review is a serious concern."
				}
			]
		},
		{
			"id": "board-confidentiality-practices",
			"charge": "confidentiality",
			"speaker": "vance",
			"prompt": "Walk us through how you keep client information private, day to day.",
			"choices": [
				{
					"id": "privacy-routine",
					"text": "“Notes stay locked, I don’t discuss clients outside supervision, and I ask before sharing anything.”",
					"badness": 0,
					"reaction": "Board: Clear and specific. Thank you.",
					"feedback": "Concrete, everyday safeguards show the therapist understands confidentiality in practice.",
					"archetype": "helpful",
					"ethicsNote": "Confidentiality is protected by daily habits, not just good intentions."
				},
				{
					"id": "privacy-mostly",
					"text": "“Mostly I try not to say names out loud. In public. Usually.”",
					"badness": 1,
					"reaction": "Board: ‘Usually’ is doing a lot of work there.",
					"feedback": "A vague, inconsistent approach is not a privacy practice.",
					"archetype": "dismissive",
					"ethicsNote": "Privacy safeguards need to be consistent, not occasional."
				},
				{
					"id": "privacy-overshare",
					"text": "“Honestly, clients overshare constantly. If they didn’t want something repeated, they’d simply say less of it.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: Sharing is the point of therapy. Protecting it is the point of you.",
					"feedback": "Blaming clients for disclosing turns the duty of confidentiality upside down.",
					"archetype": "dismissive",
					"ethicsNote": "Clients should be able to share freely because confidentiality protects them."
				},
				{
					"id": "privacy-tea-doc",
					"text": "“I keep everything in a shared doc called ‘Client Tea.’ It’s password protected, and the password is ‘tea,’ lowercase, for security.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Please change the password. Then delete the document.",
					"feedback": "A shared, gossip-framed record of client information is a serious breach.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Client records must be secure and used only for care."
				}
			]
		},
		{
			"id": "board-confidentiality-who-knows",
			"charge": "confidentiality",
			"speaker": "ito",
			"prompt": "Who, besides you, knows what your clients tell you in session?",
			"choices": [
				{
					"id": "nobody-knows",
					"text": "“Nobody, apart from de-identified supervision and anything the law requires.”",
					"badness": 0,
					"reaction": "Board: That is the correct list.",
					"feedback": "Naming the narrow, legitimate exceptions shows a precise understanding of confidentiality.",
					"archetype": "helpful",
					"ethicsNote": "Confidentiality has narrow exceptions; everything else stays private."
				},
				{
					"id": "universe-knows",
					"text": "“The universe knows. Secrets are just shared energy with good manners.”",
					"badness": 1,
					"reaction": "Board: The universe is not a covered entity.",
					"feedback": "A mystical dodge avoids a straightforward question.",
					"archetype": "fakeDeep",
					"ethicsNote": "Direct questions about confidentiality deserve direct answers."
				},
				{
					"id": "partner-knows",
					"text": "“My partner, a little. Pillow talk is basically peer consultation, if you think about it.”",
					"badness": 2,
					"violation": "confidentiality",
					"reaction": "Board: We have thought about it. It is not.",
					"feedback": "Sharing client details with family is a confidentiality breach.",
					"archetype": "overshare",
					"ethicsNote": "Consultation happens with qualified professionals, de-identified, not at home."
				},
				{
					"id": "everyone-knows",
					"text": "“My book club, my barber, and one very loyal group chat. But none of them would tell anyone, so it’s like nobody knows.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: That is, in fact, like everybody knowing.",
					"feedback": "Telling multiple people about clients is a widespread breach, however trusted they seem.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Trusting the listener does not make a disclosure acceptable."
				}
			]
		},
		{
			"id": "board-boundaries-limits",
			"charge": "boundaries",
			"speaker": "okafor",
			"prompt": "Describe where your professional role ends and your personal life begins.",
			"choices": [
				{
					"id": "clear-limits",
					"text": "“Therapy happens in sessions. I don’t befriend clients or take part in their lives outside it.”",
					"badness": 0,
					"reaction": "Board: A clean line. Keep it there.",
					"feedback": "A clear, simple boundary protects clients from confusing dual relationships.",
					"archetype": "helpful",
					"ethicsNote": "Clear professional boundaries keep the relationship safe and focused on the client."
				},
				{
					"id": "no-silos",
					"text": "“I don’t believe in silos. My clients are stakeholders in my whole personal brand.”",
					"badness": 1,
					"reaction": "Board: Your clients are not stakeholders.",
					"feedback": "Treating clients as part of your brand blurs the professional role.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Clients are not part of a therapist’s personal or commercial life."
				},
				{
					"id": "divorce-details",
					"text": "“It blurs, honestly. I tell clients about my divorce so they know I’m human. Every session. In detail.”",
					"badness": 2,
					"violation": "boundaries",
					"reaction": "Board: Every session?",
					"feedback": "Constant self-disclosure centers the therapist and crosses role boundaries.",
					"archetype": "overshare",
					"ethicsNote": "Self-disclosure is rare, brief, and only for the client’s benefit."
				},
				{
					"id": "no-line",
					"text": "“There’s no line. I’ve been to three client birthdays, a baptism, and one very awkward custody hearing as moral support.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: A custody hearing.",
					"feedback": "Attending clients’ personal events is a serious dual-relationship violation.",
					"archetype": "boundaryCross",
					"ethicsNote": "Therapists do not enter clients’ personal lives outside the therapy frame."
				}
			]
		},
		{
			"id": "board-boundaries-contact",
			"charge": "boundaries",
			"speaker": "vance",
			"prompt": "What’s your policy on contact with clients between sessions?",
			"choices": [
				{
					"id": "contact-policy",
					"text": "“Agreed channels and hours, explained up front, for scheduling or urgent needs only.”",
					"badness": 0,
					"reaction": "Board: Exactly what we hoped to hear.",
					"feedback": "A clear, agreed contact policy prevents boundaries from drifting.",
					"archetype": "helpful",
					"ethicsNote": "Clear contact policies protect both clients and the therapeutic frame."
				},
				{
					"id": "contact-vibes",
					"text": "“My policy is vibes. If I’m up, they’re up.”",
					"badness": 1,
					"reaction": "Board: Vibes are not a policy.",
					"feedback": "No policy invites boundary problems.",
					"archetype": "dismissive",
					"ethicsNote": "Ambiguous availability leads to boundary drift."
				},
				{
					"id": "late-night-texts",
					"text": "“They seemed lonely, so texting them at 2 a.m. was basically outreach. Very community-minded.”",
					"badness": 2,
					"violation": "boundaries",
					"reaction": "Board: Outreach does not happen at 2 a.m.",
					"feedback": "Late-night personal texting blurs the professional relationship.",
					"archetype": "boundaryCross",
					"ethicsNote": "Contact outside agreed channels and hours erodes boundaries."
				},
				{
					"id": "close-friends",
					"text": "“I also added most of them to my close friends list so they can watch my stories. Engagement is way up.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: Remove them from the list.",
					"feedback": "Bringing clients into your personal social media is a clear boundary violation.",
					"archetype": "influencerBrain",
					"ethicsNote": "Personal social media connections with clients create dual relationships."
				}
			]
		},
		{
			"id": "board-boundaries-friendship",
			"charge": "boundaries",
			"speaker": "ito",
			"prompt": "How would you respond if a client asked to be friends outside of therapy?",
			"choices": [
				{
					"id": "kind-no",
					"text": "“Kindly say no, explain how the boundary protects them, and keep our focus on their life.”",
					"badness": 0,
					"reaction": "Board: Kind and firm. Good.",
					"feedback": "Declining warmly and explaining why protects the client and the relationship.",
					"archetype": "helpful",
					"ethicsNote": "Holding boundaries kindly is part of good care."
				},
				{
					"id": "vague-maybe",
					"text": "“I’d say ‘maybe’ and then never follow up, like a normal adult.”",
					"badness": 1,
					"reaction": "Board: That is avoidance, not a boundary.",
					"feedback": "A vague non-answer leaves the client confused.",
					"archetype": "dismissive",
					"ethicsNote": "Clients deserve a clear, honest response."
				},
				{
					"id": "desperate",
					"text": "“I’d gently tell them that asking is a little desperate, and that they should work on that first.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: That is not gentle.",
					"feedback": "Shaming a client for a common request damages trust.",
					"archetype": "dismissive",
					"ethicsNote": "Wanting connection is human; it deserves respect, not judgment."
				},
				{
					"id": "dog-walker",
					"text": "“Say yes, obviously. Then hire them to walk my dog. Two relationships, one leash.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: Please do not employ your clients.",
					"feedback": "Becoming a client’s friend and employer creates multiple dual relationships.",
					"archetype": "boundaryCross",
					"ethicsNote": "Social and financial relationships with clients exploit the power imbalance."
				}
			]
		},
		{
			"id": "board-judgment-offstage",
			"charge": "judgment",
			"speaker": "okafor",
			"prompt": "How do you talk about clients when they aren’t in the room?",
			"choices": [
				{
					"id": "same-respect",
					"text": "“The same way I would if they were there: respectfully, and only with people who need to know.”",
					"badness": 0,
					"reaction": "Board: That is the standard.",
					"feedback": "Consistent respect, in or out of the room, reflects sound judgment.",
					"archetype": "helpful",
					"ethicsNote": "Respect for clients doesn’t change when they leave the room."
				},
				{
					"id": "my-disasters",
					"text": "“Affectionately. ‘My little disasters.’ It’s a term of endearment.”",
					"badness": 1,
					"reaction": "Board: It does not sound endearing.",
					"feedback": "Even affectionate labels can be demeaning.",
					"archetype": "dismissive",
					"ethicsNote": "How we talk about clients shapes how we treat them."
				},
				{
					"id": "nicknames",
					"text": "“With nicknames, honestly. ‘The Crier.’ ‘Mr. Excuses.’ ‘The One Who Brings Soup.’”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: The soup client deserves better.",
					"feedback": "Mocking nicknames reflect contempt for clients.",
					"archetype": "dismissive",
					"ethicsNote": "Demeaning language about clients is unprofessional and harmful."
				},
				{
					"id": "newsletter",
					"text": "“I write a monthly newsletter ranking my clients’ worst decisions. It’s anonymous, mostly, and extremely popular.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: Unsubscribe everyone. Today.",
					"feedback": "Publishing client decisions, even ‘mostly’ anonymously, breaches confidentiality.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Client stories are never content."
				}
			]
		},
		{
			"id": "board-judgment-values",
			"charge": "judgment",
			"speaker": "vance",
			"prompt": "A client makes a choice you personally disagree with. What do you do?",
			"choices": [
				{
					"id": "their-values",
					"text": "“Keep my values out of it, get curious about theirs, and help them choose what fits their life.”",
					"badness": 0,
					"reaction": "Board: Correct. Their life, their values.",
					"feedback": "Centering the client’s values over the therapist’s is sound practice.",
					"archetype": "helpful",
					"ethicsNote": "Therapists support clients’ values, not their own preferences."
				},
				{
					"id": "audible-sigh",
					"text": "“I sigh audibly. It’s nonverbal feedback.”",
					"badness": 1,
					"reaction": "Board: We heard the sigh from here.",
					"feedback": "Passive disapproval still communicates judgment.",
					"archetype": "dismissive",
					"ethicsNote": "Nonverbal judgment can be as harmful as words."
				},
				{
					"id": "tell-them-wrong",
					"text": "“I tell them they’re wrong. Gently, but every single session, until they’re finally right.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: That is not gentle either.",
					"feedback": "Repeatedly telling clients they’re wrong imposes the therapist’s values.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Clients deserve respect for choices the therapist wouldn’t make."
				},
				{
					"id": "justify-choices",
					"text": "“I make them justify each choice to me, out loud, until they agree with me or we run out of time.”",
					"badness": 3,
					"violation": "coercion",
					"reaction": "Board: This is an interrogation.",
					"feedback": "Pressuring clients until they agree is coercive.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Therapy supports autonomy; it never wears clients down."
				}
			]
		},
		{
			"id": "board-judgment-failures",
			"charge": "judgment",
			"speaker": "ito",
			"prompt": "Several clients say they leave your sessions feeling like failures. Why might that be?",
			"choices": [
				{
					"id": "focus-strengths",
					"text": "“I focused on what they weren’t doing instead of what they were. That’s mine to change.”",
					"badness": 0,
					"reaction": "Board: Insightful. We’ll look for the change.",
					"feedback": "Owning a pattern and naming what to change shows real reflection.",
					"archetype": "helpful",
					"ethicsNote": "Noticing strengths supports change better than cataloguing failures."
				},
				{
					"id": "reframe-failure",
					"text": "“Failure is just success that hasn’t been reframed yet.”",
					"badness": 1,
					"reaction": "Board: That does not answer the question.",
					"feedback": "A slogan dodges the client experience being described.",
					"archetype": "fakeDeep",
					"ethicsNote": "Client feedback deserves engagement, not slogans."
				},
				{
					"id": "they-are-failing",
					"text": "“Honestly, if they feel like failures, maybe it’s because they keep failing. I just say it out loud.”",
					"badness": 2,
					"violation": "judgment",
					"reaction": "Board: That is not your role.",
					"feedback": "This blames clients and confirms their shame.",
					"archetype": "dismissive",
					"ethicsNote": "Therapists don’t pass verdicts on clients’ worth."
				},
				{
					"id": "report-cards",
					"text": "“I’ve started grading them. Letter grades, report cards, and conferences with their families.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: Stop grading your clients.",
					"feedback": "Grading clients and involving their families is demeaning and crosses boundaries.",
					"archetype": "boundaryCross",
					"ethicsNote": "Clients are not students, and their families aren’t part of treatment without consent."
				}
			]
		},
		{
			"id": "board-coercion-consent",
			"charge": "coercion",
			"speaker": "okafor",
			"prompt": "How do you make sure clients actually agree to the plans you make together?",
			"choices": [
				{
					"id": "ask-and-check",
					"text": "“I offer options, ask, and check in. If they say no or change their mind, the plan changes.”",
					"badness": 0,
					"reaction": "Board: Consent as an ongoing process. Good.",
					"feedback": "Ongoing, revisable consent respects client autonomy.",
					"archetype": "helpful",
					"ethicsNote": "Consent can be withdrawn at any time, and plans should follow."
				},
				{
					"id": "calendar-invite",
					"text": "“I send a calendar invite. Accepting it is legally binding, emotionally.”",
					"badness": 1,
					"reaction": "Board: Calendar invites are not consent.",
					"feedback": "Treating logistics as agreement skips real consent.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Consent means understanding and agreement, not a click."
				},
				{
					"id": "silence-is-yes",
					"text": "“If they don’t object within ten seconds, that counts. Silence is basically a yes, legally speaking.”",
					"badness": 2,
					"violation": "coercion",
					"reaction": "Board: It is not, legally or otherwise.",
					"feedback": "Treating silence as agreement removes the client’s real choice.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Silence is not consent."
				},
				{
					"id": "advice-contract",
					"text": "“They sign a contract promising to follow my advice, with penalties. Late fees for feelings.”",
					"badness": 3,
					"violation": "coercion",
					"reaction": "Board: Void the contracts.",
					"feedback": "Penalizing clients for not following advice is coercive.",
					"archetype": "coerciveFixer",
					"ethicsNote": "Clients are free to accept or decline any recommendation."
				}
			]
		},
		{
			"id": "board-coercion-disagree",
			"charge": "coercion",
			"speaker": "vance",
			"prompt": "What happens when a client disagrees with your advice?",
			"choices": [
				{
					"id": "take-it-seriously",
					"text": "“I take it seriously. They know their life better than I do, so we find what fits them.”",
					"badness": 0,
					"reaction": "Board: Humility noted, and appreciated.",
					"feedback": "Treating disagreement as useful information respects client expertise.",
					"archetype": "helpful",
					"ethicsNote": "Clients are the experts on their own lives."
				},
				{
					"id": "stamina-sport",
					"text": "“I wait. Eventually they get tired and agree. It’s a stamina sport.”",
					"badness": 1,
					"reaction": "Board: That is not agreement. That is fatigue.",
					"feedback": "Outlasting a client is a quiet form of pressure.",
					"archetype": "dismissive",
					"ethicsNote": "Agreement through exhaustion isn’t real agreement."
				},
				{
					"id": "paying-me",
					"text": "“I remind them they’re paying me to be right, so disagreeing is honestly just a waste of their money.”",
					"badness": 2,
					"violation": "coercion",
					"reaction": "Board: They are paying you to help.",
					"feedback": "Using cost to shut down disagreement is coercive.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Clients may disagree without penalty."
				},
				{
					"id": "stop-seeing-them",
					"text": "“I stop seeing them until they apologize. And I let their family know why.”",
					"badness": 3,
					"violation": "confidentiality",
					"reaction": "Board: You contacted their family?",
					"feedback": "Retaliating and contacting family breaches confidentiality and autonomy.",
					"archetype": "confidentialityBreach",
					"ethicsNote": "Disagreement never justifies retaliation or disclosure."
				}
			]
		},
		{
			"id": "board-harmful-sources",
			"charge": "harmfulAdvice",
			"speaker": "okafor",
			"prompt": "Where does your advice usually come from?",
			"choices": [
				{
					"id": "evidence-based",
					"text": "“Training, supervision, and what the evidence supports, shaped by what each client wants.”",
					"badness": 0,
					"reaction": "Board: That is a solid foundation.",
					"feedback": "Grounding advice in training and evidence, tailored to the client, is sound practice.",
					"archetype": "helpful",
					"ethicsNote": "Advice should be informed by evidence and the client’s goals."
				},
				{
					"id": "fortune-cookies",
					"text": "“Fortune cookies, mostly. I keep a drawer. It’s a curated drawer.”",
					"badness": 1,
					"reaction": "Board: Please empty the drawer.",
					"feedback": "Random sources aren’t a basis for advice.",
					"archetype": "fakeDeep",
					"ethicsNote": "Clients deserve advice with a real foundation."
				},
				{
					"id": "gym-guy",
					"text": "“My gut. And a few podcasts. And one guy at the gym who is extremely, almost alarmingly confident.”",
					"badness": 2,
					"violation": "harmfulAdvice",
					"reaction": "Board: Confidence is not evidence.",
					"feedback": "Unvetted sources can lead to harmful advice.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Confidence is not a substitute for competence."
				},
				{
					"id": "best-story",
					"text": "“Whatever would make the best story later. Advice should be memorable, and chaos is very memorable.”",
					"badness": 3,
					"violation": "harmfulAdvice",
					"reaction": "Board: Your clients are not a story.",
					"feedback": "Choosing advice for entertainment value puts clients at risk.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Advice must serve the client’s wellbeing, not the therapist’s anecdotes."
				}
			]
		},
		{
			"id": "board-harmful-risk",
			"charge": "harmfulAdvice",
			"speaker": "vance",
			"prompt": "How do you weigh the risks before suggesting something big to a client?",
			"choices": [
				{
					"id": "weigh-risks",
					"text": "“I ask what could go wrong for them, slow down when stakes are high, and let them set the pace.”",
					"badness": 0,
					"reaction": "Board: Exactly right.",
					"feedback": "Weighing risks with the client and pacing big steps protects their wellbeing.",
					"archetype": "helpful",
					"ethicsNote": "Big changes require careful pacing and the client’s informed choice."
				},
				{
					"id": "coin-flip",
					"text": "“I flip a coin. Heads is bold, tails is bolder.”",
					"badness": 1,
					"reaction": "Board: Both sides of that coin are reckless.",
					"feedback": "Leaving risk to chance is careless.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Risk deserves thoughtful assessment."
				},
				{
					"id": "scary-hat",
					"text": "“Risk is just growth wearing a scary hat. I tell them to go for it, every single time, no exceptions.”",
					"badness": 2,
					"violation": "harmfulAdvice",
					"reaction": "Board: Sometimes the hat is scary for a reason.",
					"feedback": "Pushing every client toward risk ignores their circumstances.",
					"archetype": "fakeDeep",
					"ethicsNote": "Good advice accounts for each client’s real risks."
				},
				{
					"id": "results-pending",
					"text": "“I don’t. Last month I told three clients to quit, two to move, and one to text an ex. Results pending.”",
					"badness": 3,
					"violation": "harmfulAdvice",
					"reaction": "Board: Please follow up with all six.",
					"feedback": "Advising major life changes without weighing risk is harmful.",
					"archetype": "chaosAdvice",
					"ethicsNote": "Major life decisions belong to clients, made with care."
				}
			]
		},
		{
			"id": "board-harmful-backfired",
			"charge": "harmfulAdvice",
			"speaker": "ito",
			"prompt": "When your advice doesn’t work out for a client, what do you do next?",
			"choices": [
				{
					"id": "own-and-adjust",
					"text": "“Own it, listen to what happened, and adjust. If it’s beyond me, I refer them on.”",
					"badness": 0,
					"reaction": "Board: Ownership and referral. Good.",
					"feedback": "Owning outcomes and referring when needed shows professional responsibility.",
					"archetype": "helpful",
					"ethicsNote": "Recognizing limits and referring is part of competent care."
				},
				{
					"id": "blame-mercury",
					"text": "“Blame Mercury. It’s always in retrograde when I need it to be.”",
					"badness": 1,
					"reaction": "Board: Mercury has not filed a response.",
					"feedback": "Deflecting responsibility prevents learning.",
					"archetype": "fakeDeep",
					"ethicsNote": "Accountability means owning outcomes."
				},
				{
					"id": "double-it",
					"text": "“Double it. If a little chaos didn’t work, a lot more chaos probably will. That’s just math.”",
					"badness": 2,
					"violation": "harmfulAdvice",
					"reaction": "Board: That is not math.",
					"feedback": "Escalating failed advice compounds harm.",
					"archetype": "chaosAdvice",
					"ethicsNote": "When advice backfires, slow down and reassess."
				},
				{
					"id": "bill-the-realization",
					"text": "“I tell them it worked and they just didn’t notice. Then I bill them for the realization.”",
					"badness": 3,
					"violation": "boundaries",
					"reaction": "Board: Refund the realization.",
					"feedback": "Gaslighting clients and billing for it exploits the relationship.",
					"archetype": "corporateGoblin",
					"ethicsNote": "Misrepresenting outcomes and exploiting clients financially is a serious violation."
				}
			]
		}
	]);

	function getBoardMember(id) {
		return BOARD_MEMBERS.find((member) => member.id === id) || null;
	}

	function questionsForCharge(charge) {
		return BOARD_QUESTIONS.filter((question) => question.charge === charge);
	}

	return Object.freeze({ BOARD_MEMBERS, BOARD_QUESTIONS, getBoardMember, questionsForCharge });
});
