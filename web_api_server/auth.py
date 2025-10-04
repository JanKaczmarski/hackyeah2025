from fastapi import APIRouter, HTTPException, Depends, Request, Response
from pydantic import BaseModel
import hashlib, secrets, time
from user_dao import create_user, get_user_by_username
from load_env import SESSION_TTL
from models import User

router = APIRouter()

# in-memory session store
sessions: dict[str, dict] = {}

class UserIn(BaseModel):
    username: str
    password: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/register")
def register(user: UserIn):
    if get_user_by_username(user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    create_user(user.username, hash_password(user.password))
    return {"msg": "User registered"}

@router.post("/login")
def login(user: UserIn, response: Response):
    db_user = get_user_by_username(user.username)
    if not db_user or db_user.password != hash_password(user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # create session
    session_id = secrets.token_hex(32)
    sessions[session_id] = {
        "username": db_user.username,
        "expires": time.time() + SESSION_TTL
    }
    response.set_cookie(key="session_id", value=session_id, httponly=True, max_age=SESSION_TTL)
    return {"msg": "Logged in"}

def get_current_user(request: Request) -> User:
    session_id = request.cookies.get("session_id")
    if not session_id or session_id not in sessions:
        raise HTTPException(status_code=401, detail="Not authenticated")

    session = sessions[session_id]
    if session["expires"] < time.time():
        del sessions[session_id]
        raise HTTPException(status_code=401, detail="Session expired")

    db_user = get_user_by_username(session["username"])
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    return db_user

@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return {"id": user.id, "username": user.username}

