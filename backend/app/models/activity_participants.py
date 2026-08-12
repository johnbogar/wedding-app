from sqlalchemy import Column, Integer, ForeignKey
from app.core.database import Base

class ActivityParticipant(Base):
    __tablename__ = "activity_participants"

    activity_post_id = Column(Integer, ForeignKey("activities.post_id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)