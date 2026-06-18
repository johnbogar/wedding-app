from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin, TokenResponse, ForgotPasswordRequest, ForgotPasswordResponse, VerifyCodeRequest, VerifyCodeResponse, ResetPasswordRequest, ResetPasswordResponse, RsvpRequest, RsvpResponse
from app.core.security import create_access_token, get_current_user, verify_token
from passlib.context import CryptContext
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists"
        )

    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    hashed_password = hash_password(user.password)
    
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(data={"sub": db_user.email})
    rsvp_status = db_user.rsvp_status
    
    return TokenResponse(access_token=access_token, token_type="bearer", rsvp_status=rsvp_status)

@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

@router.post("/forgot-password", response_model=ForgotPasswordResponse)
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == request.email).first()
    
    if db_user:
        code = str(random.randint(100000, 999999))
        db_user.verification_code = code
        db_user.code_exp = datetime.utcnow() + timedelta(minutes=15)
        db.commit()
        
        print(f"Verification code for {db_user.email}: {code}")
    
    return ForgotPasswordResponse(message="If an account with that email exists, a verification code has been sent")

@router.post("/verify-code", response_model=VerifyCodeResponse)
def verify_code(request: VerifyCodeRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == request.email).first()
    
    if not db_user or db_user.verification_code != request.verification_code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect verification code"
        )
    
    if datetime.utcnow() > db_user.code_exp.replace(tzinfo=None):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification code has expired"
        )
    
    reset_token = create_access_token(data={"sub": db_user.email, "purpose": "password_reset"})
    
    return VerifyCodeResponse(access_token=reset_token, message="Code verified successfully")

@router.post("/reset-password", response_model=ResetPasswordResponse)
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    payload = verify_token(request.access_token)

    if not payload or payload.get("purpose") != "password_reset":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token"
        )
    
    email = payload.get("sub")

    db_user = db.query(User).filter(User.email == email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    if request.password != request.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )

    if pwd_context.verify(request.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password cannot be the same as your current password"
        )
    pwd = hash_password(request.password)
    db_user.password = pwd
    db_user.verification_code = None
    db_user.code_exp = None
    db.commit()

    return ResetPasswordResponse(message="Password successfully reset")

@router.post("/rsvp", response_model=RsvpResponse)
def submit_rsvp(request: RsvpRequest, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    email = current_user.get("sub")

    db_user = db.query(User).filter(User.email == email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    db_user.rsvp_status = request.rsvp_status
    db_user.guest_count = request.guest_count
    db_user.dietary_restrictions = request.dietary_restrictions
    db_user.song_request = request.song_request
    db.commit()

    return RsvpResponse(message="You have successfully RSVP'd!", rsvp_status=db_user.rsvp_status)
