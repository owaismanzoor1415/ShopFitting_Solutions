import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import { Plus, Trash2, Save, RotateCcw, GripVertical } from 'lucide-react';

export default function AdminAbout() {
  const { data, update, resetSection } = useAdminData();
  const [sections, setSections] = useState(data.aboutSections || []);
  const [saved, setSaved] = useState(false);

  function handleChange(idx, field, value) {
    setSections(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }

  function addSection() {
    setSections(prev => [...prev, { title: 'New Section', text: '', image: '' }]);
  }

  function removeSection(idx) {
    setSections(prev => prev.filter((_, i) => i !== idx));
  }

  function handleSave() {
    update('aboutSections', sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (window.confirm('Reset About sections to defaults?')) {
      resetSection('aboutSections');
      setSections(data.aboutSections);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Sections</h1>
          <p className="text-sm text-gray-500 mt-1">Edit the About page content sections</p>
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

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <GripVertical className="w-4 h-4 text-gray-300" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Section {idx + 1}</span>
              {section.isLast && <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">Last (has CTA button)</span>}
              <button onClick={() => removeSection(idx)} className="ml-auto text-red-400 hover:text-red-600 p-1 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Title</label>
                <input
                  value={section.title}
                  onChange={e => handleChange(idx, 'title', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  value={section.text}
                  onChange={e => handleChange(idx, 'text', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400 resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Image Path</label>
                <input
                  value={section.image}
                  onChange={e => handleChange(idx, 'image', e.target.value)}
                  placeholder="/AboutImages/example.webp"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400 font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`isLast-${idx}`}
                  checked={!!section.isLast}
                  onChange={e => handleChange(idx, 'isLast', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor={`isLast-${idx}`} className="text-sm text-gray-600">Show CTA button (last section)</label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addSection} className="mt-4 flex items-center gap-2 px-4 py-2 text-sm border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-red-300 hover:text-red-600 w-full justify-center transition">
        <Plus className="w-4 h-4" /> Add Section
      </button>
    </div>
  );
}
