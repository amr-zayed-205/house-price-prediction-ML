from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "House Price Prediction API"
    API_V1_STR: str = ""
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]
    MODEL_PATH: str = "models/house_price.pkl"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
