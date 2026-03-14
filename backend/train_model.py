import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.read_csv("patient_data.csv")

X = data[["age","num_procedures","num_medications","time_in_hospital"]]
y = data["readmitted"]

model = RandomForestClassifier()

model.fit(X,y)

joblib.dump(model,"model/readmission_model.pkl")

print("Model trained and saved")