from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

app = FastAPI()

# Allow React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/readmission_model.pkl")

class Patient(BaseModel):
    age: int
    num_procedures: int
    num_medications: int
    time_in_hospital: int


@app.get("/")
def home():
    return {"message": "Hospital Readmission Prediction API"}


@app.post("/predict")
def predict(data: Patient):

    features = np.array([[
        data.age,
        data.num_procedures,
        data.num_medications,
        data.time_in_hospital
    ]])

    prediction = model.predict(features)

    return {"prediction": int(prediction[0])}