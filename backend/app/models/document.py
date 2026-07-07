from sqlalchemy.orm import Mapped,relationship, mapped_column, relationship
from app.db.database import Base
from sqlalchemy import String, Text, DateTime, ForeignKey
import uuid
from datetime import datetime
from sqlalchemy import Enum


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(primary_key = True, default = uuid.uuid4)
    filename: Mapped[str] = mapped_column(String(255))
    stored_filename: Mapped[str] = mapped_column(String(255), unique = True)
    content_type: Mapped[str] = mapped_column(String(100))
    file_size: Mapped[int]
    filepath: Mapped[str] = mapped_column(String(500))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow) 
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    status: Mapped[str] = mapped_column(String(20), default = "uploaded")
    extracted_text: Mapped[str | None] = mapped_column(Text,nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    
    chunks = relationship("DocumentChunk",back_populates="document",cascade="all, delete")



    user = relationship("User", back_populates="documents")