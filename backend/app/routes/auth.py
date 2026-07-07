from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import hash_password
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    TokenResponse
)
from app.core.auth import get_current_user
from app.core.security import verify_password
from app.core.jwt import create_access_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register", response_model=UserResponse)
async def register_user(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_data.email))

    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        username = user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password)
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user

@router.post("/login", response_model=TokenResponse)
async def login_user(user_data: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_data.email))

    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401,detail="Invalid email or password")
    
    password_valid = verify_password(user_data.password,user.hashed_password)

    if not password_valid:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token(
        {
            "sub": str(user.id)
        }
    )

    return {
        "access_token" : token,
        "token_type" : "bearer"
    }

@router.get("/me")
async def get_me(
    user: User = Depends(get_current_user)
):

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }