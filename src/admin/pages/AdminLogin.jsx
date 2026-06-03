import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../context/AdminDataContext';

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }
      setToken(data.token);
      onLogin && onLogin();
      navigate('/admin');
    } catch {
      // Backend offline — allow local login with default credentials
      if (username === 'admin' && password === 'admin123') {
        setToken('local_admin_token');
        onLogin && onLogin();
        navigate('/admin');
      } else {
        setError('Invalid credentials. (Backend offline — use admin / admin123)');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00308F 0%, #002070 50%, #001850 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Saffron glow */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,0,1,0.12), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,205,0,0.10), transparent 70%)', pointerEvents: 'none' }} />

      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(204,0,1,0.20)',
          borderRadius: 20,
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.50)',
          position: 'relative',
        }}
      >
        {/* Flag stripe top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '20px 20px 0 0', background: 'linear-gradient(to right, #CC0001 33.3%, rgba(255,255,255,0.2) 33.3% 66.6%, #00308F 66.6%)' }} />

        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', paddingTop: '0.5rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #CC0001, #a80001)',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: 22,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-1px',
              boxShadow: '0 4px 15px rgba(204,0,1,0.35)',
            }}
          >
            SF
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
            Admin Panel
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginTop: 6 }}>
            ShopFit Pro — Secure Access
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '0.05em' }}>
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(204,0,1,0.20)',
                borderRadius: 10,
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#CC0001'}
              onBlur={e => e.target.style.borderColor = 'rgba(204,0,1,0.20)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '0.05em' }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(204,0,1,0.20)',
                borderRadius: 10,
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#CC0001'}
              onBlur={e => e.target.style.borderColor = 'rgba(204,0,1,0.20)'}
            />
          </div>

          {error && (
            <div
              style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8,
                padding: '0.65rem 1rem',
                color: '#fca5a5',
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: loading ? '#8a0001' : 'linear-gradient(135deg, #CC0001, #a80001)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 15px rgba(204,0,1,0.30)',
            }}
            onMouseEnter={e => { if (!loading) e.target.style.background = 'linear-gradient(135deg, #a80001, #8a0001)'; }}
            onMouseLeave={e => { if (!loading) e.target.style.background = 'linear-gradient(135deg, #CC0001, #a80001)'; }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
}
