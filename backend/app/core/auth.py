from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import uuid
from jose import jwt, JWTError

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.models.user import User
from app.core.jwt import SECRET_KEY, ALGORITHM

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: AsyncSession = Depends(get_db)):
        
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("Payload:", payload)

        user_id_str = payload.get("sub")
        print("User ID:", user_id_str)

        if user_id_str is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user_id = uuid.UUID(user_id_str)

    except JWTError as e:
        print("JWT Error:", e)
        raise HTTPException(status_code=401, detail="Invalid token")

    result = await db.execute(select(User).where(User.id == user_id))

    user = result.scalar_one_or_none()  # Fetch a single row

    print("User", user)
    if user  is None:   # Verify user
        raise HTTPException(status_code=401, detail="User not found")


    return user