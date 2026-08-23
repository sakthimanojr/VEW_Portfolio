# Vinayaga Engineering Works — Website

A production-ready, dynamic website for Vinayaga Engineering Works, built with Next.js (App
Router), TypeScript, Tailwind CSS, Supabase (auth + database) and Cloudinary (image storage).

The public site is fully dynamic: every gallery photo is stored in Supabase/Cloudinary and
managed by the business owner through a password-protected `/admin` dashboard — **no code
changes are ever required to add, remove, reorder, or re-cover photos.**

---

## 1. What you need before you start

- A free [Supabase](https://supabase.com) account
- A free [Cloudinary](https://cloudinary.com) account
- A [Vercel](https://vercel.com) account (for deployment)
- A [GitHub](https://github.com) account (recommended, for deploying to Vercel via Git)
- Node.js 18.18+ installed locally **only if** you want to run the site on your own computer
  before deploying (optional — you can also deploy directly from GitHub without ever running it
  locally)

You do not need to know how to code to complete the setup below — just follow the steps in
order.

---

## 2. Set up Supabase (authentication + database)

1. Go to [supabase.com](https://supabase.com) → **New project**.
   - Choose any project name (e.g. `vinayaga-engineering-works`).
   - Set a database password and save it somewhere safe.
   - Choose a region close to India (e.g. Singapore).
2. Once the project is ready, open **SQL Editor** in the left sidebar.
3. Open the file `supabase/migrations/0001_init.sql` from this project, copy its entire
   contents, paste it into the SQL Editor, and click **Run**.
   - This creates the `gallery_categories` and `gallery_images` tables, seeds the 5 fixed
     service categories, and sets up Row Level Security so visitors can only *view* photos and
     only logged-in admins can add/edit/delete them.
4. Create the owner's admin login:
   - Go to **Authentication → Users → Add user → Create new user**.
   - Enter the owner's email and a strong password.
   - Leave "Auto Confirm User" checked so no email verification step is required.
   - This is the email/password the owner will use to log in at `/admin/login`. Anyone you add
     as a Supabase Auth user here becomes an admin — only add trusted people.
5. Collect your Supabase credentials for later:
   - Go to **Project Settings → API**.
   - Copy the **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`.
   - Copy the **anon / public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Copy the **service_role** key (click "Reveal") → this is `SUPABASE_SERVICE_ROLE_KEY`.
     **Never share this key or put it in client-side code — it bypasses all security rules.**

---

## 3. Set up Cloudinary (image storage)

1. Go to [cloudinary.com](https://cloudinary.com) → sign up for a free account.
2. On your Cloudinary **Dashboard**, copy:
   - **Cloud name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** (click "reveal") → `CLOUDINARY_API_SECRET`

That's it — no bucket or folder configuration is required. The app creates a
`vinayaga-engineering-works` folder automatically on first upload, and Cloudinary automatically
serves optimized, responsive, WebP/AVIF images.

---

## 4. Configure environment variables

1. Copy `.env.example` to a new file named `.env.local` (for local development) — or, if
   deploying straight to Vercel, you'll paste these same values into Vercel's dashboard (see
   Section 6).
2. Fill in every value:

```
NEXT_PUBLIC_SUPABASE_URL=              # from Supabase → Project Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY=         # from Supabase → Project Settings → API
SUPABASE_SERVICE_ROLE_KEY=             # from Supabase → Project Settings → API (keep secret)

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=     # from Cloudinary dashboard
CLOUDINARY_API_KEY=                    # from Cloudinary dashboard
CLOUDINARY_API_SECRET=                 # from Cloudinary dashboard (keep secret)

NEXT_PUBLIC_SITE_URL=                  # your live domain, e.g. https://www.vinayagaengineeringworks.com
NEXT_PUBLIC_GOOGLE_MAPS_URL=           # a normal Google Maps share link to your location
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=     # a Google Maps *embed* URL (Maps → Share → Embed a map → copy the src="...")
NEXT_PUBLIC_INSTAGRAM_URL=             # full URL to the company Instagram profile
NEXT_PUBLIC_FACEBOOK_URL=              # full URL to the company Facebook page
```

**Never commit `.env.local` to Git.** It's already excluded via `.gitignore`.

---

## 5. Run it locally (optional)

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for
the admin dashboard.

---

## 6. Deploy to Vercel

1. Push this project to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import that GitHub repo.
3. In the **Environment Variables** step, add every variable listed in Section 4 (same names,
   same values as your `.env.local`).
4. Click **Deploy**. Vercel will build and host the site automatically.
5. Once deployed, go to your Supabase project → **Authentication → URL Configuration** and add
   your live Vercel domain (e.g. `https://your-site.vercel.app`) to the allowed redirect URLs,
   so admin login works correctly in production.
6. (Optional) Connect a custom domain under **Vercel → Project → Settings → Domains**, and update
   `NEXT_PUBLIC_SITE_URL` in your environment variables to match.

---

## 7. Using the admin dashboard (for the business owner)

No technical knowledge is required.

1. Go to `yourdomain.com/admin/login` and sign in with the email/password created in Section 2.
2. **Dashboard** — shows total categories, total photos, and recent uploads.
3. **Gallery** — select a category tab (e.g. "Industrial & Structural"), then:
   - Drag and drop photos onto the upload box, or click **Choose Photos** to select multiple
     files at once.
   - Hover over any photo to **Set as Cover** (this photo will represent the category on the
     homepage, Services page, and Our Work page) or **Delete** it.
   - Drag photos to reorder them — the website updates instantly.
4. Log out using the button in the top-right corner when finished.

Until real photos are uploaded, each category shows a clearly labeled "Photos coming soon"
placeholder instead of a stock photo — so the site never looks broken or misleading.

---

## 8. Project structure

```
app/
  (site)/            Public marketing pages (home, about, services, our-work, contact)
                      — share the Header/Footer/WhatsApp button layout
  admin/
    login/            Public login page (no dashboard chrome)
    (dashboard)/       Protected dashboard + gallery manager (sidebar layout)
  api/admin/          Server-only API routes for upload/delete/reorder/set-cover
  layout.tsx          Root layout: fonts, global metadata, JSON-LD schema
  sitemap.ts          Auto-generated sitemap.xml
  robots.ts           Auto-generated robots.txt

components/           Shared UI (Header, Footer, Hero, GalleryGrid, buttons, etc.)
components/admin/     Admin-only UI (uploader, gallery manager, toasts, sidebar)

lib/
  supabase/           Browser, server, admin (service-role), and middleware Supabase clients
  cloudinary.ts       Server-only signed upload/delete helpers
  gallery.ts          Public read helpers used by pages (Server Components)
  config.ts           All site content/config in one place (phone numbers, services, etc.)
  require-admin.ts    Auth guard used inside every admin API route

types/                Shared TypeScript types (Category, GalleryImage, AdminUser)
supabase/migrations/  SQL schema, seed data, and Row Level Security policies
```

---

## 9. Security notes

- The `SUPABASE_SERVICE_ROLE_KEY` and `CLOUDINARY_API_SECRET` are server-only and are never sent
  to the browser — they're only used inside `app/api/admin/*` route handlers.
- All database writes (upload, delete, reorder, set cover) require a valid, signed-in Supabase
  session; unauthenticated requests are rejected with `401 Unauthorized`.
- Row Level Security in `supabase/migrations/0001_init.sql` enforces this at the database level
  too, as a second layer of protection — even if an API route had a bug, the database itself
  would reject unauthenticated writes.
- `/admin` routes are protected by `middleware.ts`, which redirects unauthenticated visitors to
  `/admin/login`.

---

## 10. Adding a new gallery category later

The 5 categories are seeded by the migration, but you can add more directly in Supabase:

1. Go to **Supabase → Table Editor → gallery_categories**.
2. Insert a new row with a unique `slug` (lowercase, hyphenated, e.g. `roofing-specialists`), a
   `name`, and a `sort_order`.
3. It will automatically appear on the **Our Work** page and get its own gallery URL at
   `/our-work/your-slug`. Upload photos to it from the admin dashboard as usual.

---

Built for **Vinayaga Engineering Works** — Built Strong. Crafted Right.
