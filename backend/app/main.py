from fastapi import FastAPI
from pydantic import BaseModel
from app.routes.documents import router as document_router
from app.routes import auth, chat
from contextlib import asynccontextmanager
from app.db.init__db import create_tables
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    
    await create_tables()

    yield

app = FastAPI(
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(document_router)
app.include_router(auth.router)
app.include_router(chat.router)


@app.post("/documents/uploads")
async def upload_document():
    return {}