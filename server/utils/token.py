from fastapi import HTTPException
from datetime import timedelta, datetime, UTC
import jwt
from os import getenv

ALGORITHM = "HS256"
SECRET_KEY = getenv("JWT_SECRET_KEY")

def create_token(data: dict, expires_delta: timedelta):
    expire = datetime.now(UTC) + expires_delta
    return jwt.encode(data | {"exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Срок действия токена истек")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Неверный токен")


