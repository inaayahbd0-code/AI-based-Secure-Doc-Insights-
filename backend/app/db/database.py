from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    AsyncSession,
    async_sessionmaker
)

DATABASE_URL = "sqlite+aiosqlite:///./test.db"


engine = create_async_engine(DATABASE_URL, echo = True)


class Base(DeclarativeBase):
    pass


async_session = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    async with async_session() as session:
        yield session