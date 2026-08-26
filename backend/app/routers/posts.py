from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.post import PhotoPostResponse, ActivityPostResponse
from app.models.user import User
from app.models.post import Post
from app.models.photos import Photo
from app.models.activities import Activity
import cloudinary.uploader

router = APIRouter(prefix="/posts", tags=["posts"])

@router.post("/photo", response_model=PhotoPostResponse, status_code=status.HTTP_201_CREATED)
def post_photo(file: UploadFile = File(...), description: str = Form(None), current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):

    email = current_user.get("sub")

    db_user = db.query(User).filter(User.email == email).first()

    result = cloudinary.uploader.upload(file.file)

    new_post = Post(
        user_id=db_user.id,
        description=description
    )
    
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    
    new_photo = Photo(
        post_id=new_post.id,
        photo_link=result["secure_url"]
    )

    db.add(new_photo)
    db.commit()
    db.refresh(new_photo)

    return PhotoPostResponse(message="Photo posted successfully!", photo_link=new_photo.photo_link)

@router.post("/activity", response_model=ActivityPostResponse, status_code=status.HTTP_201_CREATED)
def post_activity(
    description: str = Form(None),
    event_datetime: datetime = Form(...),
    activity_title: str = Form(...),
    activity_link: Optional[str] = Form(None),
    file: UploadFile = File(None),
    current_user: dict = Depends(get_current_user), 
    db: Session = Depends(get_db)):

    email = current_user.get("sub")

    db_user = db.query(User).filter(User.email == email).first()

    if file:
        result = cloudinary.uploader.upload(file.file)
        photo_url = result["secure_url"]
    else:
        photo_url = None

    new_post = Post(
        user_id=db_user.id,
        description=description
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    new_activity = Activity(
        post_id=new_post.id,
        event_datetime=event_datetime,
        activity_title=activity_title,
        activity_link=activity_link,
        photo_link=photo_url
    )

    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)

    return ActivityPostResponse(message="Activity posted successfully")