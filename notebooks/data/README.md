# 🏠 House Price Prediction (End-to-End ML Web App)

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

An end-to-end Machine Learning web application that accurately predicts residential property prices in India by analyzing structural, geographic, and transactional attributes. Built with a production-ready **Scikit-Learn Pipeline**, served via a high-performance **FastAPI** backend, and consumed through an interactive **React + TypeScript (Vite)** dashboard.

---

## 📌 Problem Statement & Architecture

Valuing residential real estate accurately is challenging due to non-linear interactions between unit size, floor levels, locality premiums, and property condition. This project automates real estate valuation by transforming raw, messy property data into reliable price estimates in Indian Rupees (₹ INR), exposed via a clean microservice architecture.

```text
       ┌────────────────────────────────────────────────────────┐
       │   React 18 + TypeScript Client (Vite @ Port 5173)      │
       │   - Dynamic Form Validation & Top Locality Selectors   │
       └───────────────────────────┬────────────────────────────┘
                                   │ HTTP POST /predict (JSON)
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │        FastAPI REST API Service (Port 8000)            │
       │   - Pydantic V2 Request Validation & Error Handling    │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │        Trained Pipeline Artifact (house_price.pkl)     │
       │   - Feature Mapping & Encoding                         │
       │   - Random Forest Regressor Inference                  │
       └────────────────────────────────────────────────────────┘
```

---

## 📊 Dataset Summary

* **Source:** [House Price Dataset (Juhi Bhojani)](https://www.kaggle.com/datasets/juhibhojani/house-price) (~187,000 property listings across India).
* **Target Variable:** `price_clean` (Normalized to continuous numerical INR value).
* **Key Features:** 
  * `carpet_area_sqft`: Usable floor area in square feet.
  * `floor_num`: Physical floor level extracted from floor fractions (e.g., "3 out of 10").
  * `bathroom` & `balcony`: Amenity and layout counters.
  * `location_grouped`: High-cardinality geographic locality (Top 50 + "other").
  * `Furnishing`, `Transaction`, `Ownership`, `facing`: Categorical structural and legal attributes.

---

## ⚙️ Key Engineering & ML Highlights

### 1. Robust Data Cleaning & Regex Parsing
* **Unit Standardization:** Parsed heterogeneous target price strings spanning values denominated in `Lac` (x$10^5$) and `Cr` (x$10^7$) into unified numeric float values.
* **Area Normalization:** Parsed `Carpet Area` and `Super Area` (e.g., "1000 sqft", "140 sqm", "1,200 sq. yards") to standardize all units into `sqft`. Used `Super Area` as a fallback for missing `Carpet Area` values.
* **Floor Level Extraction:** Regex parsed complex floor descriptions (e.g., `"3 out of 10"`, `"Ground"`, `"Basement"`) into discrete numeric floor levels (e.g., Ground -> 0, Basement -> -1).
* **Outlier Truncation:** Mitigated extreme price anomalies by clipping the price-per-square-foot distribution between the 1st and 99th percentiles (dropping ~3.2k extreme rows).

### 2. Leakage-Free Preprocessing Pipeline
* **High-Cardinality Management:** Grouped categorical locations and societies into the Top 50 high-frequency categories, collapsing long-tail sparse entries into a fallback `"other"` category to prevent dimensionality explosion.
* **ColumnTransformer Integration:** Combined `StandardScaler` for numeric scaling, `SimpleImputer` (median/most_frequent) for missing values, and `OneHotEncoder(handle_unknown='ignore')` for categorical attributes directly into a serializable pipeline artifact.

---

## 📈 Model Training & Comparison

Three regression models were evaluated on a held-out test split (20%) using identical cross-validated feature transformations:

| Model | MAE (INR) | RMSE (INR) | $R^2$ Score | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Random Forest Regressor** | **₹ 1,114,024** | **₹ 5,306,273** | **0.8492** | **Selected Winner** 🏆 |
| Gradient Boosting Regressor | ₹ 2,613,991 | ₹ 6,134,626 | 0.7985 | Evaluated |
| Linear Regression (Baseline) | ₹ 4,521,805 | ₹ 8,407,485 | 0.6214 | Baseline |

> **Cross-Validation:** 5-Fold CV Mean $R^2 = 0.8801 \ (\pm 0.0243)$. Random Forest was selected for production due to superior handling of non-linear interactions across floor levels, carpet areas, and location tiers.

---

## 📁 Project Structure

```text
house-price-project/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── prediction.py     # /health & /predict endpoints
│   │   ├── core/
│   │   │   └── config.py            # Settings configuration (Pydantic)
│   │   ├── schemas/
│   │   │   └── prediction.py        # Request/Response schemas
│   │   ├── services/
│   │   │   ├── preprocessing.py     # Input sanitation & locality mapping
│   │   │   └── inference.py         # Model loading & inference runner
│   │   └── main.py                  # App entry point, CORS & lifespan
│   ├── models/
│   │   └── house_price.pkl          # Serialized Scikit-Learn Pipeline artifact
│   ├── tests/
│   │   └── test_prediction.py       # Automated endpoint & payload tests
│   ├── Dockerfile                   # Production container definition
│   └── requirements.txt             # Pinned backend dependencies
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── predictionClient.ts  # Typed HTTP client
│   │   ├── components/
│   │   │   └── PredictionForm.tsx   # Dynamic property input form
│   │   ├── pages/
│   │   │   ├── HomePage.tsx         # Main entry view
│   │   │   ├── ResultPage.tsx       # Formatted output & summary view
│   │   │   └── NotFoundPage.tsx     # Fallback 404 handler
│   │   ├── types/
│   │   │   └── prediction.ts        # TypeScript data interfaces
│   │   ├── locations.json           # Cached top locality registry
│   │   ├── App.tsx                  # Client router config
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
├── notebooks/
│   ├── data/                        # Raw dataset directory (.gitignored)
│   └── house_price_model.ipynb      # EDA, data cleaning & pipeline export
├── .gitignore
└── README.md
```

---

## 🚀 Installation & How to Run

### 1. Prerequisites
* Python 3.11+
* Node.js 18+ & npm
* Git

### 2. Dataset Setup
Download the dataset using the Kaggle CLI or extract it into `notebooks/data/`:
```bash
kaggle datasets download -d juhibhojani/house-price -p notebooks/data --unzip
```

### 3. Backend Setup (FastAPI)
```bash
# Navigate to backend directory
cd backend

# Create & activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run automated tests
pytest tests/ -v

# Launch the API server
uvicorn app.main:app --reload --port 8000
```
* **Interactive Swagger Docs:** `http://localhost:8000/docs`
* **Health Check Endpoint:** `http://localhost:8000/health`

### 4. Frontend Setup (React + Vite)
```bash
# In a separate terminal, navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```
* **Web Application Interface:** `http://localhost:5173`

---

## 🔌 API Reference

### `POST /predict`
Submits structural parameters to generate real estate valuation.

**Request Payload (`application/json`):**
```json
{
  "carpet_area_sqft": 1200.0,
  "floor_num": 3,
  "bathroom": 2,
  "balcony": 1,
  "location": "thane",
  "furnishing": "Semi-Furnished",
  "transaction": "Resale",
  "ownership": "Freehold",
  "facing": "East"
}
```

**Response (`200 OK`):**
```json
{
  "predicted_price": 9850000.0
}
```

---

## 🧑‍💻 Author & Contributions

Built with clean architecture, robust ML engineering principles, and production readiness in mind. Contributions, issues, and feature requests are welcome!
