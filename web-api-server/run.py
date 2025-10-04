import uvicorn
from fastapi import FastAPI
from auth import router as auth_router
from db import init_db

app = FastAPI()

app.include_router(auth_router, prefix="/auth")

@app.on_event("startup")
def startup():
    init_db()

if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)

