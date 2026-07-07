from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=72
    )

class UserLogin(BaseModel):
    email : EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str