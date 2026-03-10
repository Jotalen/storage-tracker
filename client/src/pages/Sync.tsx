import React, { useState } from 'react';
import { RefreshCcw, DownloadCloud, AlertTriangle } from 'lucide-react';
import api from '../api/client';

export const Sync: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data } = await api.get('/listings/sync');
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults({ error: 'Sync failed' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">eBay Listings Sync</h1>
        <p style={{ color: 'var(--text-muted)' }}>Synchronize your unlisted inventory directly with eBay.</p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '8px' }}>
          <AlertTriangle className="text-primary" size={24} style={{ color: 'var(--primary)' }} />
          <div>
            <h4 style={{ fontWeight: 600 }}>Sync Process Information</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>This action will automatically create Draft or Active listings on eBay for all your unlisted inventory items.</p>
          </div>
        </div>

        <button 
          className="btn-primary" 
          style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: syncing ? 0.7 : 1 }}
          onClick={handleSync}
          disabled={syncing}
        >
          {syncing ? <RefreshCcw className="animate-spin" size={20} /> : <DownloadCloud size={20} />}
          {syncing ? 'Syncing with eBay...' : 'Start Sync Process'}
        </button>

        {results && (
          <div style={{ marginTop: '1rem', padding: '1rem', borderTop: '1px solid var(--border)' }}>
            <h4 style={{ marginBottom: '0.5rem', color: results.error ? 'var(--danger)' : 'var(--secondary)' }}>
              {results.error ? 'Sync Error' : 'Sync Complete!'}
            </h4>
            {!results.error && (
              <p>Successfully processed and created <strong>{results.new_listings_count}</strong> new listings.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
