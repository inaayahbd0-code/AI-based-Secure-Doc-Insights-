import uuid

from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base
from datetime import datetime
from sqlalchemy import DateTime

class Message(Base):
    __tablename__="messages"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default= uuid.uuid4)
    document_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("documents.id"))
    role : Mapped[str]
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    document = relationship("Document", back_populates="messages" )
