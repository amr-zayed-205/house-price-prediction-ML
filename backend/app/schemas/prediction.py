from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    carpet_area_sqft: float = Field(..., gt=0, description="Property area in square feet")
    floor_num: int = Field(..., description="Floor number (0 for Ground, -1 for Basement)")
    bathroom: int = Field(..., ge=1, description="Number of bathrooms")
    balcony: int = Field(0, ge=0, description="Number of balconies")
    location: str = Field(..., description="Location of the property")
    furnishing: str = Field(..., description="Furnishing status (e.g. Furnished, Semi-Furnished, Unfurnished)")
    transaction: str = Field(..., description="Transaction type (e.g. Resale, New Property)")
    ownership: str = Field(..., description="Ownership type (e.g. Freehold, Co-operative Society)")
    facing: str = Field("other", description="Facing direction (e.g. East, North, West, South)")

    model_config = {
        "json_schema_extra": {
            "example": {
                "carpet_area_sqft": 1000.0,
                "floor_num": 3,
                "bathroom": 2,
                "balcony": 1,
                "location": "thane",
                "furnishing": "Unfurnished",
                "transaction": "Resale",
                "ownership": "Freehold",
                "facing": "East"
            }
        }
    }

class PredictionResponse(BaseModel):
    predicted_price: float = Field(..., description="Predicted price in INR (Rupees)")