from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

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