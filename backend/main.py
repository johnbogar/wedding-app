from fastapi import FastAPI
from app.core.database import engine, Base
from app.models import user

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Wedding app backend is running"}