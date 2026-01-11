# Phase 1: Foundation - Research

**Researched:** 2026-01-11
**Domain:** Static Site Generators (Astro vs 11ty), bilingual i18n, GitHub Pages deployment
**Confidence:** HIGH

<research_summary>

## Summary

Researched Astro and Eleventy (11ty) static site generators for building a bilingual (Tamil + English) website hosted on GitHub Pages. Both have strong i18n support and GitHub Pages deployment capabilities.

**Astro** is a modern web framework for content-driven websites with built-in i18n routing (added in v3), official GitHub Actions deployment, and component-based architecture. It has excellent documentation and a large ecosystem.

**11ty (Eleventy)** is a simpler, more traditional static site generator with a bundled i18n plugin (added in v2.0), faster build times (4.29s vs 10.07s in benchmarks), and more flexible templating with support for multiple template languages.

**Primary recommendation:** Use **Astro** for this project. Reasons:
1. Built-in i18n routing is more mature and better documented for multilingual sites
2. Better DX for LLM/agent-friendly content workflow with its component system
3. Stronger ecosystem and documentation for 2024-2025
4. Official GitHub Actions deployment is well-maintained

11ty would be a strong alternative if build performance becomes critical or if maximum template flexibility is needed.

</research_summary>

<standard_stack>

## Standard Stack

### Core - Recommendation: Astro

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x (current) | Static site generator with i18n | Built-in i18n routing, excellent docs, large ecosystem |
| Node.js | 18+ | Runtime | Required by both Astro and 11ty |

### Supporting - For Astro

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | latest | Sitemap generation | For SEO (multi-language sitemaps) |
| @astrojs/rss | latest | RSS feed generation | For blog/news feeds |

### Supporting - Alternative: 11ty

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @11ty/eleventy | 3.1.2+ | Static site generator | If build performance is critical |
| @11ty/eleventy (I18nPlugin) | bundled | i18n plugin | Built-in to 11ty v2.0+ |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro | 11ty | 11ty faster (~2.3x), simpler; Astro has better i18n DX, larger ecosystem |

**Installation (Astro):**

```bash
# Using recommended setup
npm create astro@latest

# Or manually
npm install astro
```

**Installation (11ty alternative):**

```bash
npm install @11ty/eleventy
```

</standard_stack>

<architecture_patterns>

## Architecture Patterns

### Recommended Project Structure (Astro)

```
src/
├── content/              # Markdown collections
│   ├── en/              # English content
│   │   ├── about.md
│   │   └── blog/
│   └── ta/              # Tamil content
│       ├── about.md
│       └── blog/
├── layouts/             # Shared layouts
│   ├── Layout.astro
│   └── BlogPost.astro
├── components/          # Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   └── LanguageSwitch.astro
├── pages/               # Routes
│   ├── index.astro      # Landing page (language selector)
│   └── [...lang]/       # i18n routing (automatic with Astro config)
└── data/                # Static data (JSON/CSV for Phase 4)
    └── fleets.json
public/                  # Static assets
└── fonts/               # Tamil fonts (Phase 2)
```

### Pattern 1: Astro i18n Configuration

**What:** Built-in i18n routing with automatic URL generation
**When to use:** Any multilingual Astro project

**Example:**
```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://username.github.io/website',
  base: '/website',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ta'],
    routing: {
      prefixDefaultLocale: false  // / for English, /ta for Tamil
    }
  }
})
```

### Pattern 2: Content Collections with i18n

**What:** Type-safe content collections for multilingual markdown
**When to use:** Blog posts, campaigns, reports

**Example:**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    lang: z.enum(['en', 'ta']),
  })
})

export const collections = { blog }
```

### Pattern 3: Bilingual Directory Structure (11ty Alternative)

**What:** Folder-based language separation with locale_url filter
**When to use:** If 11ty is chosen instead of Astro

**Example:**
```
src/
├── en/
│   ├── index.njk
│   └── about.njk
└── ta/
    ├── index.njk
    └── about.njk
```

```javascript
// eleventy.config.js (ESM)
import { I18nPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en",
  });
}
```

### Anti-Patterns to Avoid

- **Hardcoded language prefixes**: Use Astro's i18n config instead of manual routing
- **Duplicate content files**: Use content collections, not separate file hierarchies
- **Mixed languages in same file**: Keep strict language separation per file
- **Manual hreflang links**: Use Astro's i18n helpers or 11ty's locale_links filter

</architecture_patterns>

<dont_hand_roll>

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| i18n routing | Manual /en, /ta folder logic | Astro built-in i18n or 11ty I18nPlugin | Automatic URL generation, hreflang, locale switching |
| Markdown processing | Custom MD parser | Astro content collections or 11ty built-in | Front matter, type safety, performance |
| Deployment workflow | Manual build/deploy scripts | Official GitHub Actions | Astro: withastro/action@v5, 11ty: marketplace actions |
| Sitemap generation | Manual XML building | @astrojs/sitemap | Automatic for multi-language, change frequency |
| RSS feeds | Manual RSS XML | @astrojs/rss | Proper encoding, validation |
| Language detection | Custom browser logic | Astro i18n routing | Server-side routing, no client JS needed |

**Key insight:** Both Astro and 11ty have solved the common static site problems. Building custom i18n routing or deployment workflows is unnecessary and error-prone. The bundled plugins are well-tested and handle edge cases.

</dont_hand_roll>

<common_pitfalls>

## Common Pitfalls

### Pitfall 1: GitHub Pages pathPrefix Issues

**What goes wrong:** Assets return 404, links break when deployed to `username.github.io/repo-name/`

**Why it happens:** GitHub Pages serves from subdirectory for project pages, but SSG builds for root `/`

**How to avoid (Astro):**
```typescript
// astro.config.mjs
export default defineConfig({
  base: '/repo-name',  // Must match GitHub repo name
  site: 'https://username.github.io',
})
```

**How to avoid (11ty):**
```javascript
// eleventy.config.js
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en",
  });
};
```

**Warning signs:** Local development works, deployed site has broken assets

### Pitfall 2: Tamil Font Rendering

**What goes wrong:** Tamil text appears with boxes or incorrect characters

**Why it happens:** Missing font files or wrong font-family fallback

**How to avoid:** Use Google Fonts Noto Sans Tamil in Phase 2, include proper font-face declarations

**Warning signs:** Tamil content shows as [][][] or boxes

### Pitfall 3: Mixed Content Warnings

**What goes wrong:** Site loads over HTTPS but some resources over HTTP

**Why it happens:** Hardcoded http:// URLs in templates or data

**How to avoid:** Use protocol-relative URLs `//` or absolute `https://` URLs

**Warning signs:** Browser console shows mixed content errors

### Pitfall 4: Build Cache Issues

**What goes wrong:** Changes don't appear after deployment

**Why it happens:** GitHub Pages cache or browser cache serving old content

**How to avoid:** Add cache headers in GitHub Pages config, use cache-busting for assets

**Warning signs:** Deployed site doesn't match local build

</common_pitfalls>

<code_examples>

## Code Examples

### Astro GitHub Actions Deployment

```yaml
# Source: https://docs.astro.build/en/guides/deploy/github/
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
      - name: Build
        uses: withastro/action@v5
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

### Astro i18n Language Switcher Component

```astro
// Source: Astro i18n patterns
---
const { currentLocale } = Astro.props;
const locales = ['en', 'ta'];
const path = Astro.url.pathname;
---
<div class="language-switch">
  {locales.map(locale => (
    <a
      href={`/${locale === 'en' ? '' : locale}${path}`}
      class={currentLocale === locale ? 'active' : ''}
    >
      {locale === 'en' ? 'English' : 'தமிழ்'}
    </a>
  ))}
</div>
```

### 11ty i18n with locale_links Filter

```njk
<!-- Source: https://www.11ty.dev/docs/plugins/i18n/ -->
{# _includes/layouts/base.njk #}
<!doctype html>
<html lang="{{ lang }}">
  <head>
    {# SEO: Alternate language links #}
    <link rel="alternate" hreflang="{{ lang }}" href="{{ site.url }}{{ page.url }}">
    {% for link in page.url | locale_links %}
    <link rel="alternate" hreflang="{{ link.lang }}" href="{{ site.url }}{{ link.url }}">
    {% endfor %}
  </head>
  <body>
    {{ content }}
  </body>
</html>
```

</code_examples>

<sota_updates>

## State of the Art (2024-2025)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| External i18n plugins | Astro built-in i18n (v3+) | 2023-2024 | No need for third-party i18n libraries |
| 11ty with @11ty/eleventy-plugin-i18n | Bundled I18nPlugin | v2.0 (2023) | Plugin included by default |
| Manual GitHub Actions | Official withastro/action@v5 | 2024 | One-command deployment |
| CommonJS modules | ESM (Eleventy v3) | October 2024 | Full ESM support in 11ty 3.0 |

**New tools/patterns to consider:**
- **Astro Content Collections:** Type-safe content with Zod schema validation
- **11ty WebC:** Web Components as templates (newer paradigm)
- **Vite integration:** Both tools now use Vite for dev server

**Deprecated/outdated:**
- **@astrojs/i18n (external plugin):** Superseded by built-in i18n routing
- **11ty v1.x patterns:** ESM is now standard in v3

</sota_updates>

<open_questions>

## Open Questions

1. **Tamil font selection for Phase 2**
   - What we know: Need Google Fonts (Noto Sans Tamil)
   - What's unclear: Which specific font variant, file size impact
   - Recommendation: Decide in Phase 2 when implementing design system

2. **Data format for fleet/route master data (Phase 4)**
   - What we know: JSON or CSV will work with both Astro and 11ty
   - What's unclear: Exact data structure from sources
   - Recommendation: Choose format based on data source during Phase 4

</open_questions>

<sources>

## Sources

### Primary (HIGH confidence)
- [Astro Deployment Documentation](https://docs.astro.build/en/guides/deploy/github/) - Official GitHub Pages deployment guide
- [11ty i18n Plugin Documentation](https://www.11ty.dev/docs/plugins/i18n/) - Built-in internationalization
- [Astro Getting Started](https://docs.astro.build/en/getting-started/) - Core setup and features
- [11ty Getting Started](https://www.11ty.dev/docs/) - v3.1.2 documentation

### Secondary (MEDIUM confidence - verified with official docs)
- [Eleventy 2025 Review](https://www.11ty.dev/blog/review-2025/) - Current ecosystem status
- [Astro i18n Routing - Italian Docs](https://docs.astro.build/it/guides/internationalization/) - Official i18n guide (verified)
- [Making a multilingual website with 11ty](https://francisbeaudet.com/en/blog/making-a-multilingual-website-with-eleventy/) - July 2025 guide (verified patterns with docs)

### Tertiary (MEDIUM confidence - comparison articles)
- [Astro vs 11ty Comparison](https://blog.stackademic.com/astro-js-vs-eleventy-a-comprehensive-comparison-for-static-site-generators-15f88ebdb48a)
- [Eleventy vs Astro Build Time Benchmark](https://piperhaywood.com/inexactly-benchmarking-eleventy-vs-astro-build-times/) - Performance comparison

</sources>

<metadata>

## Metadata

**Research scope:**
- Core technology: Astro 5.x, 11ty v3.1.2
- Ecosystem: i18n routing, GitHub Actions deployment
- Patterns: Bilingual content structure, i18n routing configuration
- Pitfalls: GitHub Pages path issues, Tamil font rendering

**Confidence breakdown:**
- Standard stack: HIGH - verified with official docs
- Architecture: HIGH - official documentation and examples
- Pitfalls: HIGH - documented in official guides and community
- Code examples: HIGH - from official sources

**Research date:** 2026-01-11
**Valid until:** 2026-02-11 (30 days - both ecosystems are stable)

</metadata>

---

*Phase: 01-foundation*
*Research completed: 2026-01-11*
*Ready for planning: yes*
