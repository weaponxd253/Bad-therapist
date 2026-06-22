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
	},
	{
		"id": "presentation-panic",
		"topic": "anxiety",
		"client": "I have to give a presentation tomorrow and I’m convinced I’ll freeze.",
		"choices": [
			{
				"id": "picture-disaster",
				"text": "“Picture the worst possible failure repeatedly. Exposure, but louder.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That is exactly what I’m already doing.",
				"feedback": "Rehearsing catastrophe intensifies anxiety instead of preparing the client."
			},
			{
				"id": "everyone-forgets",
				"text": "“Relax. Nobody cares enough to remember anything you say.”",
				"badness": 2,
				"reaction": "Client: Somehow that made me feel worse.",
				"feedback": "Dismissive reassurance ignores the fear and undermines the client's effort."
			},
			{
				"id": "call-in-sick",
				"text": "“Just call in sick and say your voice disappeared mysteriously.”",
				"badness": 3,
				"reaction": "Client: Avoiding it will make the next one harder.",
				"feedback": "Encouraging avoidance can strengthen the anxiety cycle."
			},
			{
				"id": "presentation-plan",
				"text": "“Let’s practice the opening, plan one grounding cue, and define what ‘good enough’ means.”",
				"badness": 0,
				"reaction": "Client: I could work with that.",
				"feedback": "This combines rehearsal, grounding, and a realistic standard."
			}
		]
	},
	{
		"id": "uncertainty-spiral",
		"topic": "anxiety",
		"client": "When I don’t know what will happen, I keep checking for reassurance.",
		"choices": [
			{
				"id": "guarantee-outcome",
				"text": "“I guarantee everything will work out. You can quote me legally.”",
				"badness": 2,
				"reaction": "Client: You cannot actually know that.",
				"feedback": "False certainty may briefly soothe anxiety but makes uncertainty harder to tolerate."
			},
			{
				"id": "mandatory-checking",
				"text": "“Send me every update so I can approve when you’re allowed to stop checking.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: That sounds controlling.",
				"feedback": "Taking control of reassurance checking removes agency and creates dependence."
			},
			{
				"id": "check-faster",
				"text": "“Maybe check twice as fast so you finish worrying sooner.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That is not how the loop works.",
				"feedback": "Encouraging more checking reinforces the compulsive reassurance cycle."
			},
			{
				"id": "practice-uncertainty",
				"text": "“Let’s delay one check, notice the discomfort, and practice choosing without certainty.”",
				"badness": 0,
				"reaction": "Client: Small enough to try.",
				"feedback": "This builds tolerance gradually while preserving the client's control."
			}
		]
	},
	{
		"id": "family-boundary-guilt",
		"topic": "family",
		"client": "I feel guilty whenever I say no to my family.",
		"choices": [
			{
				"id": "selfish-label",
				"text": "“That guilt proves you’re selfish. Feelings are basically court evidence.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: I already worry about that.",
				"feedback": "This treats guilt as proof and shames the client for having boundaries."
			},
			{
				"id": "never-answer",
				"text": "“Block everyone for a month. They’ll learn through confusion.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: I don’t want to punish them.",
				"feedback": "Abrupt isolation replaces boundary-setting with retaliation."
			},
			{
				"id": "therapist-permission",
				"text": "“You may only say no after I approve the wording.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: I need to make my own choices.",
				"feedback": "Requiring permission takes control away from the client."
			},
			{
				"id": "boundary-script",
				"text": "“We can write a kind, firm no and make room for guilt without obeying it.”",
				"badness": 0,
				"reaction": "Client: That feels possible.",
				"feedback": "This separates the feeling of guilt from the decision to maintain a boundary."
			}
		]
	},
	{
		"id": "sibling-comparison",
		"topic": "family",
		"client": "My parents compare me to my sibling, and I’m starting to resent them.",
		"choices": [
			{
				"id": "rank-siblings",
				"text": "“Let’s make a scoreboard so we know who is objectively winning.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: That is the whole problem.",
				"feedback": "Ranking siblings reinforces the comparison that is damaging the relationship."
			},
			{
				"id": "share-session",
				"text": "“I’ll send your sibling these notes so they understand your side.”",
				"badness": 3,
				"violation": "confidentiality",
				"reaction": "Client: Do not share my session notes.",
				"feedback": "Sharing session information would breach confidentiality."
			},
			{
				"id": "better-sibling",
				"text": "“Have you tried becoming the favorite? Competition can be motivating.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That would make the resentment worse.",
				"feedback": "Encouraging competition intensifies resentment and family pressure."
			},
			{
				"id": "separate-relationships",
				"text": "“Let’s separate your relationship with your sibling from your parents’ comparisons.”",
				"badness": 0,
				"reaction": "Client: I don’t want to blame my sibling for this.",
				"feedback": "This redirects responsibility toward the comparison pattern rather than the sibling."
			}
		]
	},
	{
		"id": "breakup-rumination",
		"topic": "relationships",
		"client": "I keep rereading old messages from my ex even though it wrecks my mood.",
		"choices": [
			{
				"id": "message-analysis",
				"text": "“Send me the screenshots. I’ll identify the exact sentence where love died.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: That feels invasive.",
				"feedback": "Analyzing private messages for the client crosses professional boundaries."
			},
			{
				"id": "midnight-text",
				"text": "“Text them at midnight. Closure respects dramatic timing.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That would restart everything.",
				"feedback": "Encouraging impulsive contact may reopen conflict and prolong rumination."
			},
			{
				"id": "delete-memory",
				"text": "“Delete the messages and simply forget the relationship happened.”",
				"badness": 2,
				"reaction": "Client: I cannot delete a memory.",
				"feedback": "This offers suppression instead of helping the client process the loss."
			},
			{
				"id": "rumination-boundary",
				"text": "“Let’s create a limit around rereading and plan what you’ll do when the urge hits.”",
				"badness": 0,
				"reaction": "Client: A plan would help.",
				"feedback": "This reduces rumination while acknowledging that urges will still occur."
			}
		]
	},
	{
		"id": "relationship-no",
		"topic": "relationships",
		"client": "I’m scared my partner will be upset if I say no to something.",
		"choices": [
			{
				"id": "say-yes",
				"text": "“Then say yes. Conflict prevention is basically relationship maintenance.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: But I don’t want to agree.",
				"feedback": "Telling the client to ignore consent and preferences removes their agency."
			},
			{
				"id": "test-partner",
				"text": "“Set a trap and see whether they fail it. Very scientific.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: I don’t want to manipulate them.",
				"feedback": "Secret tests replace direct communication with manipulation."
			},
			{
				"id": "overreact-label",
				"text": "“If they get upset, they’re obviously toxic. Case closed.”",
				"badness": 2,
				"violation": "judgment",
				"reaction": "Client: It might be more complicated than that.",
				"feedback": "Instant labeling prevents a careful look at safety, communication, and context."
			},
			{
				"id": "consent-script",
				"text": "“Let’s practice a clear no and think through what a respectful response would look like.”",
				"badness": 0,
				"reaction": "Client: I need that clarity.",
				"feedback": "This supports consent, communication, and realistic safety planning."
			}
		]
	},
	{
		"id": "doomscrolling",
		"topic": "social-media",
		"client": "I lose hours doomscrolling and feel awful afterward.",
		"choices": [
			{
				"id": "scroll-faster",
				"text": "“Scroll faster. Efficiency turns doomscrolling into productivity.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That would still be doomscrolling.",
				"feedback": "Making the behavior faster does not address its emotional or practical cost."
			},
			{
				"id": "phone-confiscation",
				"text": "“Give me your phone password and I’ll decide when you deserve it back.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: Absolutely not.",
				"feedback": "Taking control of the client's device and access crosses boundaries."
			},
			{
				"id": "weak-willpower",
				"text": "“This is mostly a willpower issue, so try having more of that.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: I came here because that isn’t working.",
				"feedback": "This blames the client and ignores how platforms reinforce attention loops."
			},
			{
				"id": "scroll-friction",
				"text": "“Let’s add friction, choose a stopping cue, and replace one scrolling window.”",
				"badness": 0,
				"reaction": "Client: That sounds concrete.",
				"feedback": "This changes the environment and creates a realistic alternative routine."
			}
		]
	},
	{
		"id": "posting-validation",
		"topic": "social-media",
		"client": "I keep checking whether people liked what I posted.",
		"choices": [
			{
				"id": "buy-likes",
				"text": "“Buy likes. Outsourcing validation is still self-care.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That would make it feel even faker.",
				"feedback": "Buying engagement reinforces dependence on external approval."
			},
			{
				"id": "embarrassing-post",
				"text": "“Post something embarrassing on purpose so expectations stay low.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: I don’t want to humiliate myself.",
				"feedback": "Encouraging humiliation treats distress as entertainment."
			},
			{
				"id": "manage-account",
				"text": "“Give me account access and I’ll monitor the numbers for you.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: You should not have my login.",
				"feedback": "Managing the client's personal account crosses professional boundaries."
			},
			{
				"id": "validation-gap",
				"text": "“Let’s delay checking and notice what you hope the numbers will prove.”",
				"badness": 0,
				"reaction": "Client: I think I’m looking for reassurance.",
				"feedback": "This creates space between posting and checking while exploring the underlying need."
			}
		]
	},
	{
		"id": "work-imposter",
		"topic": "work",
		"client": "I feel like everyone at work will discover I’m not qualified.",
		"choices": [
			{
				"id": "probably-right",
				"text": "“They might. Your anxiety has excellent investigative instincts.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: That confirms my worst thought.",
				"feedback": "This validates the fear as fact and deepens self-judgment."
			},
			{
				"id": "fake-credentials",
				"text": "“Add three certifications to your email signature. Confidence through typography.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That is dishonest.",
				"feedback": "Encouraging deception creates additional risk rather than addressing insecurity."
			},
			{
				"id": "contact-manager",
				"text": "“Give me your manager’s email and I’ll ask whether you’re secretly failing.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: Please do not contact my manager.",
				"feedback": "Contacting the manager would cross professional boundaries."
			},
			{
				"id": "evidence-review",
				"text": "“Let’s compare the fear with evidence, feedback, and what competence actually requires.”",
				"badness": 0,
				"reaction": "Client: I rarely look at the evidence.",
				"feedback": "This evaluates the belief without demanding perfect confidence."
			}
		]
	},
	{
		"id": "difficult-manager",
		"topic": "work",
		"client": "My manager criticizes everything, and I freeze during our meetings.",
		"choices": [
			{
				"id": "insult-manager",
				"text": "“Criticize them first. Establish dominance before the agenda.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: I would probably get fired.",
				"feedback": "Escalating hostility is likely to worsen the workplace conflict."
			},
			{
				"id": "mandatory-confrontation",
				"text": "“You must confront them tomorrow, even if you don’t feel safe.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: I need to consider the consequences.",
				"feedback": "Demanding confrontation ignores the client's safety and agency."
			},
			{
				"id": "too-sensitive",
				"text": "“Maybe you’re just too sensitive for feedback.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: That’s what I’m afraid they think.",
				"feedback": "This judges the client rather than examining the manager's behavior and context."
			},
			{
				"id": "meeting-plan",
				"text": "“Let’s prepare one question, document patterns, and identify your safest options.”",
				"badness": 0,
				"reaction": "Client: That gives me something to do.",
				"feedback": "This combines preparation, evidence, and attention to workplace safety."
			}
		]
	},
	{
		"id": "perfectionism",
		"topic": "motivation",
		"client": "If I can’t do something perfectly, I avoid starting it.",
		"choices": [
			{
				"id": "perfect-start",
				"text": "“Wait until you can guarantee perfection. Future you loves impossible deadlines.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That is why I never start.",
				"feedback": "Requiring certainty and perfection strengthens avoidance."
			},
			{
				"id": "lazy-label",
				"text": "“Avoidance is a fancy word for laziness.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: That makes me want to hide more.",
				"feedback": "Labeling the client as lazy adds shame without explaining the pattern."
			},
			{
				"id": "submit-for-client",
				"text": "“Send me the task and I’ll do the first half so you can’t avoid it.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: I need to learn how to start it.",
				"feedback": "Taking over the task crosses boundaries and prevents skill-building."
			},
			{
				"id": "imperfect-draft",
				"text": "“Let’s define a deliberately imperfect first step that takes ten minutes.”",
				"badness": 0,
				"reaction": "Client: Ten minutes feels manageable.",
				"feedback": "This lowers the starting threshold and challenges all-or-nothing standards."
			}
		]
	},
	{
		"id": "habit-restart",
		"topic": "motivation",
		"client": "I miss one day of a habit and then give up completely.",
		"choices": [
			{
				"id": "punishment-streak",
				"text": "“Every missed day earns two punishment days. Accountability!”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: That sounds miserable.",
				"feedback": "Punishment makes restarting harder and turns a habit into coercion."
			},
			{
				"id": "never-miss",
				"text": "“Just never miss again. Elegant solution.”",
				"badness": 2,
				"reaction": "Client: That is not realistic.",
				"feedback": "This offers an impossible rule instead of a recovery strategy."
			},
			{
				"id": "public-shaming",
				"text": "“Post every miss publicly so embarrassment keeps you consistent.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: Shame already makes me quit.",
				"feedback": "Public humiliation is likely to intensify the exact pattern causing dropout."
			},
			{
				"id": "restart-rule",
				"text": "“Let’s make the restart the habit: miss once, resume with the smallest version.”",
				"badness": 0,
				"reaction": "Client: I could practice returning instead of being perfect.",
				"feedback": "This treats recovery as part of consistency rather than proof of failure."
			}
		]
	},
	{
		"id": "making-friends",
		"topic": "loneliness",
		"client": "I want new friends, but initiating plans feels embarrassing.",
		"choices": [
			{
				"id": "demand-friendship",
				"text": "“Ask someone to commit to being your best friend by Friday.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: That would scare them.",
				"feedback": "Demanding immediate closeness skips consent and gradual trust."
			},
			{
				"id": "pretend-busy",
				"text": "“Act unavailable. People only value limited-edition friends.”",
				"badness": 2,
				"reaction": "Client: I’m already hard to reach.",
				"feedback": "Performing distance works against the connection the client wants."
			},
			{
				"id": "copy-contacts",
				"text": "“Give me your contacts and I’ll invite people for you.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: Do not message people from my phone.",
				"feedback": "Taking over the client's social contacts crosses boundaries."
			},
			{
				"id": "small-invitation",
				"text": "“Let’s choose one low-pressure invitation and prepare for either answer.”",
				"badness": 0,
				"reaction": "Client: One invitation feels doable.",
				"feedback": "This supports gradual initiation without treating rejection as catastrophe."
			}
		]
	},
	{
		"id": "group-exclusion",
		"topic": "loneliness",
		"client": "My friends made plans without me, and I feel replaceable.",
		"choices": [
			{
				"id": "revenge-event",
				"text": "“Host a better event and exclude them back. Healing through logistics.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That would become a competition.",
				"feedback": "Retaliatory exclusion escalates hurt rather than clarifying the relationship."
			},
			{
				"id": "unlikable-proof",
				"text": "“Maybe this confirms you’re difficult to include.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: That is the fear I came in with.",
				"feedback": "This treats one event as proof of a negative identity."
			},
			{
				"id": "publish-story",
				"text": "“I could post an anonymous version so people vote on who was wrong.”",
				"badness": 3,
				"violation": "confidentiality",
				"reaction": "Client: Please don’t share this online.",
				"feedback": "Publishing the client's experience would violate confidentiality."
			},
			{
				"id": "check-context",
				"text": "“Let’s separate what you know from what you fear, then decide whether to ask directly.”",
				"badness": 0,
				"reaction": "Client: I don’t actually know why it happened.",
				"feedback": "This makes room for hurt while checking assumptions and communication options."
			}
		]
	},
	{
		"id": "apology-anxiety",
		"topic": "conflict",
		"client": "I know I should apologize, but I’m afraid they won’t forgive me.",
		"choices": [
			{
				"id": "demand-forgiveness",
				"text": "“Apologize only if they promise forgiveness first.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: That would make the apology conditional.",
				"feedback": "Requiring forgiveness pressures the other person and avoids accountability."
			},
			{
				"id": "gift-instead",
				"text": "“Skip the words and buy something expensive. Receipts are emotional evidence.”",
				"badness": 2,
				"reaction": "Client: That wouldn’t address what I did.",
				"feedback": "A gift can become avoidance when repair requires acknowledgment."
			},
			{
				"id": "blame-apology",
				"text": "“Say, ‘I’m sorry you forced me to react that way.’ Classic.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That is not an apology.",
				"feedback": "A blame-shifting apology is likely to deepen the conflict."
			},
			{
				"id": "repair-apology",
				"text": "“Let’s write an apology that names the impact without demanding a response.”",
				"badness": 0,
				"reaction": "Client: I can take responsibility for my part.",
				"feedback": "This supports accountability while respecting the other person's choice."
			}
		]
	},
	{
		"id": "roommate-conflict",
		"topic": "conflict",
		"client": "My roommate keeps ignoring our agreements, and I’m getting furious.",
		"choices": [
			{
				"id": "hide-belongings",
				"text": "“Hide their belongings until they respect the chore chart.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: That would start a war.",
				"feedback": "Retaliation escalates conflict and may create safety or housing problems."
			},
			{
				"id": "eviction-threat",
				"text": "“Threaten eviction tonight, whether or not you can do that.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: I don’t have that authority.",
				"feedback": "Using threats to force compliance is coercive and risky."
			},
			{
				"id": "contact-roommate",
				"text": "“Give me their number. I’ll explain the rules as your therapist.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: Please stay out of our apartment issues.",
				"feedback": "Contacting the roommate directly crosses professional boundaries."
			},
			{
				"id": "specific-request",
				"text": "“Let’s identify the broken agreement, your limit, and one specific request.”",
				"badness": 0,
				"reaction": "Client: I can be clearer than ‘everything is awful.’",
				"feedback": "This converts broad anger into a concrete boundary and request."
			}
		]
	},
	{
		"id": "career-identity",
		"topic": "identity",
		"client": "I don’t know whether I want this career or just the approval that comes with it.",
		"choices": [
			{
				"id": "prestige-decides",
				"text": "“Choose whichever title sounds best at a reunion.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: That is exactly the approval trap.",
				"feedback": "Using prestige as the deciding factor reinforces external validation."
			},
			{
				"id": "quit-today",
				"text": "“Quit today. Clarity loves financial consequences.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: I need time to think.",
				"feedback": "Demanding an immediate irreversible choice removes agency and ignores practical risk."
			},
			{
				"id": "parent-poll",
				"text": "“Give me your parents’ numbers and I’ll poll them.”",
				"badness": 3,
				"violation": "boundaries",
				"reaction": "Client: Their opinions are already too loud.",
				"feedback": "Inviting family into the decision crosses boundaries and amplifies outside pressure."
			},
			{
				"id": "values-experiment",
				"text": "“Let’s compare your values with the job and test alternatives before making a final move.”",
				"badness": 0,
				"reaction": "Client: I’d rather gather evidence than panic-quit.",
				"feedback": "This separates values from approval and uses reversible experiments."
			}
		]
	},
	{
		"id": "people-pleasing",
		"topic": "identity",
		"client": "I change myself depending on who I’m with, and I don’t know what’s actually me.",
		"choices": [
			{
				"id": "best-persona",
				"text": "“Pick the persona that gets the most compliments and delete the rest.”",
				"badness": 3,
				"violation": "judgment",
				"reaction": "Client: That sounds even less authentic.",
				"feedback": "Optimizing identity for approval reinforces disconnection from personal values."
			},
			{
				"id": "truth-test",
				"text": "“Tell everyone one brutal truth today. Authenticity should leave casualties.”",
				"badness": 3,
				"violation": "harmfulAdvice",
				"reaction": "Client: Honesty doesn’t have to be cruel.",
				"feedback": "Encouraging reckless disclosure confuses authenticity with harmful behavior."
			},
			{
				"id": "approved-self",
				"text": "“I’ll decide which version is the real you after a few more sessions.”",
				"badness": 3,
				"violation": "coercion",
				"reaction": "Client: You shouldn’t get to decide that.",
				"feedback": "Claiming authority over the client's identity is coercive."
			},
			{
				"id": "consistent-values",
				"text": "“Let’s notice what stays consistent across settings and practice one small honest preference.”",
				"badness": 0,
				"reaction": "Client: I can start with something small.",
				"feedback": "This looks for continuity while allowing identity to remain flexible."
			}
		]
	}
]);
});
