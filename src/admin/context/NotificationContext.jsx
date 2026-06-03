import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const NotificationContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertCircle,
  info:    Info,
};

const COLORS = {
  success: {
    bg:     'rgba(22, 163, 74, 0.12)',
    border: 'rgba(22, 163, 74, 0.35)',
    icon:   '#16a34a',
    text:   '#14532d',
    bar:    '#16a34a',
  },
  error: {
    bg:     'rgba(220, 38, 38, 0.12)',
    border: 'rgba(220, 38, 38, 0.35)',
    icon:   '#dc2626',
    text:   '#7f1d1d',
    bar:    '#dc2626',
  },
  warning: {
    bg:     'rgba(234, 179, 8, 0.12)',
    border: 'rgba(234, 179, 8, 0.35)',
    icon:   '#ca8a04',
    text:   '#713f12',
    bar:    '#eab308',
  },
  info: {
    bg:     'rgba(59, 130, 246, 0.12)',
    border: 'rgba(59, 130, 246, 0.35)',
    icon:   '#3b82f6',
    text:   '#1e3a8a',
    bar:    '#3b82f6',
  },
};

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 350);
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const notify = useCallback((message, type = 'success', duration = 4000) => {
    const id = ++idCounter;
    setToasts(prev => [...prev.slice(-4), { id, message, type, exiting: false }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  // Convenience helpers
  const success = useCallback((msg, dur) => notify(msg, 'success', dur), [notify]);
  const error   = useCallback((msg, dur) => notify(msg, 'error',   dur), [notify]);
  const warning = useCallback((msg, dur) => notify(msg, 'warning', dur), [notify]);
  const info    = useCallback((msg, dur) => notify(msg, 'info',    dur), [notify]);

  return (
    <NotificationContext.Provider value={{ notify, success, error, warning, info }}>
      {children}

      {/* Toast container */}
      <div
        style={{
          position:      'fixed',
          bottom:        24,
          right:         24,
          zIndex:        99999,
          display:       'flex',
          flexDirection: 'column',
          gap:           10,
          pointerEvents: 'none',
          maxWidth:      380,
          width:         '100%',
        }}
      >
        {toasts.map(toast => {
          const c    = COLORS[toast.type] || COLORS.success;
          const Icon = ICONS[toast.type]  || ICONS.success;
          return (
            <div
              key={toast.id}
              style={{
                display:       'flex',
                alignItems:    'flex-start',
                gap:           10,
                background:    'rgba(255,255,255,0.97)',
                border:        `1px solid ${c.border}`,
                borderRadius:  12,
                padding:       '12px 14px',
                boxShadow:     '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
                pointerEvents: 'auto',
                position:      'relative',
                overflow:      'hidden',
                animation:     toast.exiting
                  ? 'toastOut 0.35s cubic-bezier(0.4,0,1,1) forwards'
                  : 'toastIn 0.35s cubic-bezier(0,0,0.2,1) forwards',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Progress bar */}
              <div
                style={{
                  position:   'absolute',
                  bottom:     0,
                  left:       0,
                  height:     3,
                  background: c.bar,
                  borderRadius: '0 0 0 12px',
                  animation:  'toastProgress 4s linear forwards',
                  opacity:    0.7,
                }}
              />

              {/* Left color strip */}
              <div style={{
                position: 'absolute',
                left:     0,
                top:      0,
                bottom:   0,
                width:    4,
                background: c.bar,
                borderRadius: '12px 0 0 12px',
              }} />

              {/* Icon */}
              <div style={{ paddingLeft: 6, paddingTop: 1, flexShrink: 0 }}>
                <Icon size={18} style={{ color: c.icon }} />
              </div>

              {/* Message */}
              <span style={{
                flex:       1,
                fontSize:   '0.875rem',
                fontWeight: 500,
                color:      '#1f2937',
                lineHeight: 1.4,
                paddingRight: 4,
              }}>
                {toast.message}
              </span>

              {/* Close button */}
              <button
                onClick={() => dismiss(toast.id)}
                style={{
                  flexShrink:  0,
                  background:  'transparent',
                  border:      'none',
                  cursor:      'pointer',
                  padding:     2,
                  borderRadius: 4,
                  color:       '#9ca3af',
                  display:     'flex',
                  alignItems:  'center',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#374151'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(110%) scale(0.92); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateX(0) scale(1); max-height: 80px; }
          to   { opacity: 0; transform: translateX(110%) scale(0.92); max-height: 0; margin: 0; padding: 0; }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider');
  return ctx;
}
