import React from 'react';
import { PredictionForm } from '../components/PredictionForm';

export const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ color: '#0f172a', marginBottom: '10px' }}>🏠 House Price Predictor</h1>
      <p style={{ color: '#64748b', marginBottom: '40px' }}>Fast and accurate property estimates using Machine Learning.</p>
      <PredictionForm />
    </div>
  );
};