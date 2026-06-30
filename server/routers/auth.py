from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import timedelta
from ..utils.token import create_token, verify_token

router = APIRouter(prefix="/auth")

class UserData(BaseModel):
    username: str
    password: str

class RefreshRequest(BaseModel):
    refresh_token: str

@router.post("/login")
def user_login(data: UserData):
    username = data.username
    password = data.password
    if username != "admin" and password != "admin":
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_token(data={"username": username}, expires_delta=timedelta(minutes=15))
    refresh_token = create_token(data={"username": username}, expires_delta=timedelta(days=7))

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }

@router.post("/refresh")
def refresh_tokens(data: RefreshRequest):
    payload = verify_token(data.refresh_token)
    username: str = payload.get("username")

    new_access_token = create_token(data={"username": username}, expires_delta=timedelta(minutes=15))
    new_refresh_token = create_token(data={"username": username}, expires_delta=timedelta(days=7))

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token
    }
    


