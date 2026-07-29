from uuid import UUID
import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.models.document import Document
from app.models.chunks import DocumentChunk
from app.routes.auth import get_current_user
from app.models.user import User
from app.services.chat_service import chat_with_document
from app.schemas.chat import ChatRequest
from app.models.message import Message

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

@router.post("/")
async def chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Ensures user opens their own documents only
    result = await db.execute(
        select(Document).where(
            Document.id == request.document_id,
            Document.user_id == current_user.id,
        )
    )


    document = result.scalar_one_or_none()

    if document is None:
        raise HTTPException(status_code=404, detail="Document not found",)
    
    result = await db.execute(
        select(DocumentChunk).where(
            DocumentChunk.document_id == document.id
        )
    )

    chunks = result.scalars().all()

    result = await db.execute(select(Message).where(Message.document_id == document.id).order_by(Message.created_at))

    messages  = result.scalars().all()

    messages = messages[-10:]
    answer = await chat_with_document(
        question=request.question,
        chunks=chunks,
        prev_messages=messages,
    )

    user_message = Message(
        document_id = document.id,
        role="user",
        content=request.question,
    )
    db.add(user_message)

    assistant_message = Message(
        document_id = document.id,
        role = "assistant",
        content = answer,
    )
    db.add(assistant_message)
    
    
    await db.commit()

    return {
        "answer": answer
    }


@router.get("/{document_id}")
async def get_chat_history(
    document_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Document).where(Document.id == document_id, Document.user_id == current_user.id,))

    document = result.scalar_one_or_none()

    if document is None:
        raise HTTPException(status_code=404, detail="Document not found.",)

    result = await db.execute(select(Message).where(Message.document_id == document.id).order_by(Message.created_at))

    messages = result.scalars().all()

    return [
        {
            "id": str(message.id),
            "role": message.role,
            "content": message.content,
            "created_at":message.created_at,
        }
        for message in messages
    ]