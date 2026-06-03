import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input, Textarea } from '../components/FormFields';

const EMPTY = { icon: 'message-square', num: '', title: '', desc: '', duration: '' };

export default function AdminProcess() {
  const { data, addItem, editItem, deleteItem, resetSection } = useAdminData();
  const steps = data.processSteps;

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm({ ...EMPTY, num: String(steps.length + 1).padStart(2, '0') }); setModal({ open: true, mode: 'add', index: null }); }
  function openEdit(row, index) { setForm({ ...row }); setModal({ open: true, mode: 'edit', index }); }

  function handleSubmit() {
    if (!form.title.trim() || !form.num.trim()) { alert('Step number and title are required.'); return; }
    if (modal.mode === 'add') addItem('processSteps', form);
    else editItem('processSteps', modal.index, form);
    setModal({ open: false });
  }

  function handleDelete(index) {
    if (window.confirm('Delete this process step?')) deleteItem('processSteps', index);
  }

  const columns = [
    { key: 'num', label: '#', render: (val) => <span className="font-bold text-red-600">{val}</span> },
    { key: 'icon', label: 'Icon', render: (val) => <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{val}</span> },
    { key: 'title', label: 'Title' },
    { key: 'desc', label: 'Description', render: (val) => <span className="text-gray-500 text-xs line-clamp-2">{val}</span> },
    { key: 'duration', label: 'Duration', render: (val) => <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{val}</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Process Steps"
        description="Manage the 'How It Works' process steps."
        count={steps.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset process steps to default?')) resetSection('processSteps'); }}
      />

      <AdminTable columns={columns} rows={steps} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No process steps yet." />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Process Step' : 'Edit Process Step'}
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Step Number" required hint="e.g. 01, 02, 03">
            <Input value={form.num} onChange={e => setForm(f => ({ ...f, num: e.target.value }))} placeholder="01" />
          </Field>
          <Field label="Icon Name">
            <Input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="message-square" />
          </Field>
        </div>
        <Field label="Step Title" required>
          <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Free Consultation" />
        </Field>
        <Field label="Description">
          <Textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
        </Field>
        <Field label="Duration" hint="e.g. 1-2 Days, 2-4 Weeks, Ongoing">
          <Input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="1-2 Days" />
        </Field>
      </AdminModal>
    </div>
  );
}
