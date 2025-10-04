from __future__ import annotations

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class Rating(BaseModel):
    upvotes: int = 0
    downvotes: int = 0


class Location(BaseModel):
    latitude: float
    longitude: float


class TransportStop(BaseModel):
    transport_type: Optional[str] = Field(None, alias="type")
    name: Optional[str] = None
    location: Location

    class Config:
        validate_by_name = True


class Edge(BaseModel):
    from_stop: TransportStop = Field(..., alias='From')
    to_stop: TransportStop = Field(..., alias='To')
    time: Optional[datetime] = None

    class Config:
        validate_by_name = True


class User(BaseModel):
    username: str
    hashed_password: Optional[str] = None
    rating: Rating = Rating()


class Disruption(BaseModel):
    disruption_type: str = Field(..., alias="type")
    location: Location
    user: Optional[str] = None
    rating: Rating = Rating()

    class Config:
        validate_by_name = True
