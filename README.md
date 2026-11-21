# Языковой центр «Лингвист» — новый сайт

Redesign of https://www.course-linguist.ru/ (Тверь). React + Vite + TypeScript,
Supabase for enquiries, deployed to Cloudflare Pages.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
npm run dev
```

Without Supabase variables the site still runs: the enquiry form stores
submissions in the browser's localStorage (demo mode) and /admin shows a
"not configured" notice.

## Production build

```bash
npm run build   # output: dist/
```

Cloudflare Pages settings: framework preset "Vite", build command
`npm run build`, output directory `dist`, environment variables
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Database

Run `supabase/schema.sql` in the Supabase SQL Editor. It creates the
`enquiries` table with Row Level Security: anonymous visitors can only
insert a consented enquiry; only the signed-in administrator can read
or update. Create the administrator in Supabase → Authentication → Users.

## Security notes

- Only the Supabase **anon public** key is used in the frontend.
- The **service-role** key is never used, never committed, never shared.
- `.env*` files are git-ignored (except `.env.example`).
