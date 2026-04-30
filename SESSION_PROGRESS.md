# C&S Demolition PSEO — Session Progress Log

## Session 3 — March 18, 2026

### Summary
Completed Section 3 of the SEO Roadmap: full C&S Demolition PSEO site build.

---

### What Was Built

#### Pages Created / Modified

| File | Status | Notes |
|------|--------|-------|
| `pages/index.tsx` | ✅ Rewritten | LocalBusiness + FAQPage JSON-LD, OG tags, geo H1, Why Choose section, FAQ accordion, internal links |
| `pages/demolition/[service]/index.tsx` | ✅ NEW | Service hub pages — cities grouped by county, cross-links |
| `pages/demolition/[service]/[city].tsx` | ✅ Fixed | Dynamic `allServices` cross-links (was hardcoded/empty) |
| `pages/blog/index.tsx` | ✅ NEW | Blog listing page, category filter, post grid |
| `pages/blog/[slug].tsx` | ✅ NEW | Blog post page with Article JSON-LD schema, related posts |
| `pages/sitemap.xml.tsx` | ✅ NEW | Dynamic sitemap covering all 2,500+ pages |
| `pages/robots.txt.tsx` | ✅ NEW | robots.txt pointing to sitemap |

#### Data Files

| File | Before | After |
|------|--------|-------|
| `data/services.csv` | 10 services | 18 services |
| `data/cities.csv` | 108 cities | 138 cities (5 counties) |
| `data/blog-posts.json` | (missing) | 26 blog posts |

#### Code

- `lib/getData.ts` — Added `BlogPost` interface + `getBlogPosts()`, `getBlogPostBySlug()`, `getBlogCategories()` functions
- `tsconfig.json` — Added `_911junkca-files` to exclude list (stray directory was causing TS errors)
- `public/sitemap.xml` — Removed (conflicted with `pages/sitemap.xml.tsx`)

---

### Page Count Math

| Page Type | Count |
|-----------|-------|
| Service hub pages (`/demolition/[service]`) | 18 |
| City × Service landing pages (`/demolition/[service]/[city]`) | 18 × 138 = 2,484 |
| County pages (`/county/[county]`) | 5 |
| Blog posts (`/blog/[slug]`) | 26 |
| Static pages (home, services, areas, blog index, contact) | ~5 |
| **Total** | **~2,538** |

---

### Services (18 total)
1. interior-demolition
2. pool-demolition
3. shed-demolition
4. deck-demolition
5. wall-removal
6. concrete-removal
7. kitchen-demolition
8. bathroom-demolition
9. garage-demolition
10. selective-demolition
11. flooring-removal
12. driveway-removal
13. chimney-demolition
14. commercial-demolition
15. mobile-home-demolition
16. fence-removal
17. addition-demolition
18. stucco-removal

### Cities (138 total across 5 counties)
- **Los Angeles**: 52 cities
- **Orange**: 30 cities
- **Riverside**: 25 cities
- **San Bernardino**: 18 cities
- **Ventura**: 13 cities

---

### Blog Post Categories (26 posts)
- Cost Guides (10 posts)
- How-To Guides (6 posts)
- Permits & Regulations (3 posts)
- City Guides (4 posts)
- Commercial (3 posts)

---

### Deploy Instructions

From your Windows terminal, navigate to the cns-demolition-pseo folder and run:

```
vercel --prod
```

After deploy, go to Google Search Console → Sitemaps → submit:
```
https://cnsdemo.com/sitemap.xml
```

---

### Known Issues Fixed This Session
- Removed `public/sitemap.xml` that conflicted with `pages/sitemap.xml.tsx`
- Excluded `_911junkca-files` directory from TypeScript compiler
- TypeScript check: **0 errors** (`npx tsc --noEmit` passes clean)

---

### Next Steps
1. **Deploy** — run `vercel --prod` from `C:\Users\antou\Documents\cns-demolition-pseo` (or wherever the folder lives)
2. **Submit sitemap** — Google Search Console → cnsdemo.com → Sitemaps → `https://cnsdemo.com/sitemap.xml`
3. **Directory listings** — Yelp (done), add: Google Business Profile, BBB, Angi, HomeAdvisor, Houzz, Thumbtack
4. **Re-deploy 911 Junk CA** — pending `&amp;` fix on homepage trust bar (fixed in previous session, just needs re-deploy)
5. **Social media** — Instagram + TikTok for both businesses
