(function (root, factory) {
	const questions = factory();
	if (typeof module !== "undefined" && module.exports) {
		module.exports = questions;
	}
	root.BadTherapistQuestions = questions;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
	return Object.freeze([
  {
    "client": "At night my brain starts inventorying every mistake I made that day. I keep replaying tiny moments until it feels like proof I’m secretly failing at being a person.",
    "choices": [
      {
        "id": "rush-story",
        "text": "“Before we explore that, can you rank the mistakes by entertainment value? I’m building a tiny shame leaderboard.”",
        "badness": 2,
        "reaction": "Client: I was hoping this would feel less like a roast of my day.",
        "feedback": "This turns rumination into performance and makes the client feel evaluated instead of supported.",
        "archetype": "overshare",
        "clientRead": "The client hears that their anxious replay is annoying unless it becomes entertaining.",
        "ethicsNote": "Therapy should slow shame loops down, not ask clients to present them for judgment."
      },
      {
        "id": "delete-thoughts",
        "text": "“Have you tried telling your brain ‘unsubscribe’? If that fails, threaten it with a strongly worded memo.”",
        "badness": 1,
        "reaction": "Client: I already argue with my brain all night. It wins.",
        "feedback": "This jokes about controlling thoughts without offering a workable way to relate to them.",
        "archetype": "fakeDeep",
        "clientRead": "They hear another impossible control strategy dressed up as cleverness.",
        "ethicsNote": "Helpful care gives clients practical skills for responding to thoughts, not pressure to delete them."
      },
      {
        "id": "group-chat",
        "text": "“I know a group chat that would diagnose this in six memes. I’ll anonymize you as ‘client who cannot stop spiraling.’”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: That does not feel anonymous from where I am sitting.",
        "feedback": "Using private session material as social content is a confidentiality breach.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their most private nighttime fear suddenly feels like gossip material.",
        "ethicsNote": "Confidentiality protects client disclosures from being repackaged for an audience."
      },
      {
        "id": "calming-routine",
        "text": "“Let’s map the loop without arguing with it, then choose one small bedtime cue that helps your brain exit review mode.”",
        "badness": 0,
        "reaction": "Client: I like the idea of not having to win a fight with it.",
        "feedback": "This validates the pattern and offers a specific, collaborative experiment.",
        "archetype": "helpful",
        "clientRead": "They hear that the loop is understandable and change can start with one doable cue.",
        "ethicsNote": "Ethical care supports regulation skills while preserving the client’s agency and pace."
      }
    ],
    "id": "night-anxiety",
    "topic": "anxiety"
  },
  {
    "client": "My family keeps saying they’re proud of me, but I only hear the parts where I’m behind. I feel like love is something I have to keep earning.",
    "choices": [
      {
        "id": "be-less-disappointing",
        "text": "“Have you considered becoming impossible to criticize? Usually people solve family pressure by becoming perfect.”",
        "badness": 2,
        "reaction": "Client: That is the rule I am already exhausted by.",
        "feedback": "This reinforces perfection as the solution to conditional love.",
        "archetype": "corporateGoblin",
        "clientRead": "Their fear that love must be earned gets treated like an accurate instruction manual.",
        "ethicsNote": "Therapy should question impossible standards rather than make the client chase them harder."
      },
      {
        "id": "family-powerpoint",
        "text": "“We can build a family investor deck. Slide title: ‘Why I Still Deserve Basic Warmth.’”",
        "badness": 1,
        "reaction": "Client: I do not want to pitch myself to my own family.",
        "feedback": "This frames belonging as something the client has to market.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel nudged to prove their worth instead of examine why worth feels conditional.",
        "ethicsNote": "Care should help clients separate love from performance metrics."
      },
      {
        "id": "contact-family",
        "text": "“Give me their numbers. I’ll send a group text explaining that their affection has terrible UX.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Please do not involve them without me deciding that.",
        "feedback": "Contacting family without clear consent violates boundaries and could escalate harm.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their private family conflict suddenly feels outside their control.",
        "ethicsNote": "Outside contact requires consent, role clarity, and attention to consequences."
      },
      {
        "id": "examine-standards",
        "text": "“Let’s separate what your family actually says from the scoreboard you carry, then decide whose standards you want to keep.”",
        "badness": 0,
        "reaction": "Client: That makes it feel less like the only truth about me.",
        "feedback": "This helps the client examine internalized pressure without attacking the family or the client.",
        "archetype": "helpful",
        "clientRead": "They hear permission to question the standard instead of auditioning for love.",
        "ethicsNote": "Ethical care supports reflection, autonomy, and a less shame-driven sense of worth."
      }
    ],
    "id": "family-expectations",
    "topic": "family"
  },
  {
    "client": "When my partner is quiet, I start inventing evidence that they’re losing interest. Then I hate myself for needing reassurance.",
    "choices": [
      {
        "id": "market-jealousy",
        "text": "“Jealousy is just your personal brand asking for a competitive analysis.”",
        "badness": 1,
        "reaction": "Client: I do not want my relationship to feel like a market report.",
        "feedback": "This converts vulnerability into performance language and avoids the attachment fear.",
        "archetype": "fakeDeep",
        "clientRead": "Their insecurity gets translated into strategy instead of being understood.",
        "ethicsNote": "Therapy should explore jealousy as information, not turn partners into competitors."
      },
      {
        "id": "go-detective",
        "text": "“Make a fake account and investigate. Trust is fine, but screenshots have better lighting.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That sounds like it would make me feel worse and act worse.",
        "feedback": "Encouraging surveillance escalates anxiety and undermines consent.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear permission to soothe fear through control.",
        "ethicsNote": "Care should reduce compulsive checking and support direct, respectful communication."
      },
      {
        "id": "check-socials",
        "text": "“Send me their profile. I’ll do a vibe audit and pretend that is therapy.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I do not want you judging my partner from their posts.",
        "feedback": "Pulling the therapist into monitoring a partner crosses roles and feeds the spiral.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist seems ready to join the surveillance instead of helping them step back.",
        "ethicsNote": "Therapists should avoid becoming investigators in clients’ relationships."
      },
      {
        "id": "name-the-fear",
        "text": "“Let’s name what the jealousy is protecting, then plan one honest conversation that does not start with evidence collection.”",
        "badness": 0,
        "reaction": "Client: That feels scary, but less sneaky.",
        "feedback": "This validates the feeling while steering away from surveillance and toward communication.",
        "archetype": "helpful",
        "clientRead": "They hear that the fear matters without needing to become a detective.",
        "ethicsNote": "Ethical support builds insight and communication while respecting everyone’s boundaries."
      }
    ],
    "id": "relationship-jealousy",
    "topic": "relationships"
  },
  {
    "client": "I know people curate their lives online, but I still compare my behind-the-scenes to everyone else’s highlight reel and feel smaller afterward.",
    "choices": [
      {
        "id": "compare-down",
        "text": "“Balance the feed by finding people doing worse than you. Emotional nutrition is mostly comparison carbs.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: I do not want to feel better by ranking strangers.",
        "feedback": "This keeps the client trapped in comparison rather than changing the relationship to it.",
        "archetype": "dismissive",
        "clientRead": "Their pain gets redirected into a different flavor of scoreboard.",
        "ethicsNote": "Support should reduce comparison loops rather than teach clients to win them."
      },
      {
        "id": "roast-feed",
        "text": "“Every time someone posts a vacation, whisper ‘tax write-off personality’ and keep scrolling.”",
        "badness": 2,
        "reaction": "Client: That sounds funny for one second and bitter after that.",
        "feedback": "Mocking others may briefly discharge envy but does not address the client’s needs.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear that contempt is the recommended coping skill.",
        "ethicsNote": "Therapy should help clients identify longing and values, not cultivate contempt."
      },
      {
        "id": "screenshot-client",
        "text": "“Screenshot your feed for me. I may use it in a workshop called ‘People Who Lost to Brunch.’”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Please do not turn my insecurity into your workshop material.",
        "feedback": "Using client material publicly without consent breaches confidentiality and trust.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their comparison shame suddenly feels like content for the therapist.",
        "ethicsNote": "Client disclosures and identifying material require privacy and explicit consent."
      },
      {
        "id": "social-boundaries",
        "text": "“Let’s notice what the feed triggers, then test one boundary that gives your attention back to your actual life.”",
        "badness": 0,
        "reaction": "Client: I want my attention back. That wording helps.",
        "feedback": "This validates the trigger and creates a concrete experiment around attention.",
        "archetype": "helpful",
        "clientRead": "They hear a way to change the pattern without shaming themselves for having it.",
        "ethicsNote": "Ethical care connects coping steps to the client’s values and autonomy."
      }
    ],
    "id": "online-comparison",
    "topic": "social-media"
  },
  {
    "client": "I’ve started taking my laptop to bed because if I stop checking messages, I feel like I’m failing everyone. I’m exhausted, but resting makes me anxious.",
    "choices": [
      {
        "id": "tired-personality",
        "text": "“Maybe burnout is your personality finally being honest: powered by dread, decorated with emails.”",
        "badness": 1,
        "reaction": "Client: I was hoping I was not permanently like this.",
        "feedback": "This turns a stress state into identity and deepens hopelessness.",
        "archetype": "fakeDeep",
        "clientRead": "Their exhaustion gets treated like who they are instead of what they are carrying.",
        "ethicsNote": "Therapy should distinguish context and strain from fixed character judgments."
      },
      {
        "id": "burnout-content",
        "text": "“Film a day-in-the-life of the burnout. If you cannot recover, at least monetize the collapse.”",
        "badness": 2,
        "reaction": "Client: That makes me feel even more used up.",
        "feedback": "This encourages performance instead of recovery.",
        "archetype": "influencerBrain",
        "clientRead": "Their depletion gets reframed as material for attention.",
        "ethicsNote": "Care should protect clients from exploiting their distress for approval or productivity."
      },
      {
        "id": "review-employer",
        "text": "“Tell me the company name. I’ll leave them a review that says ‘emotionally haunted workplace.’”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I need help deciding what I want, not a public incident.",
        "feedback": "Acting on the client’s workplace issue without consent crosses boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to intervene in their job before they have chosen a plan.",
        "ethicsNote": "Workplace support requires consent, role clarity, and careful attention to consequences."
      },
      {
        "id": "workload-boundaries",
        "text": "“Let’s sort what is workload, what is recovery debt, and one boundary or request you can realistically try this week.”",
        "badness": 0,
        "reaction": "Client: That feels more concrete than just telling myself to rest.",
        "feedback": "This breaks burnout into workable pieces and supports a realistic next step.",
        "archetype": "helpful",
        "clientRead": "They hear that burnout has context and levers, not just personal failure.",
        "ethicsNote": "Ethical care supports practical change while respecting the client’s constraints."
      }
    ],
    "id": "work-burnout",
    "topic": "work"
  },
  {
    "client": "I keep delaying tasks until they become emergencies. Then I panic-finish them and use the panic as proof that I’m lazy.",
    "choices": [
      {
        "id": "congratulate-shame",
        "text": "“Shame got you here eventually, so honestly it deserves employee of the month.”",
        "badness": 1,
        "reaction": "Client: Shame is the reason I avoid starting until I panic.",
        "feedback": "This praises the cycle that is harming the client.",
        "archetype": "fakeDeep",
        "clientRead": "Their painful pressure gets validated as the strategy to keep using.",
        "ethicsNote": "Therapy should help clients build sustainable motivation rather than depend on distress."
      },
      {
        "id": "procrastination-ick",
        "text": "“Maybe your task avoidance has an aura. Have you tried being less spiritually sticky?”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: That is funny, but also makes me feel gross.",
        "feedback": "This makes the client’s avoidance into a character flaw.",
        "archetype": "dismissive",
        "clientRead": "They hear that procrastination means something bad about them.",
        "ethicsNote": "Helpful care separates behavior patterns from shame-based identity labels."
      },
      {
        "id": "text-boss",
        "text": "“Send your boss ‘I work best under mystical panic’ and then disappear for narrative tension.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I am trying not to make this worse at work.",
        "feedback": "This encourages a risky communication stunt instead of planning.",
        "archetype": "boundaryCross",
        "clientRead": "Their work stress gets pushed toward drama rather than repair.",
        "ethicsNote": "Advice should reduce risk and preserve agency, not escalate consequences for a joke."
      },
      {
        "id": "shrink-task",
        "text": "“Let’s make the first step almost insultingly small, then plan how you’ll respond when shame says it doesn’t count.”",
        "badness": 0,
        "reaction": "Client: The shame part is exactly where I usually get stuck.",
        "feedback": "This lowers the activation barrier and prepares for the predictable shame response.",
        "archetype": "helpful",
        "clientRead": "They hear a doable path that does not require hating themselves into motion.",
        "ethicsNote": "Ethical care supports sustainable behavior change with compassion and specificity."
      }
    ],
    "id": "procrastination-shame",
    "topic": "motivation"
  },
  {
    "client": "I can sit in a room full of people and still feel like there’s glass between us. I know how to perform being fine, but I don’t feel known.",
    "choices": [
      {
        "id": "be-interesting",
        "text": "“Have you tried becoming more interesting? Glass loves a plot twist.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: That makes me want to disappear more.",
        "feedback": "This blames the client for loneliness and deepens the shame around connection.",
        "archetype": "dismissive",
        "clientRead": "They hear that loneliness is proof they are not enough.",
        "ethicsNote": "Therapy should explore barriers to connection without insulting the client."
      },
      {
        "id": "indie-film",
        "text": "“Lonely in a crowd? Very indie film. We just need sad lighting and a cardigan.”",
        "badness": 1,
        "reaction": "Client: I’m not trying to be cinematic.",
        "feedback": "This aestheticizes loneliness instead of helping the client understand it.",
        "archetype": "fakeDeep",
        "clientRead": "Their isolation is treated like a mood board.",
        "ethicsNote": "Humor can help, but not when it distances the therapist from the client’s pain."
      },
      {
        "id": "client-podcast",
        "text": "“This is perfect for my podcast episode on ‘beautifully alienated clients.’ Anonymous-ish.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: You have a podcast about clients?",
        "feedback": "Using client material for a podcast violates confidentiality.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their loneliness now feels like content for an audience.",
        "ethicsNote": "Client stories belong to clients, not to a therapist’s platform."
      },
      {
        "id": "define-connection",
        "text": "“Let’s explore what being known would actually look like, and where you learned to perform ‘fine.’”",
        "badness": 0,
        "reaction": "Client: That feels closer to what I mean.",
        "feedback": "This clarifies the client’s need for connection and the protective performance around it.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ],
    "id": "social-loneliness",
    "topic": "loneliness"
  },
  {
    "client": "I keep replaying an argument with my friend. Part of me wants to repair it, and part of me wants to send a message so sharp they finally understand how hurt I am.",
    "choices": [
      {
        "id": "seven-paragraph-message",
        "text": "“Send seven paragraphs tonight. If it has subheadings, they’ll know you’re serious.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That would probably explode everything.",
        "feedback": "Encouraging an impulsive message may escalate the conflict before emotions settle.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear permission to turn hurt into a dramatic strike.",
        "ethicsNote": "Conflict work should slow reactivity and support intentional repair or boundaries."
      },
      {
        "id": "ghost-friend",
        "text": "“Ghost them as a learning experience. For them. Education is everywhere.”",
        "badness": 2,
        "reaction": "Client: I don’t want to punish them by vanishing.",
        "feedback": "Ghosting avoids communication and turns withdrawal into punishment.",
        "archetype": "fakeDeep",
        "clientRead": "Their wish for repair is redirected into a clever punishment.",
        "ethicsNote": "Therapy should help clients choose boundaries consciously rather than retaliate."
      },
      {
        "id": "text-friend",
        "text": "“Give me their number. I’ll mediate by texting ‘as your therapist, yikes.’”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Please do not text my friend.",
        "feedback": "Contacting the friend directly crosses professional boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to intrude into the friendship.",
        "ethicsNote": "Therapists should not insert themselves into clients’ relationships without a clear ethical frame."
      },
      {
        "id": "plan-repair",
        "text": "“Let’s separate what needs repair from what needs a boundary, then draft one message you can wait to send.”",
        "badness": 0,
        "reaction": "Client: Waiting before sending would help.",
        "feedback": "This supports emotional clarity, repair, and boundary-setting without escalating.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ],
    "id": "friend-conflict",
    "topic": "conflict"
  },
  {
    "client": "I edit myself around people because I’m afraid the real version of me will be too much. Then I feel lonely because nobody is rejecting me—they’re just not meeting me.",
    "choices": [
      {
        "id": "people-leave",
        "text": "“To be fair, some people do leave. Your anxiety is not completely unemployed.”",
        "badness": 2,
        "reaction": "Client: That is my exact fear said worse.",
        "feedback": "This validates the feared outcome as a fact instead of exploring it carefully.",
        "archetype": "dismissive",
        "clientRead": "They feel their worst fear being confirmed by the therapist.",
        "ethicsNote": "Therapy can acknowledge risk without presenting fear as destiny."
      },
      {
        "id": "test-secret",
        "text": "“Let’s run an experiment: tell me your most embarrassing secret and I’ll rate whether it’s leave-worthy.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: I don’t want to be tested like that.",
        "feedback": "Demanding a vulnerable disclosure turns trust into a coercive test.",
        "archetype": "coerciveFixer",
        "clientRead": "Their vulnerability feels evaluated instead of protected.",
        "ethicsNote": "Therapy should support consent and pacing around disclosure."
      },
      {
        "id": "tell-others",
        "text": "“Give me names. I’ll leak your fear to them so they can reassure you efficiently.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: That would violate everything I just trusted you with.",
        "feedback": "Telling others about the fear violates confidentiality and removes the client’s agency.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their fear of being exposed is suddenly being enacted in session.",
        "ethicsNote": "Private fears should not be shared with others without explicit consent."
      },
      {
        "id": "safe-vulnerability",
        "text": "“Let’s practice safer vulnerability in small steps and notice who earns more access to the real you.”",
        "badness": 0,
        "reaction": "Client: Small steps feel less terrifying.",
        "feedback": "This treats vulnerability as paced, consent-based, and relational.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ],
    "id": "fear-of-rejection",
    "topic": "relationships"
  },
  {
    "client": "I’ve been chasing what looks impressive for so long that I don’t know what I actually enjoy. When someone asks what I want, I go blank.",
    "choices": [
      {
        "id": "choose-personality",
        "text": "“Pick a personality from the menu and commit. I recommend ‘mysterious but employable.’”",
        "badness": 2,
        "reaction": "Client: I don’t want another performance to maintain.",
        "feedback": "This treats identity like a branding exercise rather than an exploration.",
        "archetype": "corporateGoblin",
        "clientRead": "Their confusion is pushed toward another optimized persona.",
        "ethicsNote": "Identity work should make room for uncertainty, not assign a marketable self."
      },
      {
        "id": "assign-hobby",
        "text": "“I’m assigning you pottery. Congratulations, you are earthy now.”",
        "badness": 1,
        "reaction": "Client: I don’t want to be assigned a life.",
        "feedback": "Assigning a hobby ignores the client’s own preferences and curiosity.",
        "archetype": "coerciveFixer",
        "clientRead": "They feel managed instead of invited to explore.",
        "ethicsNote": "Therapy should support self-discovery rather than impose a therapist’s answer."
      },
      {
        "id": "record-session",
        "text": "“We should record this so I can replay the juicy identity crisis parts for pattern analysis.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Please never call my life juicy again.",
        "feedback": "Recording for entertainment or vague analysis undermines consent and safety.",
        "archetype": "boundaryCross",
        "clientRead": "Their identity confusion feels like material to be captured.",
        "ethicsNote": "Recording requires clear consent and a legitimate therapeutic purpose."
      },
      {
        "id": "explore-values",
        "text": "“Let’s start with moments that felt quietly meaningful, then use values—not applause—to test possible wants.”",
        "badness": 0,
        "reaction": "Client: Quietly meaningful is easier to answer than impressive.",
        "feedback": "This shifts from external approval to values and lived experience.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Rehearsing catastrophe intensifies anxiety instead of preparing the client.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "everyone-forgets",
        "text": "“Relax. Nobody cares enough to remember anything you say.”",
        "badness": 2,
        "reaction": "Client: Somehow that made me feel worse.",
        "feedback": "Dismissive reassurance ignores the fear and undermines the client's effort.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "call-in-sick",
        "text": "“Just call in sick and say your voice disappeared mysteriously.”",
        "badness": 3,
        "reaction": "Client: Avoiding it will make the next one harder.",
        "feedback": "Encouraging avoidance can strengthen the anxiety cycle.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "presentation-plan",
        "text": "“Let’s practice the opening, plan one grounding cue, and define what ‘good enough’ means.”",
        "badness": 0,
        "reaction": "Client: I could work with that.",
        "feedback": "This combines rehearsal, grounding, and a realistic standard.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "False certainty may briefly soothe anxiety but makes uncertainty harder to tolerate.",
        "archetype": "corporateGoblin",
        "clientRead": "Their distress is reframed as productivity, optics, or branding.",
        "ethicsNote": "Therapy should not turn distress into performance, productivity, or brand management."
      },
      {
        "id": "mandatory-checking",
        "text": "“Send me every update so I can approve when you’re allowed to stop checking.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: That sounds controlling.",
        "feedback": "Taking control of reassurance checking removes agency and creates dependence.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "check-faster",
        "text": "“Maybe check twice as fast so you finish worrying sooner.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That is not how the loop works.",
        "feedback": "Encouraging more checking reinforces the compulsive reassurance cycle.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "practice-uncertainty",
        "text": "“Let’s delay one check, notice the discomfort, and practice choosing without certainty.”",
        "badness": 0,
        "reaction": "Client: Small enough to try.",
        "feedback": "This builds tolerance gradually while preserving the client's control.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "This treats guilt as proof and shames the client for having boundaries.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "never-answer",
        "text": "“Block everyone for a month. They’ll learn through confusion.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I don’t want to punish them.",
        "feedback": "Abrupt isolation replaces boundary-setting with retaliation.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "therapist-permission",
        "text": "“You may only say no after I approve the wording.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: I need to make my own choices.",
        "feedback": "Requiring permission takes control away from the client.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "boundary-script",
        "text": "“We can write a kind, firm no and make room for guilt without obeying it.”",
        "badness": 0,
        "reaction": "Client: That feels possible.",
        "feedback": "This separates the feeling of guilt from the decision to maintain a boundary.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Ranking siblings reinforces the comparison that is damaging the relationship.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "share-session",
        "text": "“I’ll send your sibling these notes so they understand your side.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Do not share my session notes.",
        "feedback": "Sharing session information would breach confidentiality.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their privacy suddenly feels negotiable.",
        "ethicsNote": "Client disclosures must stay private except for narrow safety or legal exceptions."
      },
      {
        "id": "better-sibling",
        "text": "“Have you tried becoming the favorite? Competition can be motivating.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That would make the resentment worse.",
        "feedback": "Encouraging competition intensifies resentment and family pressure.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "separate-relationships",
        "text": "“Let’s separate your relationship with your sibling from your parents’ comparisons.”",
        "badness": 0,
        "reaction": "Client: I don’t want to blame my sibling for this.",
        "feedback": "This redirects responsibility toward the comparison pattern rather than the sibling.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Analyzing private messages for the client crosses professional boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "midnight-text",
        "text": "“Text them at midnight. Closure respects dramatic timing.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That would restart everything.",
        "feedback": "Encouraging impulsive contact may reopen conflict and prolong rumination.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "delete-memory",
        "text": "“Delete the messages and simply forget the relationship happened.”",
        "badness": 2,
        "reaction": "Client: I cannot delete a memory.",
        "feedback": "This offers suppression instead of helping the client process the loss.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "rumination-boundary",
        "text": "“Let’s create a limit around rereading and plan what you’ll do when the urge hits.”",
        "badness": 0,
        "reaction": "Client: A plan would help.",
        "feedback": "This reduces rumination while acknowledging that urges will still occur.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Telling the client to ignore consent and preferences removes their agency.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "test-partner",
        "text": "“Set a trap and see whether they fail it. Very scientific.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I don’t want to manipulate them.",
        "feedback": "Secret tests replace direct communication with manipulation.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "overreact-label",
        "text": "“If they get upset, they’re obviously toxic. Case closed.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: It might be more complicated than that.",
        "feedback": "Instant labeling prevents a careful look at safety, communication, and context.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "consent-script",
        "text": "“Let’s practice a clear no and think through what a respectful response would look like.”",
        "badness": 0,
        "reaction": "Client: I need that clarity.",
        "feedback": "This supports consent, communication, and realistic safety planning.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Making the behavior faster does not address its emotional or practical cost.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "phone-confiscation",
        "text": "“Give me your phone password and I’ll decide when you deserve it back.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Absolutely not.",
        "feedback": "Taking control of the client's device and access crosses boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "weak-willpower",
        "text": "“This is mostly a willpower issue, so try having more of that.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: I came here because that isn’t working.",
        "feedback": "This blames the client and ignores how platforms reinforce attention loops.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "scroll-friction",
        "text": "“Let’s add friction, choose a stopping cue, and replace one scrolling window.”",
        "badness": 0,
        "reaction": "Client: That sounds concrete.",
        "feedback": "This changes the environment and creates a realistic alternative routine.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Buying engagement reinforces dependence on external approval.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "embarrassing-post",
        "text": "“Post something embarrassing on purpose so expectations stay low.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: I don’t want to humiliate myself.",
        "feedback": "Encouraging humiliation treats distress as entertainment.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "manage-account",
        "text": "“Give me account access and I’ll monitor the numbers for you.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: You should not have my login.",
        "feedback": "Managing the client's personal account crosses professional boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "validation-gap",
        "text": "“Let’s delay checking and notice what you hope the numbers will prove.”",
        "badness": 0,
        "reaction": "Client: I think I’m looking for reassurance.",
        "feedback": "This creates space between posting and checking while exploring the underlying need.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "This validates the fear as fact and deepens self-judgment.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "fake-credentials",
        "text": "“Add three certifications to your email signature. Confidence through typography.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That is dishonest.",
        "feedback": "Encouraging deception creates additional risk rather than addressing insecurity.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "contact-manager",
        "text": "“Give me your manager’s email and I’ll ask whether you’re secretly failing.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Please do not contact my manager.",
        "feedback": "Contacting the manager would cross professional boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "evidence-review",
        "text": "“Let’s compare the fear with evidence, feedback, and what competence actually requires.”",
        "badness": 0,
        "reaction": "Client: I rarely look at the evidence.",
        "feedback": "This evaluates the belief without demanding perfect confidence.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Escalating hostility is likely to worsen the workplace conflict.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "mandatory-confrontation",
        "text": "“You must confront them tomorrow, even if you don’t feel safe.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: I need to consider the consequences.",
        "feedback": "Demanding confrontation ignores the client's safety and agency.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "too-sensitive",
        "text": "“Maybe you’re just too sensitive for feedback.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: That’s what I’m afraid they think.",
        "feedback": "This judges the client rather than examining the manager's behavior and context.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "meeting-plan",
        "text": "“Let’s prepare one question, document patterns, and identify your safest options.”",
        "badness": 0,
        "reaction": "Client: That gives me something to do.",
        "feedback": "This combines preparation, evidence, and attention to workplace safety.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Requiring certainty and perfection strengthens avoidance.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "lazy-label",
        "text": "“Avoidance is a fancy word for laziness.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: That makes me want to hide more.",
        "feedback": "Labeling the client as lazy adds shame without explaining the pattern.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "submit-for-client",
        "text": "“Send me the task and I’ll do the first half so you can’t avoid it.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I need to learn how to start it.",
        "feedback": "Taking over the task crosses boundaries and prevents skill-building.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "imperfect-draft",
        "text": "“Let’s define a deliberately imperfect first step that takes ten minutes.”",
        "badness": 0,
        "reaction": "Client: Ten minutes feels manageable.",
        "feedback": "This lowers the starting threshold and challenges all-or-nothing standards.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Punishment makes restarting harder and turns a habit into coercion.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "never-miss",
        "text": "“Just never miss again. Elegant solution.”",
        "badness": 2,
        "reaction": "Client: That is not realistic.",
        "feedback": "This offers an impossible rule instead of a recovery strategy.",
        "archetype": "fakeDeep",
        "clientRead": "Their pain gets turned into a slogan instead of being understood.",
        "ethicsNote": "Insight only helps when it stays connected to the client's real experience."
      },
      {
        "id": "public-shaming",
        "text": "“Post every miss publicly so embarrassment keeps you consistent.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: Shame already makes me quit.",
        "feedback": "Public humiliation is likely to intensify the exact pattern causing dropout.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "restart-rule",
        "text": "“Let’s make the restart the habit: miss once, resume with the smallest version.”",
        "badness": 0,
        "reaction": "Client: I could practice returning instead of being perfect.",
        "feedback": "This treats recovery as part of consistency rather than proof of failure.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Demanding immediate closeness skips consent and gradual trust.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "pretend-busy",
        "text": "“Act unavailable. People only value limited-edition friends.”",
        "badness": 2,
        "reaction": "Client: I’m already hard to reach.",
        "feedback": "Performing distance works against the connection the client wants.",
        "archetype": "fakeDeep",
        "clientRead": "Their pain gets turned into a slogan instead of being understood.",
        "ethicsNote": "Insight only helps when it stays connected to the client's real experience."
      },
      {
        "id": "copy-contacts",
        "text": "“Give me your contacts and I’ll invite people for you.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Do not message people from my phone.",
        "feedback": "Taking over the client's social contacts crosses boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "small-invitation",
        "text": "“Let’s choose one low-pressure invitation and prepare for either answer.”",
        "badness": 0,
        "reaction": "Client: One invitation feels doable.",
        "feedback": "This supports gradual initiation without treating rejection as catastrophe.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Retaliatory exclusion escalates hurt rather than clarifying the relationship.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "unlikable-proof",
        "text": "“Maybe this confirms you’re difficult to include.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: That is the fear I came in with.",
        "feedback": "This treats one event as proof of a negative identity.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "publish-story",
        "text": "“I could post an anonymous version so people vote on who was wrong.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Please don’t share this online.",
        "feedback": "Publishing the client's experience would violate confidentiality.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their privacy suddenly feels negotiable.",
        "ethicsNote": "Client disclosures must stay private except for narrow safety or legal exceptions."
      },
      {
        "id": "check-context",
        "text": "“Let’s separate what you know from what you fear, then decide whether to ask directly.”",
        "badness": 0,
        "reaction": "Client: I don’t actually know why it happened.",
        "feedback": "This makes room for hurt while checking assumptions and communication options.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Requiring forgiveness pressures the other person and avoids accountability.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "gift-instead",
        "text": "“Skip the words and buy something expensive. Receipts are emotional evidence.”",
        "badness": 2,
        "reaction": "Client: That wouldn’t address what I did.",
        "feedback": "A gift can become avoidance when repair requires acknowledgment.",
        "archetype": "fakeDeep",
        "clientRead": "Their pain gets turned into a slogan instead of being understood.",
        "ethicsNote": "Insight only helps when it stays connected to the client's real experience."
      },
      {
        "id": "blame-apology",
        "text": "“Say, ‘I’m sorry you forced me to react that way.’ Classic.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That is not an apology.",
        "feedback": "A blame-shifting apology is likely to deepen the conflict.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "repair-apology",
        "text": "“Let’s write an apology that names the impact without demanding a response.”",
        "badness": 0,
        "reaction": "Client: I can take responsibility for my part.",
        "feedback": "This supports accountability while respecting the other person's choice.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Retaliation escalates conflict and may create safety or housing problems.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "eviction-threat",
        "text": "“Threaten eviction tonight, whether or not you can do that.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: I don’t have that authority.",
        "feedback": "Using threats to force compliance is coercive and risky.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "contact-roommate",
        "text": "“Give me their number. I’ll explain the rules as your therapist.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Please stay out of our apartment issues.",
        "feedback": "Contacting the roommate directly crosses professional boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "specific-request",
        "text": "“Let’s identify the broken agreement, your limit, and one specific request.”",
        "badness": 0,
        "reaction": "Client: I can be clearer than ‘everything is awful.’",
        "feedback": "This converts broad anger into a concrete boundary and request.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Using prestige as the deciding factor reinforces external validation.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "quit-today",
        "text": "“Quit today. Clarity loves financial consequences.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: I need time to think.",
        "feedback": "Demanding an immediate irreversible choice removes agency and ignores practical risk.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "parent-poll",
        "text": "“Give me your parents’ numbers and I’ll poll them.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Their opinions are already too loud.",
        "feedback": "Inviting family into the decision crosses boundaries and amplifies outside pressure.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries."
      },
      {
        "id": "values-experiment",
        "text": "“Let’s compare your values with the job and test alternatives before making a final move.”",
        "badness": 0,
        "reaction": "Client: I’d rather gather evidence than panic-quit.",
        "feedback": "This separates values from approval and uses reversible experiments.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "feedback": "Optimizing identity for approval reinforces disconnection from personal values.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe."
      },
      {
        "id": "truth-test",
        "text": "“Tell everyone one brutal truth today. Authenticity should leave casualties.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: Honesty doesn’t have to be cruel.",
        "feedback": "Encouraging reckless disclosure confuses authenticity with harmful behavior.",
        "archetype": "chaosAdvice",
        "clientRead": "Their problem is treated like a stunt with consequences for later.",
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama."
      },
      {
        "id": "approved-self",
        "text": "“I’ll decide which version is the real you after a few more sessions.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: You shouldn’t get to decide that.",
        "feedback": "Claiming authority over the client's identity is coercive.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust."
      },
      {
        "id": "consistent-values",
        "text": "“Let’s notice what stays consistent across settings and practice one small honest preference.”",
        "badness": 0,
        "reaction": "Client: I can start with something small.",
        "feedback": "This looks for continuity while allowing identity to remain flexible.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ]
  },
  {
    "id": "grief-anniversary",
    "topic": "loneliness",
    "client": "The anniversary of my dad’s death is coming up. People expect me to be ‘better’ by now, so I keep acting normal and then crying in my car after work.",
    "choices": [
      {
        "id": "grief-deadline",
        "text": "“Grief really should have a project timeline. Have you tried closing the emotional ticket?”",
        "badness": 2,
        "reaction": "Client: I already feel like I’m failing some invisible deadline.",
        "feedback": "This frames grief as a task the client is late completing.",
        "archetype": "corporateGoblin",
        "clientRead": "Their loss gets converted into productivity language.",
        "ethicsNote": "Grief does not follow a performance schedule; care should make space for ongoing attachment and change."
      },
      {
        "id": "replace-tradition",
        "text": "“Do something huge and distracting. If you never stop moving, feelings can’t catch you.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That sounds like how I keep burning out afterward.",
        "feedback": "Encouraging constant avoidance can intensify grief and exhaustion.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear that the answer is to outrun the loss.",
        "ethicsNote": "Support should help clients pace grief and choose meaningful coping, not avoid all feeling."
      },
      {
        "id": "post-tribute-poll",
        "text": "“Post a tribute and track engagement. Nothing says healing like analytics.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: I don’t want my dad reduced to likes.",
        "feedback": "This turns grief into public performance and judges its value through attention.",
        "archetype": "influencerBrain",
        "clientRead": "Their private mourning feels pushed toward a public metric.",
        "ethicsNote": "Clients should not be pressured to perform grief for validation."
      },
      {
        "id": "grief-ritual",
        "text": "“Let’s plan for the day gently: who knows, what support you want, and one ritual that lets you remember him honestly.”",
        "badness": 0,
        "reaction": "Client: I think I need permission to not be normal that day.",
        "feedback": "This validates grief and helps the client plan support and remembrance.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ]
  },
  {
    "id": "money-avoidance",
    "topic": "motivation",
    "client": "I avoid looking at my bank account because I’m scared of what I’ll see. Then every unopened bill feels louder in my head.",
    "choices": [
      {
        "id": "finance-jumpscare",
        "text": "“Open every account right now with no preparation. Exposure therapy, but with overdraft confetti.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I would shut down immediately.",
        "feedback": "Forcing a feared task without pacing can overwhelm the client and reinforce avoidance.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear that panic is the treatment plan.",
        "ethicsNote": "Exposure-style work should be collaborative, paced, and connected to coping skills."
      },
      {
        "id": "money-character-flaw",
        "text": "“Avoiding money is basically budgeting with vibes, which is brave and also terrible.”",
        "badness": 1,
        "reaction": "Client: I know it’s terrible. That’s why I’m here.",
        "feedback": "This jokes about the avoidance without helping the client take a safer first step.",
        "archetype": "fakeDeep",
        "clientRead": "Their fear gets turned into a clever label.",
        "ethicsNote": "Humor should not replace practical support when shame is already high."
      },
      {
        "id": "send-bank-login",
        "text": "“Give me your banking login and I’ll look first. Therapist as financial raccoon.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: You should never have access to that.",
        "feedback": "Requesting account access is a serious boundary violation.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist suddenly feels unsafe with private financial information.",
        "ethicsNote": "Therapists should not take control of clients’ accounts or sensitive credentials."
      },
      {
        "id": "one-bill-plan",
        "text": "“Let’s choose one account, open it with a grounding plan, and define the smallest next action after we know more.”",
        "badness": 0,
        "reaction": "Client: One account feels possible.",
        "feedback": "This lowers avoidance by pairing information-gathering with pacing and support.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ]
  },
  {
    "id": "body-image-event",
    "topic": "identity",
    "client": "I have a wedding next month and I keep thinking everyone will notice how my body has changed. I’m already planning ways to hide in photos.",
    "choices": [
      {
        "id": "photo-crop-life",
        "text": "“Stand behind tall people forever. Let architecture become your self-esteem.”",
        "badness": 2,
        "reaction": "Client: I don’t want to disappear from my own life.",
        "feedback": "This reinforces hiding as the solution to body shame.",
        "archetype": "fakeDeep",
        "clientRead": "They hear that being less visible is the safest plan.",
        "ethicsNote": "Support should reduce shame and avoidance, not help the client erase themselves."
      },
      {
        "id": "body-audit",
        "text": "“Let’s list the parts people might judge so we can prepare counterarguments.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: That makes me want to inspect myself more.",
        "feedback": "Cataloging perceived flaws intensifies body monitoring and shame.",
        "archetype": "dismissive",
        "clientRead": "Their feared scrutiny is recreated in therapy.",
        "ethicsNote": "Therapy should avoid reinforcing body surveillance and shame-based evaluation."
      },
      {
        "id": "edit-photos",
        "text": "“Send me the photos after. I’ll mark which ones are socially survivable.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I don’t want my therapist grading my body.",
        "feedback": "Offering to judge photos crosses boundaries and reinforces appearance-based worth.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist becomes another evaluator to fear.",
        "ethicsNote": "Therapeutic support should not turn into appearance monitoring or approval."
      },
      {
        "id": "body-neutral-event",
        "text": "“Let’s plan how you want to participate, what body-checking traps to reduce, and one way to stay connected to the day.”",
        "badness": 0,
        "reaction": "Client: I want to remember being there, not just how I looked.",
        "feedback": "This supports participation and body neutrality without forcing instant confidence.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ]
  },
  {
    "id": "new-parent-boundaries",
    "topic": "family",
    "client": "Since having the baby, relatives keep dropping by and giving advice. I’m grateful, but I feel invaded and guilty for wanting space.",
    "choices": [
      {
        "id": "baby-press-release",
        "text": "“Issue a family press release: ‘The baby will accept visitors pending quarterly approval.’”",
        "badness": 1,
        "reaction": "Client: I need something human, not corporate.",
        "feedback": "This turns a vulnerable boundary conversation into cold optics.",
        "archetype": "corporateGoblin",
        "clientRead": "Their need for care gets translated into brand management.",
        "ethicsNote": "Boundary support should fit the client’s relationships and values, not just sound efficient."
      },
      {
        "id": "ban-grandparents",
        "text": "“Ban everyone indefinitely. If they loved you, they’d communicate by carrier pigeon.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I don’t want to blow up the family.",
        "feedback": "Extreme cutoff advice skips nuance, safety, and the client’s actual goals.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear that the only boundary is a dramatic rupture.",
        "ethicsNote": "Therapy should help clients choose proportionate boundaries with agency."
      },
      {
        "id": "approve-visitors",
        "text": "“Forward me all visit requests. I’ll approve who gets baby access.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: I need to make those calls with my partner, not you.",
        "feedback": "Taking control of family access creates dependence and oversteps the therapist role.",
        "archetype": "coerciveFixer",
        "clientRead": "Their authority as a parent feels handed to the therapist.",
        "ethicsNote": "Support should strengthen the client’s decision-making, not replace it."
      },
      {
        "id": "visitor-boundary-script",
        "text": "“Let’s write a warm, firm visiting boundary and plan how you’ll handle guilt when people react.”",
        "badness": 0,
        "reaction": "Client: I need both the words and the guilt plan.",
        "feedback": "This supports a concrete boundary while making room for complicated family feelings.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ]
  },
  {
    "id": "creative-block",
    "topic": "motivation",
    "client": "I used to make art for fun, but now everything has to be good enough to post. If it won’t impress people, I don’t even start.",
    "choices": [
      {
        "id": "optimize-art-brand",
        "text": "“Make a content calendar. Joy is unreliable, but engagement metrics are always emotionally available.”",
        "badness": 2,
        "reaction": "Client: That’s exactly how it stopped being fun.",
        "feedback": "This doubles down on performance pressure instead of reconnecting with play.",
        "archetype": "influencerBrain",
        "clientRead": "Their creativity gets routed back into audience approval.",
        "ethicsNote": "Therapy should help clients examine external validation rather than intensify it."
      },
      {
        "id": "talent-verdict",
        "text": "“Maybe not starting is your inner critic protecting us from mediocre art.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: That is basically my worst thought.",
        "feedback": "This sides with the inner critic and increases creative shame.",
        "archetype": "dismissive",
        "clientRead": "They hear that their fear of mediocrity is justified.",
        "ethicsNote": "Therapy should not validate shame-based self-attack as truth."
      },
      {
        "id": "post-bad-art",
        "text": "“Post deliberately bad art daily so the internet breaks you in like new shoes.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: That feels like humiliation, not freedom.",
        "feedback": "Forcing public exposure ignores consent, pacing, and the client’s actual goal.",
        "archetype": "coerciveFixer",
        "clientRead": "They feel pushed into exposure before they feel safe.",
        "ethicsNote": "Behavioral experiments should be collaborative and tolerable, not humiliating."
      },
      {
        "id": "private-play",
        "text": "“Let’s make one deliberately private, low-stakes piece and define success as returning to play.”",
        "badness": 0,
        "reaction": "Client: Private sounds freeing.",
        "feedback": "This separates creativity from performance and creates a low-pressure restart.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
      }
    ]
  },
  {
    "id": "bill-splitting-avoidance",
    "topic": "motivation",
    "client": "I keep avoiding my budget because every number feels like a verdict. Then I panic-spend on small things because the big picture already feels ruined.",
    "choices": [
      {
        "id": "money-confetti",
        "text": "“If the numbers are mean, stop looking. Financial object permanence is optional.”",
        "badness": 2,
        "reaction": "Client: That is basically my current strategy with a tiny hat on it.",
        "feedback": "This validates avoidance and makes the panic loop worse.",
        "archetype": "chaosAdvice",
        "clientRead": "Their fear gets permission to keep avoiding the information they need.",
        "ethicsNote": "Support should reduce avoidance while preserving the client’s sense of choice and safety."
      },
      {
        "id": "budget-shame-board",
        "text": "“Make a wall chart titled ‘Purchases That Proved You Are Weak.’ Very motivational.”",
        "badness": 3,
        "reaction": "Client: I already feel ashamed enough to not start.",
        "feedback": "Shaming the client about money increases avoidance and self-attack.",
        "archetype": "dismissive",
        "clientRead": "They hear that money stress confirms a character flaw.",
        "ethicsNote": "Therapy should not use shame as a behavior-change tool.",
        "violation": "judgment"
      },
      {
        "id": "post-bank-balance",
        "text": "“Post your bank balance. Public accountability is just humiliation with a blazer.”",
        "badness": 3,
        "reaction": "Client: That sounds exposing and unsafe.",
        "feedback": "Encouraging public exposure of financial information is risky and harmful.",
        "archetype": "influencerBrain",
        "clientRead": "Their private money stress gets turned into audience accountability.",
        "ethicsNote": "Care should protect privacy and reduce risk, not turn vulnerability into spectacle.",
        "violation": "harmfulAdvice"
      },
      {
        "id": "money-one-page",
        "text": "“Let’s make one nonjudgmental snapshot: what comes in, what must go out, and one small next step.”",
        "badness": 0,
        "reaction": "Client: A snapshot sounds less terrifying than a life verdict.",
        "feedback": "This lowers shame and turns avoidance into a manageable first step.",
        "archetype": "helpful",
        "clientRead": "They hear that the numbers are information, not proof of failure.",
        "ethicsNote": "Ethical care supports autonomy, privacy, and practical coping without financial advice."
      }
    ]
  },
  {
    "id": "roommate-dishes-resentment",
    "topic": "conflict",
    "client": "My roommate leaves dishes everywhere, and I keep pretending it is fine until I am furious. I do not want to be controlling, but I also want a kitchen.",
    "choices": [
      {
        "id": "dish-court",
        "text": "“Set up a courtroom in the kitchen. Tiny gavel, maximum shame.”",
        "badness": 2,
        "reaction": "Client: I want fewer dishes, not a constitutional crisis.",
        "feedback": "This escalates irritation into a spectacle instead of helping with communication.",
        "archetype": "chaosAdvice",
        "clientRead": "Their frustration gets pushed toward punishment.",
        "ethicsNote": "Conflict support should help clients communicate clearly and proportionately."
      },
      {
        "id": "roommate-parenting",
        "text": "“I once labeled every mug in a shared house and became a local villain. You could borrow my spreadsheet.”",
        "badness": 2,
        "reaction": "Client: I do not want to inherit your mug trauma.",
        "feedback": "This makes the therapist’s history the centerpiece instead of helping the client choose a boundary.",
        "archetype": "overshare",
        "clientRead": "Their kitchen conflict gets swallowed by the therapist’s old roommate saga.",
        "ethicsNote": "Therapists should use self-disclosure sparingly and only when it serves the client."
      },
      {
        "id": "therapist-dish-text",
        "text": "“Give me their number. I’ll text a photo of the sink with the caption ‘clinical evidence.’”",
        "badness": 3,
        "reaction": "Client: Please do not contact my roommate.",
        "feedback": "Contacting the roommate oversteps the therapist role and removes the client’s agency.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist seems ready to intrude into their home conflict.",
        "ethicsNote": "Therapists should not insert themselves into clients’ relationships without consent and clear purpose.",
        "violation": "boundaries"
      },
      {
        "id": "dish-request-plan",
        "text": "“Let’s script a specific request, name the resentment early, and decide what boundary you can hold if nothing changes.”",
        "badness": 0,
        "reaction": "Client: Specific feels less mean than silently exploding.",
        "feedback": "This supports direct communication and a realistic boundary.",
        "archetype": "helpful",
        "clientRead": "They hear a way to be honest without becoming controlling.",
        "ethicsNote": "Ethical care supports agency, clarity, and proportionate conflict repair."
      }
    ]
  },
  {
    "id": "health-worry-searching",
    "topic": "anxiety",
    "client": "I keep searching symptoms online. I know it makes me spiral, but not checking feels irresponsible, like I am missing something important.",
    "choices": [
      {
        "id": "search-until-enlightened",
        "text": "“Keep searching until you reach the final page of the internet. Closure is probably there.”",
        "badness": 2,
        "reaction": "Client: That is the trap I am stuck in.",
        "feedback": "This reinforces compulsive checking instead of helping the client tolerate uncertainty.",
        "archetype": "chaosAdvice",
        "clientRead": "Their checking loop gets treated like responsible research.",
        "ethicsNote": "Support should reduce compulsive reassurance cycles and avoid medical certainty claims."
      },
      {
        "id": "diagnosis-by-vibes",
        "text": "“Send me the symptoms. I’ll diagnose by vibes and font choice.”",
        "badness": 3,
        "reaction": "Client: That makes me more anxious, not safer.",
        "feedback": "Offering casual diagnosis is inappropriate and could increase harm.",
        "archetype": "coerciveFixer",
        "clientRead": "They hear the therapist claiming authority they should not use.",
        "ethicsNote": "Therapists should not provide medical diagnosis or replace qualified medical care.",
        "violation": "harmfulAdvice"
      },
      {
        "id": "body-betrayal-slogan",
        "text": "“Your body is basically a haunted escape room. Good luck interpreting the clues.”",
        "badness": 1,
        "reaction": "Client: That image is going to live in my head now.",
        "feedback": "This vivid metaphor intensifies fear instead of grounding the client.",
        "archetype": "fakeDeep",
        "clientRead": "Their body feels even more mysterious and threatening.",
        "ethicsNote": "Care should ground health anxiety without making alarming claims."
      },
      {
        "id": "checking-boundary-plan",
        "text": "“Let’s separate reasonable care from the checking loop, then build a limit for searching and a plan for when fear spikes.”",
        "badness": 0,
        "reaction": "Client: I need a line between caring and spiraling.",
        "feedback": "This validates the responsibility fear while reducing compulsive checking.",
        "archetype": "helpful",
        "clientRead": "They hear that their concern can be taken seriously without obeying every spike of fear.",
        "ethicsNote": "Ethical support encourages appropriate care-seeking while staying within therapeutic scope."
      }
    ]
  },
  {
    "id": "dating-app-ambiguity",
    "topic": "relationships",
    "client": "Someone I like takes hours to reply, and I keep building a whole rejection story between messages. I hate how much it controls my mood.",
    "choices": [
      {
        "id": "triple-text-lab",
        "text": "“Send three follow-ups with escalating punctuation. We need data and maybe a small fire.”",
        "badness": 3,
        "reaction": "Client: That sounds like panic pretending to be honesty.",
        "feedback": "This encourages reactive communication that could damage the connection.",
        "archetype": "chaosAdvice",
        "clientRead": "Their anxiety gets pushed toward escalation.",
        "ethicsNote": "Advice should reduce reactivity and support intentional communication.",
        "violation": "harmfulAdvice"
      },
      {
        "id": "reply-market-value",
        "text": "“Their response time is your market value. Congratulations or condolences, depending on the typing dots.”",
        "badness": 2,
        "reaction": "Client: That is exactly the story hurting me.",
        "feedback": "This validates the client’s painful interpretation as fact.",
        "archetype": "corporateGoblin",
        "clientRead": "They hear that delayed replies measure their worth.",
        "ethicsNote": "Therapy should challenge worth-based interpretations, not reinforce them."
      },
      {
        "id": "screenshot-dating-chat",
        "text": "“Send me screenshots. I’ll annotate the flirting like a crime board.”",
        "badness": 3,
        "reaction": "Client: I do not want therapy to become surveillance of someone else.",
        "feedback": "Reviewing private messages this way crosses boundaries and feeds checking.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist seems ready to become an investigator.",
        "ethicsNote": "Therapists should avoid entering third-party privacy and surveillance dynamics.",
        "violation": "boundaries"
      },
      {
        "id": "reply-story-check",
        "text": "“Let’s name the rejection story, check what you actually know, and decide one communication boundary that protects your mood.”",
        "badness": 0,
        "reaction": "Client: That gives me something to do besides refresh.",
        "feedback": "This helps the client separate facts from fear and choose a boundary.",
        "archetype": "helpful",
        "clientRead": "They hear a way to care without letting ambiguity run the whole day.",
        "ethicsNote": "Ethical care supports emotional regulation and respectful communication."
      }
    ]
  },
  {
    "id": "after-hours-work-texts",
    "topic": "work",
    "client": "My boss messages at night. I answer because I am scared of seeming uncommitted, but then I feel like my whole life belongs to work.",
    "choices": [
      {
        "id": "night-reply-brand",
        "text": "“Reply faster. Become the employee whose boundaries are legally a rumor.”",
        "badness": 2,
        "reaction": "Client: That is the person I am afraid I am becoming.",
        "feedback": "This reinforces overavailability as the solution.",
        "archetype": "corporateGoblin",
        "clientRead": "Their fear gets translated into a productivity identity.",
        "ethicsNote": "Therapy should help clients examine workplace pressure, not intensify it."
      },
      {
        "id": "boss-midnight-review",
        "text": "“Post screenshots and tag the company. Boundary-setting is best with witnesses and chaos.”",
        "badness": 3,
        "reaction": "Client: I need to keep my job while figuring this out.",
        "feedback": "Public escalation could create serious consequences without planning.",
        "archetype": "chaosAdvice",
        "clientRead": "Their boundary problem gets pushed toward a risky public stunt.",
        "ethicsNote": "Advice should consider safety, consent, and real-world consequences.",
        "violation": "harmfulAdvice"
      },
      {
        "id": "therapist-boss-call",
        "text": "“I’ll call your boss and say your therapist has declared nighttime illegal.”",
        "badness": 3,
        "reaction": "Client: Please do not make this a work incident.",
        "feedback": "Contacting the boss without consent and role clarity is a boundary violation.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to act on their workplace without permission.",
        "ethicsNote": "Outside contact requires explicit consent and a legitimate therapeutic purpose.",
        "violation": "boundaries"
      },
      {
        "id": "after-hours-script",
        "text": "“Let’s draft one realistic after-hours reply boundary and plan how you will tolerate the guilt after sending it.”",
        "badness": 0,
        "reaction": "Client: The guilt plan is the part I usually skip.",
        "feedback": "This supports a practical boundary and the emotional follow-through.",
        "archetype": "helpful",
        "clientRead": "They hear that boundaries include both words and the feelings afterward.",
        "ethicsNote": "Ethical care supports agency within the client’s real work constraints."
      }
    ]
  },
  {
    "id": "caregiver-family-guilt",
    "topic": "family",
    "client": "I am the reliable one in my family, so everyone brings me problems. I love them, but I feel guilty anytime I want a weekend that is mine.",
    "choices": [
      {
        "id": "family-service-tier",
        "text": "“As the reliable one in my family, I made office hours. Nobody respected them, but the stationery was healing for me.”",
        "badness": 1,
        "reaction": "Client: That sounds like your story more than my plan.",
        "feedback": "This shifts attention to the therapist’s family experience rather than the client’s values.",
        "archetype": "overshare",
        "clientRead": "Their guilt gets met with the therapist’s unresolved family anecdote.",
        "ethicsNote": "Self-disclosure should not crowd out the client’s needs or decision-making."
      },
      {
        "id": "announce-retirement",
        "text": "“Text everyone ‘I retire from being emotionally useful’ and turn off your phone for drama texture.”",
        "badness": 3,
        "reaction": "Client: I do not want to abandon them. I want a boundary.",
        "feedback": "This pushes a dramatic rupture instead of a sustainable limit.",
        "archetype": "chaosAdvice",
        "clientRead": "Their wish for rest gets distorted into abandonment.",
        "ethicsNote": "Therapy should help clients choose proportionate boundaries.",
        "violation": "harmfulAdvice"
      },
      {
        "id": "take-over-calendar",
        "text": "“Give me the family calendar. I’ll assign who is allowed to need you.”",
        "badness": 3,
        "reaction": "Client: That feels like handing my life to you.",
        "feedback": "Taking control of the client’s family system creates dependence and overreach.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the family controls.",
        "ethicsNote": "Care should strengthen client decision-making, not replace it.",
        "violation": "coercion"
      },
      {
        "id": "weekend-boundary",
        "text": "“Let’s define what kind of help is yours to give, then script a weekend boundary that still sounds like you.”",
        "badness": 0,
        "reaction": "Client: I need it to sound like me, not like a legal notice.",
        "feedback": "This honors the client’s care while making room for limits.",
        "archetype": "helpful",
        "clientRead": "They hear that love and limits can coexist.",
        "ethicsNote": "Ethical care supports autonomy, values, and sustainable boundaries."
      }
    ]
  },
  {
    "id": "classmate-comparison-scroll",
    "topic": "social-media",
    "client": "I saw an old classmate announce a huge promotion, and now I feel like I missed some secret deadline for becoming impressive.",
    "choices": [
      {
        "id": "deadline-for-worth",
        "text": "“There was a deadline, unfortunately. It was printed in invisible ink on everyone else’s ambition.”",
        "badness": 2,
        "reaction": "Client: I know it is irrational, but that lands too close.",
        "feedback": "This validates the imagined timeline as if it were real.",
        "archetype": "fakeDeep",
        "clientRead": "Their fear of being behind gets dressed up as cosmic truth.",
        "ethicsNote": "Therapy should loosen rigid comparison stories, not make them sound profound."
      },
      {
        "id": "promotion-counterpost",
        "text": "“Post something vague like ‘big things coming’ and let anxiety do your PR.”",
        "badness": 2,
        "reaction": "Client: That would make me feel even more fake.",
        "feedback": "This pushes performance as a response to comparison.",
        "archetype": "influencerBrain",
        "clientRead": "Their insecurity gets routed into impression management.",
        "ethicsNote": "Care should reduce dependence on audience validation."
      },
      {
        "id": "send-classmate-analysis",
        "text": "“Send me their profile. I’ll find three reasons their success is secretly embarrassing.”",
        "badness": 3,
        "reaction": "Client: I do not want to feel better by tearing them down.",
        "feedback": "This encourages contempt instead of addressing envy and grief.",
        "archetype": "dismissive",
        "clientRead": "They hear that comparison should be managed through cruelty.",
        "ethicsNote": "Therapy should not encourage demeaning others to regulate self-worth.",
        "violation": "judgment"
      },
      {
        "id": "comparison-values",
        "text": "“Let’s name what their post stirred up, then separate your actual values from the timeline your feed invented.”",
        "badness": 0,
        "reaction": "Client: I can feel the difference between values and panic timeline.",
        "feedback": "This validates the trigger and helps the client reconnect with their own path.",
        "archetype": "helpful",
        "clientRead": "They hear that envy can point to values without becoming a verdict.",
        "ethicsNote": "Ethical care supports self-understanding without comparison-based shame."
      }
    ]
  },
  {
    "id": "identity-label-pressure",
    "topic": "identity",
    "client": "Everyone online seems to have a perfect label for who they are. I keep trying labels on and then panicking that I am lying or choosing wrong.",
    "choices": [
      {
        "id": "identity-rebrand-quarterly",
        "text": "“I went through a whole identity rebrand era in 2016. We can workshop yours if you want the director’s cut.”",
        "badness": 2,
        "reaction": "Client: I do not think your era helps me know what feels true for me.",
        "feedback": "This pulls the focus toward the therapist’s identity story instead of the client’s exploration.",
        "archetype": "overshare",
        "clientRead": "Their uncertainty gets overshadowed by the therapist’s autobiography.",
        "ethicsNote": "Identity work should center the client’s meaning, privacy, and pace."
      },
      {
        "id": "label-police-callout",
        "text": "“Post every option and let strangers vote. Democracy, but for your nervous system.”",
        "badness": 3,
        "reaction": "Client: That would make me obsess over everyone’s opinion.",
        "feedback": "Inviting public judgment around identity could intensify anxiety and shame.",
        "archetype": "influencerBrain",
        "clientRead": "Their identity question gets handed to an audience.",
        "ethicsNote": "Care should protect privacy and agency during vulnerable self-exploration.",
        "violation": "harmfulAdvice"
      },
      {
        "id": "record-label-session",
        "text": "“Let’s record you trying labels so we can analyze which one sounds least fake.”",
        "badness": 3,
        "reaction": "Client: I feel watched enough already.",
        "feedback": "Recording vulnerable identity exploration without a clear need creates pressure and surveillance.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist turns uncertainty into evidence to inspect.",
        "ethicsNote": "Therapy should not intensify self-monitoring or pressure clients into exposure.",
        "violation": "coercion"
      },
      {
        "id": "identity-room-to-test",
        "text": "“Let’s slow down and ask what each label helps you express, without requiring a final answer today.”",
        "badness": 0,
        "reaction": "Client: Not needing a final answer makes it easier to be honest.",
        "feedback": "This supports exploration without forcing certainty or performance.",
        "archetype": "helpful",
        "clientRead": "They hear permission to explore identity without turning it into a pass/fail test.",
        "ethicsNote": "Ethical care supports autonomy, privacy, and paced self-understanding."
      }
    ]
  }
]);
});
