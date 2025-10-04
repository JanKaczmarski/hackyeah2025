import requests
import uvicorn
from db import init_db
from fastapi import FastAPI
from auth import router as auth_router
from routes.disruptions import router as disruptions_router
from routes.travel import router as travel_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(disruptions_router, prefix="/disruption")
app.include_router(travel_router)


@app.get("/ai-model-wrapper")
def ai_model_wrapper():
    try:
        response = requests.get("http://ai-model-wrapper:8000/docs")
        response.raise_for_status()
        return {
            "status": "success",
            "message": "ai-model-wrapper is reachable",
            "status_code": response.status_code,
            "data": response.text,
        }
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": f"Failed to reach ai-model-wrapper: {e!s}", "data": None}


@app.on_event("startup")
def startup():
    init_db()


if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
