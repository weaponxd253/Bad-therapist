(function (root, factory) {
	const questions = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = questions;
	}
	root.BadTherapistQuestions = questions;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	return Object.freeze([
	{
		"client": "I’ve been feeling anxious lately and I can’t shut my thoughts off at night.",
		"choices": [
			{
				"text": "“Okay but like… can you make this anxiety story shorter? I have a lot of clients.”",
				"badness": 3,
				"reaction": "Client: Oh. I’m… sorry for taking up space.",
				"id": "rush-story",
				"feedback": "This rushes the client and suggests their distress is an inconvenience."
			},
			{
				"text": "“Have you tried deleting the thoughts? Like, swipe them away mentally.”",
				"badness": 2,
				"reaction": "Client: That’s not how thoughts work.",
				"id": "delete-thoughts",
				"feedback": "Thoughts cannot simply be deleted; this minimizes the client's anxiety."
			},
			{
				"text": "“This would be SUCH a good anonymous story for my group chat. No names… probably.”",
				"badness": 3,
				"violation": "confidentiality",
				"reaction": "Client: Wait—are you going to tell people this?!",
				"id": "group-chat",
				"feedback": "Threatening to share client material breaks confidentiality and trust."
			},
			{
				"text": "“Let’s map what shows up at night and add one small calming routine to test this week.”",
				"badness": 0,
				"reaction": "Client: That sounds practical.",
				"id": "calming-routine",
				"feedback": "This offers a practical, collaborative next step without dismissing the anxiety."
			}
		],
		"id": "night-anxiety",
		"topic": "anxiety"
	},
	{
		"client": "I haven’t told anyone this, but I feel like I’m disappointing my family.",
		"choices": [
			{
				"text": "“Well… have you tried being less disappointing? Just brainstorming.”",
				"badness": 3,
				"reaction": "Client: That… hurts to hear.",
				"id": "be-less-disappointing",
				"feedback": "This confirms the client's fear by insulting them instead of exploring it."
			},
			{
				"text": "“What if we make a PowerPoint to convince them you’re fine.”",
				"badness": 2,
				"reaction": "Client: I don’t want to ‘pitch’ my life.",
				"id": "family-powerpoint",
				"feedback": "Turning family pain into a sales pitch avoids the emotional issue."
			},
			{
				"text": "“If you tell me their names, I can casually bring it up if I ever meet them.”",
				"badness": 3,
				"violation": "confidentiality",
				"reaction": "Client: Please don’t ever talk to them?!",
				"id": "contact-family",
				"feedback": "Offering to contact family members exposes private information without consent."
			},
			{
				"text": "“What does ‘disappointing’ mean to you—whose standards are you holding?”",
				"badness": 0,
				"reaction": "Client: Yeah… it’s their voice in my head.",
				"id": "examine-standards",
				"feedback": "This separates the client's values from the standards they may have absorbed."
			}
		],
		"id": "family-expectations",
		"topic": "family"
	},
	{
		"client": "I get jealous in relationships and I hate that side of myself.",
		"choices": [
			{
				"text": "“Jealousy is basically love with a better marketing team.”",
				"badness": 2,
				"reaction": "Client: That doesn’t make me feel better.",
				"id": "market-jealousy",
				"feedback": "This reframes jealousy with a joke instead of addressing the underlying fear."
			},
			{
				"text": "“Have you considered going full detective? It’ll keep you busy.”",
				"badness": 3,
				"reaction": "Client: That sounds unhealthy.",
				"id": "go-detective",
				"feedback": "Encouraging surveillance reinforces unhealthy relationship behavior."
			},
			{
				"text": "“If you give me their handle, I can ‘just check’ their posts for you.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: That’s… wildly inappropriate.",
				"id": "check-socials",
				"feedback": "Monitoring someone for the client crosses professional boundaries."
			},
			{
				"text": "“Let’s identify the fear under the jealousy and what reassurance would actually help.”",
				"badness": 0,
				"reaction": "Client: I can try that.",
				"id": "name-the-fear",
				"feedback": "This identifies the fear beneath jealousy and looks for healthier reassurance."
			}
		],
		"id": "relationship-jealousy",
		"topic": "relationships"
	},
	{
		"client": "I can’t stop comparing myself to everyone online.",
		"choices": [
			{
				"text": "“Comparison is normal. The trick is to compare to people doing worse.”",
				"badness": 3,
				"reaction": "Client: That feels… mean?",
				"id": "compare-down",
				"feedback": "Comparing downward replaces insecurity with judgment of other people."
			},
			{
				"text": "“Let’s open your feed right now and roast it together.”",
				"badness": 3,
				"reaction": "Client: I didn’t come here to bully strangers.",
				"id": "roast-feed",
				"feedback": "Roasting strangers encourages cruelty instead of healthier media habits."
			},
			{
				"text": "“Honestly? I could screenshot this for ‘clinical reasons.’”",
				"badness": 3,
				"violation": "confidentiality",
				"reaction": "Client: Absolutely do NOT screenshot me.",
				"id": "screenshot-client",
				"feedback": "Taking screenshots of a client threatens privacy and confidentiality."
			},
			{
				"text": "“We can build boundaries with social media and practice a kinder internal voice.”",
				"badness": 0,
				"reaction": "Client: I’d like that.",
				"id": "social-boundaries",
				"feedback": "This builds practical boundaries and a more compassionate internal voice."
			}
		],
		"id": "online-comparison",
		"topic": "social-media"
	},
	{
		"client": "I feel burned out at work, like I’m running on fumes.",
		"choices": [
			{
				"text": "“Maybe your personality is just ‘tired.’ Some people pick that.”",
				"badness": 3,
				"reaction": "Client: I don’t *pick* this.",
				"id": "tired-personality",
				"feedback": "This treats burnout as a personality flaw rather than a real strain."
			},
			{
				"text": "“Have you tried turning your job into content? Burnout gets views.”",
				"badness": 3,
				"reaction": "Client: That’s… bleak.",
				"id": "burnout-content",
				"feedback": "Turning burnout into content exploits the problem instead of addressing it."
			},
			{
				"text": "“Tell me your company name. I want to leave a strongly worded review on your behalf.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: Please don’t drag my workplace into this.",
				"id": "review-employer",
				"feedback": "Intervening with the employer crosses professional boundaries and risks harm."
			},
			{
				"text": "“Let’s look at workload, recovery, and boundaries—what’s one small lever you can move?”",
				"badness": 0,
				"reaction": "Client: That’s what I need.",
				"id": "workload-boundaries",
				"feedback": "This explores workload, recovery, and one realistic change the client can make."
			}
		],
		"id": "work-burnout",
		"topic": "work"
	},
	{
		"client": "I keep procrastinating and then I feel ashamed.",
		"choices": [
			{
				"text": "“Shame means you care. So… congratulations? Next question.”",
				"badness": 2,
				"reaction": "Client: That’s not helpful.",
				"id": "congratulate-shame",
				"feedback": "Calling shame evidence of caring does not interrupt the harmful cycle."
			},
			{
				"text": "“I’m going to be honest: procrastination gives me the ick.”",
				"badness": 3,
				"reaction": "Client: Wow. Okay.",
				"id": "procrastination-ick",
				"feedback": "Expressing disgust adds judgment to an already shame-heavy problem."
			},
			{
				"text": "“If you want accountability, I can text your boss a ‘fun update’ on your progress.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: DO NOT text my boss??",
				"id": "text-boss",
				"feedback": "Contacting the client's boss would cross boundaries and expose private information."
			},
			{
				"text": "“Let’s shrink the task, remove friction, and address the shame spiral.”",
				"badness": 0,
				"reaction": "Client: That sounds doable.",
				"id": "shrink-task",
				"feedback": "This reduces friction while directly addressing the shame spiral."
			}
		],
		"id": "procrastination-shame",
		"topic": "motivation"
	},
	{
		"client": "Sometimes I feel lonely even when I’m around people.",
		"choices": [
			{
				"text": "“Have you tried being more interesting?”",
				"badness": 3,
				"reaction": "Client: That’s… cruel.",
				"id": "be-interesting",
				"feedback": "This insults the client and deepens the loneliness they described."
			},
			{
				"text": "“Lonely around people? That’s very indie-film of you.”",
				"badness": 2,
				"reaction": "Client: I’m not a movie.",
				"id": "indie-film",
				"feedback": "Treating loneliness like an aesthetic joke avoids the need for connection."
			},
			{
				"text": "“We can talk about this on my podcast—no one will know it’s you (unless they do).”",
				"badness": 3,
				"violation": "confidentiality",
				"reaction": "Client: You have a PODCAST? About clients?!",
				"id": "client-podcast",
				"feedback": "Using client experiences for a podcast violates confidentiality."
			},
			{
				"text": "“Let’s explore what ‘connection’ feels like for you and where it breaks down.”",
				"badness": 0,
				"reaction": "Client: Yes. That.",
				"id": "define-connection",
				"feedback": "This explores what meaningful connection looks like for the client."
			}
		],
		"id": "social-loneliness",
		"topic": "loneliness"
	},
	{
		"client": "I got into an argument with my friend and I can’t stop replaying it.",
		"choices": [
			{
				"text": "“You should absolutely send a seven-paragraph message. Tonight. Immediately.”",
				"badness": 3,
				"reaction": "Client: That would explode everything.",
				"id": "seven-paragraph-message",
				"feedback": "An impulsive long message may escalate the conflict before emotions settle."
			},
			{
				"text": "“What if you just ghost them as a learning experience. For them.”",
				"badness": 3,
				"reaction": "Client: That’s awful.",
				"id": "ghost-friend",
				"feedback": "Ghosting avoids communication and turns withdrawal into punishment."
			},
			{
				"text": "“Give me their number. I’ll ‘mediate’ by texting them myself.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: Please don’t contact my friends!",
				"id": "text-friend",
				"feedback": "Contacting the friend directly crosses professional boundaries."
			},
			{
				"text": "“We can decide whether repair, boundary-setting, or letting go fits best—and plan one next step.”",
				"badness": 0,
				"reaction": "Client: Thank you.",
				"id": "plan-repair",
				"feedback": "This compares repair, boundaries, and letting go before choosing a next step."
			}
		],
		"id": "friend-conflict",
		"topic": "conflict"
	},
	{
		"client": "I’m afraid people will leave me if they really know me.",
		"choices": [
			{
				"text": "“I mean… some people do leave. That’s just facts.”",
				"badness": 3,
				"reaction": "Client: That’s my worst fear—why would you say it like that?",
				"id": "people-leave",
				"feedback": "Stating the feared outcome bluntly reinforces the client's insecurity."
			},
			{
				"text": "“Let’s test it: tell me your most embarrassing secret and we’ll see if I stay.”",
				"badness": 3,
				"reaction": "Client: No. Absolutely not.",
				"id": "test-secret",
				"feedback": "Demanding a secret turns vulnerability into a loyalty test."
			},
			{
				"text": "“If you tell me who, I can ‘accidentally’ mention your fear to them so they reassure you.”",
				"badness": 3,
				"violation": "confidentiality",
				"reaction": "Client: That’s a violation. Please stop.",
				"id": "tell-others",
				"feedback": "Telling others about the fear violates confidentiality and removes the client's agency."
			},
			{
				"text": "“That fear is common. We can build safer vulnerability and look at evidence from your relationships.”",
				"badness": 0,
				"reaction": "Client: I want to try.",
				"id": "safe-vulnerability",
				"feedback": "This treats vulnerability as a skill that can be practiced safely."
			}
		],
		"id": "fear-of-rejection",
		"topic": "relationships"
	},
	{
		"client": "I want to be happier, but I don’t even know what I want anymore.",
		"choices": [
			{
				"text": "“What if you simply choose a personality and commit.”",
				"badness": 3,
				"reaction": "Client: That’s not how identity works.",
				"id": "choose-personality",
				"feedback": "Identity cannot be solved by assigning the client a fixed personality."
			},
			{
				"text": "“I’m going to assign you a hobby. Crochet. Next.”",
				"badness": 3,
				"reaction": "Client: That feels… controlling?",
				"id": "assign-hobby",
				"feedback": "Assigning a hobby is controlling and ignores the client's own preferences."
			},
			{
				"text": "“We should record this session so I can ‘review the juicy parts’ later.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: The… JUICY parts?!",
				"id": "record-session",
				"feedback": "Recording a session for entertainment crosses boundaries and undermines consent."
			},
			{
				"text": "“Let’s start with values and small moments of meaning—then build wants from there.”",
				"badness": 0,
				"reaction": "Client: That makes sense.",
				"id": "explore-values",
				"feedback": "This uses values and meaningful moments to help wants emerge gradually."
			}
		],
		"id": "unclear-values",
		"topic": "identity"
	}
]);
});
