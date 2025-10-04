import uvicorn
import requests
from fastapi import FastAPI
from routes.predict import router as predictions_router

app = FastAPI()

app.include_router(predictions_router)


@app.get("/hello")
async def root():
    return {"message": "Hello World"}


@app.get("/web-api-server")
def web_api_server():
    try:
        response = requests.get("http://web-api-server:8000/docs")
        response.raise_for_status()
        return {
            "status": "success",
            "message": "web-api-server is reachable",
            "status_code": response.status_code,
            "data": response.text,
        }
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": f"Failed to reach web-api-server: {e!s}", "data": None}


if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
