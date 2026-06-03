import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input, Textarea } from '../components/FormFields';

const EMPTY = { quote: '', avatar: '', name: '', role: '', location: '' };

export default function AdminTestimonials() {
  const { data, addItem, editItem, deleteItem, resetSection } = useAdminData();
  const items = data.testimonials;

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm(EMPTY); setModal({ open: true, mode: 'add', index: null }); }
  function openEdit(row, index) { setForm({ ...row }); setModal({ open: true, mode: 'edit', index }); }

  function handleSubmit() {
    if (!form.name.trim() || !form.quote.trim()) { alert('Name and quote are required.'); return; }
    if (modal.mode === 'add') addItem('testimonials', form);
    else editItem('testimonials', modal.index, form);
    setModal({ open: false });
  }

  function handleDelete(index) {
    if (window.confirm('Delete this testimonial?')) deleteItem('testimonials', index);
  }

  const columns = [
    {
      key: 'avatar', label: 'Avatar',
      render: (val, row) => val ? (
        <img src={val} alt={row.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" onError={e => { e.target.style.display='none'; }} />
      ) : (
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
          {row.name?.[0] || '?'}
        </div>
      )
    },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role', render: (val) => <span className="text-xs text-gray-500">{val}</span> },
    { key: 'location', label: 'Location', render: (val) => <span className="text-xs text-gray-400">{val}</span> },
    { key: 'quote', label: 'Quote', render: (val) => <span className="text-xs text-gray-500 line-clamp-2">{val}</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage customer testimonials displayed on the homepage."
        count={items.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset testimonials to default?')) resetSection('testimonials'); }}
      />

      <AdminTable columns={columns} rows={items} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No testimonials yet." />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Customer Name" required>
            <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Sarah Mitchell" />
          </Field>
          <Field label="Role / Title">
            <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Owner, Lumina Jewellery" />
          </Field>
        </div>
        <Field label="Location">
          <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Sydney, NSW" />
        </Field>
        <Field label="Avatar URL" hint="Link to a profile photo">
          <Input value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="https://..." />
        </Field>
        {form.avatar && (
          <img src={form.avatar} alt="" className="w-16 h-16 rounded-full object-cover bg-gray-100" onError={e => { e.target.style.display = 'none'; }} />
        )}
        <Field label="Quote" required>
          <Textarea rows={4} value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} placeholder="ShopFit Pro transformed our store..." />
        </Field>
      </AdminModal>
    </div>
  );
}
