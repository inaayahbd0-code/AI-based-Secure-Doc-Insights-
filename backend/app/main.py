from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def get_login_page():
    return "Login page loading..."

class Signup(BaseModel):
    {
        email
    }
@app.post("/Signup", response_model=Signupread)
async def signup_details():
    return 