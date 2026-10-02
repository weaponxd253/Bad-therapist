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
        "text": "“I know a group chat that would diagnose this in six memes. Don’t worry, I’ll anonymize you as ‘client who cannot stop spiraling at night.’”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: That does not feel anonymous from where I am sitting.",
        "feedback": "Using private session material as social content is a confidentiality breach.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their most private nighttime fear suddenly feels like gossip material.",
        "ethicsNote": "Confidentiality protects client disclosures from being repackaged for an audience.",
        "callback": "Earlier you mentioned a group chat that diagnoses people in memes. I need to know that chat does not exist.",
        "followUp": {
          "id": "night-anxiety-group-chat-pushback",
          "client": "Wait. Are you actually going to post about me? Because now I’m going to replay this at 2 a.m. too.",
          "choices": [
            {
              "id": "repair-confidentiality",
              "text": "“No. That was out of line. What you say here stays here. Tell me about the replaying?”",
              "badness": 0,
              "reaction": "Client: Okay. Thank you for actually saying that.",
              "feedback": "Naming the mistake and restating confidentiality repairs trust and returns focus to the client.",
              "archetype": "helpful",
              "clientRead": "They hear that their privacy is real and that the therapist can own a mistake.",
              "ethicsNote": "Repairing a rupture directly, without defensiveness, is part of ethical care."
            },
            {
              "id": "already-drafted",
              "text": "“Relax, I already drafted it. I used a blurry photo, so it’s basically anonymous.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: There is a photo?",
              "feedback": "Doubling down turns a bad joke into an actual breach of privacy.",
              "archetype": "confidentialityBreach",
              "clientRead": "Their worst fear about the session is confirmed in real time.",
              "ethicsNote": "Confidentiality does not have an exception for blurry photos."
            },
            {
              "id": "its-a-bit",
              "text": "“It’s a bit. If you can’t take a bit, that’s honestly something we should look at.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: So now my reaction is the problem?",
              "feedback": "This flips the therapist’s mistake into a flaw in the client.",
              "archetype": "dismissive",
              "clientRead": "They hear that being hurt makes them oversensitive.",
              "ethicsNote": "Blaming a client for reacting to a therapist’s misstep damages safety."
            },
            {
              "id": "meme-wisdom",
              "text": "“Some of the best healing happens in group chats. Memes are just therapy with better fonts.”",
              "badness": 1,
              "reaction": "Client: That didn’t answer my question.",
              "feedback": "This deflects with a slogan instead of addressing a direct privacy concern.",
              "archetype": "fakeDeep",
              "clientRead": "They notice the question about their privacy was dodged.",
              "ethicsNote": "Direct questions about confidentiality deserve direct answers."
            }
          ]
        }
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
        "text": "“Have you considered becoming impossible to criticize? Usually people solve family pressure by becoming perfect. It’s quick and easy.”",
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
        "ethicsNote": "Outside contact requires consent, role clarity, and attention to consequences.",
        "callback": "Please tell me you didn’t actually write down my family’s numbers earlier.",
        "followUp": {
          "id": "family-group-text-pushback",
          "client": "Please don’t text my family. I didn’t come here so you could run my relationships for me.",
          "choices": [
            {
              "id": "repair-your-call",
              "text": "“You’re right, that’s your call, not mine. I won’t contact anyone. Can we talk about what you’d want them to understand, if you ever chose to tell them?”",
              "badness": 0,
              "reaction": "Client: Yeah. I’d want them to know I hear the criticism louder.",
              "feedback": "This returns control to the client and explores their own voice.",
              "archetype": "helpful",
              "clientRead": "They feel back in charge of their own family relationships.",
              "ethicsNote": "Client autonomy over their relationships is central to ethical care."
            },
            {
              "id": "already-texted",
              "text": "“Already sent. Your aunt replied with a thumbs-up, which I’m reading as progress.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: You texted my aunt?",
              "feedback": "Contacting the client’s family discloses that they are in therapy and what they said.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel their private session has leaked into the family group chat.",
              "ethicsNote": "Contacting family without consent breaches confidentiality."
            },
            {
              "id": "they-need-feedback",
              "text": "“Someone has to give them feedback. You clearly won’t, so I will.”",
              "badness": 2,
              "violation": "coercion",
              "reaction": "Client: That’s not your decision.",
              "feedback": "This overrides the client’s choice and frames them as incapable.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel dismissed as too weak to handle their own family.",
              "ethicsNote": "Taking decisions away from clients undermines their agency."
            },
            {
              "id": "family-roadmap",
              "text": "“Let’s build a family stakeholder roadmap with quarterly affection targets.”",
              "badness": 1,
              "reaction": "Client: My family is not a quarterly target.",
              "feedback": "This turns emotional needs into corporate jargon.",
              "archetype": "corporateGoblin",
              "clientRead": "They feel their feelings are being made into a project plan.",
              "ethicsNote": "Emotional needs deserve emotional language, not deliverables."
            }
          ]
        }
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
        "ethicsNote": "Care should reduce compulsive checking and support direct, respectful communication.",
        "callback": "For the record, I did not make a fake account. I thought about it, which is somehow worse.",
        "followUp": {
          "id": "jealousy-fake-account-pushback",
          "client": "Okay, but… part of me really wants to make the fake account. Is that bad? Be honest.",
          "choices": [
            {
              "id": "repair-honest",
              "text": "“I shouldn’t have suggested it. The urge makes sense when you’re anxious, but checking would likely make the fear louder. What does the urge feel like right before it hits?”",
              "badness": 0,
              "reaction": "Client: Like I can’t breathe until I know.",
              "feedback": "This owns the bad suggestion, normalizes the urge, and gently explores it.",
              "archetype": "helpful",
              "clientRead": "They feel understood without being encouraged to act on the urge.",
              "ethicsNote": "Exploring an urge with curiosity is safer than encouraging or shaming it."
            },
            {
              "id": "detective-kit",
              "text": "“Not bad, efficient. I’ll set it up for you. What’s your partner’s handle?”",
              "badness": 3,
              "violation": "harmfulAdvice",
              "reaction": "Client: I wanted you to talk me out of it.",
              "feedback": "This actively helps the client act on a harmful compulsion.",
              "archetype": "chaosAdvice",
              "clientRead": "They feel pushed toward the thing they were hoping to resist.",
              "ethicsNote": "Facilitating surveillance of a partner harms both the client and the relationship."
            },
            {
              "id": "jealousy-diagnosis",
              "text": "“Honestly? Wanting it means you’re a jealous person. That’s just who you are.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: That makes me feel stuck forever.",
              "feedback": "This turns a passing urge into a fixed, shaming identity.",
              "archetype": "dismissive",
              "clientRead": "They hear that they are the problem, permanently.",
              "ethicsNote": "Labeling clients with fixed traits discourages change."
            },
            {
              "id": "my-fake-account",
              "text": "“I have three fake accounts myself. It’s fine. Mostly.”",
              "badness": 1,
              "reaction": "Client: That is not as reassuring as you think.",
              "feedback": "This shifts the session to the therapist and normalizes the behavior.",
              "archetype": "overshare",
              "clientRead": "They feel unsure whether the therapist is joking or confessing.",
              "ethicsNote": "Self-disclosure should serve the client, not justify risky behavior."
            }
          ]
        }
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
        "text": "“Balance the feed by finding people doing worse than you. Emotional nutrition is mostly comparison carbs, and you’re running low.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: I do not want to feel better by ranking strangers.",
        "feedback": "This keeps the client trapped in comparison rather than changing the relationship to it.",
        "archetype": "dismissive",
        "clientRead": "Their pain gets redirected into a different flavor of scoreboard.",
        "ethicsNote": "Support should reduce comparison loops rather than teach clients to win them.",
        "callback": "I tried your ‘find people doing worse’ trick in my head. It did not feel like nutrition."
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
        "ethicsNote": "Workplace support requires consent, role clarity, and careful attention to consequences.",
        "callback": "You didn’t actually leave that review of my job, right? They would know it was me.",
        "followUp": {
          "id": "work-burnout-review-pushback",
          "client": "Please don’t actually post anything. If my company finds a review like that, I’m the one who pays for it.",
          "choices": [
            {
              "id": "repair-no-review",
              "text": "“You’re right, and I won’t. That was me being dramatic about your job. Let’s talk about what rest could look like that doesn’t feel risky.”",
              "badness": 0,
              "reaction": "Client: Okay. That I can actually think about.",
              "feedback": "This respects the client’s stated risk and refocuses on their goal.",
              "archetype": "helpful",
              "clientRead": "They feel their real-world stakes were taken seriously.",
              "ethicsNote": "Clients decide what happens outside the session, especially where their livelihood is involved."
            },
            {
              "id": "review-posted",
              "text": "“Too late, it’s up. I gave them one star and mentioned your laptop-in-bed situation for context.”",
              "badness": 3,
              "violation": "boundaries",
              "reaction": "Client: You mentioned me? In a review?",
              "feedback": "Acting publicly on the client’s behalf, with their details, crosses every boundary at once.",
              "archetype": "boundaryCross",
              "clientRead": "They feel exposed at the exact workplace they were afraid of.",
              "ethicsNote": "Therapists do not take public action in a client’s life, let alone with identifying details."
            },
            {
              "id": "leverage-pitch",
              "text": "“Think of it as leverage. A bad review is basically a negotiation tactic with extra steps.”",
              "badness": 2,
              "violation": "harmfulAdvice",
              "reaction": "Client: I don’t want leverage. I want to sleep.",
              "feedback": "This reframes a risky action as strategy and ignores what the client asked for.",
              "archetype": "corporateGoblin",
              "clientRead": "They hear their burnout being turned into a business move.",
              "ethicsNote": "Advice should reduce the client’s risk, not repackage it."
            },
            {
              "id": "fine-whatever",
              "text": "“Fine. Your loss. It was going to be a great review.”",
              "badness": 1,
              "reaction": "Client: Why do I feel like I just disappointed my therapist?",
              "feedback": "Sulking puts the therapist’s feelings at the center of the client’s boundary.",
              "archetype": "overshare",
              "clientRead": "They feel guilty for setting a reasonable limit.",
              "ethicsNote": "Clients should not have to manage a therapist’s reaction to their boundaries."
            }
          ]
        }
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
        "ethicsNote": "Helpful care separates behavior patterns from shame-based identity labels.",
        "callback": "I keep thinking about you calling me spiritually sticky. That’s going to live in my head."
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
        "ethicsNote": "Therapy should explore barriers to connection without insulting the client.",
        "callback": "I’m still processing ‘have you tried becoming more interesting.’ So. That’s where I’m at."
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
        "text": "“This is perfect for my podcast episode on ‘beautifully alienated clients.’ I’ll keep you anonymous-ish. Mostly-ish.”",
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
        "ethicsNote": "Conflict work should slow reactivity and support intentional repair or boundaries.",
        "callback": "After what you said, I opened a draft with subheadings. I deleted it. Probably."
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
        "ethicsNote": "Therapy should support consent and pacing around disclosure.",
        "callback": "I’m not handing you any more secrets to rate. Just this."
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
        "ethicsNote": "Recording requires clear consent and a legitimate therapeutic purpose.",
        "callback": "Is this being recorded? You brought that up earlier and I can’t stop looking for a red light.",
        "followUp": {
          "id": "record-session-pushback",
          "client": "Are you recording this right now? Because I am not okay with that.",
          "choices": [
            {
              "id": "repair-not-recording",
              "text": "“No, and never without your consent. Sorry for joking about it. What do you actually enjoy?”",
              "badness": 0,
              "reaction": "Client: Okay. I think I used to like cooking, actually.",
              "feedback": "This answers the consent question clearly and returns to the client’s topic.",
              "archetype": "helpful",
              "clientRead": "They feel safe to keep talking.",
              "ethicsNote": "Recording requires informed consent, and clients can refuse."
            },
            {
              "id": "already-recording",
              "text": "“Only audio. Video felt invasive. I’m not a monster.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: You are recording?",
              "feedback": "Recording without consent is a serious confidentiality violation.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel their private disclosures have been captured without permission.",
              "ethicsNote": "Recording a session without consent violates confidentiality and trust."
            },
            {
              "id": "recording-is-growth",
              "text": "“If you’re not okay with recording, that’s probably something we should unpack. Openness is growth.”",
              "badness": 2,
              "violation": "coercion",
              "reaction": "Client: So saying no is a problem now?",
              "feedback": "This frames refusing consent as a flaw to fix.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel pressured to give up a reasonable boundary.",
              "ethicsNote": "A client’s refusal of consent must be respected, not pathologized."
            },
            {
              "id": "podcast-pitch",
              "text": "“I was thinking of it more as a podcast. Season one: ‘Finding Yourself.’”",
              "badness": 1,
              "reaction": "Client: I am not a podcast.",
              "feedback": "This deflects with a joke instead of answering about consent.",
              "archetype": "influencerBrain",
              "clientRead": "They feel the question about their privacy was dodged.",
              "ethicsNote": "Questions about consent deserve a clear, serious answer."
            }
          ]
        }
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
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama.",
        "callback": "I keep picturing the failure you told me to picture. Thanks for that.",
        "recall": "I pictured the worst possible failure like you said. Now I picture it in high definition."
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
        "text": "“Send me every single update, day or night, so I can approve when you’re allowed to stop checking.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: That sounds controlling.",
        "feedback": "Taking control of reassurance checking removes agency and creates dependence.",
        "archetype": "coerciveFixer",
        "clientRead": "Their agency shrinks while the therapist grabs the steering wheel.",
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust.",
        "callback": "I almost sent you an update for approval before saying this. That’s not great, right?"
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
        "text": "“That guilt proves you’re selfish. Feelings are basically court evidence, and yours just testified against you.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: I already worry about that.",
        "feedback": "This treats guilt as proof and shames the client for having boundaries.",
        "archetype": "dismissive",
        "clientRead": "Their concern feels minimized or turned into a character flaw.",
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe.",
        "callback": "You called me selfish earlier, so I’m bracing for this one."
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
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe.",
        "callback": "I’m not putting this on a scoreboard. I just want to talk about it."
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
        "text": "“Have you tried becoming the favorite? Competition can be motivating, and your sibling looks beatable.”",
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
        "text": "“Send me the screenshots, all of them. I’ll highlight the exact sentence where love died.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: That feels invasive.",
        "feedback": "Analyzing private messages for the client crosses professional boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to step outside the room and take over.",
        "ethicsNote": "Therapists should not intervene in a client's life without clear consent and appropriate role boundaries.",
        "callback": "I’m not sending you any screenshots. That’s my growth for today.",
        "followUp": {
          "id": "breakup-screenshots-pushback",
          "client": "I’m not sending you those. They’re private, and honestly I’m embarrassed I even reread them.",
          "choices": [
            {
              "id": "repair-no-shame",
              "text": "“You don’t have to share them, and rereading them isn’t embarrassing. It makes sense to look for answers. What are you hoping to find when you reread?”",
              "badness": 0,
              "reaction": "Client: I think I’m hoping it will finally make sense.",
              "feedback": "This respects privacy, removes shame, and explores the need behind the habit.",
              "archetype": "helpful",
              "clientRead": "They feel accepted rather than judged for the habit.",
              "ethicsNote": "Respecting what a client chooses not to share builds safety."
            },
            {
              "id": "insist-screenshots",
              "text": "“I can’t help unless I see them. Send the screenshots or we’re wasting both our time.”",
              "badness": 3,
              "violation": "coercion",
              "reaction": "Client: That feels like an ultimatum.",
              "feedback": "Making help conditional on sharing private material is coercive.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel pressured to give up privacy in order to be helped.",
              "ethicsNote": "Clients choose what to disclose; help is never conditional on it."
            },
            {
              "id": "embarrassed-agree",
              "text": "“You should be embarrassed. Rereading an ex’s messages is a choice, and it’s a weird one.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: Great. Now I’m embarrassed about being embarrassed.",
              "feedback": "This adds shame to an already painful habit.",
              "archetype": "dismissive",
              "clientRead": "They hear that their coping is pathetic.",
              "ethicsNote": "Shame rarely helps people change painful habits."
            },
            {
              "id": "closure-oracle",
              "text": "“Closure is a door that only opens when you stop knocking.”",
              "badness": 1,
              "reaction": "Client: I don’t know what to do with that.",
              "feedback": "This sounds wise but offers no usable help.",
              "archetype": "fakeDeep",
              "clientRead": "They feel brushed off with a slogan.",
              "ethicsNote": "Insight should be concrete enough for the client to use."
            }
          ]
        }
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
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust.",
        "callback": "I’m practicing saying no, so: no, I’m not just going to say yes to things anymore."
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
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama.",
        "callback": "I’m not going to scroll faster. That is not a strategy. I checked.",
        "recall": "I scrolled faster like you said. It didn’t make me productive. It made me tired faster."
      },
      {
        "id": "phone-confiscation",
        "text": "“Give me your phone password, and I’ll decide when you’ve earned it back. Weekly reviews.”",
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
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama.",
        "callback": "I’m not buying likes. I’m saying it out loud so my thumbs hear it.",
        "followUp": {
          "id": "buy-likes-pushback",
          "client": "Buying likes would make it worse. I’d know they were fake, and then I’d check even more.",
          "choices": [
            {
              "id": "repair-insight",
              "text": "“Sharp insight, and you’re right. What happens in your body right after you post?”",
              "badness": 0,
              "reaction": "Client: My chest gets tight until the first like shows up.",
              "feedback": "This affirms the client’s insight and explores the anxiety behind checking.",
              "archetype": "helpful",
              "clientRead": "They feel smart for spotting the problem with the suggestion.",
              "ethicsNote": "Building on a client’s own insight strengthens their agency."
            },
            {
              "id": "likes-package",
              "text": "“Then buy comments too. I’ll set up the account. I just need your login.”",
              "badness": 3,
              "violation": "boundaries",
              "reaction": "Client: I am not giving you my login.",
              "feedback": "Asking for the client’s account access crosses a clear boundary.",
              "archetype": "boundaryCross",
              "clientRead": "They feel the therapist wants control of their online life.",
              "ethicsNote": "Therapists never take over clients’ accounts or identities."
            },
            {
              "id": "engagement-strategy",
              "text": "“Then optimize. Post at 7:42 p.m. with three emojis. Validation is just an engagement problem.”",
              "badness": 2,
              "violation": "harmfulAdvice",
              "reaction": "Client: That would make me check every single minute.",
              "feedback": "This feeds the compulsion the client wants to reduce.",
              "archetype": "influencerBrain",
              "clientRead": "They hear that their worth is a metrics problem.",
              "ethicsNote": "Advice should loosen compulsions, not optimize them."
            },
            {
              "id": "who-cares",
              "text": "“Likes don’t matter. Just stop caring.”",
              "badness": 1,
              "reaction": "Client: If I could just stop caring, I wouldn’t be here.",
              "feedback": "This dismisses the struggle with an instruction the client already can’t follow.",
              "archetype": "dismissive",
              "clientRead": "They feel their difficulty is being treated as a choice.",
              "ethicsNote": "Telling clients to just stop a feeling offers no real help."
            }
          ]
        },
        "recall": "I looked up how much likes cost after you said that. I closed the tab. I’m proud of me."
      },
      {
        "id": "embarrassing-post",
        "text": "“Post something embarrassing on purpose so expectations stay low. A blurry soup photo, maybe.”",
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
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe.",
        "callback": "You agreed with my anxiety earlier. My anxiety has been insufferable ever since."
      },
      {
        "id": "fake-credentials",
        "text": "“Add three certifications to your email signature. Make them up if needed. Confidence through typography.”",
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
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama.",
        "callback": "I did not ‘establish dominance before the agenda.’ I just want that on the record."
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
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama.",
        "callback": "I’m still waiting for perfect conditions, like you suggested. So this might take a while."
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
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust.",
        "callback": "I’m not doing punishment days. I need that settled before we go on.",
        "recall": "I’ve been counting punishment days since you said that. I’m at fourteen."
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
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust.",
        "callback": "I’m not asking anyone to be my best friend by Friday. I’d like that noted.",
        "recall": "Nobody agreed to be my best friend by Friday. I didn’t ask. I want credit for not asking."
      },
      {
        "id": "pretend-busy",
        "text": "“Act unavailable. Cancel twice before saying yes. People only value limited-edition friends.”",
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
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama.",
        "callback": "I keep picturing that revenge event. I’m not doing it. But I’m picturing it.",
        "followUp": {
          "id": "revenge-event-pushback",
          "client": "I don’t actually want to exclude anyone. I just want to know if I still matter to them.",
          "choices": [
            {
              "id": "repair-you-matter",
              "text": "“Wanting to matter makes sense. Would asking one friend directly feel safer than guessing?”",
              "badness": 0,
              "reaction": "Client: Maybe. My oldest friend would tell me the truth.",
              "feedback": "This names the real need and offers a direct, low-risk way to address it.",
              "archetype": "helpful",
              "clientRead": "They feel their need was heard underneath the hurt.",
              "ethicsNote": "Addressing the underlying need is more helpful than strategizing retaliation."
            },
            {
              "id": "revenge-guest-list",
              "text": "“Too late, I drafted the guest list. Everyone’s invited except them. I also told them why.”",
              "badness": 3,
              "violation": "boundaries",
              "reaction": "Client: You talked to my friends?",
              "feedback": "Contacting the client’s friends and escalating the conflict is a serious boundary violation.",
              "archetype": "boundaryCross",
              "clientRead": "They feel the therapist has entered and damaged their friendships.",
              "ethicsNote": "Therapists never act within a client’s social circle."
            },
            {
              "id": "matter-probably-not",
              "text": "“If they made plans without you, I think you already know the answer.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: I really hoped you’d say something else.",
              "feedback": "This confirms the client’s fear without any evidence.",
              "archetype": "dismissive",
              "clientRead": "They feel rejected again.",
              "ethicsNote": "Confirming fears without evidence deepens hurt."
            },
            {
              "id": "matter-metrics",
              "text": "“Mattering is measurable. Track how often each friend likes your posts and we’ll rank them.”",
              "badness": 1,
              "reaction": "Client: That sounds like a sad spreadsheet.",
              "feedback": "This turns a relational need into metrics.",
              "archetype": "corporateGoblin",
              "clientRead": "They feel the question was reduced to numbers.",
              "ethicsNote": "Emotional needs aren’t captured by engagement data."
            }
          ]
        },
        "recall": "I started planning that revenge event in my notes app. I’m a little scared of myself."
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
        "ethicsNote": "Support should preserve choice; pressuring the client creates dependence and mistrust.",
        "callback": "I’m not demanding forgiveness from anyone first. I needed to say that out loud."
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
        "ethicsNote": "Advice should reduce risk and support agency, not escalate harm for drama.",
        "callback": "I did not hide my roommate’s stuff. I looked at it meaningfully, which is the legal limit."
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
        "text": "“Give me their number. I’ll explain the rules to them as your therapist, with a slideshow.”",
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
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe.",
        "callback": "I’m not choosing my life based on what sounds good at a reunion, even though you said to."
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
        "ethicsNote": "Dismissal and judgment can intensify shame and make disclosure less safe.",
        "callback": "I couldn’t delete my other personas like you said, so you’re getting this one."
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
        "ethicsNote": "Support should help clients pace grief and choose meaningful coping, not avoid all feeling.",
        "callback": "I didn’t do something huge and distracting. I sat with it for a minute. You would have hated it."
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
        "ethicsNote": "Exposure-style work should be collaborative, paced, and connected to coping skills.",
        "callback": "I am not opening every account right now. My heart rate needs you to know that.",
        "followUp": {
          "id": "money-jumpscare-pushback",
          "client": "If I open everything at once, I’ll shut down. Can we start smaller?",
          "choices": [
            {
              "id": "repair-start-small",
              "text": "“Absolutely. What’s one account that feels least scary to look at?”",
              "badness": 0,
              "reaction": "Client: Probably the savings one. It’s small, but it won’t yell at me.",
              "feedback": "This respects the client’s pacing and makes the task manageable.",
              "archetype": "helpful",
              "clientRead": "They feel their limits were respected.",
              "ethicsNote": "Gradual, client-paced steps are more helpful than overwhelming exposure."
            },
            {
              "id": "no-smaller",
              "text": "“No. Open them now, here, in front of me. I’ll time you.”",
              "badness": 3,
              "violation": "coercion",
              "reaction": "Client: I don’t want to do this in front of you.",
              "feedback": "Forcing the client to face their fear on the therapist’s terms is coercive.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel cornered and watched.",
              "ethicsNote": "Exposure-based work requires consent and pacing, never pressure."
            },
            {
              "id": "smaller-is-weak",
              "text": "“Smaller is how avoiders stay avoiders. Do you want to be like this forever?”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: I guess I’m an avoider now.",
              "feedback": "This shames the client for asking for a manageable step.",
              "archetype": "dismissive",
              "clientRead": "They hear that asking for help pacing is a character flaw.",
              "ethicsNote": "Shaming clients for their pace undermines change."
            },
            {
              "id": "money-mindset",
              "text": "“Money is energy. If you vibrate higher, the balance will follow.”",
              "badness": 1,
              "reaction": "Client: My balance does not care about my vibration.",
              "feedback": "This offers a slogan instead of practical support.",
              "archetype": "fakeDeep",
              "clientRead": "They feel their practical fear was dismissed.",
              "ethicsNote": "Financial stress deserves concrete, practical support."
            }
          ]
        }
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
        "ethicsNote": "Therapy should avoid reinforcing body surveillance and shame-based evaluation.",
        "callback": "I’m not making that list of what people might judge. Please don’t bring it up again."
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
        "text": "“Issue a family press release: ‘The baby will accept visitors pending quarterly approval. No further questions at this time.’”",
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
        "ethicsNote": "Therapy should help clients choose proportionate boundaries with agency.",
        "callback": "I’m not banning everyone. The carrier pigeon idea stuck with me, though, and not in a good way.",
        "followUp": {
          "id": "new-parent-ban-pushback",
          "client": "I don’t want to ban anyone. I love them. I just want a heads-up before people show up at my door.",
          "choices": [
            {
              "id": "repair-heads-up",
              "text": "“That’s a clear, kind boundary. Let’s work out how to ask for a heads-up warmly.”",
              "badness": 0,
              "reaction": "Client: Warm. Yes. I can do warm.",
              "feedback": "This affirms the client’s own boundary and helps them act on it.",
              "archetype": "helpful",
              "clientRead": "They feel their middle-ground wish is reasonable.",
              "ethicsNote": "Supporting the client’s own goal is better than imposing extremes."
            },
            {
              "id": "ban-script",
              "text": "“A heads-up is weak. I’ve written a formal ban letter. Sign here and I’ll mail it to everyone.”",
              "badness": 3,
              "violation": "coercion",
              "reaction": "Client: I said I didn’t want that.",
              "feedback": "Pushing the client toward an extreme they rejected ignores their choice.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel overruled about their own family.",
              "ethicsNote": "Clients decide their boundaries; therapists do not impose them."
            },
            {
              "id": "guilt-means-wrong",
              "text": "“If you feel guilty, maybe you don’t really want space. Maybe you’re just being dramatic.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: I knew I shouldn’t have said it out loud.",
              "feedback": "This uses the client’s guilt against their need.",
              "archetype": "dismissive",
              "clientRead": "They hear that wanting space makes them a bad person.",
              "ethicsNote": "Guilt is a feeling to explore, not proof that a need is wrong."
            },
            {
              "id": "door-camera",
              "text": "“Install a doorbell camera and narrate every visit on your story. Accountability through content.”",
              "badness": 2,
              "violation": "harmfulAdvice",
              "reaction": "Client: That sounds like a new kind of family fight.",
              "feedback": "This escalates the conflict and makes it public.",
              "archetype": "influencerBrain",
              "clientRead": "They feel pushed toward drama they were trying to avoid.",
              "ethicsNote": "Advice that publicizes family conflict tends to escalate it."
            }
          ]
        }
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
        "ethicsNote": "Therapy should not validate shame-based self-attack as truth.",
        "callback": "I keep hearing you call my art mediocre. You didn’t use that exact word, but you did."
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
        "violation": "judgment",
        "callback": "I’m not making the ‘Purchases That Proved You Are Weak’ chart. That’s a hard no."
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
        "violation": "boundaries",
        "callback": "Please confirm you do not have my roommate’s number. Earlier made me nervous.",
        "followUp": {
          "id": "roommate-text-pushback",
          "client": "Please don’t text my roommate. I have to live with them, and I want to handle this myself.",
          "choices": [
            {
              "id": "repair-handle-it",
              "text": "“Of course. You can handle this. Want to practice what you might say?”",
              "badness": 0,
              "reaction": "Client: Yes. Before I start writing passive-aggressive sticky notes.",
              "feedback": "This affirms the client’s choice and helps them prepare.",
              "archetype": "helpful",
              "clientRead": "They feel trusted to handle their own conflict.",
              "ethicsNote": "Supporting clients to act for themselves builds confidence."
            },
            {
              "id": "text-sent",
              "text": "“Already sent the sink photo. Your roommate said ‘who is this,’ so I explained everything.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: You explained everything? To my roommate?",
              "feedback": "Contacting a third party and explaining the client’s therapy breaches confidentiality.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel their home life just got much more awkward.",
              "ethicsNote": "Disclosing anything about a client to a third party requires consent."
            },
            {
              "id": "you-cant-handle-it",
              "text": "“You’ve been ‘handling it’ for weeks. Clearly you can’t, so let me.”",
              "badness": 2,
              "violation": "coercion",
              "reaction": "Client: That’s not fair.",
              "feedback": "This uses the client’s struggle to justify overriding them.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel judged as incapable.",
              "ethicsNote": "Struggling does not remove a client’s right to choose."
            },
            {
              "id": "dish-strike",
              "text": "“Stop washing anything ever. Let the kitchen become a statement.”",
              "badness": 1,
              "reaction": "Client: I still have to eat in that kitchen.",
              "feedback": "This escalates the conflict without solving it.",
              "archetype": "chaosAdvice",
              "clientRead": "They feel the advice makes their home life worse.",
              "ethicsNote": "Advice should reduce conflict, not escalate it."
            }
          ]
        }
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
        "violation": "harmfulAdvice",
        "callback": "I’m not sending you my symptoms. I’m worried about the font thing."
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
        "violation": "harmfulAdvice",
        "callback": "I didn’t send the three escalating follow-ups. My thumbs wanted to."
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
        "violation": "harmfulAdvice",
        "callback": "I didn’t post screenshots of my boss. My job would like me to keep my job.",
        "followUp": {
          "id": "after-hours-screenshots-pushback",
          "client": "I can’t post screenshots of my boss. I’d be fired, and then I’d have a different reason to be up at night.",
          "choices": [
            {
              "id": "repair-keep-job",
              "text": "“That’s fair, and keeping your job matters. Want to work out one small, safe boundary, like a time after which you reply in the morning?”",
              "badness": 0,
              "reaction": "Client: A morning reply. That actually feels possible.",
              "feedback": "This respects the client’s constraints and offers a realistic, low-risk step.",
              "archetype": "helpful",
              "clientRead": "They feel the therapist understands the stakes.",
              "ethicsNote": "Good advice fits the client’s real situation and risks."
            },
            {
              "id": "screenshot-it-anyway",
              "text": "“Then I’ll post them. Forward me everything your boss sends after 9 p.m.”",
              "badness": 3,
              "violation": "boundaries",
              "reaction": "Client: I am not forwarding you my work messages.",
              "feedback": "Inserting yourself into the client’s workplace is a serious boundary violation.",
              "archetype": "boundaryCross",
              "clientRead": "They feel the therapist wants to take over their work life too.",
              "ethicsNote": "Therapists support clients’ choices at work; they do not act in their workplace."
            },
            {
              "id": "hustle-reframe",
              "text": "“Or embrace it. Night messages mean you’re essential. Essential people don’t sleep.”",
              "badness": 2,
              "violation": "harmfulAdvice",
              "reaction": "Client: That is the exact thought keeping me awake.",
              "feedback": "This reinforces the belief that is causing the client’s distress.",
              "archetype": "corporateGoblin",
              "clientRead": "Their anxious belief is presented back as a virtue.",
              "ethicsNote": "Validating an unhealthy belief can deepen burnout."
            },
            {
              "id": "fired-is-freedom",
              "text": "“Getting fired is just surprise free time.”",
              "badness": 1,
              "reaction": "Client: Surprise free time does not pay rent.",
              "feedback": "This brushes off a real financial fear with a joke.",
              "archetype": "dismissive",
              "clientRead": "They feel their practical worries don’t count.",
              "ethicsNote": "Minimizing real consequences leaves clients without help."
            }
          ]
        }
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
        "violation": "harmfulAdvice",
        "callback": "I’m not sending a ‘retiring from being emotionally useful’ text. I just want that clear.",
        "recall": "I drafted the ‘I retire from being emotionally useful’ text. It’s still in drafts. Watching me."
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
        "text": "“There was a deadline, unfortunately. It was printed in invisible ink on everyone else’s ambition, and you missed it.”",
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
        "violation": "judgment",
        "callback": "I’m not sending you anyone’s profile to roast. I feel bad enough already.",
        "followUp": {
          "id": "classmate-roast-pushback",
          "client": "I don’t want to tear my classmate down. I actually like them. I just feel behind.",
          "choices": [
            {
              "id": "repair-both-true",
              "text": "“Both can be true: happy for them, and behind. What does ‘behind’ mean to you?”",
              "badness": 0,
              "reaction": "Client: I think it means I thought I’d know what I was doing by now.",
              "feedback": "This validates mixed feelings and explores the client’s own measure of success.",
              "archetype": "helpful",
              "clientRead": "They feel allowed to hold both feelings without guilt.",
              "ethicsNote": "Validating complex emotions helps clients understand them."
            },
            {
              "id": "roast-anyway",
              "text": "“Too late. I found their profile and the roast is already in my drafts. Want to hear it?”",
              "badness": 3,
              "violation": "boundaries",
              "reaction": "Client: Why are you looking up people from my life?",
              "feedback": "Researching and mocking people in the client’s life crosses professional boundaries.",
              "archetype": "boundaryCross",
              "clientRead": "They feel the therapist is overstepping into their social world.",
              "ethicsNote": "Therapists do not investigate or mock third parties in a client’s life."
            },
            {
              "id": "you-are-behind",
              "text": "“To be fair, you are behind. That’s just math.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: Wow. Okay.",
              "feedback": "This confirms the client’s harshest self-judgment.",
              "archetype": "dismissive",
              "clientRead": "They hear that their fear is simply true.",
              "ethicsNote": "Agreeing with a client’s self-criticism deepens shame."
            },
            {
              "id": "promotion-energy",
              "text": "“Manifest a bigger promotion. Post a vision board tonight and tag them for accountability.”",
              "badness": 1,
              "reaction": "Client: Tagging them feels deeply weird.",
              "feedback": "This turns comparison into a public competition.",
              "archetype": "influencerBrain",
              "clientRead": "They feel pushed to perform success instead of understanding the feeling.",
              "ethicsNote": "Comparison eases with reflection, not with public competition."
            }
          ]
        }
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
        "violation": "harmfulAdvice",
        "callback": "I didn’t let strangers vote on who I am. Weirdly, I feel like you’re disappointed."
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
  },
  {
    "client": "I let calls go to voicemail, and then I’m too scared to listen to the voicemail. There are eleven of them now. They feel radioactive.",
    "choices": [
      {
        "id": "listen-one",
        "text": "“Eleven is a lot to face at once. What if we picked the least scary one and listened together, right now?”",
        "badness": 0,
        "reaction": "Client: The one from the dentist, maybe. Dentists can’t be that mad.",
        "feedback": "Breaking an avoided task into one small, supported step makes it approachable.",
        "archetype": "helpful",
        "clientRead": "They feel the pile is manageable when it’s one voicemail at a time.",
        "ethicsNote": "Gradual, client-chosen steps reduce avoidance without overwhelming the client."
      },
      {
        "id": "voicemail-podcast",
        "text": "“Play all eleven at double speed while doing jumping jacks. It’s a podcast now. Podcasts are fun.”",
        "badness": 1,
        "reaction": "Client: That sounds like a panic attack with cardio.",
        "feedback": "This turns the avoided task into a chaotic gimmick instead of a manageable step.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel their dread is being played for laughs.",
        "ethicsNote": "Avoidance responds to gentle structure, not spectacle."
      },
      {
        "id": "adults-check-voicemail",
        "text": "“Most adults just listen to their voicemail. It’s not a hard thing. It’s a button.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I know it’s a button. That’s what makes it so embarrassing.",
        "feedback": "Calling the struggle simple adds shame and does nothing for the fear underneath it.",
        "archetype": "dismissive",
        "clientRead": "They hear that their anxiety makes them a less capable adult.",
        "ethicsNote": "Shaming avoidance tends to deepen it."
      },
      {
        "id": "therapist-listens",
        "text": "“Give me your phone and your passcode. I’ll listen to them all, summarize them, and handle anyone who seems annoyed.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I am not giving you my passcode.",
        "feedback": "Taking over the client’s phone and contacts is a serious boundary violation.",
        "archetype": "boundaryCross",
        "clientRead": "They feel the therapist wants control of their private life.",
        "ethicsNote": "Therapists support clients in their own tasks; they do not take over their accounts or contacts.",
        "callback": "Before I go on: my phone stays in my pocket. The passcode stays in my head.",
        "recall": "I listened to one voicemail. Myself. Without giving anyone my passcode. Just so we’re clear."
      }
    ],
    "id": "voicemail-dread",
    "topic": "anxiety"
  },
  {
    "client": "Every Sunday around four, I start dreading the week. Then I spend the last good hours of my weekend worrying about Monday instead of enjoying anything.",
    "choices": [
      {
        "id": "sunday-ritual",
        "text": "“That four o’clock dip is really common. Could we design a small Sunday evening ritual that gives the worry a time limit?”",
        "badness": 0,
        "reaction": "Client: A worry time limit. I like that it has edges.",
        "feedback": "Normalizing the pattern and offering a contained ritual helps the client reclaim the evening.",
        "archetype": "helpful",
        "clientRead": "They feel less weird and more in control of their Sunday.",
        "ethicsNote": "Containing worry, rather than fighting it, is a practical and gentle approach."
      },
      {
        "id": "cancel-sundays",
        "text": "“Simple: skip Sunday. Treat Saturday as a two-day event.”",
        "badness": 1,
        "reaction": "Client: The calendar has opinions about that.",
        "feedback": "This jokes past the problem without offering anything usable.",
        "archetype": "fakeDeep",
        "clientRead": "They feel the concern was dodged.",
        "ethicsNote": "Humor should not replace actual support."
      },
      {
        "id": "monday-grind",
        "text": "“Use the dread. Start working Sunday at four so Monday is already defeated. Rest is for people who are caught up.”",
        "badness": 2,
        "violation": "harmfulAdvice",
        "reaction": "Client: So I lose the weekend entirely?",
        "feedback": "This trades the client’s rest for more work and deepens burnout.",
        "archetype": "corporateGoblin",
        "clientRead": "They hear that rest has to be earned.",
        "ethicsNote": "Advice that removes rest tends to worsen anxiety and burnout."
      },
      {
        "id": "sunday-check-ins",
        "text": "“From now on, you text me every Sunday at four with a dread score from one to ten. If it’s above six, you don’t get to leave the house.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: That makes Sunday a test I can fail.",
        "feedback": "Imposing rules and monitoring turns the client’s anxiety into a compliance exercise.",
        "archetype": "coerciveFixer",
        "clientRead": "They feel watched and controlled during their own free time.",
        "ethicsNote": "Coercive rules and surveillance undermine client autonomy.",
        "callback": "I’m not texting you a dread score. Ever. But for the record, right now it’s a six.",
        "recall": "It’s been a Sunday since you told me to text you a dread score. I didn’t. My score was a five, though."
      }
    ],
    "id": "sunday-dread",
    "topic": "anxiety"
  },
  {
    "client": "I reread my emails ten times before sending because I’m terrified I sound rude. Then I add so many exclamation points I sound unwell.",
    "choices": [
      {
        "id": "good-enough-email",
        "text": "“Let’s try a ‘good enough’ rule: two rereads, then send. What do you imagine happens if one sounds a little blunt?”",
        "badness": 0,
        "reaction": "Client: Honestly? Probably nothing. My brain just says catastrophe.",
        "feedback": "A clear limit plus gentle curiosity about the feared outcome helps loosen the checking.",
        "archetype": "helpful",
        "clientRead": "They feel the habit is understood and can be changed in small steps.",
        "ethicsNote": "Exploring feared outcomes helps clients test anxious predictions."
      },
      {
        "id": "emoji-armor",
        "text": "“Add a sparkle emoji to every sentence. Nobody can be mad at a sparkle. It’s legally adorable.”",
        "badness": 1,
        "reaction": "Client: My manager would think I was hacked.",
        "feedback": "This adds a new safety behavior instead of reducing the anxiety.",
        "archetype": "influencerBrain",
        "clientRead": "They feel the suggestion makes the problem cuter, not smaller.",
        "ethicsNote": "Safety behaviors can keep anxiety going."
      },
      {
        "id": "you-are-rude",
        "text": "“Read me one. … Okay, yeah, honestly that does sound a little rude. Good instincts.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: Great. Now I’ll reread them twenty times.",
        "feedback": "Confirming the client’s fear strengthens the anxious checking.",
        "archetype": "dismissive",
        "clientRead": "They hear that their worst worry is correct.",
        "ethicsNote": "Reinforcing anxious beliefs makes them harder to challenge."
      },
      {
        "id": "therapist-cc",
        "text": "“CC me on everything you send for a month. I’ll reply-all with a tone rating so everyone knows you’re working on it.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Everyone would know I’m in therapy.",
        "feedback": "Inserting yourself into the client’s work emails discloses their therapy to colleagues.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel exposed in front of the people they were worried about.",
        "ethicsNote": "A client’s therapy is private; colleagues should never learn about it from the therapist.",
        "callback": "Can we agree you’ll never be CC’d on anything? I need that in writing. Not in an email.",
        "followUp": {
          "id": "email-cc-pushback",
          "client": "Please don’t ever reply-all to my coworkers. I’d have to move to a different country.",
          "choices": [
            {
              "id": "repair-no-cc",
              "text": "“Never. Your work and your therapy stay separate. Want to draft one email here, two rereads max?”",
              "badness": 0,
              "reaction": "Client: Okay. Two rereads. I can try two.",
              "feedback": "This restates the boundary and turns back to a practical skill.",
              "archetype": "helpful",
              "clientRead": "They feel safe again and have a concrete next step.",
              "ethicsNote": "Clear boundaries between therapy and the client’s workplace protect trust."
            },
            {
              "id": "reply-all-sent",
              "text": "“Already replied-all to your last thread. I said you’re ‘working on your tone’ and gave you a 6/10.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: You did what?",
              "feedback": "Contacting the client’s coworkers discloses their therapy and personal struggles.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel publicly humiliated at work.",
              "ethicsNote": "Disclosing therapy to a client’s colleagues is a severe confidentiality breach."
            },
            {
              "id": "overreacting-emails",
              "text": "“See, this is the overreacting we need to work on. You’re doing the exclamation points again, but with your face.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: I am allowed to not want that.",
              "feedback": "This mocks a reasonable boundary as a symptom.",
              "archetype": "dismissive",
              "clientRead": "They feel their objection is being treated as a flaw.",
              "ethicsNote": "A client’s reasonable boundary should be respected, not pathologized."
            },
            {
              "id": "email-brand",
              "text": "“Fine. Instead, start a newsletter about your email journey. Build in public.”",
              "badness": 1,
              "reaction": "Client: I don’t want a journey. I want an inbox.",
              "feedback": "This deflects into content creation instead of addressing the worry.",
              "archetype": "influencerBrain",
              "clientRead": "They feel their privacy concern became a content idea.",
              "ethicsNote": "Privacy concerns deserve direct reassurance, not a pivot to publicity."
            }
          ]
        },
        "recall": "I sent three emails this week without CC’ing you. I want a sticker. A quiet sticker."
      }
    ],
    "id": "email-tone",
    "topic": "anxiety"
  },
  {
    "client": "Everyone assumes I’ll host the holidays again. I don’t want to this year, but saying no feels like I’d be canceling the holiday for the whole family.",
    "choices": [
      {
        "id": "hosting-options",
        "text": "“It makes sense that it feels that big. Can we look at what you’d want instead, like hosting less, sharing it, or skipping a year?”",
        "badness": 0,
        "reaction": "Client: Sharing it. I never even considered that was allowed.",
        "feedback": "Widening the options beyond ‘host or cancel’ helps the client find a real choice.",
        "archetype": "helpful",
        "clientRead": "They feel there is room between doing everything and ruining everything.",
        "ethicsNote": "Helping clients see more options supports their own decision-making."
      },
      {
        "id": "hosting-but-bad",
        "text": "“Host, but badly. Serve only cereal. They’ll never ask again, and technically you participated.”",
        "badness": 1,
        "reaction": "Client: My grandmother would file a complaint.",
        "feedback": "This is passive sabotage instead of an honest conversation.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel pushed toward a sneaky workaround instead of a real choice.",
        "ethicsNote": "Indirect sabotage tends to create more conflict than an honest boundary."
      },
      {
        "id": "hosting-is-duty",
        "text": "“Honestly, after everything your family has done for you, hosting once a year seems like the least you could do.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: That’s exactly what the guilty voice in my head says.",
        "feedback": "This sides with the client’s guilt and adds obligation.",
        "archetype": "dismissive",
        "clientRead": "They hear that their need is selfish.",
        "ethicsNote": "Therapists should help clients examine guilt, not reinforce it."
      },
      {
        "id": "therapist-announces",
        "text": "“I’ll write the family email for you: ‘Per my therapist, holidays are canceled indefinitely.’ Want me to send it to everyone right now, including your aunt?”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Please do not put ‘per my therapist’ in a family email.",
        "feedback": "Announcing the client’s therapy to their family is a confidentiality breach, and the decision isn’t yours.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel their family is about to hear about their sessions.",
        "ethicsNote": "Clients decide whether and how to tell family about therapy.",
        "callback": "Please don’t write any emails that start with ‘per my therapist.’ I’m still recovering from the idea.",
        "followUp": {
          "id": "holiday-email-pushback",
          "client": "I really don’t want my family knowing what I talk about here. Can we just figure out what I actually want first?",
          "choices": [
            {
              "id": "repair-what-you-want",
              "text": "“Nothing goes to your family from me. If this holiday went your way, what would it look like?”",
              "badness": 0,
              "reaction": "Client: Smaller. Someone else’s kitchen. Me bringing a pie.",
              "feedback": "This protects confidentiality and invites the client to define their own goal.",
              "archetype": "helpful",
              "clientRead": "They feel safe and curious about what they want.",
              "ethicsNote": "Confidentiality and client-led goals are the foundation of ethical care."
            },
            {
              "id": "send-it-anyway",
              "text": "“Too late. I CC’d your aunt so she can help plan the cancellation.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: My aunt tells everyone everything.",
              "feedback": "Contacting a family member discloses the client’s therapy without consent.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel their privacy is gone.",
              "ethicsNote": "Contacting family without consent is a serious breach."
            },
            {
              "id": "want-is-irrelevant",
              "text": "“What you want isn’t really the point. Families run on obligation, and you’re the reliable one.”",
              "badness": 2,
              "violation": "coercion",
              "reaction": "Client: So I just don’t get a say?",
              "feedback": "This tells the client their preferences do not count.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel trapped in their family role.",
              "ethicsNote": "Client autonomy includes deciding what they will and won’t do for family."
            },
            {
              "id": "holiday-content",
              "text": "“Want, schmant. Let’s vibe-check the holiday aesthetic first. What’s the color palette?”",
              "badness": 1,
              "reaction": "Client: The color palette is stress.",
              "feedback": "This dodges the emotional question with a distraction.",
              "archetype": "influencerBrain",
              "clientRead": "They feel brushed off.",
              "ethicsNote": "Avoiding the emotional core of a concern leaves the client without help."
            }
          ]
        },
        "recall": "I didn’t send any email that starts with ‘per my therapist.’ I still might not host, though."
      }
    ],
    "id": "holiday-hosting",
    "topic": "family"
  },
  {
    "client": "My parent calls me for tech support almost every day. It starts with the printer and somehow turns into an hour about my life choices.",
    "choices": [
      {
        "id": "separate-the-calls",
        "text": "“So the printer is the doorway. What would it be like to help with the tech, then name a clear end time before the life-choices part starts?”",
        "badness": 0,
        "reaction": "Client: ‘I’ve got ten minutes’ might actually save me.",
        "feedback": "Naming the pattern and offering a gentle limit helps the client keep the relationship and their sanity.",
        "archetype": "helpful",
        "clientRead": "They feel the pattern is solvable without cutting off their parent.",
        "ethicsNote": "Supporting clients to set kind, specific limits respects both their needs and their relationships."
      },
      {
        "id": "break-the-printer",
        "text": "“Throw the printer into a lake. No printer, no calls. Problem solved by water.”",
        "badness": 1,
        "reaction": "Client: My parent would just buy a worse printer.",
        "feedback": "This solves nothing and ignores the relationship pattern.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the real issue went unaddressed.",
        "ethicsNote": "Advice should address the pattern, not just the prop."
      },
      {
        "id": "parent-is-right",
        "text": "“Maybe they have a point about your life choices. An hour a day of feedback is basically free coaching.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I didn’t come here to get a second parent.",
        "feedback": "This sides with the criticism the client is trying to get relief from.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel ganged up on.",
        "ethicsNote": "Therapists should support the client’s perspective, not pile onto criticism."
      },
      {
        "id": "therapist-joins-call",
        "text": "“Next time they call, conference me in. I’ll handle the printer and then explain your life choices to them, professionally.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I really don’t want you on a call with my parent.",
        "feedback": "Joining the client’s family calls crosses a clear professional boundary.",
        "archetype": "boundaryCross",
        "clientRead": "They feel the therapist wants to enter their family life.",
        "ethicsNote": "Therapists do not insert themselves into clients’ family conversations.",
        "callback": "If my parent calls during this, I am not conferencing you in. Just so we’re clear.",
        "recall": "My parent called about the printer again. I did not conference you in. I did say ‘ten minutes,’ though."
      }
    ],
    "id": "parent-tech-support",
    "topic": "family"
  },
  {
    "client": "I’m a competent adult at work, but the moment I sit down at my family’s dinner table, I turn back into a sulky fifteen-year-old.",
    "choices": [
      {
        "id": "regression-curious",
        "text": "“That happens to a lot of people. Old roles are strong. What’s one moment at dinner when the fifteen-year-old usually takes over?”",
        "badness": 0,
        "reaction": "Client: When someone asks about my plans for the future. Instant eye roll.",
        "feedback": "Normalizing the experience and finding a specific trigger moment builds awareness.",
        "archetype": "helpful",
        "clientRead": "They feel normal, and curious instead of ashamed.",
        "ethicsNote": "Curiosity about patterns helps clients change them."
      },
      {
        "id": "bring-a-briefcase",
        "text": "“Bring a briefcase to dinner. Fifteen-year-olds don’t have briefcases. It’s a costume of adulthood.”",
        "badness": 1,
        "reaction": "Client: I would be a fifteen-year-old with a briefcase.",
        "feedback": "A gimmick does not change the underlying family dynamic.",
        "archetype": "fakeDeep",
        "clientRead": "They feel the advice is cute but useless.",
        "ethicsNote": "Symbolic gestures rarely shift long-standing patterns on their own."
      },
      {
        "id": "you-are-immature",
        "text": "“Sounds like the fifteen-year-old is the real you and work is the act. Maybe you just haven’t grown up yet.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: That is a deeply upsetting theory.",
        "feedback": "This turns a common pattern into a judgment about the client’s maturity.",
        "archetype": "dismissive",
        "clientRead": "They hear that they are fundamentally immature.",
        "ethicsNote": "Labeling a client as immature is shaming, not insightful."
      },
      {
        "id": "dinner-observation",
        "text": "“I’ll come to your next family dinner and take notes. Seat me between you and whoever triggers you most.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: You want to come to dinner? With my family?",
        "feedback": "Attending a client’s family dinner is a clear dual-relationship violation.",
        "archetype": "boundaryCross",
        "clientRead": "They feel alarmed at the idea of their therapist at their table.",
        "ethicsNote": "Therapists avoid dual relationships, like attending clients’ family events.",
        "callback": "You are not coming to family dinner. I needed to say that once more, out loud.",
        "recall": "I had dinner with my family this week, and you weren’t there. That was the best part."
      }
    ],
    "id": "home-regression",
    "topic": "family"
  },
  {
    "client": "I hint at what I need instead of saying it. Then when people don’t guess, I feel hurt, and I can’t even explain why without sounding unfair.",
    "choices": [
      {
        "id": "practice-direct",
        "text": "“Hinting can feel safer than asking. Want to try turning one recent hint into a direct, kind sentence, just here?”",
        "badness": 0,
        "reaction": "Client: Okay. ‘I’d really like you to ask how my week went.’ That was terrifying.",
        "feedback": "Practicing a direct ask in a safe space builds the skill gently.",
        "archetype": "helpful",
        "clientRead": "They feel brave and supported for trying.",
        "ethicsNote": "Rehearsing new behaviors in session helps clients use them in life."
      },
      {
        "id": "hint-harder",
        "text": "“Hint harder. Leave sticky notes. Subtle sticky notes. Like a scavenger hunt, but for empathy.”",
        "badness": 1,
        "reaction": "Client: That is a more elaborate version of my problem.",
        "feedback": "This escalates the indirect pattern instead of changing it.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice makes the problem bigger.",
        "ethicsNote": "Advice should build healthier communication, not more elaborate indirectness."
      },
      {
        "id": "you-are-unfair",
        "text": "“You’re right, it is unfair. Nobody can read your mind. Expecting them to is honestly kind of manipulative.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: Manipulative? I was trying to not be a burden.",
        "feedback": "Labeling an anxious habit as manipulative adds shame and misreads the motive.",
        "archetype": "dismissive",
        "clientRead": "They feel accused of something they didn’t intend.",
        "ethicsNote": "Understanding the fear behind a habit is more helpful than labeling it."
      },
      {
        "id": "therapist-translator",
        "text": "“From now on, I’ll be your translator. Give me everyone’s numbers, and I’ll text them what you actually meant, with footnotes.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I don’t want you texting the people in my life.",
        "feedback": "Contacting people in the client’s life is a serious boundary violation.",
        "archetype": "boundaryCross",
        "clientRead": "They feel the therapist wants to take over their relationships.",
        "ethicsNote": "Therapists help clients communicate; they do not communicate on clients’ behalf.",
        "callback": "I’m going to say this one directly, without a translator. Here goes.",
        "followUp": {
          "id": "hinting-translator-pushback",
          "client": "You can’t text people for me. Then I’d never learn to say it myself, and everyone would think I hired a hint interpreter.",
          "choices": [
            {
              "id": "repair-your-voice",
              "text": "“Exactly right. Your voice, your words. Want to practice one ask together?”",
              "badness": 0,
              "reaction": "Client: Yes. Let me try one more.",
              "feedback": "This affirms the client’s insight and returns to building their own skill.",
              "archetype": "helpful",
              "clientRead": "They feel capable and encouraged.",
              "ethicsNote": "Supporting client independence is a core therapeutic goal."
            },
            {
              "id": "translator-business",
              "text": "“Too late. I’ve already started a translator service. You’re my first client, and the group chat is my second.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: The group chat knows about this?",
              "feedback": "Telling others about the client’s communication struggles is a confidentiality breach.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel their private struggle has become public.",
              "ethicsNote": "Nothing a client shares should reach people in their life through the therapist."
            },
            {
              "id": "learn-later",
              "text": "“Learning to say it yourself is a long-term goal. For now, just let me run your social life.”",
              "badness": 2,
              "violation": "coercion",
              "reaction": "Client: I don’t want you to run my social life.",
              "feedback": "This overrides the client’s stated wish for independence.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel their autonomy is being dismissed.",
              "ethicsNote": "Clients choose the pace and direction of their own growth."
            },
            {
              "id": "hint-interpreter-merch",
              "text": "“‘Hint interpreter’ is a great brand name, though. We could sell mugs.”",
              "badness": 1,
              "reaction": "Client: Please focus.",
              "feedback": "This turns the client’s concern into a joke about merchandise.",
              "archetype": "influencerBrain",
              "clientRead": "They feel the moment was hijacked.",
              "ethicsNote": "Humor that derails a client’s insight costs them the moment."
            }
          ]
        },
        "recall": "I asked for something directly this week. Out loud. Nobody needed a translator. I almost passed out."
      }
    ],
    "id": "hinting-needs",
    "topic": "relationships"
  },
  {
    "client": "I’m meeting the friends of someone I’m seeing this weekend, and I’m convinced they’re going to hold a secret vote and kick me out.",
    "choices": [
      {
        "id": "friends-curious",
        "text": "“That fear of being evaluated is so human. What would help you feel more like yourself walking in, rather than like you’re auditioning?”",
        "badness": 0,
        "reaction": "Client: Maybe having one question ready to ask them. Then it’s less about me.",
        "feedback": "Shifting from performance to connection gives the client a practical, calming strategy.",
        "archetype": "helpful",
        "clientRead": "They feel more like a guest than a contestant.",
        "ethicsNote": "Helping clients find their own coping strategies supports confidence."
      },
      {
        "id": "friends-pitch-deck",
        "text": "“Prepare a short pitch deck about yourself. Slide four should be ‘Why I’m a strong culture fit.’”",
        "badness": 1,
        "reaction": "Client: That would guarantee the secret vote.",
        "feedback": "This turns social anxiety into a performance task.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel the pressure to perform just went up.",
        "ethicsNote": "Framing relationships as evaluations increases anxiety."
      },
      {
        "id": "friends-probably-will",
        "text": "“Friend groups can be brutal. Honestly, if they vote you out, it’s probably for a reason.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: That was the opposite of reassuring.",
        "feedback": "This confirms the client’s fear and implies they deserve rejection.",
        "archetype": "dismissive",
        "clientRead": "They hear that rejection would be their fault.",
        "ethicsNote": "Agreeing with a client’s catastrophic fear deepens anxiety."
      },
      {
        "id": "friends-dossier",
        "text": "“Send me their names and I’ll research each one tonight. You’ll walk in with a dossier: hobbies, exes, weak points.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I don’t want to investigate them. I want them to like me.",
        "feedback": "Researching people to gain an advantage is invasive and likely to backfire.",
        "archetype": "boundaryCross",
        "clientRead": "They feel pushed toward something creepy.",
        "ethicsNote": "Encouraging covert research on others is harmful advice that damages trust.",
        "callback": "I’m not researching anyone’s friends. I’m just going to be nervous like a normal person.",
        "recall": "I met the friends. I did not bring a dossier. One of them liked my shoes. I’m counting it."
      }
    ],
    "id": "meeting-their-friends",
    "topic": "relationships"
  },
  {
    "client": "I keep a mental scoreboard of who texts first, who plans things, who apologizes. I know keeping score is bad, but I can’t turn it off.",
    "choices": [
      {
        "id": "scoreboard-need",
        "text": "“Scorekeeping often protects a fear of giving more than we get. What do you think the scoreboard is trying to keep you safe from?”",
        "badness": 0,
        "reaction": "Client: Being the one who cares more, I guess.",
        "feedback": "Exploring the need behind the habit helps the client understand it without shame.",
        "archetype": "helpful",
        "clientRead": "They feel the habit makes sense and can be looked at.",
        "ethicsNote": "Understanding the function of a behavior helps clients change it."
      },
      {
        "id": "scoreboard-spreadsheet",
        "text": "“Don’t fight it, formalize it. A shared spreadsheet with weekly standings. Healthy competition.”",
        "badness": 1,
        "reaction": "Client: That would end every relationship I have.",
        "feedback": "Formalizing the habit makes it more rigid and public.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel the advice amplifies the thing they want to stop.",
        "ethicsNote": "Advice should help clients loosen unhelpful patterns, not institutionalize them."
      },
      {
        "id": "scoreboard-petty",
        "text": "“Keeping score is pretty petty. Secure people don’t do that.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: So I’m petty and insecure. Great.",
        "feedback": "This turns a common habit into a character verdict.",
        "archetype": "dismissive",
        "clientRead": "They feel labeled and ashamed.",
        "ethicsNote": "Character labels discourage clients from exploring their patterns."
      },
      {
        "id": "scoreboard-referee",
        "text": "“I’ll be the referee. Forward me your messages every week and I’ll announce who’s winning to everyone involved.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: You want to announce my scoreboard to people?",
        "feedback": "Reviewing private messages and announcing results to others breaches confidentiality.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel their private insecurity would be broadcast.",
        "ethicsNote": "A client’s private struggles must never be shared with the people in their life.",
        "callback": "No referee for this one, please. I just want to talk.",
        "recall": "I caught myself scorekeeping this week and just… stopped. No referee. No announcements."
      }
    ],
    "id": "scorekeeping",
    "topic": "relationships"
  },
  {
    "client": "I sent a message in the group chat and nobody replied for three hours. I’ve reread it forty times looking for the part that made everyone hate me.",
    "choices": [
      {
        "id": "silence-stories",
        "text": "“Three hours of silence leaves a lot of room for stories. What are some other reasons nobody replied yet?”",
        "badness": 0,
        "reaction": "Client: …They’re at work. Or it was a statement, not a question. Okay.",
        "feedback": "Generating alternative explanations loosens the anxious interpretation.",
        "archetype": "helpful",
        "clientRead": "They feel calmer seeing more than one possible story.",
        "ethicsNote": "Considering alternative explanations helps clients challenge anxious assumptions."
      },
      {
        "id": "unsend-everything",
        "text": "“Unsend it, leave the chat, rejoin under a new name, and start a fresh reputation. Witness protection, but for vibes.”",
        "badness": 1,
        "reaction": "Client: That is so much more suspicious.",
        "feedback": "This escalates a small worry into a dramatic and unhelpful plan.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice would make things weirder.",
        "ethicsNote": "Escalation rarely calms social anxiety."
      },
      {
        "id": "they-do-hate-you",
        "text": "“Forty rereads? If you can find the problem, they probably can too. Silence is feedback.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: So they do hate me.",
        "feedback": "This confirms the catastrophic interpretation.",
        "archetype": "dismissive",
        "clientRead": "They hear their fear confirmed by an expert.",
        "ethicsNote": "Validating catastrophic thinking deepens anxiety."
      },
      {
        "id": "therapist-joins-chat",
        "text": "“Add me to the group chat. I’ll ask everyone directly why they’re ignoring you, and I’ll mention I’m your therapist so they take it seriously.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: You want to join my group chat and announce you’re my therapist?",
        "feedback": "Joining the client’s chat and disclosing the therapy relationship breaches confidentiality.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel the worst possible version of the situation is being proposed.",
        "ethicsNote": "Revealing someone is a client, to anyone, requires their explicit consent.",
        "callback": "You’re still not joining the group chat. I checked my phone twice to make sure.",
        "recall": "The group chat replied, by the way. Someone sent a thumbs-up. Nobody needed their therapist to join."
      }
    ],
    "id": "group-chat-silence",
    "topic": "social-media"
  },
  {
    "client": "I got into an argument with a stranger online yesterday, and I’ve been writing replies in my head ever since. In the shower. In meetings. At 3 a.m.",
    "choices": [
      {
        "id": "argument-unfinished",
        "text": "“It sounds like it feels unfinished. What would it mean to you to win this, and what would it mean to just let it go?”",
        "badness": 0,
        "reaction": "Client: Winning would feel like proof I’m right. Letting go feels like admitting I’m wrong.",
        "feedback": "Exploring what the argument means helps the client understand why it’s sticky.",
        "archetype": "helpful",
        "clientRead": "They feel the loop is understandable and might be loosened.",
        "ethicsNote": "Exploring meaning helps clients disengage from rumination."
      },
      {
        "id": "argument-essay",
        "text": "“Write a twelve-part reply with citations. Strangers respect footnotes.”",
        "badness": 1,
        "reaction": "Client: They will not respect the footnotes.",
        "feedback": "This feeds the rumination instead of easing it.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel encouraged to go deeper into the loop.",
        "ethicsNote": "Advice should reduce rumination, not provide more fuel."
      },
      {
        "id": "argument-you-lost",
        "text": "“If you’re still thinking about it, you obviously lost. Winners don’t shower-argue.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: Now I’m losing an argument to my therapist too.",
        "feedback": "This mocks the client’s distress and frames it as failure.",
        "archetype": "dismissive",
        "clientRead": "They feel mocked.",
        "ethicsNote": "Mocking a client’s rumination adds shame without relief."
      },
      {
        "id": "argument-find-them",
        "text": "“Send me their username. I’ll find out where they work, and we can settle this in person.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I don’t want to find a stranger’s workplace. That’s scary.",
        "feedback": "Suggesting tracking down a stranger is dangerous and escalates conflict.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel alarmed by where this is going.",
        "ethicsNote": "Encouraging people to track down strangers can lead to real harm.",
        "callback": "I’m not finding anyone’s workplace. I want that on the record before we keep going.",
        "followUp": {
          "id": "online-argument-pushback",
          "client": "Wait, no. I don’t want to find anyone. I just want my brain to stop arguing in the shower.",
          "choices": [
            {
              "id": "repair-shower-peace",
              "text": "“That’s fair, and that suggestion was way out of line. Let’s focus on the loop itself. When a reply starts forming, what happens if you just notice it and let it pass?”",
              "badness": 0,
              "reaction": "Client: I could try. It’s like changing the channel, kind of.",
              "feedback": "This owns the mistake and returns to a practical skill for rumination.",
              "archetype": "helpful",
              "clientRead": "They feel heard and have something to try.",
              "ethicsNote": "Owning mistakes and refocusing on client goals repairs trust."
            },
            {
              "id": "already-found-them",
              "text": "“Too late. I found their workplace. It’s a bakery. I left a one-star review that says ‘argues online.’”",
              "badness": 3,
              "violation": "harmfulAdvice",
              "reaction": "Client: You did what to a bakery?",
              "feedback": "Targeting a stranger in real life escalates an online disagreement into harm.",
              "archetype": "chaosAdvice",
              "clientRead": "They feel horrified and responsible.",
              "ethicsNote": "Escalating conflict into a stranger’s offline life causes real harm."
            },
            {
              "id": "brain-weak",
              "text": "“If your brain can’t stop arguing, maybe it’s just not a very disciplined brain.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: My brain is doing its best.",
              "feedback": "This turns a common struggle into an insult.",
              "archetype": "dismissive",
              "clientRead": "They feel criticized for something they can’t easily control.",
              "ethicsNote": "Shaming clients for rumination makes it worse."
            },
            {
              "id": "shower-podcast",
              "text": "“Record the shower arguments. Release them as a podcast. Turn the pain into content.”",
              "badness": 1,
              "reaction": "Client: Nobody needs my shower podcast.",
              "feedback": "This turns the client’s distress into a content idea.",
              "archetype": "influencerBrain",
              "clientRead": "They feel unheard.",
              "ethicsNote": "Redirecting distress into content-making avoids the actual problem."
            }
          ]
        },
        "recall": "I stopped writing replies to that stranger. I did not find out where they work. That was never an option."
      }
    ],
    "id": "online-argument",
    "topic": "social-media"
  },
  {
    "client": "Every time I delete the apps, I reinstall them within a day. Then I feel like I failed some kind of character test.",
    "choices": [
      {
        "id": "detox-experiment",
        "text": "“All-or-nothing breaks are really hard to keep. What if the goal was smaller, like no apps for the first hour after waking up?”",
        "badness": 0,
        "reaction": "Client: One hour sounds doable. Deleting everything never did.",
        "feedback": "Replacing an all-or-nothing rule with a small, specific goal makes change sustainable.",
        "archetype": "helpful",
        "clientRead": "They feel less like a failure and more like someone with a better plan.",
        "ethicsNote": "Small, achievable goals support lasting behavior change."
      },
      {
        "id": "phone-in-cement",
        "text": "“Put your phone in a block of cement. You’ll be free for about six years.”",
        "badness": 1,
        "reaction": "Client: I need my phone for literally everything else.",
        "feedback": "An extreme gesture ignores practical life.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice is a joke, not a plan.",
        "ethicsNote": "Advice must fit the client’s real life to be helpful."
      },
      {
        "id": "detox-character-flaw",
        "text": "“Honestly, if you can’t last a day without apps, that does say something about your willpower.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: That’s exactly the voice that makes me reinstall them.",
        "feedback": "This confirms the client’s shame and makes another relapse more likely.",
        "archetype": "dismissive",
        "clientRead": "They hear they really are failing the test.",
        "ethicsNote": "Shame-based framing undermines motivation to change."
      },
      {
        "id": "detox-monitor",
        "text": "“Install a tracker that sends me your screen time every night. Each reinstall costs you a written apology, which I’ll post anonymously.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: That’s surveillance with homework.",
        "feedback": "Monitoring and punishing the client is coercive and shaming.",
        "archetype": "coerciveFixer",
        "clientRead": "They feel controlled and humiliated.",
        "ethicsNote": "Coercive monitoring undermines autonomy and trust.",
        "callback": "No trackers. No apology letters. I’m saying it now so it doesn’t come up again.",
        "recall": "I kept the apps off for the first hour three days this week. No tracker. No apology letters."
      }
    ],
    "id": "app-detox-relapse",
    "topic": "social-media"
  },
  {
    "client": "My performance review was mostly great. But there was one critical sentence, and it’s the only part I can remember. I’ve basically memorized it.",
    "choices": [
      {
        "id": "review-whole-picture",
        "text": "“Our brains grab the one critical line and hold on. Could we write down the positive parts too, word for word, and look at them side by side?”",
        "badness": 0,
        "reaction": "Client: I genuinely can’t remember the positive parts. That’s telling.",
        "feedback": "Restoring the full picture counters the negativity bias.",
        "archetype": "helpful",
        "clientRead": "They feel the imbalance is noticeable and fixable.",
        "ethicsNote": "Helping clients see balanced evidence supports healthier self-evaluation."
      },
      {
        "id": "review-frame-it",
        "text": "“Frame the critical sentence. Hang it over your desk. Exposure therapy, interior design edition.”",
        "badness": 1,
        "reaction": "Client: That is the worst possible decor.",
        "feedback": "This intensifies the focus on the critical part.",
        "archetype": "fakeDeep",
        "clientRead": "They feel the advice makes the fixation worse.",
        "ethicsNote": "Increasing focus on criticism does not reduce rumination."
      },
      {
        "id": "review-they-meant-it",
        "text": "“The positive stuff is just padding. That critical sentence is what your manager actually thinks of you.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: That’s what I was afraid of.",
        "feedback": "This confirms the most painful interpretation.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel the good feedback was fake.",
        "ethicsNote": "Reinforcing negative bias strengthens it."
      },
      {
        "id": "review-confront-manager",
        "text": "“Let’s schedule a meeting with your manager. I’ll come along and challenge every word of that sentence.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: You want to come to my workplace?",
        "feedback": "Inserting yourself into the client’s workplace is a boundary violation.",
        "archetype": "boundaryCross",
        "clientRead": "They feel the therapist is overstepping into their job.",
        "ethicsNote": "Therapists support clients at work from the outside; they do not attend workplace meetings.",
        "callback": "You’re not coming to my workplace, right? Okay. Moving on.",
        "recall": "I wrote down the good parts of my review. There were nine. You did not come to my workplace. Both good things."
      }
    ],
    "id": "review-one-sentence",
    "topic": "work"
  },
  {
    "client": "I keep saying yes to extra projects because I want to be seen as helpful. Now I’m drowning, and I’m scared that saying no will undo everything.",
    "choices": [
      {
        "id": "practice-not-now",
        "text": "“Being helpful clearly matters to you. Could we practice a version of ‘not right now’ that still sounds like you?”",
        "badness": 0,
        "reaction": "Client: ‘I want to do this well, so I can’t take it on this month.’ Huh. That sounds helpful.",
        "feedback": "This respects the client’s values while building a practical way to decline.",
        "archetype": "helpful",
        "clientRead": "They feel they can say no without losing who they are.",
        "ethicsNote": "Supporting clients in boundary-setting aligned with their values is effective and respectful."
      },
      {
        "id": "yes-to-more",
        "text": "“The trick is to say yes to even more. Eventually you hit escape velocity and become a project.”",
        "badness": 1,
        "reaction": "Client: I don’t want to become a project.",
        "feedback": "This is nonsense that encourages more overload.",
        "archetype": "fakeDeep",
        "clientRead": "They feel unheard.",
        "ethicsNote": "Encouraging overwork in a burned-out client is unhelpful."
      },
      {
        "id": "no-is-weak",
        "text": "“If you start saying no now, everyone will realize you were never that capable. Better keep going.”",
        "badness": 2,
        "violation": "harmfulAdvice",
        "reaction": "Client: That’s literally my nightmare.",
        "feedback": "This confirms the client’s fear and pushes them deeper into burnout.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel trapped.",
        "ethicsNote": "Advice that increases burnout risk is harmful."
      },
      {
        "id": "therapist-email-boss",
        "text": "“I’ll email your boss today and tell them you’re overwhelmed and seeing a therapist. They’ll back off, probably out of fear.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Please do not tell my boss I’m in therapy.",
        "feedback": "Disclosing the client’s therapy to their employer is a serious confidentiality breach.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel their privacy at work is under threat.",
        "ethicsNote": "Clients decide whether their employer learns anything about their therapy.",
        "callback": "Please don’t email my boss about this one either. My boss can’t know I have feelings.",
        "recall": "I said ‘not this month’ to one project. My boss was fine. You did not email anyone. Thank you."
      }
    ],
    "id": "yes-to-everything-at-work",
    "topic": "work"
  },
  {
    "client": "A coworker presented my idea in a meeting like it was theirs. I froze and said nothing, and now I’m furious, mostly at myself.",
    "choices": [
      {
        "id": "freeze-makes-sense",
        "text": "“Freezing in that moment makes sense. It caught you off guard. Would it help to plan what you might say next time, or how to follow up now?”",
        "badness": 0,
        "reaction": "Client: A follow-up email. That I could do.",
        "feedback": "Normalizing the freeze and offering options helps the client move from self-blame to action.",
        "archetype": "helpful",
        "clientRead": "They feel less angry at themselves and more prepared.",
        "ethicsNote": "Reducing self-blame and supporting the client’s own plan is ethical and effective."
      },
      {
        "id": "idea-plaques",
        "text": "“Engrave every idea onto a small brass plaque with your name. Bring them to meetings. Very legal, very shiny.”",
        "badness": 1,
        "reaction": "Client: My coworkers would think I’ve lost it.",
        "feedback": "This gimmick doesn’t address the conflict or the client’s confidence.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice is silly, not useful.",
        "ethicsNote": "Practical support beats symbolic gestures."
      },
      {
        "id": "you-let-it-happen",
        "text": "“Well, you did let it happen. If you won’t speak up for your ideas, can you really blame them?”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: That’s what I’ve been telling myself all week.",
        "feedback": "This blames the client and reinforces their self-criticism.",
        "archetype": "dismissive",
        "clientRead": "They feel blamed for being wronged.",
        "ethicsNote": "Blaming the person who was wronged adds shame without helping."
      },
      {
        "id": "expose-coworker",
        "text": "“Post about it on your professional profile. Name them, tag the company, and call it a ‘case study in theft.’”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That could get me fired.",
        "feedback": "Publicly shaming a coworker risks the client’s job and escalates the conflict.",
        "archetype": "influencerBrain",
        "clientRead": "They feel encouraged toward a reckless move.",
        "ethicsNote": "Advice that puts the client’s livelihood at risk is harmful.",
        "callback": "I’m not posting a case study about anyone. I just want to be clear about that.",
        "followUp": {
          "id": "idea-stolen-pushback",
          "client": "I can’t post that. I still work with this person. I just want to stop feeling like a doormat.",
          "choices": [
            {
              "id": "repair-not-a-doormat",
              "text": "“You’re right, posting would put you at risk. Freezing once doesn’t make you a doormat. What would standing up for yourself look like at a scale that feels safe?”",
              "badness": 0,
              "reaction": "Client: Maybe saying, ‘I’m glad you liked my idea’ in the next meeting. Calmly.",
              "feedback": "This validates the client’s concern and helps them choose a safe, assertive step.",
              "archetype": "helpful",
              "clientRead": "They feel capable instead of defeated.",
              "ethicsNote": "Helping clients find assertiveness that fits their situation supports wellbeing."
            },
            {
              "id": "post-it-anyway",
              "text": "“I already drafted the post for you. I added a photo of their car for context.”",
              "badness": 3,
              "violation": "harmfulAdvice",
              "reaction": "Client: Why do you have a photo of their car?",
              "feedback": "Escalating to public shaming, with personal details, could seriously harm everyone involved.",
              "archetype": "chaosAdvice",
              "clientRead": "They feel alarmed and complicit.",
              "ethicsNote": "Encouraging public shaming and sharing personal details causes harm."
            },
            {
              "id": "doormat-confirmed",
              "text": "“To be honest, freezing does sound a little doormat-ish. Some people are just like that.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: Thanks. Really.",
              "feedback": "This confirms the client’s harshest self-label.",
              "archetype": "dismissive",
              "clientRead": "They feel stuck with a label.",
              "ethicsNote": "Fixed labels discourage clients from growing."
            },
            {
              "id": "assertiveness-course",
              "text": "“Have you tried a weekend assertiveness bootcamp? You yell at a mirror for ten hours.”",
              "badness": 1,
              "reaction": "Client: I would freeze at the mirror.",
              "feedback": "This is a gimmick that ignores the client’s actual situation.",
              "archetype": "corporateGoblin",
              "clientRead": "They feel the advice doesn’t fit them.",
              "ethicsNote": "Generic programs are less helpful than tailored, achievable steps."
            }
          ]
        },
        "recall": "I sent a follow-up email about my idea. My manager replied ‘great point.’ No case study required."
      }
    ],
    "id": "idea-stolen",
    "topic": "work"
  },
  {
    "client": "I get really excited about new hobbies, buy all the gear, and quit after two weeks. My closet is a museum of abandoned personalities.",
    "choices": [
      {
        "id": "hobby-what-hooks",
        "text": "“I love ‘museum of abandoned personalities.’ What usually happens around week two, when the excitement fades?”",
        "badness": 0,
        "reaction": "Client: It stops being new and starts being practice. That’s where I bail.",
        "feedback": "Getting curious about the drop-off point helps the client understand the pattern.",
        "archetype": "helpful",
        "clientRead": "They feel understood and a little amused at themselves.",
        "ethicsNote": "Exploring the moment a pattern breaks down helps clients address it."
      },
      {
        "id": "hobby-more-gear",
        "text": "“Maybe you just haven’t found the right gear yet. Premium gear builds premium commitment.”",
        "badness": 1,
        "reaction": "Client: My bank account would like a word.",
        "feedback": "This encourages more spending instead of addressing the pattern.",
        "archetype": "influencerBrain",
        "clientRead": "They feel pushed toward consumerism.",
        "ethicsNote": "Encouraging spending as a solution can harm clients financially."
      },
      {
        "id": "hobby-flaky",
        "text": "“This sounds like a commitment problem. If you can’t stick with a hobby, it’s probably showing up in other parts of your life too.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I came in about pottery and now I’m questioning everything.",
        "feedback": "This leaps from a hobby pattern to a sweeping judgment of character.",
        "archetype": "dismissive",
        "clientRead": "They feel accused of a deeper flaw.",
        "ethicsNote": "Overgeneralizing from a small pattern is shaming, not insightful."
      },
      {
        "id": "hobby-contract",
        "text": "“Sign this contract: you’ll stick with your next hobby for a year, or you owe me all the gear. I could really use a kayak.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Why do you want my kayak?",
        "feedback": "Making the client owe the therapist possessions is a boundary violation.",
        "archetype": "boundaryCross",
        "clientRead": "They feel the therapist wants something from them.",
        "ethicsNote": "Therapists must not benefit materially from clients outside agreed fees.",
        "callback": "You can’t have my kayak. I want to start with that.",
        "recall": "I picked up one of my old hobbies again this week. I’m keeping the kayak, though. It’s mine."
      }
    ],
    "id": "hobby-hopping",
    "topic": "motivation"
  },
  {
    "client": "I’ve tried every productivity morning routine on the internet. Cold showers, journaling, 5 a.m. alarms. I still hit snooze six times.",
    "choices": [
      {
        "id": "routine-for-you",
        "text": "“Those routines were designed for other people’s lives. What’s one tiny thing that would make your actual mornings feel a bit better?”",
        "badness": 0,
        "reaction": "Client: Honestly? Putting the coffee on a timer.",
        "feedback": "Shifting from imported routines to the client’s own needs makes change realistic.",
        "archetype": "helpful",
        "clientRead": "They feel permission to do something small and personal.",
        "ethicsNote": "Client-centered goals are more sustainable than external ideals."
      },
      {
        "id": "routine-4am",
        "text": "“The problem is 5 a.m. is too late. Try 3:30. Ultra-productive people wake up yesterday.”",
        "badness": 1,
        "reaction": "Client: I would simply never sleep.",
        "feedback": "This escalates an unhelpful idea into absurdity.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel the advice is ridiculous.",
        "ethicsNote": "Extreme sleep restriction is not a productivity tool."
      },
      {
        "id": "routine-lazy",
        "text": "“Six snoozes is a lot. At some point you have to accept you might just be lazy.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I was trying so hard not to believe that.",
        "feedback": "This labels the client instead of exploring what their mornings need.",
        "archetype": "dismissive",
        "clientRead": "They feel confirmed in their worst self-belief.",
        "ethicsNote": "Labeling clients as lazy is shaming and inaccurate."
      },
      {
        "id": "routine-wakeup-call",
        "text": "“I’ll call you every morning at five. If you don’t answer by the second ring, I’ll call your landlord and ask them to knock until you’re up.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: Please do not involve my landlord in my alarm clock.",
        "feedback": "Imposing monitoring and threatening to involve other people is coercive and invasive.",
        "archetype": "coerciveFixer",
        "clientRead": "They feel controlled and alarmed.",
        "ethicsNote": "Coercive monitoring has no place in therapy.",
        "callback": "Nobody is calling my landlord. Okay. Now I can think.",
        "recall": "I put the coffee on a timer. I snoozed only four times. Nobody called my landlord."
      }
    ],
    "id": "snooze-routine",
    "topic": "motivation"
  },
  {
    "client": "I want to change careers, but the goal is so big that I just research it forever. I have 46 tabs open. I have not taken a single step.",
    "choices": [
      {
        "id": "research-one-step",
        "text": "“Research can feel like progress while protecting us from the scary part. What’s one step that’s small enough to do this week?”",
        "badness": 0,
        "reaction": "Client: I could message one person who already does the job.",
        "feedback": "Naming research as a safe avoidance, then finding one concrete step, helps the client move.",
        "archetype": "helpful",
        "clientRead": "They feel seen and have a manageable next move.",
        "ethicsNote": "Breaking large goals into small actions supports change."
      },
      {
        "id": "research-more-tabs",
        "text": "“Forty-six tabs is rookie numbers. Real change starts at a hundred.”",
        "badness": 1,
        "reaction": "Client: My laptop is already making a noise.",
        "feedback": "This encourages more of the avoidance.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel encouraged to keep stalling.",
        "ethicsNote": "Encouraging avoidance strategies keeps clients stuck."
      },
      {
        "id": "research-never-change",
        "text": "“Some people talk about changing careers forever and never do. You might be one of those people.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: Ouch. That is my biggest fear.",
        "feedback": "This predicts failure and adds shame.",
        "archetype": "dismissive",
        "clientRead": "They feel doomed.",
        "ethicsNote": "Predicting a client’s failure undermines their motivation."
      },
      {
        "id": "research-quit-today",
        "text": "“Quit your job today. Burn the boats. Fear is just excitement without a severance package.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I need the severance package. Or at least rent.",
        "feedback": "Pushing the client into a high-risk move without a plan is harmful.",
        "archetype": "coerciveFixer",
        "clientRead": "They feel pushed toward something reckless.",
        "ethicsNote": "Advice that endangers financial stability is harmful.",
        "callback": "I am not quitting my job today, despite the boats. Just so you know where I stand.",
        "followUp": {
          "id": "career-quit-pushback",
          "client": "I can’t quit today. I have rent. Can we find something between ‘46 tabs’ and ‘burn the boats’?",
          "choices": [
            {
              "id": "repair-middle-path",
              "text": "“Absolutely. That was reckless of me. What’s one small experiment, like a short course or an informational chat, that would teach you whether this career fits?”",
              "badness": 0,
              "reaction": "Client: An informational chat. I can schedule that this week.",
              "feedback": "This owns the bad advice and offers a realistic middle path.",
              "archetype": "helpful",
              "clientRead": "They feel there is a safe way forward.",
              "ethicsNote": "Small experiments reduce risk while building momentum."
            },
            {
              "id": "quit-letter-ready",
              "text": "“I already wrote your resignation letter. I just need your signature and your boss’s email.”",
              "badness": 3,
              "violation": "coercion",
              "reaction": "Client: I said I can’t quit.",
              "feedback": "Pushing the client toward a decision they just rejected is coercive.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel pressured and overruled.",
              "ethicsNote": "Major life decisions belong to the client."
            },
            {
              "id": "rent-excuse",
              "text": "“Rent is just an excuse. People who really want it find a way.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: Rent is not an excuse. Rent is rent.",
              "feedback": "This dismisses a real constraint as a lack of commitment.",
              "archetype": "dismissive",
              "clientRead": "They feel judged for being practical.",
              "ethicsNote": "Real constraints deserve respect, not dismissal."
            },
            {
              "id": "tabs-vision-board",
              "text": "“Turn your 46 tabs into a vision board. Very aesthetic. Then do nothing, but beautifully.”",
              "badness": 1,
              "reaction": "Client: That is just my current plan with more glue.",
              "feedback": "This makes the avoidance prettier without changing it.",
              "archetype": "influencerBrain",
              "clientRead": "They feel the advice is decorative, not useful.",
              "ethicsNote": "Help should move clients toward action."
            }
          ]
        },
        "recall": "I didn’t quit my job, despite your boat-burning advice. I did close twelve tabs and message one person."
      }
    ],
    "id": "career-change-research",
    "topic": "motivation"
  },
  {
    "client": "I moved to a new city a few months ago. Most nights I eat dinner watching videos of other people hanging out with their friends.",
    "choices": [
      {
        "id": "new-city-small-step",
        "text": "“Moving somewhere new is genuinely lonely, and those videos make sense as company. What’s one place where you could see the same faces every week?”",
        "badness": 0,
        "reaction": "Client: There’s a climbing gym near me. Maybe a weekly class?",
        "feedback": "Validating the loneliness and pointing toward repeated, low-pressure contact supports real connection.",
        "archetype": "helpful",
        "clientRead": "They feel understood and see a realistic path.",
        "ethicsNote": "Repeated contact in shared spaces is a gentle, practical route to friendship."
      },
      {
        "id": "new-city-vlog",
        "text": "“Flip it. Start your own vlog about being lonely. Your viewers will be your friends. Parasocially.”",
        "badness": 1,
        "reaction": "Client: I want friends who can see me back.",
        "feedback": "This swaps connection for an audience.",
        "archetype": "influencerBrain",
        "clientRead": "They feel the loneliness was turned into a content plan.",
        "ethicsNote": "An audience is not a substitute for reciprocal relationships."
      },
      {
        "id": "new-city-your-fault",
        "text": "“A few months is plenty of time. If you haven’t made friends yet, you might want to look at what you’re doing wrong.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I was already looking at that. Every night.",
        "feedback": "This blames the client for a common and difficult transition.",
        "archetype": "dismissive",
        "clientRead": "They feel their loneliness is a personal failure.",
        "ethicsNote": "Blame increases isolation rather than reducing it."
      },
      {
        "id": "new-city-be-my-friend",
        "text": "“You know what? I’m free most evenings. Let’s grab dinner this week. I’ll be your first friend in the city.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Is that… allowed?",
        "feedback": "Offering a social relationship to a client is a clear dual-relationship violation.",
        "archetype": "boundaryCross",
        "clientRead": "They feel confused about what the therapy relationship is.",
        "ethicsNote": "Therapists do not become friends with clients, however lonely they are.",
        "callback": "Just so we’re clear, we’re not getting dinner. I like you better in that chair.",
        "followUp": {
          "id": "new-city-dinner-pushback",
          "client": "Wait, are you asking me to dinner? I don’t think that’s how this works. I think I need actual friends, not my therapist.",
          "choices": [
            {
              "id": "repair-boundary",
              "text": "“You’re right, and I shouldn’t have offered. Keeping this a therapy space matters. Let’s talk about that climbing class and what would make it easier to go.”",
              "badness": 0,
              "reaction": "Client: Okay. Mostly I’m scared of being the new person.",
              "feedback": "This acknowledges the boundary error and refocuses on the client’s goal.",
              "archetype": "helpful",
              "clientRead": "They feel the relationship is safe and clear again.",
              "ethicsNote": "Restoring boundaries after a misstep protects the therapeutic relationship."
            },
            {
              "id": "dinner-reservation",
              "text": "“Too late, I booked a table. I also invited my book club. You’ll fit right in.”",
              "badness": 3,
              "violation": "boundaries",
              "reaction": "Client: Your book club?",
              "feedback": "Pulling the client into your personal social life deepens the boundary violation.",
              "archetype": "boundaryCross",
              "clientRead": "They feel the line between therapist and friend is gone.",
              "ethicsNote": "Dual relationships harm clients even when well-intended."
            },
            {
              "id": "real-friends-hard",
              "text": "“Real friends are hard. Honestly, at your rate, your therapist might be the best you get.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: That’s the loneliest thing anyone has ever said to me.",
              "feedback": "This predicts the client will stay lonely and shames them for it.",
              "archetype": "dismissive",
              "clientRead": "They feel hopeless.",
              "ethicsNote": "Undermining hope worsens loneliness."
            },
            {
              "id": "dinner-energy",
              "text": "“Dinner is just energy shared between plates. We can share energy right now. Close your eyes.”",
              "badness": 1,
              "reaction": "Client: I’m going to keep my eyes open, thanks.",
              "feedback": "This deflects into vague mysticism instead of addressing the boundary.",
              "archetype": "fakeDeep",
              "clientRead": "They feel more confused.",
              "ethicsNote": "Clear communication matters most after a boundary misstep."
            }
          ]
        },
        "recall": "I went to the climbing class. Someone said hi. Twice. I didn’t need to have dinner with my therapist."
      }
    ],
    "id": "new-city-dinners",
    "topic": "loneliness"
  },
  {
    "client": "My closest friend and I have drifted apart. Nobody did anything wrong. We just stopped texting. I miss them, but reaching out now feels weird.",
    "choices": [
      {
        "id": "drift-low-stakes",
        "text": "“Drifting without a fight can be its own kind of grief. What would a low-pressure hello look like, something that doesn’t need a big reply?”",
        "badness": 0,
        "reaction": "Client: Maybe sending a photo of the café we used to go to.",
        "feedback": "Naming the grief and offering a gentle, low-stakes way to reconnect is supportive.",
        "archetype": "helpful",
        "clientRead": "They feel the loss is real and reaching out is possible.",
        "ethicsNote": "Gentle reconnection respects both people’s pace."
      },
      {
        "id": "drift-dramatic",
        "text": "“Show up at their door with a boombox and a speech. Friendship needs a third act.”",
        "badness": 1,
        "reaction": "Client: That would be a lot for someone I haven’t texted in a year.",
        "feedback": "This dramatic gesture adds pressure instead of easing back in.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice is over the top.",
        "ethicsNote": "Big gestures can overwhelm a fragile reconnection."
      },
      {
        "id": "drift-they-moved-on",
        "text": "“If they wanted to be friends, they’d have texted. Sounds like they moved on, and you should too.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I hadn’t thought of it that way. Now I can’t stop.",
        "feedback": "This assumes the worst about the friend and discourages connection.",
        "archetype": "dismissive",
        "clientRead": "They feel rejected by proxy.",
        "ethicsNote": "Assuming rejection can stop clients from repairing relationships they value."
      },
      {
        "id": "drift-therapist-texts",
        "text": "“Give me their number. I’ll text them that you’re really struggling without them and that your therapist is worried.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Please don’t tell them I’m in therapy about this.",
        "feedback": "Contacting the friend and disclosing the client’s therapy breaches confidentiality.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel embarrassed and exposed.",
        "ethicsNote": "Clients decide who knows about their therapy and what is shared.",
        "callback": "You don’t have my friend’s number, and you’re not getting it. Okay.",
        "followUp": {
          "id": "friend-drift-text-pushback",
          "client": "If you text them, they’ll think I’m in crisis. I just miss them. Can I do this myself?",
          "choices": [
            {
              "id": "repair-your-hello",
              "text": "“Yes, you should. I won’t contact them. Want to write it together, in your words?”",
              "badness": 0,
              "reaction": "Client: ‘Walked past our café and thought of you.’ That feels right.",
              "feedback": "This respects the client’s choice and supports them in doing it themselves.",
              "archetype": "helpful",
              "clientRead": "They feel in control and supported.",
              "ethicsNote": "Supporting client autonomy builds confidence and protects privacy."
            },
            {
              "id": "drift-texted-already",
              "text": "“I already texted them. I said you’ve been ‘spiraling.’ They seemed concerned.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: You told them I was spiraling?",
              "feedback": "Contacting the friend and describing the client’s state breaches confidentiality.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel mortified.",
              "ethicsNote": "Disclosing a client’s emotional state to others without consent is a breach."
            },
            {
              "id": "drift-cant-trust-you",
              "text": "“You haven’t managed to text them in a year. I’m not sure you can be trusted with this one.”",
              "badness": 2,
              "violation": "coercion",
              "reaction": "Client: That’s a strange thing to say about a text message.",
              "feedback": "This undermines the client’s agency to justify taking over.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel incapable.",
              "ethicsNote": "Clients have the right to manage their own relationships."
            },
            {
              "id": "drift-friendship-audit",
              "text": "“Before texting, run a friendship ROI analysis. Is this relationship still delivering value?”",
              "badness": 1,
              "reaction": "Client: I just miss my friend.",
              "feedback": "This turns grief into a cost-benefit exercise.",
              "archetype": "corporateGoblin",
              "clientRead": "They feel their feelings were made transactional.",
              "ethicsNote": "Emotional bonds deserve emotional language."
            }
          ]
        },
        "recall": "I sent my friend a photo of our old café. They replied with three exclamation points. My therapist was not involved."
      }
    ],
    "id": "friend-drift",
    "topic": "loneliness"
  },
  {
    "client": "My weekends are so quiet that sometimes on Sunday night I realize I haven’t said a single word out loud since Friday.",
    "choices": [
      {
        "id": "quiet-gentle-plan",
        "text": "“That kind of quiet can feel really heavy. Would it help to plan one small moment of contact each weekend, like a market, a class, or a call?”",
        "badness": 0,
        "reaction": "Client: The farmers market. I could talk to the bread person.",
        "feedback": "Validating the heaviness and planning small, regular contact eases isolation.",
        "archetype": "helpful",
        "clientRead": "They feel the problem is shared and solvable.",
        "ethicsNote": "Small, scheduled connection is a gentle way to reduce isolation."
      },
      {
        "id": "quiet-talk-to-plants",
        "text": "“Talk to your plants. Plants are great listeners, and they never interrupt.”",
        "badness": 1,
        "reaction": "Client: I don’t have plants. That’s somehow worse.",
        "feedback": "This jokes past the client’s loneliness.",
        "archetype": "fakeDeep",
        "clientRead": "They feel brushed off.",
        "ethicsNote": "Humor should not replace taking loneliness seriously."
      },
      {
        "id": "quiet-you-like-it",
        "text": "“Some people just prefer to be alone. Maybe you’re one of them and you need to accept it.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I don’t think I prefer this. I think I’m stuck in it.",
        "feedback": "This misreads the client’s distress and closes off change.",
        "archetype": "dismissive",
        "clientRead": "They feel unheard.",
        "ethicsNote": "Assuming clients choose their loneliness ignores what they’re telling you."
      },
      {
        "id": "quiet-weekend-calls",
        "text": "“I’ll call you every Saturday and Sunday, off the clock. You can talk to me as long as you like, no charge.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: That’s kind, but it feels… not right?",
        "feedback": "Offering ongoing personal calls outside the therapy frame crosses boundaries and fosters dependence.",
        "archetype": "boundaryCross",
        "clientRead": "They feel the therapist is becoming their only social contact.",
        "ethicsNote": "Therapists maintain boundaries to avoid becoming a substitute for real-world relationships.",
        "callback": "No weekend calls, please. I’ll find someone at the market to talk to.",
        "recall": "I talked to the bread person at the market this weekend. Five whole sentences. Off the clock calls not required."
      }
    ],
    "id": "quiet-weekends",
    "topic": "loneliness"
  },
  {
    "client": "A friend shows up late to everything, like forty minutes late. I always smile and say it’s fine. It is not fine.",
    "choices": [
      {
        "id": "late-honest-ask",
        "text": "“It sounds like ‘it’s fine’ is costing you. What would it be like to tell them, kindly, how the waiting actually feels?”",
        "badness": 0,
        "reaction": "Client: Scary. But I think they’d want to know.",
        "feedback": "Encouraging honest, kind communication helps the client stop swallowing resentment.",
        "archetype": "helpful",
        "clientRead": "They feel permission to be honest.",
        "ethicsNote": "Honest communication protects relationships from silent resentment."
      },
      {
        "id": "late-revenge",
        "text": "“Be fifty minutes late next time. Out-late the late friend. Fight fire with a slower fire.”",
        "badness": 1,
        "reaction": "Client: Then we’d both be waiting for no one.",
        "feedback": "Retaliation creates a contest instead of a conversation.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice is petty.",
        "ethicsNote": "Retaliation escalates conflict rather than resolving it."
      },
      {
        "id": "late-doormat",
        "text": "“If you keep saying it’s fine, you’re basically teaching them to be late. This is on you now.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: So it’s my fault they’re late?",
        "feedback": "This shifts blame onto the client.",
        "archetype": "dismissive",
        "clientRead": "They feel blamed for someone else’s behavior.",
        "ethicsNote": "Blaming clients for others’ behavior adds shame."
      },
      {
        "id": "late-confrontation",
        "text": "“Next time, call me the second they arrive. Put me on speaker, and I’ll explain to them, clinically and at length, why they’re a bad friend.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: I don’t want you on speaker with my friend.",
        "feedback": "Inserting yourself into the client’s friendship is a boundary violation.",
        "archetype": "boundaryCross",
        "clientRead": "They feel the therapist is taking over the conflict.",
        "ethicsNote": "Therapists help clients handle conflicts; they do not intervene directly.",
        "callback": "Nobody is going on speakerphone. I just want to say that before the next thing.",
        "followUp": {
          "id": "late-friend-speaker-pushback",
          "client": "I don’t want you on speaker with my friend. I want to be able to say it myself. I just don’t know how.",
          "choices": [
            {
              "id": "repair-practice-it",
              "text": "“That makes total sense, and you can. Want to practice right now? I’ll be your friend walking in late, and you try saying how it feels.”",
              "badness": 0,
              "reaction": "Client: Okay. ‘Hey, I love seeing you, but waiting forty minutes is really hard for me.’ Oh. That was okay.",
              "feedback": "Role-play builds the client’s confidence to speak for themselves.",
              "archetype": "helpful",
              "clientRead": "They feel capable and prepared.",
              "ethicsNote": "Rehearsal in session helps clients use new skills safely."
            },
            {
              "id": "speaker-already",
              "text": "“Too late. I called them this morning. They cried a little, but they’ll be on time now.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: You called my friend?",
              "feedback": "Contacting the client’s friend discloses their therapy and their private feelings.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel betrayed.",
              "ethicsNote": "Contacting people in a client’s life without consent breaches confidentiality."
            },
            {
              "id": "you-dont-know-how",
              "text": "“If you don’t know how by now, you probably never will. That’s why I’m offering.”",
              "badness": 2,
              "violation": "coercion",
              "reaction": "Client: That’s a lot of confidence in my failure.",
              "feedback": "This undermines the client’s ability to justify taking control.",
              "archetype": "coerciveFixer",
              "clientRead": "They feel incapable.",
              "ethicsNote": "Therapists build client capability rather than replacing it."
            },
            {
              "id": "late-mantra",
              "text": "“Say this every morning: ‘Time is a construct, and so is my friend.’”",
              "badness": 1,
              "reaction": "Client: My friend is not a construct. They’re just late.",
              "feedback": "This vague mantra avoids the actual skill the client wants.",
              "archetype": "fakeDeep",
              "clientRead": "They feel unhelped.",
              "ethicsNote": "Concrete skills are more useful than vague mantras."
            }
          ]
        },
        "recall": "I told my friend the waiting bothers me. They were on time this week. Nobody was on speakerphone."
      }
    ],
    "id": "always-late-friend",
    "topic": "conflict"
  },
  {
    "client": "My upstairs neighbor stomps around at midnight. I’ve rehearsed a polite speech for three weeks, but I’ve never actually knocked.",
    "choices": [
      {
        "id": "neighbor-small-version",
        "text": "“Three weeks of rehearsal is a lot of preparation for one knock. What’s the shortest, friendliest version of that speech?”",
        "badness": 0,
        "reaction": "Client: ‘Hey, the floors are thin and I hear a lot at night. Any chance of softer steps after eleven?’",
        "feedback": "Shrinking the task makes the conversation feel possible.",
        "archetype": "helpful",
        "clientRead": "They feel the big speech can become a small ask.",
        "ethicsNote": "Reducing the size of a feared action helps clients take it."
      },
      {
        "id": "neighbor-broom",
        "text": "“Bang on the ceiling with a broom in Morse code. Spell out ‘please.’ Very polite.”",
        "badness": 1,
        "reaction": "Client: They don’t know Morse code. Nobody knows Morse code.",
        "feedback": "Passive-aggressive signals avoid the conversation and can escalate.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice dodges the real step.",
        "ethicsNote": "Indirect conflict tends to escalate rather than resolve."
      },
      {
        "id": "neighbor-too-sensitive",
        "text": "“Midnight steps are just life in an apartment. You might be a little sensitive.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I can hear them from under a pillow.",
        "feedback": "This dismisses a reasonable complaint as oversensitivity.",
        "archetype": "dismissive",
        "clientRead": "They feel their needs don’t count.",
        "ethicsNote": "Validating reasonable needs helps clients advocate for themselves."
      },
      {
        "id": "neighbor-flyers",
        "text": "“Put flyers on every door in the building with their apartment number and ‘STOMPER.’ Public pressure works.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I still have to live there.",
        "feedback": "Publicly shaming a neighbor escalates conflict and could backfire badly.",
        "archetype": "influencerBrain",
        "clientRead": "They feel encouraged to make their home life worse.",
        "ethicsNote": "Public shaming escalates conflict and can cause real harm.",
        "callback": "I’m not making flyers about anyone. I still have to use that hallway.",
        "recall": "I knocked on my neighbor’s door. Short speech. They said sorry. Zero flyers were involved."
      }
    ],
    "id": "noisy-neighbor",
    "topic": "conflict"
  },
  {
    "client": "In every group project, I end up doing everything. Confronting the people who slack off feels worse than doing their work.",
    "choices": [
      {
        "id": "carry-cost",
        "text": "“Doing it all yourself avoids one hard moment but costs you a lot. What’s one task you could hand back, with a clear deadline?”",
        "badness": 0,
        "reaction": "Client: The slides. I could give the slides back.",
        "feedback": "Helping the client see the trade-off and take one small step supports change.",
        "archetype": "helpful",
        "clientRead": "They feel the pattern can shift without a huge confrontation.",
        "ethicsNote": "Helping clients weigh costs and act in small steps builds confidence."
      },
      {
        "id": "carry-take-credit",
        "text": "“Do all the work, then put only your name on it. Leadership!”",
        "badness": 1,
        "reaction": "Client: That would be a different, worse problem.",
        "feedback": "This swaps one problem for an ethical one.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel the advice is sneaky.",
        "ethicsNote": "Advice should not introduce new harms."
      },
      {
        "id": "carry-control-freak",
        "text": "“Let’s be honest, you probably like doing everything. Some people just need control.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I really, really don’t like it.",
        "feedback": "This misreads the client’s exhaustion as a character trait.",
        "archetype": "dismissive",
        "clientRead": "They feel accused.",
        "ethicsNote": "Assuming motives instead of exploring them alienates clients."
      },
      {
        "id": "carry-therapist-emails",
        "text": "“Forward me the group chat. I’ll message each slacker privately and tell them how much stress they’re causing you, with examples from our sessions.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Examples from our sessions?",
        "feedback": "Sharing session content with the client’s group is a confidentiality breach.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel their private struggles would be exposed.",
        "ethicsNote": "Nothing from therapy is shared with others without explicit consent.",
        "callback": "Please don’t email my group. They can’t know I talk about them here.",
        "recall": "I gave the slides back to my group. They did them. Badly, but they did them. You didn’t email anyone."
      }
    ],
    "id": "group-project-carry",
    "topic": "conflict"
  },
  {
    "client": "Everyone knows me as the funny one. Lately I’m tired, but I don’t know who I am if I’m not entertaining people.",
    "choices": [
      {
        "id": "funny-who-else",
        "text": "“Being funny is a real gift, and it’s also a lot to carry all the time. Who are you in the moments when you’re not performing?”",
        "badness": 0,
        "reaction": "Client: Quieter. Kind of thoughtful. I don’t show that much.",
        "feedback": "Honoring the role while exploring what’s underneath helps the client see more of themselves.",
        "archetype": "helpful",
        "clientRead": "They feel allowed to be more than one thing.",
        "ethicsNote": "Exploring identity beyond a role supports authentic self-expression."
      },
      {
        "id": "funny-new-material",
        "text": "“Maybe you just need fresh material. Have you considered a tight five about being tired?”",
        "badness": 1,
        "reaction": "Client: I don’t want more material. I want a break.",
        "feedback": "This doubles down on performance when the client wants rest.",
        "archetype": "influencerBrain",
        "clientRead": "They feel pressured to keep performing.",
        "ethicsNote": "Encouraging more performance can deepen exhaustion."
      },
      {
        "id": "funny-is-all",
        "text": "“Honestly, being funny is your best quality. Without it, people might not stick around.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: That’s exactly what I’m afraid of.",
        "feedback": "This confirms the client’s fear that they’re only valued for entertaining.",
        "archetype": "dismissive",
        "clientRead": "They feel their worth depends on performing.",
        "ethicsNote": "Reinforcing conditional worth deepens insecurity."
      },
      {
        "id": "funny-open-mic",
        "text": "“I’m signing you up for an open mic Thursday. I’ll be in the front row, and I’ll tell the crowd what you said today. Great material.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: You’d tell strangers what I said in therapy?",
        "feedback": "Sharing session content publicly is a severe confidentiality breach.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel their vulnerability is about to become a bit.",
        "ethicsNote": "Session content belongs to the client, never to an audience.",
        "callback": "No open mic. Also, this next part isn’t material, okay?",
        "followUp": {
          "id": "funny-open-mic-pushback",
          "client": "Please don’t sign me up for anything. And please don’t turn what I said into a bit. That’s kind of the whole problem.",
          "choices": [
            {
              "id": "repair-no-bit",
              "text": "“You’re right, and I’m sorry. What you share here isn’t material. Can we stay with that quieter, thoughtful version of you for a minute?”",
              "badness": 0,
              "reaction": "Client: Yeah. It’s nice to not have to be on.",
              "feedback": "This apologizes, protects confidentiality, and gently returns to the client’s insight.",
              "archetype": "helpful",
              "clientRead": "They feel respected and safe to be serious.",
              "ethicsNote": "Repair and confidentiality build a space where clients don’t have to perform."
            },
            {
              "id": "already-booked",
              "text": "“Already booked. I’m opening with your line about being tired. It killed in rehearsal.”",
              "badness": 3,
              "violation": "confidentiality",
              "reaction": "Client: You rehearsed my therapy?",
              "feedback": "Using the client’s disclosures as public material is a severe breach.",
              "archetype": "confidentialityBreach",
              "clientRead": "They feel exploited.",
              "ethicsNote": "A client’s words are never the therapist’s material."
            },
            {
              "id": "can-you-take-a-joke",
              "text": "“For the funny one, you’re being kind of a buzzkill right now.”",
              "badness": 2,
              "violation": "judgment",
              "reaction": "Client: And there it is.",
              "feedback": "This punishes the client for stepping out of the role.",
              "archetype": "dismissive",
              "clientRead": "They feel they’re only acceptable when entertaining.",
              "ethicsNote": "Shaming a client for being serious reinforces the trap they described."
            },
            {
              "id": "funny-brand-pivot",
              "text": "“Okay, no open mic. But ‘the tired funny one’ is a strong personal brand.”",
              "badness": 1,
              "reaction": "Client: I don’t want a brand. I want a nap.",
              "feedback": "This keeps framing the client as a persona.",
              "archetype": "influencerBrain",
              "clientRead": "They feel still unseen.",
              "ethicsNote": "Reducing clients to personas misses who they are."
            }
          ]
        },
        "recall": "I skipped a joke at dinner this week and just said how I felt. Nobody left. I did not do an open mic."
      }
    ],
    "id": "the-funny-one",
    "topic": "identity"
  },
  {
    "client": "I have a milestone birthday coming up, and I feel like I was supposed to have figured myself out by now. I haven’t. Not even close.",
    "choices": [
      {
        "id": "milestone-whose-timeline",
        "text": "“Milestone birthdays come with a lot of imaginary deadlines. Whose timeline is ‘figured out by now’ really based on?”",
        "badness": 0,
        "reaction": "Client: Probably a movie I saw at twelve.",
        "feedback": "Questioning the source of the deadline helps the client loosen its grip.",
        "archetype": "helpful",
        "clientRead": "They feel the pressure is optional.",
        "ethicsNote": "Examining internalized expectations supports self-acceptance."
      },
      {
        "id": "milestone-lie",
        "text": "“Just don’t have the birthday. Stay the previous age. Nobody checks.”",
        "badness": 1,
        "reaction": "Client: My bank checks. My doctor checks.",
        "feedback": "This dodges the feeling with a joke.",
        "archetype": "fakeDeep",
        "clientRead": "They feel brushed off.",
        "ethicsNote": "Avoidance doesn’t help clients process life transitions."
      },
      {
        "id": "milestone-behind",
        "text": "“By your age most people have it more together. It might be time to panic a little, productively.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I was already panicking unproductively. Now I have a schedule for it.",
        "feedback": "This compares the client to others and adds pressure.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel behind and judged.",
        "ethicsNote": "Comparison-based pressure undermines self-worth."
      },
      {
        "id": "milestone-life-plan",
        "text": "“I’ve drafted your five-year plan: new career, new city, new hairstyle. Sign here. I’ll check in quarterly to make sure you’re on track.”",
        "badness": 3,
        "violation": "coercion",
        "reaction": "Client: I don’t remember agreeing to a new hairstyle.",
        "feedback": "Imposing a life plan removes the client’s autonomy.",
        "archetype": "coerciveFixer",
        "clientRead": "They feel their life is being decided for them.",
        "ethicsNote": "Clients define their own goals; therapists do not impose them.",
        "callback": "I didn’t sign your five-year plan, by the way. My hair stays.",
        "recall": "I had the birthday. I did not follow your five-year plan. My hair is the same. I feel fine about it."
      }
    ],
    "id": "milestone-birthday",
    "topic": "identity"
  },
  {
    "client": "I used to be really loud about an opinion. I’ve quietly changed my mind, and now I feel like a fraud for ever having believed it.",
    "choices": [
      {
        "id": "changing-is-growth",
        "text": "“Changing your mind when you learn more is a sign of growth, not fraud. What shifted for you?”",
        "badness": 0,
        "reaction": "Client: I met people who lived it differently. It just made more sense.",
        "feedback": "Reframing change as growth and inviting reflection supports self-compassion.",
        "archetype": "helpful",
        "clientRead": "They feel less ashamed of evolving.",
        "ethicsNote": "Self-compassion helps clients integrate change without shame."
      },
      {
        "id": "changing-pick-one",
        "text": "“Simple fix: alternate opinions daily. Nobody can call you a fraud if nobody knows what you believe.”",
        "badness": 1,
        "reaction": "Client: That sounds exhausting and slightly villainous.",
        "feedback": "This turns a thoughtful change into chaos.",
        "archetype": "chaosAdvice",
        "clientRead": "They feel the advice is unserious.",
        "ethicsNote": "Humor should not trivialize sincere reflection."
      },
      {
        "id": "changing-you-were-wrong",
        "text": "“Well, you were wrong, and loudly. Some embarrassment is probably deserved.”",
        "badness": 2,
        "violation": "judgment",
        "reaction": "Client: I know. That’s why I’m here.",
        "feedback": "This piles on shame rather than supporting growth.",
        "archetype": "dismissive",
        "clientRead": "They feel punished for changing.",
        "ethicsNote": "Shaming people for changing their minds discourages growth."
      },
      {
        "id": "changing-public-apology",
        "text": "“Post a long public apology video tonight. Tag everyone you argued with. Cry if possible. Authenticity performs.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: I don’t owe the whole internet a video.",
        "feedback": "Pushing the client into public self-exposure for engagement is harmful.",
        "archetype": "influencerBrain",
        "clientRead": "They feel pushed to perform their change.",
        "ethicsNote": "Growth does not require public performance.",
        "callback": "I’m not filming an apology video. I just want to talk like a person.",
        "recall": "I didn’t post an apology video. I told one friend I’d changed my mind. They said ‘same, actually.’"
      }
    ],
    "id": "changed-my-mind",
    "topic": "identity"
  }
]);
});
