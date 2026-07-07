from fastapi import FastAPI
from pydantic import BaseModel
from app.routes.documents import router as document_router
from app.routes import auth
from contextlib import asynccontextmanager
from app.db.init__db import create_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    
    await create_tables()

    yield

app = FastAPI(
    lifespan=lifespan
)

app.include_router(document_router)
app.include_router(auth.router)



@app.post("/documents/uploads")
async def upload_document():
    return {}