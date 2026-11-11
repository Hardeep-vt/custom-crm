"""Initial empty migration.

Revision ID: 0001_initial
Revises:
Create Date: 2026-11-09
"""

from typing import Sequence, Union

revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Apply the initial schema placeholder."""
    pass


def downgrade() -> None:
    """Revert the initial schema placeholder."""
    pass