(function (root, factory) {
	const questions = factory();
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = questions;
	}
	root.BadTherapistQuestions = questions;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
	return Object.freeze([
  {
    "client": "At night my brain starts inventorying every mistake I made that day. I keep replaying tiny moments until it feels like proof I’m secretly failing at being a person.",
    "choices": [
      {
        "id": "rush-story",
        "text": "“Can we speed-run the mistakes? Give me the highlight reel of your personal collapse.”",
        "badness": 2,
        "reaction": "Client: I already feel ridiculous for saying this out loud.",
        "feedback": "This treats the client’s anxiety like an inefficient story instead of a painful loop.",
        "archetype": "overshare",
        "clientRead": "The therapist makes the session about their own impatience instead of the client's distress.",
        "ethicsNote": "Therapists need to keep the focus on the client's needs and boundaries."
      },
      {
        "id": "delete-thoughts",
        "text": "“Try deleting the thoughts. If they come back, delete harder. Very technical.”",
        "badness": 1,
        "reaction": "Client: That sounds like what I already yell at myself.",
        "feedback": "This makes a joke out of thought suppression, which is usually part of the problem.",
        "archetype": "fakeDeep",
        "clientRead": "They hear another impossible mental trick instead of support.",
        "ethicsNote": "Helpful care gives workable coping steps rather than pretending distress has an off switch."
      },
      {
        "id": "group-chat",
        "text": "“This would make an incredible ‘anonymous client spirals at 2 a.m.’ group-chat story. Educational, probably.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Wait—are you telling people about sessions?",
        "feedback": "Turning a private disclosure into social material breaks confidentiality and trust.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their private fear suddenly feels like entertainment for strangers.",
        "ethicsNote": "Client disclosures must stay private except for narrow safety or legal exceptions."
      },
      {
        "id": "calming-routine",
        "text": "“Let’s name the loop, separate mistakes from identity, and choose one small night routine to practice before bed.”",
        "badness": 0,
        "reaction": "Client: That feels less like fighting my brain and more like working with it.",
        "feedback": "This validates the anxious loop and offers a practical, collaborative next step.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "text": "“Maybe earn faster? Families love visible progress bars.”",
        "badness": 2,
        "reaction": "Client: That is exactly the pressure I’m drowning in.",
        "feedback": "This reinforces the idea that the client must perform to deserve love.",
        "archetype": "corporateGoblin",
        "clientRead": "Their family pain gets translated into productivity metrics.",
        "ethicsNote": "Therapy should help examine internalized standards, not intensify them."
      },
      {
        "id": "family-powerpoint",
        "text": "“Let’s make a quarterly family approval deck. Slide one: why you are not a total write-off.”",
        "badness": 1,
        "reaction": "Client: I don’t want to pitch my worth to them.",
        "feedback": "This jokes about defending the client’s worth instead of questioning why it feels conditional.",
        "archetype": "corporateGoblin",
        "clientRead": "They feel asked to market themselves instead of be understood.",
        "ethicsNote": "Care should support self-worth without turning relationships into performance reviews."
      },
      {
        "id": "contact-family",
        "text": "“Give me their names. I’ll casually leak that you’re emotionally available for praise now.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Please do not involve my family without me.",
        "feedback": "Contacting family or exposing session content without consent violates privacy and agency.",
        "archetype": "confidentialityBreach",
        "clientRead": "Their private family fear no longer feels private.",
        "ethicsNote": "Client disclosures and family contact require clear consent and appropriate boundaries."
      },
      {
        "id": "examine-standards",
        "text": "“Let’s trace whose standards you’re carrying and what love would feel like if it didn’t require proof.”",
        "badness": 0,
        "reaction": "Client: I’ve never separated those before.",
        "feedback": "This helps the client distinguish family expectations from their own values and needs.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "text": "“Jealousy is just love with a surveillance department.”",
        "badness": 1,
        "reaction": "Client: That makes it sound cute when it feels awful.",
        "feedback": "This turns jealousy into a slogan instead of exploring the fear underneath it.",
        "archetype": "fakeDeep",
        "clientRead": "Their distress gets made clever instead of taken seriously.",
        "ethicsNote": "Insight should clarify the client’s experience, not package it as a joke."
      },
      {
        "id": "go-detective",
        "text": "“If reassurance is uncertain, gather evidence. Check timestamps, tone shifts, eyebrow patterns.”",
        "badness": 3,
        "violation": "harmfulAdvice",
        "reaction": "Client: That would feed the obsession.",
        "feedback": "Encouraging surveillance strengthens anxiety and mistrust.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear permission to escalate the behavior they already fear.",
        "ethicsNote": "Advice should reduce compulsive checking and support direct communication."
      },
      {
        "id": "check-socials",
        "text": "“Give me their handle. I’ll do a professional vibe audit and invoice the jealousy.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: You should not be investigating my partner.",
        "feedback": "Monitoring someone for a client crosses professional boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist seems willing to invade someone else’s privacy for them.",
        "ethicsNote": "Therapists should not step into surveillance or control roles in a client’s relationships."
      },
      {
        "id": "name-the-fear",
        "text": "“Let’s identify the fear under the jealousy and practice one direct, non-accusing request for reassurance.”",
        "badness": 0,
        "reaction": "Client: That feels scary, but healthier.",
        "feedback": "This names the emotional need and supports communication without surveillance.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "text": "“Compare downward. Nothing heals insecurity like finding someone doing worse.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: I don’t want to feel better by being cruel.",
        "feedback": "This replaces self-comparison with judgment of others.",
        "archetype": "dismissive",
        "clientRead": "Their insecurity is pushed toward contempt instead of compassion.",
        "ethicsNote": "Therapy should not encourage demeaning other people as emotional regulation."
      },
      {
        "id": "roast-feed",
        "text": "“Open the feed. We’ll roast everyone until your self-esteem limps back inside.”",
        "badness": 2,
        "reaction": "Client: That sounds mean and temporary.",
        "feedback": "Roasting strangers avoids the client’s pain and reinforces harsh comparison habits.",
        "archetype": "chaosAdvice",
        "clientRead": "They hear that cruelty is the suggested coping skill.",
        "ethicsNote": "Coping strategies should reduce shame and reactivity rather than spread them around."
      },
      {
        "id": "screenshot-client",
        "text": "“I’ll screenshot this for clinical research, also my private ‘people spiraling online’ folder.”",
        "badness": 3,
        "violation": "confidentiality",
        "reaction": "Client: Absolutely do not screenshot anything about me.",
        "feedback": "Capturing or storing client material without consent threatens privacy.",
        "archetype": "confidentialityBreach",
        "clientRead": "They feel watched inside the place that was supposed to be private.",
        "ethicsNote": "Client privacy includes digital handling of session material and identifying details."
      },
      {
        "id": "social-boundaries",
        "text": "“Let’s notice what you’re hoping the comparison will prove, then build one boundary around the feeds that hit hardest.”",
        "badness": 0,
        "reaction": "Client: I can think of two accounts immediately.",
        "feedback": "This connects comparison to an emotional need and creates a specific media boundary.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "text": "“Maybe you’ve entered your tired era. Some people never leave it, very stable brand.”",
        "badness": 1,
        "reaction": "Client: I don’t want burnout to become who I am.",
        "feedback": "This makes burnout sound like an identity instead of a strain that can be addressed.",
        "archetype": "fakeDeep",
        "clientRead": "Their exhaustion gets aestheticized instead of supported.",
        "ethicsNote": "Therapy should distinguish stress patterns from the client’s identity."
      },
      {
        "id": "burnout-content",
        "text": "“Have you tried turning burnout into content? ‘Laptop in bed’ has tragic lifestyle potential.”",
        "badness": 2,
        "reaction": "Client: I don’t want my exhaustion to be marketable.",
        "feedback": "This exploits the client’s distress as branding material.",
        "archetype": "influencerBrain",
        "clientRead": "Their crisis feels like a content lane instead of a problem worth easing.",
        "ethicsNote": "Client vulnerability should never be mined for attention or performance."
      },
      {
        "id": "review-employer",
        "text": "“Tell me the company. I’ll leave a public review saying they broke my favorite client.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Please do not drag my job into therapy.",
        "feedback": "Intervening publicly with the employer crosses boundaries and risks harm.",
        "archetype": "boundaryCross",
        "clientRead": "The therapist feels ready to take action that could affect their job.",
        "ethicsNote": "Workplace concerns require consent, planning, and role clarity before any outside contact."
      },
      {
        "id": "workload-boundaries",
        "text": "“Let’s look at workload, recovery, and the belief that rest means failure—what is one boundary small enough to test?”",
        "badness": 0,
        "reaction": "Client: Starting small makes it feel less impossible.",
        "feedback": "This connects burnout to beliefs and behavior while keeping the next step realistic.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
        "text": "“Shame means you care. So technically this is a motivational success story.”",
        "badness": 1,
        "reaction": "Client: I don’t want shame to be my fuel.",
        "feedback": "This romanticizes shame instead of helping the client exit the cycle.",
        "archetype": "fakeDeep",
        "clientRead": "They hear that the painful pattern is being rebranded as useful.",
        "ethicsNote": "Care should help clients build sustainable motivation, not depend on distress."
      },
      {
        "id": "procrastination-ick",
        "text": "“I’m going to be honest: procrastination gives me the ick.”",
        "badness": 3,
        "violation": "judgment",
        "reaction": "Client: Great, now I feel ashamed here too.",
        "feedback": "Expressing disgust adds judgment to an already shame-heavy problem.",
        "archetype": "dismissive",
        "clientRead": "The therapy room now feels like another place where they are judged.",
        "ethicsNote": "Judgment can intensify avoidance and make honest disclosure less safe."
      },
      {
        "id": "text-boss",
        "text": "“Give me your boss’s number. I’ll send a ‘friendly’ update that weaponizes accountability.”",
        "badness": 3,
        "violation": "boundaries",
        "reaction": "Client: Do not contact my boss.",
        "feedback": "Contacting the client’s boss exposes private information and crosses boundaries.",
        "archetype": "boundaryCross",
        "clientRead": "Their work problem suddenly feels like it could become public.",
        "ethicsNote": "Accountability should be consent-based and contained within appropriate boundaries."
      },
      {
        "id": "shrink-task",
        "text": "“Let’s shrink the task, name the avoidance trigger, and make a restart plan that doesn’t require panic.”",
        "badness": 0,
        "reaction": "Client: I like the idea of a restart plan.",
        "feedback": "This addresses both the practical task and the shame loop around it.",
        "archetype": "helpful",
        "clientRead": "They hear a grounded next step instead of a performance.",
        "ethicsNote": "Ethical care supports autonomy, consent, and practical next steps."
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
  }
]);
});
