import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input, Textarea, TagInput } from '../components/FormFields';

const ICONS = ['ruler', 'paintbrush', 'hammer', 'lightbulb', 'truck', 'wrench', 'star', 'settings', 'home', 'zap'];

const EMPTY = { icon: 'ruler', title: '', desc: '', features: [] };

export default function AdminServices() {
  const { data, addItem, editItem, deleteItem, resetSection } = useAdminData();
  const services = data.services;

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm(EMPTY); setModal({ open: true, mode: 'add', index: null }); }
  function openEdit(row, index) { setForm({ ...row, features: [...(row.features || [])] }); setModal({ open: true, mode: 'edit', index }); }

  function handleSubmit() {
    if (!form.title.trim() || !form.desc.trim()) { alert('Title and description are required.'); return; }
    if (modal.mode === 'add') addItem('services', form);
    else editItem('services', modal.index, form);
    setModal({ open: false });
  }

  function handleDelete(index) {
    if (window.confirm('Delete this service?')) deleteItem('services', index);
  }

  const columns = [
    { key: 'icon', label: 'Icon', render: (val) => <span className="bg-red-100 text-orange-700 text-xs px-2 py-1 rounded-full font-mono">{val}</span> },
    { key: 'title', label: 'Title' },
    { key: 'desc', label: 'Description', render: (val) => <span className="text-gray-500 text-xs line-clamp-2">{val}</span> },
    {
      key: 'features', label: 'Features',
      render: (val) => (
        <div className="flex flex-wrap gap-1">
          {(val || []).slice(0, 3).map(f => <span key={f} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{f}</span>)}
          {(val || []).length > 3 && <span className="text-xs text-gray-400">+{val.length - 3}</span>}
        </div>
      )
    },
  ];

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage the services displayed on the homepage."
        count={services.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset services to default?')) resetSection('services'); }}
      />

      <AdminTable columns={columns} rows={services} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No services yet." />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Service' : 'Edit Service'}
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Service Title" required>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Design & Planning" />
          </Field>
          <Field label="Icon Name">
            <select
              value={form.icon}
              onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Description" required>
          <Textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Brief description of the service..." />
        </Field>
        <Field label="Features" hint="Press Enter or comma to add a feature tag">
          <TagInput value={form.features} onChange={tags => setForm(f => ({ ...f, features: tags }))} placeholder="Add feature..." />
        </Field>
      </AdminModal>
    </div>
  );
}
