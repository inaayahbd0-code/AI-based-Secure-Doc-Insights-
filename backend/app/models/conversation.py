import uuid

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, mapped_column, Mapped

from app.db.database import Base

class Conversation(Base):
     __tablename__= "conversations"

     id: Mapped[uuid.UUID] = mapped_column(
          primary_key=True, 
          default = uuid.uuid4
     )

     document_id: Mapped[uuid.UUID] = mapped_column(
          ForeignKey("files.id")
     )

     messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")
     