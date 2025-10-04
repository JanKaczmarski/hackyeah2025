from db import get_connection
from models import User

def create_user(username: str, password: str) -> User:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    user_id = cur.lastrowid
    conn.close()
    return User(id=user_id, username=username, password=password)

def get_user_by_username(username: str) -> User | None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username = ?", (username,))
    row = cur.fetchone()
    conn.close()
    return User(**row) if row else None

