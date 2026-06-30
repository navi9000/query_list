from ..utils.token import verify_token
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends

oauth2scheme = OAuth2PasswordBearer(tokenUrl="username")

def get_current_user(token: Optional[str] = Depends(oauth2scheme)):
    if (token is None):
        return None
    payload = verify_token(token)
    username: str  = payload.get("username")
    return username