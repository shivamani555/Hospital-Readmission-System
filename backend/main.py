from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# serve static files
app.mount("/", StaticFiles(directory="static", html=True), name="static")

model = joblib.load("model/readmission_model.pkl")

class Patient(BaseModel):
    age: int
    num_procedures: int
    num_medications: int
    time_in_hospital: int

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