from datetime import UTC
from uuid import UUID

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base
from app.models import UUIDTimestampMixin


class TimestampProbe(UUIDTimestampMixin, Base):
    __tablename__ = "timestamp_probe"

    label: Mapped[str] = mapped_column(String(40), nullable=False)


def test_shared_model_fields_use_uuid_and_utc(db_session) -> None:
    record = TimestampProbe(label="test")
    db_session.add(record)
    db_session.commit()
    db_session.refresh(record)

    assert isinstance(record.id, UUID)
    assert record.created_at.utcoffset().total_seconds() == 0
    assert record.updated_at.utcoffset().total_seconds() == 0
    assert record.created_at.tzinfo == UTC