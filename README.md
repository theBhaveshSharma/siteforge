# SiteForge

Landing page generator for small businesses. Sign in, create multiple sites from industry templates, publish live at `/s/[slug]`, edit anytime, and download a static ZIP.

**Live:** [https://siteforge-rouge.vercel.app](https://siteforge-rouge.vercel.app)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env and add [Clerk](https://dashboard.clerk.com) keys plus a Postgres `DATABASE_URL` (Neon, Vercel Postgres, etc.):

```bash
cp .env.example .env
```

3. Create the database and seed templates:

```bash
npm run db:push
npm run db:seed
```

4. Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Clerk auth
- Prisma + SQLite (swap `provider` to `postgresql` for production Postgres)
- Zod content schema shared by editor and templates

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:push` | Push Prisma schema |
| `npm run db:seed` | Seed 12 templates |
