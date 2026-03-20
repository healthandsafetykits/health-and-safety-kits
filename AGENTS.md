# AGENTS.md — Health and Safety Kits Project Rules

## Prime Directive

**Every action taken on this project must be evaluated against the Business Plan (`.memory/businessPlan.md`).** The singular financial goal is **EUR 10,000+ net revenue per annum.** No decision should be made that does not directly or indirectly serve this target.

## Mandatory Pre-Task Protocol

Before performing ANY task on this project, you MUST:

1. **Read** `.memory/businessPlan.md` — This is the authoritative source for all business decisions.
2. **Read** `.memory/activeContext.md` — Current project state and immediate goals.
3. **Read** `.memory/systemPatterns.md` — Established technical and business patterns.
4. **Apply the Decision Framework** (Section 10 of the Business Plan) to validate that your planned action is correct.

## The Revenue Decision Framework

When making any decision — feature, content, design, infrastructure, or otherwise — apply these filters **in order**:

### Filter 1: Revenue Impact
> "Does this action move us toward EUR 10K/year revenue?"

- If YES: Proceed to Filter 2.
- If NO: Do not do it. Suggest a revenue-impacting alternative.
- If UNCLEAR: Estimate the revenue path (traffic → conversion → sales) and quantify. If you cannot draw a line from the action to revenue, deprioritise it.

### Filter 2: Operational Constraint
> "Does this respect the hands-off constraint (weekly check-in only)?"

- If it requires ongoing manual work beyond the weekly cadence defined in the Business Plan Section 7.1, redesign the approach to be automated or batched.
- One-time build work is fine. Recurring manual tasks are not acceptable.

### Filter 3: Customer Fit
> "Does this serve sole traders and micro businesses (1-5 staff) in UK/IE non-construction trades?"

- All content must use UK English, reference UK/IE regulations (HSWA 1974, MHSWR 1999, SHWW Act 2005), and be written for non-experts.
- Do NOT create content for US/OSHA compliance, large enterprises, or construction-specific trades (HASpod's territory).

### Filter 4: Impact Priority
> "Is this the highest-impact action available right now?"

Priority order (always):
1. **Products that can be sold** (kits, individual documents) — direct revenue
2. **Content that drives traffic** (blog posts targeting buying-intent keywords) — indirect revenue
3. **Conversion optimisation** (page copy, CTAs, pricing psychology) — revenue multiplier
4. **Infrastructure improvements** (tech, SEO plumbing, analytics) — enabler
5. **Nice-to-haves** (design polish, refactoring, documentation) — lowest priority

### Filter 5: Compounding Value
> "Does this action compound over time?"

- **Prefer:** SEO content (ranks for years), email lists (grows and converts repeatedly), product catalogue expansion (more keywords, more sales)
- **Avoid:** One-off social media posts, paid advertising (unless testing), features that don't drive sales

## Revenue Targets (from Business Plan)

| Timeframe | Monthly Visitors | Monthly Sales | Monthly Revenue | Cumulative |
|---|---|---|---|---|
| Month 6 | 400 | 8 | EUR 400 | EUR 1,500 |
| Month 12 | 1,000 | 20 | EUR 925 | EUR 5,500 |
| Month 18 | 1,500 | 30 | EUR 1,400 | EUR 13,000 |

**If any metric is behind target, escalate by applying the Revenue Acceleration Levers from Business Plan Section 6.4.**

## Product Rules

1. **Three revenue streams must be maintained:** Trade kits (70%), individual documents (20%), upsells (10%).
2. **Every new trade kit must include both Basic (£49) and Pro (£79) tiers.**
3. **Individual documents must be priced at £12-£19 each** — above HASpod's £5 (justified by trade-specific pre-filled content) but below kit price (to create upsell path).
4. **All documents must be pre-filled with trade-specific content** — real hazards, real chemicals, real control measures. This is the core differentiator. Never ship blank templates.
5. **Product launch sequence follows Business Plan Section 3.3.** Cleaning first, then Landscaping, Beauty, Dog Grooming.

## Content Rules

1. **All blog posts must target a specific keyword with buying intent.** "COSHH assessment for cleaning chemicals" > "what is COSHH" (the former converts, the latter just informs).
2. **Every blog post must include at least one CTA linking to a relevant product or the free sample.**
3. **Content target: 30 blog posts within 6 months of launch** (5 existing + 25 new). See Business Plan Section 4.1 for the full content plan.
4. **Trade-specific posts have higher priority than generic compliance posts** — they rank faster (less competition) and convert better (closer to purchase intent).
5. **All content must reference UK and Irish regulations.** Include both jurisdictions in every compliance post.

## Technical Rules

1. **Build must pass before any commit.** Run `npm run build` and verify zero errors.
2. **Static output preferred.** Remove the `@astrojs/netlify` adapter and use default static output (matches SMBCyberHub pattern, stays within Netlify free tier).
3. **Update sitemap dates in `astro.config.mjs`** when any page is meaningfully edited.
4. **All blog post frontmatter must include:** title, description, date, dateModified, tags, featured (boolean).
5. **Trailing slashes enforced** (`trailingSlash: 'always'` in astro.config.mjs).
6. **Never commit secrets, API keys, or Umami IDs to the repository.** Use Netlify environment variables.

## Decision Triggers (from Business Plan Section 9)

These are automatic responses to underperformance:

- **Monthly visitors < 200 by month 6:** Increase content velocity to 2 posts/week.
- **Conversion rate < 1% by month 4:** Redesign product pages, add social proof, test pricing.
- **Zero sales after month 2:** Validate product quality with 5 free beta testers.
- **EUR 10K achieved before month 12:** Expand to Tier 3 trades, consider AU/NZ localisation.

## Memory Bank Update Protocol

After every task completion:
1. **`progress.md`**: Log what was done, why, and consequences.
2. **`activeContext.md`**: Update current status and next milestones.
3. **`systemPatterns.md`**: Update if a new pattern was established.
4. **`businessPlan.md`**: Update if a business assumption changed or new data was discovered.

## Build / Run Commands

- `npm install` — Install dependencies
- `npm run dev` — Local development server (localhost:4321)
- `npm run build` — Production build to `./dist/`
- `npm run preview` — Preview production build

## Key File Paths

| Purpose | Path |
|---|---|
| Business Plan | `.memory/businessPlan.md` |
| Active Context | `.memory/activeContext.md` |
| Progress Log | `.memory/progress.md` |
| System Patterns | `.memory/systemPatterns.md` |
| Astro Config | `astro.config.mjs` |
| Content Schema | `src/content.config.ts` |
| Blog Posts | `src/content/posts/*.md` |
| Base Layout | `src/layouts/BaseLayout.astro` |
| Blog Layout | `src/layouts/BlogPost.astro` |
| Global Styles | `src/styles/global.css` |
| Netlify Config | `netlify.toml` |
| Security Headers | `public/_headers` |
| Redirects | `public/_redirects` |
