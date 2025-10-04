from pydantic import BaseModel
from datetime import datetime

# -------- Users --------
class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str


# -------- Disruptions --------
class Location(BaseModel):
    latitude: float
    longitude: float

class DisruptionCreate(BaseModel):
    type: str
    location: Location
    username: str

class DisruptionVote(BaseModel):
    voteType: str  # like / dislike

class DisruptionOut(BaseModel):
    id: int
    type: str
    location: Location
    username: str
    rating: int


# -------- Travel --------
class TravelRequest(BaseModel):
    origin: Location
    destination: Location
    departureTime: datetime
