import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { heroSlides, services, industries, processSteps, portfolioItems, testimonials, aboutSections, contactInfo, ctaContent } from '../../data/siteData';
import { servicesDetail } from '../../data/servicesDetail';
import { portfolioDetail } from '../../data/portfolioDetail';

const AdminDataContext = createContext(null);
const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const defaultData = {
  heroSlides,
  services,
  industries,
  processSteps,
  portfolioItems,
  testimonials,
  servicesDetail,
  portfolioDetail,
  aboutSections,
  contactInfo,
  ctaContent,
};

// ─── Auth helpers ─────────────────────────────────────────────────
export function getToken() {
  return localStorage.getItem('shopfit_token');
}

export function setToken(token) {
  if (token) localStorage.setItem('shopfit_token', token);
  else localStorage.removeItem('shopfit_token');
}

export function isLoggedIn() {
  return !!getToken();
}

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function apiPut(path, body) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  return res.json();
}

async function seedDatabase() {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${API_BASE}/sitedata/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(defaultData),
    });
    console.log('Database seeded with default data');
  } catch (err) {
    console.warn('Seed failed:', err.message);
  }
}

// ─── Provider ─────────────────────────────────────────────────────
export function AdminDataProvider({ children, onNotify }) {
  const [data, setData] = useState(defaultData);
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  // Keep a stable ref so callbacks inside closures can always reach the latest notify fn
  const notifyRef = useRef(onNotify);
  useEffect(() => { notifyRef.current = onNotify; }, [onNotify]);

  function emit(message, type = 'success') {
    if (notifyRef.current) notifyRef.current(message, type);
  }

  const backendAvailableRef = useRef(false);
  useEffect(() => {
    backendAvailableRef.current = backendAvailable;
  }, [backendAvailable]);

  useEffect(() => {
    async function loadData() {
      try {
        const remote = await apiGet('/sitedata');
        if (remote && Object.keys(remote).length > 0) {
          // Backend has data — use it
          setData({ ...defaultData, ...remote });
          setBackendAvailable(true);
          backendAvailableRef.current = true;
        } else {
          // Backend is up but DB is empty
          // Only seed if admin is logged in, otherwise just use defaults
          setBackendAvailable(true);
          backendAvailableRef.current = true;
          const token = getToken();
          if (token) {
            await seedDatabase();
            // Re-fetch after seeding
            try {
              const seeded = await apiGet('/sitedata');
              if (seeded && Object.keys(seeded).length > 0) {
                setData({ ...defaultData, ...seeded });
              }
            } catch {}
          }
          // If no token (public visitor), just show defaults — no seed attempt
        }
      } catch {
        // Backend unavailable — fall back to localStorage cache
        setBackendAvailable(false);
        backendAvailableRef.current = false;
        try {
          const stored = localStorage.getItem('shopfit_admin_data');
          if (stored) setData(JSON.parse(stored));
        } catch {}
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Cache to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('shopfit_admin_data', JSON.stringify(data));
    }
  }, [data, loading]);

  async function saveSection(section, newItems) {
    if (backendAvailableRef.current) {
      try {
        await apiPut(`/sitedata/${section}`, newItems);
      } catch (err) {
        console.warn('Backend save failed:', err.message);
      }
    }
  }

  function update(section, newItems) {
    setData(prev => ({ ...prev, [section]: newItems }));
    saveSection(section, newItems);
    emit(`"${section}" section updated successfully.`);
  }

  function addItem(section, item) {
    const newItem = { ...item, id: generateId() };
    setData(prev => {
      const updated = [...prev[section], newItem];
      saveSection(section, updated);
      return { ...prev, [section]: updated };
    });
    emit(`New item added to "${section}".`);
    return newItem;
  }

  function editItem(section, index, updated) {
    setData(prev => {
      const copy = [...prev[section]];
      copy[index] = { ...copy[index], ...updated };
      saveSection(section, copy);
      return { ...prev, [section]: copy };
    });
    emit(`Item in "${section}" updated successfully.`);
  }

  function deleteItem(section, index) {
    setData(prev => {
      const updated = prev[section].filter((_, i) => i !== index);
      saveSection(section, updated);
      return { ...prev, [section]: updated };
    });
    emit(`Item deleted from "${section}".`, 'warning');
  }

  function resetSection(section) {
    setData(prev => {
      saveSection(section, defaultData[section]);
      return { ...prev, [section]: defaultData[section] };
    });
    emit(`"${section}" reset to defaults.`, 'info');
  }

  function resetAll() {
    setData(defaultData);
    localStorage.removeItem('shopfit_admin_data');
    Object.keys(defaultData).forEach(section => saveSection(section, defaultData[section]));
    emit('All sections reset to default values.', 'info');
  }

  return (
    <AdminDataContext.Provider value={{
      data,
      update,
      addItem,
      editItem,
      deleteItem,
      resetSection,
      resetAll,
      slugify,
      generateId,
      loading,
      backendAvailable,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used inside AdminDataProvider');
  return ctx;
}
