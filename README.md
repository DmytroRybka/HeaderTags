# 🛡️ Safety First

**Count the odds. Keep the joy.**

A personal blog and philosophy about risk: tell the *unnecessary* risks (high cost, no real benefit — like skipping a seatbelt) from the *worthwhile* ones (real reward you can make safe — like a well-trained dive), score any decision with a simple 3-metric system, and always minimise the danger that's left.

This is a dependency-free static website. No build step, no npm install — open `index.html` in a browser, or push it to any static host.

---

## What's here

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | The pitch, the two anchor examples, the 3 metrics, latest reviews |
| Philosophy | `philosophy.html` | The manifesto + the four kinds of risk |
| The 3-Star System | `ratings.html` | The metrics explained + a **live risk calculator** |
| Risk Reviews | `blog.html` | Index of all posts |
| Single review | `post.html?slug=…` | One post, rendered from data |

```
safety-first/
├── index.html  philosophy.html  ratings.html  blog.html  post.html
├── assets/        style.css · app.js (the verdict engine) · logo.svg
├── data/posts.js  ← all content lives here (one object per post)
├── scripts/new-post.mjs  ← agentic post scaffolder
├── SOCIAL.md      ← channel strategy + the AI post-generation prompt
└── README.md
```

## The 3-metric system

Score any activity 1–10 on three axes. The **verdict is computed**, never hand-set, so every post is graded by the same rule (see `assets/app.js → verdict()`):

1. **Benefit** — genuine value/joy/utility you gain.
2. **Raw Risk** — severity × likelihood of the worst realistic outcome, unprotected.
3. **Mitigation** — how much of that danger you can buy down with knowledge, gear, skill, discipline.

> `residual danger = risk − 0.6 × mitigation` · `net = benefit − residual`

…which sorts every decision into **Free Lunch**, **Worthwhile Risk**, **Proceed With Care**, **Unnecessary Risk**, or **Reckless Risk**. Play with it live on `ratings.html`.

## Add a post (agentic-friendly)

Content is just data. Either edit `data/posts.js` directly, or scaffold an entry:

```bash
node safety-first/scripts/new-post.mjs --slug helmet-cycling \
  --title "Cycling Without a Helmet" \
  --activity "Riding a bike without a helmet" \
  --benefit 1 --risk 7 --mitigation 1 \
  --emoji "🚲" --tags "cycling,everyday,unnecessary-risk"
```

Then fill in `summary`, `body`, `measures`, `actionPlan`. Every post ends with an **action plan** — the "agentic" part: insight that turns into steps you take today. `SOCIAL.md` contains a ready-to-use prompt so an LLM can draft new posts in this exact format.

## Run it locally

```bash
# simplest — just open the file
open safety-first/index.html        # macOS  (xdg-open on Linux)

# or serve it (nicer URLs, identical behaviour)
cd safety-first && python3 -m http.server 8000   # → http://localhost:8000
```

## Deploy

Any static host works (it's plain HTML/CSS/JS):

- **GitHub Pages** — set Pages to serve this folder, or copy its contents into `/docs` on the default branch.
- **Netlify / Vercel / Cloudflare Pages** — point the project root at `safety-first/`, no build command.

## Social presence

Safety First is designed to live across **YouTube, Instagram, Facebook and Threads**. The `#follow` section on the home page holds the links (swap in your real handles), and `SOCIAL.md` lays out the per-platform content plan, posting cadence and repurposing flow from one blog review.

## Roadmap / product hook

The verdict engine in `app.js` is intentionally standalone (`window.SF.verdict`) so it can be reused later — e.g. an interactive "score your own decision" widget, a newsletter, or embedded in a future product. Pre-rendering each post to its own HTML file for SEO is the natural next step.

---

*Not fanatical — just allergic to risks that cost a lot and give nothing back.*
