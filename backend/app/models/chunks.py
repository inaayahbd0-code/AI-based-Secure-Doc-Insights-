import uuid
from sqlalchemy import JSON

from sqlalchemy import Text, ForeignKey
from sqlalchemy.orm import Mapped,relationship, mapped_column

from app.db.database import Base


class DocumentChunk(Base):

    __tablename__ = "document_chunks"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4
    )

    document_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documents.id")
    )

    chunk_text: Mapped[str] = mapped_column(
        Text
    )
    embedding: Mapped[list[float] | None] = mapped_column(JSON,nullable=True)
    
    document = relationship("Document", back_populates="chunks")
