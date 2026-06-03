import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input, Textarea, TagInput } from '../components/FormFields';

const EMPTY = { bg: 'bg-amber-50', gradient: 'from-amber-500 to-yellow-600', icon: 'gem', iconColor: 'text-amber-500', title: '', desc: '', features: [] };

const BG_OPTIONS = [
  'bg-amber-50', 'bg-blue-50', 'bg-blue-50', 'bg-red-50', 'bg-pink-50', 'bg-purple-50', 'bg-gray-50'
];
const GRADIENT_OPTIONS = [
  'from-amber-500 to-yellow-600', 'from-yellow-400 to-yellow-500', 'from-blue-500 to-indigo-600',
  'from-red-700 to-red-600', 'from-pink-500 to-rose-600', 'from-purple-500 to-violet-600'
];

export default function AdminIndustries() {
  const { data, addItem, editItem, deleteItem, resetSection } = useAdminData();
  const industries = data.industries;

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm(EMPTY); setModal({ open: true, mode: 'add', index: null }); }
  function openEdit(row, index) { setForm({ ...row, features: [...(row.features || [])] }); setModal({ open: true, mode: 'edit', index }); }

  function handleSubmit() {
    if (!form.title.trim()) { alert('Title is required.'); return; }
    if (modal.mode === 'add') addItem('industries', form);
    else editItem('industries', modal.index, form);
    setModal({ open: false });
  }

  function handleDelete(index) {
    if (window.confirm('Delete this industry?')) deleteItem('industries', index);
  }

  const columns = [
    {
      key: 'icon', label: 'Style',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${row.gradient} flex items-center justify-center`} />
          <span className="font-mono text-xs">{val}</span>
        </div>
      )
    },
    { key: 'title', label: 'Title' },
    { key: 'desc', label: 'Description', render: (val) => <span className="text-gray-500 text-xs line-clamp-2">{val}</span> },
    {
      key: 'features', label: 'Features',
      render: (val) => (
        <div className="flex flex-wrap gap-1">
          {(val || []).slice(0, 2).map(f => <span key={f} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{f}</span>)}
          {(val || []).length > 2 && <span className="text-xs text-gray-400">+{val.length - 2}</span>}
        </div>
      )
    },
  ];

  return (
    <div>
      <PageHeader
        title="Industries"
        description="Manage the industries section on the homepage."
        count={industries.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset industries to default?')) resetSection('industries'); }}
      />

      <AdminTable columns={columns} rows={industries} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No industries yet." />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Industry' : 'Edit Industry'}
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Industry Title" required>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Jewellery Stores" />
          </Field>
          <Field label="Icon Name">
            <Input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="gem" />
          </Field>
        </div>
        <Field label="Description">
          <Textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Background Color Class">
            <select value={form.bg} onChange={e => setForm(f => ({ ...f, bg: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              {BG_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Gradient Classes">
            <select value={form.gradient} onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              {GRADIENT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Icon Color Class">
          <Input value={form.iconColor} onChange={e => setForm(f => ({ ...f, iconColor: e.target.value }))} placeholder="text-amber-500" />
        </Field>
        <Field label="Features" hint="Press Enter to add feature tags">
          <TagInput value={form.features} onChange={tags => setForm(f => ({ ...f, features: tags }))} />
        </Field>
      </AdminModal>
    </div>
  );
}
