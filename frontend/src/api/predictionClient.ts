import type { PredictionRequest, PredictionResponse } from '../types/prediction';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const predictPrice = async (data: PredictionRequest): Promise<PredictionResponse> => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error: ${response.statusText}`);
  }

  return response.json();
};