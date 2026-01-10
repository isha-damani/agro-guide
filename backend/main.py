import joblib
import numpy as np
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import requests

model = joblib.load("crop_model.pkl")

# Load dataset to calculate average values (for explanations)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "crop_data.csv")

df = pd.read_csv(DATA_PATH)

feature_means = df.mean(numeric_only=True)

column_map = {
    "N": "N",
    "P": "P",
    "K": "K",
    "pH": "pH",
    "Rainfall": "rainfall"
}


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
    nitrogen: float = Field(..., ge=0)
    phosphorus: float = Field(..., ge=0)
    potassium: float = Field(..., ge=0)
    ph: float = Field(..., ge=0, le=14)
    temperature: float
    rainfall: float = Field(..., ge=0)
    city: str



@app.get("/")
def root():
    return {"status": "Backend running"}

crop_rules = {
    "rice": {
        "Rainfall": "High rainfall favors paddy cultivation",
        "Nitrogen": "Nitrogen supports vegetative growth in rice",
        "pH": "Neutral pH improves nutrient uptake for rice"
    },
    "maize": {
        "Temperature": "Warm temperatures support maize growth",
        "Nitrogen": "Nitrogen increases grain development",
        "Rainfall": "Moderate rainfall supports maize yield"
    },
    "cotton": {
        "Temperature": "High temperature supports cotton fiber growth",
        "Rainfall": "Low to moderate rainfall prevents root diseases",
        "Potassium": "Potassium improves fiber quality"
    },
    "peas": {
        "Temperature": "Cool temperatures suit pea cultivation",
        "Nitrogen": "Low nitrogen encourages nitrogen fixation",
        "Rainfall": "Moderate rainfall supports pod formation"
    }
}

def explain_feature(name, value, mean):
    if name == "Rainfall":
        if value > mean:
            return "High rainfall supports this crop."
        else:
            return "Lower rainfall affects crop suitability."

    if name == "Temperature":
        if value > mean:
            return "Warm temperature favors crop growth."
        else:
            return "Cool temperature may limit growth."

    if name == "ph":
        if 5.5 <= value <= 7.5:
            return "Soil pH is in the optimal range."
        else:
            return "Soil pH is not ideal for this crop."

    if name == "Nitrogen":
        if value > mean:
            return "Good nitrogen level improves yield."
        else:
            return "Low nitrogen may reduce crop growth."

    return f"{name} level influenced this recommendation."

column_map = {
    "Nitrogen": "N",
    "Phosphorus": "P",
    "Potassium": "K",
    "Temperature": "temperature",
    "Humidity": "humidity",
    "pH": "ph",
    "Rainfall": "rainfall"
}

WEATHER_API_KEY = "a22afa824b1efcdb4f0f82b3107b3469"

def get_weather(city: str):
    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={WEATHER_API_KEY}&units=metric"
    )

    res = requests.get(url)
    data = res.json()

    print("WEATHER STATUS:", res.status_code)
    print("WEATHER DATA:", data)

    if res.status_code != 200:
        message = data.get("message", "Weather API failed")
        raise Exception(message)

    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]
    description = data["weather"][0]["description"]

    return temperature, humidity, description



@app.post("/recommend")
def recommend(data: CropInput):
    try:
        temperature, humidity, description = get_weather(data.city)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    features = np.array([[
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        temperature,
        humidity,
        data.ph,
        data.rainfall
    ]])

    probs = model.predict_proba(features)[0]
    pred_index = probs.argmax()
    prediction = model.classes_[pred_index]
    confidence = float(probs[pred_index])

    feature_names = [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Temperature",
        "Humidity",
        "pH",
        "Rainfall"
    ]


    importances = model.feature_importances_
    importance_map = list(zip(feature_names, importances))

    # sort by importance
    top_features = sorted(
        importance_map, key=lambda x: x[1], reverse=True
    )[:3]

    explanation = []
    crop_key = prediction.lower()

    for name, _ in top_features:
        col = column_map[name]
        val = getattr(data, col) if hasattr(data, col) else None
        mean_val = feature_means[col]
        explanation.append(explain_feature(name, val, mean_val))



    return {
        "crop": prediction.capitalize(),
        "confidence": round(confidence, 3),
        "advisory": "Recommended based on soil and weather conditions.",
        "top_factors": explanation,
        "weather": {
            "city": data.city,
            "temperature": temperature,
            "humidity": humidity,
            "description": description
        }
    }


