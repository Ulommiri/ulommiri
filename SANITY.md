# Sanity CMS

The landing page content is editable in Sanity Studio, embedded in this app at **`/studio`**.

- **Project ID:** `6yofydf3`
- **Dataset:** `production`
- **Studio URL (local):** http://localhost:3010/studio
- **Studio URL (prod):** https://YOUR-DOMAIN/studio

## What the client can edit

Two documents show up in the Studio:

**Home Page** — everything on the landing page:
- Hero (background video URL, eyebrow, headline lines, standfirst)
- The House (ethos eyebrow, body, signature)
- Chambers (name, tagline, description, size label, image)
- Experiences (title, description)
- Gallery (image + caption)
- FAQs (question, answer)
- Reserve (eyebrow, headline, body, button label, note)

**Site Settings** — global footer/contact:
- Contact email, phone numbers
- Social links
- Footer tagline, footer location line

Item order in the lists is the display order. Changes appear on the site after **Publish**.

## How it stays safe

Every section reads from Sanity but **falls back to the original hard-coded content**
in `src/data/site.ts` if Sanity is empty or unreachable. The site can never render blank.

## Environment variables

Local values live in `.env.local`. Set the same public vars on the host (DigitalOcean):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=6yofydf3
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

`SANITY_API_WRITE_TOKEN` is only used by the one-off seed script — it is **not** needed at
runtime and must **not** be committed (it is covered by `.gitignore`'s `.env*` rule).

## CORS

The Studio talks to Sanity from the browser, so each origin it runs on must be allowed at
[sanity.io/manage → API → CORS origins](https://www.sanity.io/manage/project/6yofydf3/api):

- `http://localhost:3010` (dev — already added)
- `https://YOUR-DOMAIN` (add with "Allow credentials" when the site is deployed)

## Re-seeding (optional)

Content was already seeded once. To reset the two documents back to the original copy +
images, put an Editor token in `SANITY_API_WRITE_TOKEN` in `.env.local` and run:

```
npm run seed
```

This overwrites the `home` and `settings` documents (`createOrReplace`).
