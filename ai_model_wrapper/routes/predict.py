from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from typing import List

from models import Edge, Disruption

router = APIRouter(tags=["predict"])


class PredictRequest(BaseModel):
    disruptions: List[Disruption]
    edges: List[Edge]


@router.post("/predict", response_model=dict)
def get_predict(request: PredictRequest = Body(...)):
    filtered_disruptions = [
        disruption
        for disruption in request.disruptions
        if disruption.rating.upvotes - disruption.rating.downvotes >= 0
    ]

    return {
        "edges": request.edges,
        "disruptions": filtered_disruptions,
    }
