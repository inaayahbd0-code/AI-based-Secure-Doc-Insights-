from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from jose import jwt, JWTError

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.models.user import User
from app.core.jwt import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    try:
        payload = jwt.decode(       # Verify Jwt token
            token, SECRET_KEY,
            algorithms = [ALGORITHM]
        )

        user_id = payload.get("sub")    # Generate a user_id

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    

    result = await db.execute(select(User).where(User.id == user_id))

    user = result.scalar_one_or_none()  # Fetch a single row

    if user  is None:   # Verify user
        raise HTTPException(status_code=401, detail="User not found")


    return user