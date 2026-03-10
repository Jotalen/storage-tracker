import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, DownloadCloud, LogOut } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Package className="text-primary" size={28} style={{ color: 'var(--primary)' }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>StorageTraker</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/inventory" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Package size={20} />
          <span>Inventory</span>
        </NavLink>
        <NavLink 
          to="/sync" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <DownloadCloud size={20} />
          <span>eBay Sync</span>
        </NavLink>
      </nav>

      <button className="sidebar-link" onClick={handleLogout} style={{ marginTop: 'auto', color: 'var(--danger)' }}>
        <LogOut size={20} />
        <span>Log Out</span>
      </button>
    </aside>
  );
};
