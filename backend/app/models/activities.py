from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from app.core.database import Base

class Activity(Base):
    __tablename__ = "activities"

    post_id = Column(Integer, ForeignKey("posts.id"), primary_key=True)
    event_datetime = Column(DateTime(timezone=True), nullable=False)
    activity_title = Column(String, nullable=False)
    activity_link = Column(String, nullable=True)
    photo_link = Column(String, nullable=True)
