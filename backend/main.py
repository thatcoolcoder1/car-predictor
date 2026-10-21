import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model.joblib")
FEATURES = list(model.feature_names_in_)



@app.post("/predict")
def predict(payload: dict):
    missing = [f for f in FEATURES if f not in payload]
    if missing:
        raise HTTPException(
            status_code=422,
            detail=f"Missing fields: {missing}"
        )

    try:
        X = pd.DataFrame([
            {f: float(payload[f]) for f in FEATURES}
        ])
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=422,
            detail="All fields must be numbers"
        )

    try:
        price = model.predict(X)[0]
        return {"predicted_price": round(float(price), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
