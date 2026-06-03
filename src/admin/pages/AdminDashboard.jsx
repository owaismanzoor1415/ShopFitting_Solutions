import { useAdminData } from '../context/AdminDataContext';
import { useNavigate } from 'react-router-dom';
import { Image, Briefcase, Building2, GitBranch, FolderOpen, Star, Layers, RotateCcw, Wifi, WifiOff, Info, Phone, Megaphone } from 'lucide-react';

const sections = [
  { key: 'heroSlides',      label: 'Hero Slides',       icon: Image,      to: '/admin/hero-slides' },
  { key: 'services',        label: 'Services',           icon: Briefcase,  to: '/admin/services' },
  { key: 'servicesDetail',  label: 'Services Detail',    icon: Layers,     to: '/admin/services-detail' },
  { key: 'industries',      label: 'Industries',         icon: Building2,  to: '/admin/industries' },
  { key: 'processSteps',    label: 'Process Steps',      icon: GitBranch,  to: '/admin/process' },
  { key: 'portfolioItems',  label: 'Portfolio Items',    icon: FolderOpen, to: '/admin/portfolio' },
  { key: 'portfolioDetail', label: 'Portfolio Detail',   icon: FolderOpen, to: '/admin/portfolio-detail' },
  { key: 'testimonials',    label: 'Testimonials',       icon: Star,       to: '/admin/testimonials' },
  { key: 'aboutSections',   label: 'About Section',      icon: Info,       to: '/admin/about' },
  { key: 'contactInfo',     label: 'Contact Info',        icon: Phone,      to: '/admin/contact' },
  { key: 'ctaContent',      label: 'CTA Section',         icon: Megaphone,  to: '/admin/cta' },
];

export default function AdminDashboard() {
  const { data, resetAll, backendAvailable, loading } = useAdminData();
  const navigate = useNavigate();

  const total = Object.values(data).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);

  return (
    <div>
      {/* Backend status banner */}
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-4 ${backendAvailable ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
        {backendAvailable
          ? <><Wifi className="w-4 h-4" /> Connected to backend — changes sync to MongoDB</>
          : <><WifiOff className="w-4 h-4" /> Backend offline — changes saved locally (localStorage). Start backend to sync.</>
        }
      </div>

      {/* Welcome */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold">Welcome to ShopFit Admin</h1>
        <p className="text-red-100 mt-1 text-sm">Manage all your website content from here. Changes reflect on the frontend immediately.</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="bg-white/20 rounded-xl px-4 py-2">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-red-100">Total Items</div>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-2">
            <div className="text-2xl font-bold">{sections.length}</div>
            <div className="text-xs text-red-100">Sections</div>
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {sections.map(({ key, label, icon: Icon, to }) => {
          const count = Array.isArray(data[key]) ? data[key].length : 0;
          return (
            <button
              key={key}
              onClick={() => navigate(to)}
              className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-red-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{count}</span>
              </div>
              <div className="font-semibold text-gray-800 text-sm">{label}</div>
              <div className="text-xs text-gray-400 mt-0.5">Click to manage →</div>
            </button>
          );
        })}
      </div>

      {/* Danger zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-red-700">Reset All Data</h3>
            <p className="text-xs text-red-500 mt-0.5">Restore all sections to their original default values. This cannot be undone.</p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure? This will reset ALL content to defaults.')) {
                resetAll();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
