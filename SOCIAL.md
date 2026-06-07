# 📣 Safety First — Social Presence Plan

Goal: one philosophy, present everywhere it makes sense — **YouTube, Instagram, Facebook, Threads** — feeding people back to the blog and, later, to your products.

> Update the links in `index.html` (`#follow` section) and the post pages' footers once your real handles exist. Suggested handle: `@safetyfirst` (or `@safetyfirst.life`), kept identical across platforms for recall.

---

## The one rule of this channel

Every piece of content does the same job the blog does: **name the trade (benefit vs. risk vs. control), give the verdict, give one action.** Never fear-mongering. The brand voice is *calm, structured, non-fanatic* — "I'm not telling you to be scared, I'm telling you to count."

Brand kit:
- **Name / tagline:** Safety First — *Count the odds. Keep the joy.*
- **Colours:** green `#34d399` (worthwhile), amber `#f5b13d` (care), red `#f4736b` (avoid), ink `#0b1220`.
- **Mascot mark:** the shield + check (`assets/logo.svg`).
- **Signature device:** the ★ verdict badge + the three 10-star meters. Put a Risk Card on screen in every post — it's instantly recognisable.

---

## Per-platform plan

### ▶ YouTube — the depth library
- **Format:** 6–10 min "Risk Reviews" + 60-sec Shorts cut from them.
- **Structure:** hook (the lopsided trade) → score the 3 metrics on screen → show how mitigation moves the verdict → action plan.
- **Cadence:** 1 long video / 2 weeks, 2–3 Shorts / week from offcuts.
- **SEO:** title = the activity people search ("Is scuba diving actually dangerous?").

### ◎ Instagram — the visual system
- **Format:** carousels (slide 1 = the verdict badge, slides 2–4 = the 3 meters, last = action plan), Reels = YouTube Shorts.
- **Cadence:** 3 carousels + 2 Reels / week.
- **Bio link:** to the blog's `ratings.html` calculator.

### f Facebook — community + reach to an older, safety-minded audience
- **Format:** repost Reels, share full blog reviews, run a "Risk of the Week" poll.
- **Cadence:** 3–4 posts / week. Lean into discussion in comments.

### @ Threads — the daily take
- **Format:** text-first. One-line risk takes, "unnecessary risk of the day," replies to the audience's "is X worth it?" questions.
- **Cadence:** daily. This is where you test which topics become full reviews.

---

## Repurposing flow (write once, publish everywhere)

```
1 blog Risk Review  (data/posts.js)
        │
        ├─► YouTube long video  ──► Shorts ──► IG Reels / FB Reels
        ├─► IG / FB carousel  (verdict badge → 3 meters → action plan)
        └─► Threads thread     (the trade in 3 lines + "what should I review next?")
```

## Weekly cadence at a glance

| Day | Threads | Instagram | YouTube | Facebook |
|-----|---------|-----------|---------|----------|
| Mon | take | carousel | Short | poll |
| Tue | take | — | — | share blog |
| Wed | take | Reel | long video (biweekly) | Reel |
| Thu | take | carousel | Short | — |
| Fri | take | Reel | — | share blog |
| Sat/Sun | take | — | Short | community Q&A |

---

## 🤖 Agentic post-generation prompt

Paste this into an LLM (or run it as an agent step) to draft a new blog review in the site's exact format. Then run `node scripts/new-post.mjs` with the resulting scores, or paste the object straight into `data/posts.js`.

```
You write for "Safety First", a blog that scores risks on three 1–10 metrics:
- benefit    (genuine value/joy gained)
- risk       (severity × likelihood of the worst realistic outcome, unprotected)
- mitigation (how much danger you can remove with knowledge, gear, skill, discipline)

Voice: calm, structured, pragmatic, NON-fanatic. The recurring thesis:
eliminate unnecessary risks (high cost, ~zero benefit, like skipping a seatbelt);
earn worthwhile ones (real reward you can make safe, like a trained dive).

TOPIC: <the activity to review>

Return ONE JavaScript object for the SF_POSTS array with these exact keys:
slug, title, activity, date (YYYY-MM-DD), author, emoji, tags (array),
summary (1–2 sentences), scores {benefit, risk, mitigation},
body (array of 4–5 HTML-safe paragraph strings that walk through each metric),
measures (3–5 concrete ways to reduce the danger),
actionPlan (3–4 specific steps the reader can do TODAY — this is mandatory).

Do NOT write a verdict — the site computes it from the three scores. Score honestly.
```

This keeps the human/agent focused on *facts and honest scores*; the site does the grading, so every post stays consistent and comparable.
