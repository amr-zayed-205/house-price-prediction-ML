import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes.prediction import router as prediction_router
from app.services.inference import model_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # تحميل الموديل عند بدء تشغيل التطبيق
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), settings.MODEL_PATH)
    if not os.path.exists(model_path):
        model_path = settings.MODEL_PATH  # مسار احتياطي
    model_service.load_model(model_path)
    print("✅ Model loaded successfully on startup.")
    yield
    print("🛑 Shutting down backend service.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# تفعيل الـ CORS للفرونت إند
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)