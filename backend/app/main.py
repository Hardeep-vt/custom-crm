from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings

settings = get_settings()

app = FastAPI(title="Custom CRM API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "API is working"
    }

@app.get("/api/health")
def health_check() -> dict[str, str]:
    """Report that the API process is responding."""
    return {"status": "ok"}

