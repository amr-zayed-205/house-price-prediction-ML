from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import preprocess_input
from app.services.inference import model_service

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/predict", response_model=PredictionResponse)
def predict_price(request: PredictionRequest):
    try:
        input_df = preprocess_input(request)
        price = model_service.predict(input_df)
        return PredictionResponse(predicted_price=round(price, 2))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")