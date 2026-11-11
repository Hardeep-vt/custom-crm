from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables or a local .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str = "postgresql+psycopg://crm:%40crm123@localhost:5432/custom_crm"
    secret_key: str = "development-only-change-me"
    cors_origins: list[str] = ["http://localhost:5173"]
    @field_validator("database_url", mode="before")
    @classmethod
    def use_psycopg_driver(cls, value: str) -> str:
        """Use psycopg 3 for provider PostgreSQL URLs without an explicit driver."""
        if isinstance(value, str) and value.startswith(("postgres://", "postgresql://")):
            return "postgresql+psycopg://" + value.split("://", maxsplit=1)[1]
        return value


@lru_cache
def get_settings() -> Settings:
    """Return the cached application settings."""
    return Settings()