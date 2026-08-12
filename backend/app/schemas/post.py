from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PhotoPostResponse(BaseModel):
    message: str
    photo_link: str

class ActivityPostRequest(BaseModel):
    event_datetime: datetime
    activity_title: str
    activity_link: Optional[str]
    photo_link: Optional[str]

class ActivityPostResponse(BaseModel):
    message: str