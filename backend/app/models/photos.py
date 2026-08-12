from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class Photo(Base):
    __tablename__ = "photos"

    post_id = Column(Integer, ForeignKey("posts.id"), primary_key=True)
    photo_link = Column(String, nullable=False)