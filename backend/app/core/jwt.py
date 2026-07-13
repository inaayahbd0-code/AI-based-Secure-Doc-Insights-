from datetime import datetime, timedelta, timezone

from jose import jwt

SECRET_KEY = "security_on_top"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Create JWT token for the user logged in
def create_access_token(data:dict) -> str:
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update(
        {
            "exp": expire
        }
    )
    # Encode (data, expire), algo and secret key in jwt token
    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token