import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Package, Tag, DollarSign, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get('/dashboard/summary');
        setSummary(data);
      } catch (err) {
        console.error('Failed to fetch summary', err);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) return <div>Loading dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your inventory today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Package size={24} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total SKUs</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{summary.totalSkus}</h3>
          </div>
        </div>
        
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Tag size={24} style={{ color: 'var(--secondary)' }} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Quantity</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{summary.totalQuantity}</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <DollarSign size={24} style={{ color: 'var(--warning)' }} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Estimated Value</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>${summary.estimatedValue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <TrendingUp size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Active Listings</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{summary.activeListings}</h3>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ minHeight: '300px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Inventory Value Trends</h3>
        <p style={{ color: 'var(--text-muted)' }}>Historical and Projected sentiment mapped here...</p>
        <div style={{ display: 'flex', height: '200px', alignItems: 'flex-end', gap: '0.5rem', marginTop: '2rem' }}>
          {summary.historicalData.map((d: any, i: number) => (
            <div key={i} style={{ flex: 1, backgroundColor: 'var(--primary)', height: `${d.value}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }} title={d.date}></div>
          ))}
          {summary.projectedData.map((d: any, i: number) => (
            <div key={`proj-${i}`} style={{ flex: 1, border: '2px dashed var(--accent)', height: `${d.value}%`, borderRadius: '4px 4px 0 0', opacity: 0.5 }} title={d.date}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
