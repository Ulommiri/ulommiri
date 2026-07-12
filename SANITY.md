# Sanity CMS

The landing page content is editable in Sanity Studio, embedded in this app at **`/studio`**.

- **Project ID:** `6yofydf3`
- **Dataset:** `production`
- **Studio URL (local):** http://localhost:3000/studio
- **Studio URL (prod):** https://YOUR-DOMAIN/studio

## What the client can edit

Every page is its own document in the Studio:

**Home Page** — everything on the landing page:
- Hero (background video URL, eyebrow, headline lines, standfirst)
- The House (ethos eyebrow, body, signature)
- Chambers (name, tagline, description, size label, image)
- Experiences (title, description)
- Gallery (image + caption)
- FAQs (question, answer)
- Reserve (eyebrow, headline, body, button label, note)

**Experiences Page** — the `/experiences` page:
- Hero (background video URL, fallback image, eyebrow, two title lines, subtitle)
- Experiences (title, tagline, description, meta label, image) — each becomes a row
- Call to action (two title lines, body)

**Accommodations Page** — the `/accommodations` page:
- Hero (video URL, fallback image, eyebrow, two title lines, subtitle)
- Call to action (two title lines, body)
- The room rows **reuse the Home Page → Chambers** list (edit chambers once, both pages update)

**Events Page** — the `/events` page:
- Hero (video URL, fallback image, eyebrow, two title lines, subtitle)
- Events (title, tagline, description, meta label, image) — each becomes a row
- Call to action (two title lines, body, button label)

**Gallery Page** — the `/gallery` page:
- Intro (eyebrow, two title lines)
- Call to action (two title lines, body)
- The images **reuse the Home Page → Gallery** list

**Location Page** — the `/location` page:
- Hero (video URL, fallback image, eyebrow, two title lines, subtitle)
- The Setting (label, statement)
- Detail cards (title, body)
- Closing (image, line, coordinates label)
- Call to action (two title lines, body)

**Reserve Page** — the `/reserve` page:
- Hero (video URL, fallback image, eyebrow, two title lines, subtitle)
- Enquire (label, headline lead line, gold accent, body)
- Email and phone shown here **reuse Site Settings**

Any hero plays its background video when a URL is set, and shows the fallback
image while it loads or if no URL is present.

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

- `http://localhost:3000` (dev — add at the CORS origins link above)
- `https://YOUR-DOMAIN` (add with "Allow credentials" when the site is deployed)

## Seeding / re-seeding

The seed script fills every page document with the original copy + images. With an Editor
token in `SANITY_API_WRITE_TOKEN` in `.env.local`, run:

```
npm run seed
```

It is **safe to re-run**: every document uses `createIfNotExists`, so the seed **only fills
documents that don't exist yet** and **never overwrites** content you've edited in the Studio.

To reset a single page back to the original copy, delete that document in `/studio` first,
then re-run `npm run seed` — it will recreate just the missing one.
