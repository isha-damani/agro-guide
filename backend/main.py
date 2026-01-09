from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CropInput(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float
    temperature: float
    rainfall: float
    city: str


@app.get("/")
def root():
    return {"status": "Backend running"}

@app.post("/recommend")
def recommend(data: CropInput):
    return {
        "crop": "Rice",
        "confidence": 0.85,
        "advisory": "Suitable for warm climate with sufficient rainfall."
    }

