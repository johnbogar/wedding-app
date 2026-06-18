from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirm_password: str

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    rsvp_status: Optional[bool]

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ForgotPasswordResponse(BaseModel):
    message: str

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    verification_code: str

class VerifyCodeResponse(BaseModel):
    access_token: str
    message: str

class ResetPasswordRequest(BaseModel):
    password: str
    confirm_password: str
    access_token: str

class ResetPasswordResponse(BaseModel):
    message: str

class RsvpRequest(BaseModel):
    rsvp_status: Optional[bool]
    guest_count: Optional[int] = None
    dietary_restrictions: Optional[str] = None
    song_request: Optional[str] = None

class RsvpResponse(BaseModel):
    message: str
    rsvp_status: Optional[bool]