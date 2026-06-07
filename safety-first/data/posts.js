/*
 * Safety First — post database.
 *
 * This is the single source of truth for every article on the site.
 * Adding a post = appending one object to this array (see scripts/new-post.mjs
 * for an agentic scaffolder, and SOCIAL.md for the post-generation prompt).
 *
 * scores: each 1–10. The verdict (category, residual risk, recommendation)
 * is COMPUTED from these three numbers in assets/app.js — you never set it
 * by hand, so every post is graded by the same rule.
 *
 *   benefit    — how much genuine value / joy / utility the activity brings.
 *   risk       — severity x likelihood of the worst realistic outcome, BEFORE
 *                you do anything to protect yourself.
 *   mitigation — how much of that risk you can actually buy down with
 *                knowledge, gear, skill and discipline.
 */
window.SF_POSTS = [
  {
    slug: "always-click-in",
    title: "The Seatbelt: The Purest Unnecessary Risk",
    activity: "Driving without a seatbelt",
    date: "2026-05-12",
    author: "Dmytro",
    emoji: "🚗",
    tags: ["driving", "everyday", "unnecessary-risk"],
    summary:
      "Skipping the belt buys you almost nothing and can cost you everything. It is the textbook case the whole Safety First system is built around.",
    scores: { benefit: 1, risk: 8, mitigation: 1 },
    body: [
      "I am not a fanatic. I take real risks on purpose — I dive, I travel, I build things that can fail. But I refuse to take risks that hand me nothing in return. The clearest example on Earth is the car seatbelt.",
      "Ask the honest question the Safety First system always asks first: <em>what do I actually gain by not wearing it?</em> A few seconds. A faint feeling of freedom across the chest. That is the entire upside, and it rounds to zero.",
      "Now the downside. In a serious crash an unbelted body keeps moving at the car's original speed until something stops it — the wheel, the glass, the road. The belt is the single most studied piece of safety equipment in history, and the verdict is not subtle: it roughly halves your odds of dying in a crash.",
      "So we have a near-zero benefit sitting next to a catastrophic, irreversible risk — and the one mitigation that exists is the very thing you refused. That is the definition of an <strong>unnecessary risk</strong>: you suffer fully in the bad case and gain nothing in the good case.",
      "This is why the belt is the anchor of the whole philosophy. Once you can see it clearly here, you start seeing the same shape everywhere: the helmet you skipped, the smoke alarm with no battery, the 'I'll just send this one text.'"
    ],
    measures: [
      "Make it pre-conscious: belt on before the engine starts, every single time, even for a 90-second drive.",
      "Everyone in the car, every seat — most belt deaths in back seats are people who thought 'it's just the back.'",
      "Position matters: lap belt low across the hips, shoulder belt across the collarbone, never under the arm.",
      "If your car nags you with a chime, never defeat it. Let the annoyance do its job."
    ],
    actionPlan: [
      "Right now, set a personal rule with no exceptions: car doesn't move until everyone is belted.",
      "Check every belt in your car this week — frayed webbing or a sticky buckle means service it.",
      "If you have kids, verify the car-seat / booster fit against the seat's manual, not by eye.",
      "Catch yourself the next time you think 'it's just around the corner' — that thought is the risk."
    ]
  },
  {
    slug: "scuba-done-right",
    title: "Scuba Diving: A Worthwhile Risk, Done Right",
    activity: "Recreational scuba diving",
    date: "2026-05-20",
    author: "Dmytro",
    emoji: "🤿",
    tags: ["recreation", "worthwhile-risk", "skill"],
    summary:
      "Diving is genuinely dangerous and genuinely wonderful. That combination is exactly when the goal stops being 'avoid' and becomes 'control.'",
    scores: { benefit: 8, risk: 7, mitigation: 9 },
    body: [
      "The seatbelt teaches you to delete risk. Diving teaches you the harder, more interesting skill: how to <em>hold</em> a real risk and shrink it until the reward clearly wins.",
      "Let's be honest about the danger. Underwater you cannot breathe without your equipment, pressure changes can injure your lungs and your blood, and the surface is not always a quick exit. The worst-case outcome is severe. That is a real 7, not a marketing 2.",
      "But here is what separates diving from the unbelted drive: almost all of that risk is <strong>controllable</strong>. Training, a buddy, a dive computer, a conservative plan, honest health checks, slow ascents, and the discipline to call any dive — each of these takes a slice off the top. Stack them and the residual risk drops to something close to driving to the dive site.",
      "And the benefit is not 'a faint feeling.' It is awe. Weightlessness, silence, a world most people never see. An 8, easily, maybe higher for the people who fall in love with it.",
      "High benefit, high raw risk, very high control. The Safety First system calls that a <strong>worthwhile risk</strong> — and the correct response is not to avoid it but to earn it: get trained, gear up, respect the rules, and go."
    ],
    measures: [
      "Get certified properly and dive within your certification — depth and conditions are not where you bluff.",
      "Never dive alone; agree hand signals, an air-check cadence and a turn-pressure before you descend.",
      "Plan the dive, dive the plan: depth, time, gas, no-deco limits, and a hard 'thirds' rule on air.",
      "Slow ascents and a safety stop — the cheapest insurance against decompression injury you will ever buy.",
      "Honest self-assessment: cold, tired, hungover, anxious or ill = thumb the dive. The reef will be there tomorrow."
    ],
    actionPlan: [
      "If you're curious, book a try-dive with a reputable, certified instructor before buying anything.",
      "If you're certified but rusty, do a refresher and a shallow checkout dive before any real trip.",
      "Build a pre-dive checklist you run out loud with your buddy — make it boring and identical every time.",
      "Log your dives; patterns in your own data are how you keep getting safer instead of just luckier."
    ]
  },
  {
    slug: "phone-while-driving",
    title: "The Text That Can Wait: Phones Behind the Wheel",
    activity: "Using your phone while driving",
    date: "2026-05-27",
    author: "Dmytro",
    emoji: "📱",
    tags: ["driving", "everyday", "unnecessary-risk", "habits"],
    summary:
      "It feels productive. It is the same shape as the unbuckled seatbelt: a sliver of benefit balanced on top of a catastrophic, fully avoidable risk.",
    scores: { benefit: 2, risk: 8, mitigation: 2 },
    body: [
      "A glance at a message feels almost free. That feeling is the trap, and it is worth dismantling with the same three questions we use everywhere.",
      "Benefit: you answer a few seconds sooner. Almost nothing — there is virtually no message that genuinely cannot wait until you stop. Call it a 2, and only because it sometimes feels urgent.",
      "Risk: at 90 km/h, the two seconds you spend reading covers about 50 metres of road completely blind. You are not a worse driver during those seconds — for that distance you are not driving at all. The worst case is someone else's life. That is an 8.",
      "Mitigation while still holding the phone is mostly a lie we tell ourselves — 'I only glance at red lights,' 'I'm good at it.' The honest mitigation isn't doing it better; it's not doing it. So as a held risk, control stays low.",
      "Near-zero benefit, catastrophic risk, no real way to make the act itself safe — that is an <strong>unnecessary risk</strong>, full stop. The fix isn't willpower in the moment; it's removing the moment."
    ],
    measures: [
      "Put the phone out of reach and on Do Not Disturb / Driving mode before you pull away.",
      "Set up an auto-reply so people know you're driving — kills the 'they're waiting' pressure.",
      "Decide navigation and playlist before you move; never type an address while rolling.",
      "If something truly needs your hands or eyes, pull over safely and stop. That is always available."
    ],
    actionPlan: [
      "Turn on automatic Driving / Do Not Disturb mode on your phone today — it's two minutes in settings.",
      "Mount your phone for nav so you never hold it, and start routes before you drive.",
      "Make a no-exceptions rule: phone is not touched while moving, and ask passengers to enforce it.",
      "If you're a passenger, offer to be the 'phone person' so the driver never has a reason to look down."
    ]
  },
  {
    slug: "motorcycle-respect",
    title: "Motorcycles: Worthwhile, But They Demand Respect",
    activity: "Riding a motorcycle",
    date: "2026-06-03",
    author: "Dmytro",
    emoji: "🏍️",
    tags: ["recreation", "worthwhile-risk", "gear"],
    summary:
      "Riding is a real joy with real consequences. It sits on the line between worthwhile and reckless — and which side you land on is almost entirely up to you.",
    scores: { benefit: 7, risk: 8, mitigation: 7 },
    body: [
      "A motorcycle is the most honest item in this blog. It gives you something a car never will — and it removes the metal cage that normally keeps your risk numbers low. Both halves are true at once.",
      "The benefit is real: engagement, freedom, the road as something you feel instead of something you watch. For a lot of riders that's a genuine 7 or more.",
      "The risk is also real and I won't soften it: per mile travelled, riding is many times more dangerous than driving, and you are the crumple zone. Raw risk is a clear 8.",
      "What makes it <strong>worthwhile</strong> rather than reckless is how much control you actually have — more than people assume. Full gear, real training, ruthless visibility habits, riding sober and rested, and choosing roads and speeds with margin will move a huge fraction of crashes from 'fatal' to 'walked away.' That's a mitigation of 7, and it's the difference between the two categories.",
      "Here is the honest line the system draws: ride with full gear, training and discipline and it's a worthwhile risk you can be proud of. Ride in a t-shirt, untrained, fast and complacent and you've crossed into reckless — same machine, completely different decision."
    ],
    measures: [
      "All the gear, all the time: full-face helmet, armoured jacket and trousers, gloves, over-the-ankle boots — on every ride, including the short ones.",
      "Get proper training and keep taking advanced / refresher courses; cornering and emergency braking are learnable skills, not talent.",
      "Ride like you're invisible: assume drivers haven't seen you, cover your brakes, and build escape routes at every junction.",
      "Never mix riding with alcohol, fatigue or anger, and keep a speed margin so the bike always has options left."
    ],
    actionPlan: [
      "Before your next ride, audit your gear honestly — any 'I'll skip it just today' item is the gap to close.",
      "Book an advanced rider course this season; treat skill as something you maintain, not something you have.",
      "Pick one habit to drill this month (lifesaver glances, braking, or lane position) until it's automatic.",
      "Set personal hard limits (no riding tired, no riding angry, no 'just one drink') and write them down."
    ]
  }
];
