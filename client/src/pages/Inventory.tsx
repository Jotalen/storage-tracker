import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Plus, Trash, Edit2 } from 'lucide-react';

interface Item {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  condition: string;
  listings: any[];
}

export const Inventory: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ sku: '', name: '', quantity: 0, price: 0, condition: 'New' });

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/items');
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/items', { ...newItem, quantity: Number(newItem.quantity), price: Number(newItem.price) });
      setShowAddModal(false);
      setNewItem({ sku: '', name: '', quantity: 0, price: 0, condition: 'New' });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Inventory Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your items, quantities, and pricing.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-main)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>SKU</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Quantity</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Price</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.sku}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{item.name}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{item.quantity}</td>
                <td style={{ padding: '1rem 1.5rem' }}>${item.price?.toFixed(2) || '0.00'}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: 'var(--radius-full)', 
                    fontSize: '0.875rem', 
                    background: item.listings.length > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: item.listings.length > 0 ? 'var(--secondary)' : 'var(--warning)'
                  }}>
                    {item.listings.length > 0 ? 'Listed' : 'Unlisted'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button style={{ color: 'var(--text-muted)' }}><Edit2 size={18} /></button>
                  <button style={{ color: 'var(--danger)' }} onClick={() => handleDelete(item.id)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No items in inventory. Click "Add Item" to start.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="glass-panel" style={{ width: '400px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add New Item</h2>
            <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input className="input-field" placeholder="SKU" value={newItem.sku} onChange={e => setNewItem({...newItem, sku: e.target.value})} required />
              <input className="input-field" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input className="input-field" type="number" placeholder="Quantity" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: e.target.value as any})} required />
                <input className="input-field" type="number" step="0.01" placeholder="Price" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value as any})} required />
              </div>
              <select className="input-field" value={newItem.condition} onChange={e => setNewItem({...newItem, condition: e.target.value})}>
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Parts/Repair">Parts/Repair</option>
              </select>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-primary" style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', boxShadow: 'none' }} onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
