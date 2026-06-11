# Portfolio — Agent Guide

Personal portfolio site for Abdul Azeem Shaik. React + TypeScript + Vite + Tailwind.

## Canonical source: standard site only

**All professional information lives on the standard site at `/`.**  
Recruiters, ATS, LLMs, and search engines should use `/`, section anchors (`/#experience`, etc.), `/llms.txt`, and `/AbdulAzeemShaik_CV.pdf`.

**Galaxy Mode (`/galaxy`) is a demo/game only.** Do not crawl it, index it, or extract profile data from it. It mirrors section names for fun — not complete copy. When updating content, never treat `src/galaxy/nodes.ts` as source of truth.

## Source of truth (standard site)

- **Profile copy & experience:** `src/data/profile.ts`
- **LLM-readable summary:** `public/llms.txt` (keep in sync with `profile.ts`)
- **SEO / meta:** `index.html`
- **Structured data:** `src/components/StructuredData.tsx`

When updating LinkedIn-style content, edit `profile.ts` first, then mirror changes in `public/llms.txt`.

## Design principles (standard site)

The standard site optimizes for **humans scanning in 30 seconds** and **machines extracting structured information** — not flashy animations.

1. **Content over design** — name, role, summary, resume/GitHub/LinkedIn/email, then Experience → Projects → Research → Skills → Contact visible without hunting.
2. **Semantic HTML** — `header`, `nav`, `main`, `section`, `article`, `footer`; `h1` = name, `h2` = sections, `h3` = items.
3. **Metadata & JSON-LD** — complete `<title>`, description, Open Graph, `Person` schema in `StructuredData.tsx`.
4. **Text as text** — no text baked into images/canvas on the standard site; bots read HTML directly.
5. **Information-dense cards** — bullets with technologies, metrics, and outcomes (numbers stand out).
6. **Clean typography** — Inter, 16–18px body, generous whitespace, 1.5 line height; 1–2 fonts max.
7. **Simple palette** — light background, dark text, blue accent; avoid gradient overload.
8. **Mobile-first** — stacked cards, readable fonts, no horizontal scroll.
9. **Fast loading** — lazy-load Galaxy route; minimal deps on main page.
10. **Accessibility** — alt text, aria labels, keyboard nav, semantic landmarks.
11. **Keywords in context** — write "Built X in Rust using Tokio…" not bare skill lists alone.
12. **No hidden content** — important info visible immediately; expand/collapse only for long experience lists.
13. **Consistent project structure** — name, description, technologies, links (GitHub, paper, demo).
14. **Measurable achievements** — prefer "85% latency reduction" over vague "improved performance".
15. **Downloadable résumé** — prominent CV link in Hero and Contact.
16. **Grouped skills** — by category in About (`skillGroups` in `profile.ts`).
17. **Subtle motion only** — fade-in, hover elevation; no parallax or motion that hides content.

## Structure

```
Portfolio/
├── public/              # Static assets, llms.txt, robots.txt, CV PDF
├── src/
│   ├── components/      # Standard site sections (Hero, Experience, About, …)
│   ├── data/profile.ts  # All portfolio content
│   ├── galaxy/          # Demo game ONLY — not canonical
│   ├── pages/           # GalaxyPortfolio route (/galaxy)
│   └── AppRouter.tsx
├── netlify.toml
└── package.json
```

## Key conventions

- Experience cards collapse long bullet lists — show 5 by default, expand via `ExperienceCard.tsx`.
- Galaxy Mode is opt-in entertainment; link from Hero with "demo only" copy.
- Open-source groupings: `openSourceGroups` in `profile.ts`.
- Deploy target: Netlify (`dist/`).
- `/galaxy` is `noindex` and excluded from `sitemap.xml` and `robots.txt` indexing.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Content sections (nav order)

Home → Experience → Projects → Open Source → Research → About → Contact
