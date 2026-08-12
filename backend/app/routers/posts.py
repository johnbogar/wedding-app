from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.post import PhotoPostResponse
from app.models.user import User
from app.models.post import Post
from app.models.photos import Photo
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