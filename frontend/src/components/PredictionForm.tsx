import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictPrice } from '../api/predictionClient';
import type { PredictionRequest } from '../types/prediction';
import locationsData from '../locations.json';

const FURNISHING_OPTIONS = ['Unfurnished', 'Semi-Furnished', 'Furnished'];
const TRANSACTION_OPTIONS = ['Resale', 'New Property'];
const OWNERSHIP_OPTIONS = ['Freehold', 'Co-operative Society', 'Leasehold', 'Power of Attorney'];
const FACING_OPTIONS = ['East', 'North', 'West', 'South', 'North-East', 'North-West', 'South-East', 'South-West', 'other'];

export const PredictionForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PredictionRequest>({
    carpet_area_sqft: 1000,
    floor_num: 2,
    bathroom: 2,
    balcony: 1,
    location: locationsData[0] || 'thane',
    furnishing: 'Semi-Furnished',
    transaction: 'Resale',
    ownership: 'Freehold',
    facing: 'East',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.carpet_area_sqft <= 0) {
      setError('Carpet area must be greater than zero.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await predictPrice(formData);
      navigate('/result', { state: { price: result.predicted_price, inputs: formData } });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={styles.heading}>Property Details</h2>
      
      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.inputGroup}>
        <label style={styles.label}>Location</label>
        <select name="location" value={formData.location} onChange={handleChange} style={styles.input}>
          {locationsData.map((loc: string) => (
            <option key={loc} value={loc}>{loc.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div style={styles.gridContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Carpet Area (sqft)</label>
          <input type="number" name="carpet_area_sqft" value={formData.carpet_area_sqft} onChange={handleChange} min="1" required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Floor Number</label>
          <input type="number" name="floor_num" value={formData.floor_num} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Bathrooms</label>
          <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} min="1" required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Balconies</label>
          <input type="number" name="balcony" value={formData.balcony} onChange={handleChange} min="0" required style={styles.input} />
        </div>
      </div>

      <div style={styles.gridContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Furnishing</label>
          <select name="furnishing" value={formData.furnishing} onChange={handleChange} style={styles.input}>
            {FURNISHING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Transaction</label>
          <select name="transaction" value={formData.transaction} onChange={handleChange} style={styles.input}>
            {TRANSACTION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Ownership</label>
          <select name="ownership" value={formData.ownership} onChange={handleChange} style={styles.input}>
            {OWNERSHIP_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Facing</label>
          <select name="facing" value={formData.facing} onChange={handleChange} style={styles.input}>
            {FACING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} style={{ ...styles.submitButton, opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Calculating...' : 'Predict Price'}
      </button>
    </form>
  );
};

const styles = {
  formContainer: { maxWidth: '700px', margin: '0 auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textAlign: 'left' as const },
  heading: { marginBottom: '20px', color: '#1e293b', fontSize: '1.5rem', fontWeight: 'bold' },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, marginBottom: '15px' },
  label: { fontSize: '0.9rem', color: '#475569', marginBottom: '5px', fontWeight: '500' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', backgroundColor: '#f8fafc', outline: 'none' },
  errorBox: { padding: '12px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #dc2626' },
  submitButton: { width: '100%', padding: '14px', backgroundColor: '#0ea5e9', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
};