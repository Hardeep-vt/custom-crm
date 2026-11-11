# Backend

The API uses **Python 3.12**, [uv](https://docs.astral.sh/uv/), SQLAlchemy 2.0, Alembic, and PostgreSQL 16. Dependencies are declared in `pyproject.toml` and locked in `uv.lock`.

Models use UUID primary keys. `UUIDTimestampMixin` provides `created_at` and `updated_at` timestamps normalized to UTC.

## Install and start PostgreSQL

From the repository root:

```powershell
docker compose up -d db
```

Then from `backend/`:

```powershell
uv sync --dev
Copy-Item .env.example .env
uv run alembic upgrade head
```

Edit `.env` for local settings as needed. `DATABASE_URL` defaults to the Compose Postgres service credentials; the password special character is URL-encoded.

## Run

From `backend/`:

```powershell
uv run uvicorn app.main:app --reload
```

The health endpoint is available at `http://127.0.0.1:8000/api/health` and returns `{"status":"ok"}`.

## Test and lint

```powershell
uv run pytest
uv run ruff check .
```

Each test that requests the `db_session` fixture receives a fresh in-memory SQLite database, so tests do not require a running Postgres service and cannot share database state.

## Deploy to Render

The repository includes render.yaml for a free Render web service rooted at backend/. Create the Blueprint from the repository. Enter the Neon connection string as DATABASE_URL and set CORS_ORIGINS to a JSON list containing the deployed Vercel origin, for example ["https://your-app.vercel.app"]. Render generates SECRET_KEY. The free service runs alembic upgrade head before starting Uvicorn.
## Settings

Settings are read from environment variables, with a local `.env` file loaded when present:

- `DATABASE_URL` — defaults to `postgresql+psycopg://crm:%40crm123@localhost:5432/custom_crm`.
- `SECRET_KEY` — defaults to a development-only value; set a strong secret outside local development.
- `CORS_ORIGINS` — JSON list of allowed browser origins; defaults to `["http://localhost:5173"]`.