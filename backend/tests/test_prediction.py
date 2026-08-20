import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_prediction_success(client):
    payload = {
        "carpet_area_sqft": 1200.0,
        "floor_num": 4,
        "bathroom": 2,
        "balcony": 1,
        "location": "thane",
        "furnishing": "Semi-Furnished",
        "transaction": "Resale",
        "ownership": "Freehold",
        "facing": "East"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_price" in data
    assert isinstance(data["predicted_price"], (int, float))
    assert data["predicted_price"] > 0

def test_prediction_invalid_input(client):
    # إرسال مساحة غير صالحة (صفر أو سالبة)
    payload = {
        "carpet_area_sqft": 0,
        "floor_num": 1,
        "bathroom": 1,
        "balcony": 0,
        "location": "mumbai",
        "furnishing": "Unfurnished",
        "transaction": "Resale",
        "ownership": "Freehold",
        "facing": "North"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422  # Validation Error