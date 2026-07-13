# goit-neo-react-hw-module5 — MovieSearch

An app for searching movies by title with routing powered by **React Router**.
Data is fetched from the [TMDB API](https://developer.themoviedb.org/).

## Tech stack

- Vite + React 19
- React Router
- Axios
- CSS Modules
- `React.lazy` + `Suspense` (route-based code splitting)

## Running locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root (see `.env.example`) and add your
   **TMDB API Read Access Token**:
   ```
   VITE_TMDB_TOKEN=tmdb_read_access_token
   ```
   Get the token at https://www.themoviedb.org/settings/api → the
   **API Read Access Token** section.
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Deploying to Vercel

In the Vercel project settings, add an environment variable
`VITE_TMDB_TOKEN` with your token value. The `vercel.json` file is already
configured for SPA routing (so page refreshes work on nested routes).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
