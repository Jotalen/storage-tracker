import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      padding: '1rem 2rem',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-panel)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ color: 'var(--text-muted)' }}>
          <Bell size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserCircle size={28} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{user?.name || 'Seller'}</span>
        </div>
      </div>
    </header>
  );
};
