import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const formatRupees = (amount: number): string => {
  if (amount >= 10000000) return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  return `₹ ${(amount / 100000).toFixed(2)} Lac`;
};

export const ResultPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.inputs) {
    return (
      <div style={styles.container}>
        <h2>No Data Found</h2>
        <button onClick={() => navigate('/')} style={styles.btn}>Return Home</button>
      </div>
    );
  }

  const { price, inputs } = state;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#334155' }}>Estimated Value</h2>
        <div style={styles.priceTag}>{formatRupees(price)}</div>
        <p style={styles.exactPrice}>(Exact: ₹ {price.toLocaleString('en-IN')})</p>

        <div style={styles.summaryBox}>
          <h4 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', margin: '0 0 15px 0' }}>Property Overview</h4>
          <p><strong>Location:</strong> {inputs.location.toUpperCase()}</p>
          <p><strong>Area:</strong> {inputs.carpet_area_sqft} sqft | <strong>Floor:</strong> {inputs.floor_num}</p>
          <p><strong>Config:</strong> {inputs.bathroom} Bathrooms, {inputs.balcony} Balconies</p>
          <p><strong>Details:</strong> {inputs.furnishing}, {inputs.transaction}</p>
        </div>

        <button onClick={() => navigate('/')} style={styles.btn}>Evaluate Another Property</button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px' },
  card: { backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center' as const, width: '100%', maxWidth: '500px' },
  priceTag: { fontSize: '2.5rem', fontWeight: '800', color: '#10b981', margin: '20px 0' },
  exactPrice: { color: '#94a3b8', fontSize: '0.9rem', marginBottom: '30px' },
  summaryBox: { backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', textAlign: 'left' as const, marginBottom: '30px', color: '#475569', lineHeight: '1.6' },
  btn: { width: '100%', padding: '14px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', transition: '0.2s' },
};