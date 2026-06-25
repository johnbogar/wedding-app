from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base

class InvitedGuest(Base):
    __tablename__ = "invited_guests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False, index=True)
    is_registered = Column(Boolean, default=False)