# Name List Database

React app scaffolded with Vite.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`

## Vercel Deploy

1. Import this repo in Vercel.
2. Vercel will use `vercel.json` (Vite build output is `dist`).
3. In Vercel Project Settings -> Environment Variables, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy.

You can copy the variable names from `.env.example`.
