from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class DocumentResponse(BaseModel):
    id: UUID
    filename: str
    content_type: str
    created_at: datetime
    status: str

    class Config:
        from_attributes = True
    
    
