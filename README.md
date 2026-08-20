<div align="center">

<img src="assets/ui_form.png" alt="House Price Predictor Banner" width="600"/>

# 🏠 House Price Predictor

### End-to-End Machine Learning Web App for Indian Real Estate Valuation

**Predict residential property prices across India in seconds** — powered by a production-grade **Scikit-Learn Pipeline**, served through **FastAPI**, and delivered via a sleek **React + TypeScript** dashboard.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 📑 Table of Contents

- [📌 About The Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🧠 Architecture](#-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📊 Dataset & Model Performance](#-dataset--model-performance)
- [🖼️ UI/UX Sneak Peek](#️-uiux-sneak-peek)
- [📈 Exploratory Data Analysis](#-exploratory-data-analysis)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔌 API Reference](#-api-reference)
- [🗺️ Roadmap](#️-roadmap)
- [🧑‍💻 Author & Contributions](#-author--contributions)

---

## 📌 About The Project

Valuing residential real estate accurately is hard — prices depend on **non-linear interactions** between unit size, floor level, locality premiums, and property condition. This project automates that valuation process end-to-end: it transforms raw, messy property listings into **reliable price estimates in Indian Rupees (₹ INR)**, exposed through a clean, decoupled microservice architecture.

> 💡 **In short:** Enter a property's specs — location, area, floor, amenities — and get an instant, data-driven price estimate.

The system was trained on **~187,000 real property listings** across India and selects the best-performing regression model automatically based on cross-validated accuracy.

---

## ✨ Key Features

- 🎯 **Accurate Predictions** — Random Forest Regressor achieving an **R² of 0.85** on unseen test data.
- ⚡ **Real-Time Inference** — FastAPI backend serves predictions instantly via a serialized pipeline artifact.
- 🧹 **Robust Data Cleaning** — Custom regex parsing handles messy real-world price and area formats (`Lac`, `Cr`, `sqft`, `sqm`, `sq. yards`).
- 🗺️ **Smart Location Handling** — Top 50 high-frequency localities are preserved; long-tail entries fall back to `"other"` to avoid dimensionality blow-up.
- 🔒 **Leakage-Free Pipeline** — All preprocessing (scaling, imputing, encoding) is bundled into a single serializable `ColumnTransformer` + model pipeline.
- 💻 **Modern Interactive UI** — Dynamic React form with validation and top-locality selectors.
- 📑 **Auto-Generated API Docs** — Interactive Swagger UI out of the box via FastAPI.
- ✅ **Tested Endpoints** — Automated `pytest` suite covering prediction and health-check routes.

---

## 🧠 Architecture

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

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**🎨 Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

</td>
<td valign="top" width="33%">

**⚙️ Backend**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white)

</td>
<td valign="top" width="33%">

**🤖 Machine Learning**

![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)

</td>
</tr>
</table>

---

## 📊 Dataset & Model Performance

- **Source:** [House Price Dataset — Juhi Bhojani](https://www.kaggle.com/datasets/juhibhojani/house-price) (~187,000 property listings across India)
- **Target Variable:** `price_clean` (continuous, INR)
- **Key Input Features:** `carpet_area_sqft`, `floor_num`, `bathroom`, `balcony`, `location_grouped`, `Furnishing`, `Transaction`, `Ownership`, `facing`

Three regression models were evaluated on a held-out 20% test split using identical, cross-validated feature transformations:

| Model | MAE (INR) | RMSE (INR) | R² Score | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Random Forest Regressor** | **₹ 1,114,024** | **₹ 5,306,273** | **0.8492** | 🏆 **Selected** |
| Gradient Boosting Regressor | ₹ 2,613,991 | ₹ 6,134,626 | 0.7985 | Evaluated |
| Linear Regression (Baseline) | ₹ 4,521,805 | ₹ 8,407,485 | 0.6214 | Baseline |

> 📌 **Cross-Validation:** 5-Fold CV Mean R² = **0.8801 (± 0.0243)**. Random Forest was chosen for production due to its superior handling of non-linear interactions across floor levels, carpet areas, and location tiers.

<div align="center">
<img src="assets/predicted_vs_actual.png" alt="Predicted vs Actual Price" width="600"/>
</div>

---

## 🖼️ UI/UX Sneak Peek

<table>
<tr>
<td width="50%" align="center">

**Property Input Form**
<img src="assets/ui_form.png" alt="Prediction Form UI"/>

</td>
<td width="50%" align="center">

**Prediction Result**
<img src="assets/ui_result.png" alt="Prediction Result UI"/>

</td>
</tr>
</table>

---

## 📈 Exploratory Data Analysis

Key insights that shaped feature engineering and model selection:

<table>
<tr>
<td width="50%">
<img src="assets/price_distribution.png" alt="Price Distribution"/>
</td>
<td width="50%">
<img src="assets/price_by_location.png" alt="Average Price by Location"/>
</td>
</tr>
<tr>
<td width="50%">
<img src="assets/price_vs_area.png" alt="Price vs Carpet Area"/>
</td>
<td width="50%">
<img src="assets/furnishing_and_bathrooms.png" alt="Price by Furnishing and Bathrooms"/>
</td>
</tr>
</table>

> 💡 Prices are heavily right-skewed and roughly log-normal — a key reason tree-based models like Random Forest outperform linear baselines here. Location and bathroom count emerged as especially strong predictors.

---

## 📁 Project Structure

```text
house-price-project/
├── backend/
│   ├── app/
│   │   ├── api/routes/prediction.py     # /health & /predict endpoints
│   │   ├── core/config.py               # Settings configuration (Pydantic)
│   │   ├── schemas/prediction.py        # Request/Response schemas
│   │   ├── services/
│   │   │   ├── preprocessing.py         # Input sanitation & locality mapping
│   │   │   └── inference.py             # Model loading & inference runner
│   │   └── main.py                      # App entry point, CORS & lifespan
│   ├── models/house_price.pkl           # Serialized Scikit-Learn Pipeline
│   ├── tests/test_prediction.py         # Automated endpoint & payload tests
│   ├── Dockerfile                       # Production container definition
│   └── requirements.txt                 # Pinned backend dependencies
├── frontend/
│   ├── src/
│   │   ├── api/predictionClient.ts      # Typed HTTP client
│   │   ├── components/PredictionForm.tsx
│   │   ├── pages/{HomePage,ResultPage,NotFoundPage}.tsx
│   │   ├── types/prediction.ts          # TypeScript data interfaces
│   │   ├── locations.json               # Cached top locality registry
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
├── notebooks/
│   ├── data/                            # Raw dataset directory (.gitignored)
│   └── house_price_model.ipynb          # EDA, data cleaning & pipeline export
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Python** 3.11+
- **Node.js** 18+ & npm
- **Git**

### 1️⃣ Dataset Setup

```bash
kaggle datasets download -d juhibhojani/house-price -p notebooks/data --unzip
```

### 2️⃣ Backend Setup (FastAPI)

```bash
cd backend

# Create & activate a virtual environment
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux / macOS:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run automated tests
pytest tests/ -v

# Launch the API server
uvicorn app.main:app --reload --port 8000
```

| Resource | URL |
| :--- | :--- |
| **Swagger Docs** | `http://localhost:8000/docs` |
| **Health Check** | `http://localhost:8000/health` |

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

> 🌐 **Web App:** `http://localhost:5173`

---

## 🔌 API Reference

### `POST /predict`

Submits structural parameters and returns a real estate valuation.

**Request Payload** (`application/json`):

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

**Response** (`200 OK`):

```json
{
  "predicted_price": 9850000.0
}
```

---

## 🗺️ Roadmap

- [ ] Add confidence intervals / prediction ranges alongside point estimates
- [ ] Expand location coverage beyond the current Top 50 localities
- [ ] Add model explainability (e.g., SHAP values) to the result view
- [ ] Containerize the frontend and orchestrate full-stack deployment via Docker Compose
- [ ] Add CI pipeline for automated backend testing on push

---

## 🧑‍💻 Author & Contributions

Built with clean architecture, robust ML engineering principles, and production readiness in mind.

**Contributions, issues, and feature requests are welcome!** Feel free to check the [issues page](../../issues) if you'd like to contribute.

<div align="center">

⭐ **If you found this project useful, consider giving it a star!** ⭐

</div>
