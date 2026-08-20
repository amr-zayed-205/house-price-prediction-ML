import joblib
import os
import pandas as pd

class ModelService:
    def __init__(self):
        self.model = None

    def load_model(self, model_path: str):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model artifact not found at {model_path}")
        self.model = joblib.load(model_path)

    def predict(self, input_df: pd.DataFrame) -> float:
        if self.model is None:
            raise RuntimeError("Model is not loaded.")
        prediction = self.model.predict(input_df)
        return float(prediction[0])

model_service = ModelService()