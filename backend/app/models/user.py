import uuid

from sqlalchemy import String
from sqlalchemy.orm import Mapped,relationship,mapped_column
from app.db.database import Base

class User(Base):
    __tablename__= "users"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    documents = relationship("File", back_populates="user")
    