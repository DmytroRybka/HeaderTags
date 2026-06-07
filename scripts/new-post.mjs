#!/usr/bin/env node
/*
 * Agentic post scaffolder for Safety First.
 *
 * Generates a new risk-review entry and inserts it into data/posts.js so a
 * human (or an AI agent following SOCIAL.md) can write a post by supplying
 * just the facts and the three scores — the verdict is computed by the site.
 *
 * Usage:
 *   node scripts/new-post.mjs --slug helmet-cycling \
 *     --title "Cycling Without a Helmet" \
 *     --activity "Riding a bike without a helmet" \
 *     --benefit 1 --risk 7 --mitigation 1 \
 *     --emoji "🚲" --tags "cycling,everyday,unnecessary-risk"
 *
 * Omit flags to get a filled-in placeholder you can edit by hand.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS = join(__dirname, "..", "data", "posts.js");

function arg(name, fallback) {
  const i = process.argv.indexOf("--" + name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const today = new Date().toISOString().slice(0, 10);
const slug = arg("slug", "new-risk-" + today);
const title = arg("title", "Untitled Risk Review");
const activity = arg("activity", "Describe the activity here");
const benefit = Number(arg("benefit", 5));
const risk = Number(arg("risk", 5));
const mitigation = Number(arg("mitigation", 5));
const emoji = arg("emoji", "🛡️");
const author = arg("author", "Dmytro");
const tags = arg("tags", "everyday").split(",").map((t) => t.trim()).filter(Boolean);

const src = readFileSync(POSTS, "utf8");
if (src.includes(`slug: "${slug}"`)) {
  console.error(`✗ A post with slug "${slug}" already exists. Pick another --slug.`);
  process.exit(1);
}

const j = JSON.stringify;
const entry = `  {
    slug: ${j(slug)},
    title: ${j(title)},
    activity: ${j(activity)},
    date: ${j(today)},
    author: ${j(author)},
    emoji: ${j(emoji)},
    tags: ${j(tags)},
    summary:
      "One or two sentences: name the trade and the verdict in plain language.",
    scores: { benefit: ${benefit}, risk: ${risk}, mitigation: ${mitigation} },
    body: [
      "Open with the trade — what you gain vs. what you could lose.",
      "Walk through Benefit, then Raw Risk, then Mitigation, honestly.",
      "State the verdict and why this risk lands in its category."
    ],
    measures: [
      "Concrete way to reduce the danger.",
      "Another concrete measure."
    ],
    actionPlan: [
      "A step the reader can take today.",
      "A second, specific action."
    ]
  }`;

// Insert before the closing "];" of the SF_POSTS array.
const close = src.lastIndexOf("];");
if (close === -1) {
  console.error("✗ Could not find the end of the SF_POSTS array in data/posts.js");
  process.exit(1);
}
const before = src.slice(0, close).replace(/\s*$/, "");
const needsComma = /\}\s*$/.test(before);
const out = before + (needsComma ? "," : "") + "\n" + entry + "\n];\n";
writeFileSync(POSTS, out);

console.log(`✓ Added "${title}" (slug: ${slug}) to data/posts.js`);
console.log(`  Scores → benefit ${benefit}, risk ${risk}, mitigation ${mitigation}`);
console.log(`  Now edit summary, body, measures and actionPlan, then open blog.html.`);
