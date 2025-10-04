from fastapi import APIRouter, Body
import schemas

router = APIRouter(tags=["travel"])


@router.get("/travel", response_model=dict)
def get_travel(request: schemas.TravelRequest = Body(...)):
    """GET /travel that accepts a JSON body (TravelRequest).

    Note: GET with body is uncommon but kept to match the provided API spec.
    """
    return {
        "origin": request.origin.dict(),
        "destination": request.destination.dict(),
        "departureTime": request.departureTime,
        "duration_estimate": "42 minutes"
    }
