import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import { Save, RotateCcw } from 'lucide-react';

export default function AdminCTA() {
  const { data, update, resetSection } = useAdminData();
  const [form, setForm] = useState(data.ctaContent || {});
  const [saved, setSaved] = useState(false);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    update('ctaContent', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (window.confirm('Reset CTA content to defaults?')) {
      resetSection('ctaContent');
      setForm(data.ctaContent);
    }
  }

  const fields = [
    { key: 'badge', label: 'Badge Text', placeholder: 'Start Your Project' },
    { key: 'heading', label: 'Main Heading', placeholder: 'Ready to Build a High-Impact Retail Space?', multiline: true },
    { key: 'subheading', label: 'Subheading', placeholder: 'From concept to completion...', multiline: true },
    { key: 'cta1', label: 'Primary Button Text', placeholder: 'Get Free Consultation' },
    { key: 'cta2', label: 'Secondary Button Text', placeholder: 'View Our Work' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CTA Section</h1>
          <p className="text-sm text-gray-500 mt-1">Edit the Call-to-Action section content</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg font-semibold" style={{ background: saved ? '#16a34a' : 'linear-gradient(135deg, #CC0001, #a80001)' }}>
            <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {fields.map(({ key, label, placeholder, multiline }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{label}</label>
            {multiline ? (
              <textarea
                value={form[key] || ''}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={placeholder}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400 resize-none"
              />
            ) : (
              <input
                value={form[key] || ''}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            )}
          </div>
        ))}
      </div>

      {/* Live preview */}
      <div className="mt-6 rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #00308F 0%, #002070 100%)' }}>
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Preview</p>
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#CC0001' }}>{form.badge || 'Start Your Project'}</p>
          <h2 className="text-xl font-bold text-white mt-2">{form.heading || 'Ready to Build a High-Impact Retail Space?'}</h2>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{form.subheading || 'From concept to completion...'}</p>
          <div className="flex gap-3 mt-4">
            <span className="px-4 py-2 rounded-full text-white text-sm font-semibold" style={{ background: '#CC0001' }}>{form.cta1 || 'Get Free Consultation'}</span>
            <span className="px-4 py-2 rounded-full text-white text-sm border border-white/30">{form.cta2 || 'View Our Work'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
