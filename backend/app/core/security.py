from passlib.context import CryptContext

password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password : str) -> str:
    if len(password.encode("utf-8")) > 72:
        raise ValueError(
            "Password must be less than 72 bytes."
        )
    return password_context.hash(password)

def verify_password(
        plain_password: str,
        hashed_password: str
)-> bool:

    return password_context.verify(
        plain_password,
        hashed_password
    )