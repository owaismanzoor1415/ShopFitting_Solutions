import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Image, Briefcase, Building2, GitBranch,
  FolderOpen, Star, ChevronRight, LogOut, Settings, Layers, X, Menu,
  Info, Phone, Megaphone
} from 'lucide-react';
import { useState } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import AdminLogin from '../pages/AdminLogin';
import { useNotification } from '../context/NotificationContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/hero-slides', label: 'Hero Slides', icon: Image },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/services-detail', label: 'Services Detail', icon: Layers },
  { to: '/admin/industries', label: 'Industries', icon: Building2 },
  { to: '/admin/process', label: 'Process Steps', icon: GitBranch },
  { to: '/admin/portfolio', label: 'Portfolio', icon: FolderOpen },
  { to: '/admin/portfolio-detail', label: 'Portfolio Detail', icon: FolderOpen },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/about', label: 'About Section', icon: Info },
  { to: '/admin/contact', label: 'Contact Info', icon: Phone },
  { to: '/admin/cta', label: 'CTA Section', icon: Megaphone },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { authenticated, checking, setAuthenticated, logout } = useAdminAuth();
  const { success, info } = useNotification();

  function handleLogin() {
    setAuthenticated(true);
    success('Welcome back! You are now logged in.');
  }

  function handleLogout() {
    logout();
    info('You have been logged out.');
    navigate('/');
  }

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00308F 0%, #002070 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'system-ui, sans-serif', background: '#f5f5ff' }}>
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col transition-all duration-300 shrink-0`}
        style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #00308F 0%, #002070 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16" style={{ borderBottom: '1px solid rgba(204,0,1,0.20)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#CC0001' }}>
            <Settings className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-sm font-bold text-white">Admin Panel</div>
              <div className="text-xs" style={{ color: '#CC0001' }}>ShopFit Solutions</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Flag stripe */}
        <div style={{ height: 3, background: 'linear-gradient(to right, #CC0001 33.3%, rgba(255,255,255,0.15) 33.3% 66.6%, #00308F 66.6%)' }} />

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`
              }
              style={({ isActive }) => isActive
                ? { background: 'linear-gradient(135deg, #CC0001, #a80001)' }
                : {}}
              title={!sidebarOpen ? label : undefined}
              onMouseEnter={e => { if (!e.currentTarget.style.background.includes('CC0001')) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { if (!e.currentTarget.style.background.includes('CC0001')) e.currentTarget.style.background = ''; }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-1" style={{ borderTop: '1px solid rgba(204,0,1,0.15)' }}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
            title={!sidebarOpen ? 'View Site' : undefined}
          >
            <ChevronRight className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>View Site</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 transition-colors"
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white h-16 flex items-center px-6 shrink-0" style={{ borderBottom: '1px solid rgba(0,0,128,0.10)', boxShadow: '0 1px 8px rgba(0,0,128,0.06)' }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(0,0,128,0.50)' }}>
            <span className="font-medium text-gray-800">ShopFit Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: '#CC0001' }}>Content Management</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'rgba(255,205,0,0.10)', color: '#FFCD00' }}>● Live</span>
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium transition-colors"
              style={{ color: 'rgba(0,0,128,0.60)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#CC0001'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,128,0.60)'}
            >
              ← Back to Site
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
