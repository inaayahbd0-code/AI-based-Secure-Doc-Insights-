from pathlib import Path
import shutil
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import get_current_user
from app.db.database import get_db
from app.models.chunks import DocumentChunk
from app.models.document import Document
from app.models.user import User
from app.schemas.document import DocumentResponse
from app.services.ai import generate_summary
from app.services.chunk_service import create_chunks
from app.services.pdf_service import extract_text_from_pdf


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIRECTORY = Path("app/uploads")


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),   # File is uploaded
    db: AsyncSession = Depends(get_db), # Fetch a database session
    current_user: User = Depends(get_current_user), # Fetch user
):

    # Allow only PDFs
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Create uploads folder if it doesn't exist
    UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

    # Generate unique filename(stored_filename in db)
    unique_filename = f"{uuid.uuid4()}.pdf"

    destination = UPLOAD_DIRECTORY / unique_filename

    # Save uploaded file
    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(destination)

    # Generate AI summary
    summary = generate_summary(extracted_text)

    # Create database document(saves time, cost and api tokens)
    # Databases like sqlite can handle large amounts of stored info by storing summary and extracted text
    new_document = Document(
        filename=file.filename,
        filepath=str(destination),
        filetype=file.content_type,
        extracted_text=extracted_text,
        summary=summary,
        status="completed",
        user_id=current_user.id,
    )

    db.add(new_document)
    await db.commit()
    await db.refresh(new_document)

    # Create chunks
    chunk_data = create_chunks(
        extracted_text,
        new_document.id
    )

    for chunk in chunk_data:

        db_chunk = DocumentChunk(
            document_id=chunk["document_id"],
            chunk_text=chunk["chunk_text"],
        )

        db.add(db_chunk)

    await db.commit()

    return DocumentResponse.model_validate(new_document)


@router.get("/documents", response_model=list[DocumentResponse])
async def get_documents(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    result = await db.execute(
        select(Document).where(
            Document.user_id == current_user.id
        )
    )

    documents = result.scalars().all()

    return documents


@router.get("/{document_id}")
async def download_document(
    document_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    result = await db.execute(
        select(Document).where(
            Document.id == document_id
        )
    )

    document = result.scalar_one_or_none()

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return FileResponse(
        path=document.filepath,
        filename=document.filename,
    )
