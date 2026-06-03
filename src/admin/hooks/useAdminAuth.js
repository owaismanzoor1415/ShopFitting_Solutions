import { useState, useEffect } from 'react';
import { getToken, setToken } from '../context/AdminDataContext';

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;
const SESSION_KEY = 'shopfit_admin_session';

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verify() {
      const token = getToken();

      // No token — show login
      if (!token) {
        setChecking(false);
        return;
      }

      // local_admin_token: only valid if the user logged in THIS browser session
      // (sessionStorage is cleared when the tab/browser is closed)
      if (token === 'local_admin_token') {
        const sessionValid = sessionStorage.getItem(SESSION_KEY) === 'true';
        if (!sessionValid) {
          // Stale token from a previous session — force re-login
          setToken(null);
          setAuthenticated(false);
          setChecking(false);
          return;
        }
        setAuthenticated(true);
        setChecking(false);
        return;
      }

      // Real JWT — verify with backend
      try {
        const res = await fetch(`${API_BASE}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.valid === true) {
          setAuthenticated(true);
        } else {
          setToken(null);
          setAuthenticated(false);
        }
      } catch {
        // Backend unreachable — clear token, force login
        setToken(null);
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    }

    verify();
  }, []);

  function login() {
    // Mark this browser session as authenticated
    sessionStorage.setItem(SESSION_KEY, 'true');
    setAuthenticated(true);
  }

  function logout() {
    setToken(null);
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  }

  return { authenticated, checking, setAuthenticated: login, logout };
}