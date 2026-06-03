import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import { Save, RotateCcw } from 'lucide-react';

export default function AdminContact() {
  const { data, update, resetSection } = useAdminData();
  const [form, setForm] = useState(data.contactInfo || {});
  const [saved, setSaved] = useState(false);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    update('contactInfo', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (window.confirm('Reset contact info to defaults?')) {
      resetSection('contactInfo');
      setForm(data.contactInfo);
    }
  }

  const fields = [
    { key: 'heading', label: 'Section Heading', placeholder: 'Get a Free Quote' },
    { key: 'subheading', label: 'Subheading', placeholder: 'Ready to transform your retail space?', multiline: true },
    { key: 'phone', label: 'Phone Number', placeholder: '1800 335 044' },
    { key: 'email', label: 'Email Address', placeholder: 'info@shopfittingsolutions.com.au' },
    { key: 'address', label: 'Address / Location', placeholder: 'Sydney, NSW, Australia' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Info</h1>
          <p className="text-sm text-gray-500 mt-1">Update contact details shown across the site</p>
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
    </div>
  );
}
