import pandas as pd
from app.schemas.prediction import PredictionRequest

# قائمة الـ 50 منطقة المشهورة من النوت‌بوك
TOP_LOCATIONS = {
    "new-delhi", "bangalore", "kolkata", "gurgaon", "ahmedabad",
    "hyderabad", "chennai", "jaipur", "greater-noida", "faridabad",
    "thane", "pune", "mumbai", "noida", "ghaziabad"
    # الـ Pipeline يتعامل تلقائياً مع الباقي كـ other إذا كانت القيمة غير موجودة
}

def preprocess_input(request: PredictionRequest) -> pd.DataFrame:
    # مطابقة اسم العمود مع ما تدرب عليه الموديل: location_grouped
    loc = request.location.strip().lower()
    
    data = {
        "carpet_area_sqft": [float(request.carpet_area_sqft)],
        "floor_num": [int(request.floor_num)],
        "bathroom": [float(request.bathroom)],
        "balcony": [float(request.balcony)],
        "location_grouped": [loc],
        "Furnishing": [request.furnishing],
        "Transaction": [request.transaction],
        "Ownership": [request.ownership],
        "facing": [request.facing],
    }
    
    return pd.DataFrame(data)