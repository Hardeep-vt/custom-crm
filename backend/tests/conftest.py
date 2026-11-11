from collections.abc import Generator

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.db import Base


@pytest.fixture
def db_session() -> Generator[Session, None, None]:
    """Provide a fresh in-memory database and session for each test."""
    test_engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(test_engine)

    try:
        with Session(test_engine, expire_on_commit=False) as session:
            yield session
    finally:
        Base.metadata.drop_all(test_engine)
        test_engine.dispose()