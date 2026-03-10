import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import api from '../api/client';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        await api.post('/auth/register', { email, password, name });
        // Automatically login after register
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
      <div className="glass-panel" style={{ width: '400px', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <Package className="text-primary" size={36} style={{ color: 'var(--primary)' }} />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>StorageTraker</h1>
        </div>
        
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h2>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', background: 'rgba(239,68,68,0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--danger)' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <input 
              className="input-field" 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          )}
          <input 
            className="input-field" 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="input-field" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button className="btn-primary" type="submit" style={{ marginTop: '0.5rem' }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            style={{ color: 'var(--primary)', fontWeight: 600 }} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};
