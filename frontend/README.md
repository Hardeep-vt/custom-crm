# Frontend

The web app uses **React 19**, **TypeScript**, and **Vite**. Styling uses **Tailwind CSS 4** through the official Vite plugin. React Router provides client-side navigation, and TanStack Query manages API data.

## Requirements

Install Node.js **22.22.0 or newer**. React Router 8 requires this version, which also satisfies Vite 8 requirements. Node.js includes npm.

## Install and run

From `frontend/`:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Open `http://localhost:5173`. The dashboard checks `GET /api/health` every 30 seconds. Set `VITE_API_URL` in `.env` if the backend is not at `http://127.0.0.1:8000`.

Start the backend separately from `backend/`:

```powershell
uv run uvicorn app.main:app --reload
```

## Build, lint, and format

```powershell
npm run build
npm run lint
npm run format
```
## Deploy to Vercel

Import the repository as a Vercel project and set the Root Directory to frontend. Vercel detects Vite; use npm run build with dist as the output directory. Set the VITE_API_URL environment variable to the Render service origin, such as https://your-api.onrender.com, then redeploy. vercel.json routes client-side paths to the app entry point.