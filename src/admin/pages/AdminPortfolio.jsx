import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input, Textarea, Select, TagInput } from '../components/FormFields';

const CATEGORIES = ['jewellery', 'supermarket', 'cafe', 'fashion', 'kiosk', 'beauty', 'other'];
const EMPTY = { img: '', tags: [], title: '', desc: '', location: '', year: new Date().getFullYear().toString(), category: 'jewellery' };

export default function AdminPortfolio() {
  const { data, addItem, editItem, deleteItem, resetSection } = useAdminData();
  const items = data.portfolioItems;

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm(EMPTY); setModal({ open: true, mode: 'add', index: null }); }
  function openEdit(row, index) { setForm({ ...row, tags: [...(row.tags || [])] }); setModal({ open: true, mode: 'edit', index }); }

  function handleSubmit() {
    if (!form.title.trim()) { alert('Title is required.'); return; }
    if (modal.mode === 'add') addItem('portfolioItems', form);
    else editItem('portfolioItems', modal.index, form);
    setModal({ open: false });
  }

  function handleDelete(index) {
    if (window.confirm('Delete this portfolio item?')) deleteItem('portfolioItems', index);
  }

  const columns = [
    {
      key: 'img', label: 'Image',
      render: (val) => val ? (
        <img src={val} alt="" className="w-16 h-10 object-cover rounded-lg bg-gray-100" onError={e => { e.target.style.display='none'; }} />
      ) : <span className="text-xs text-gray-300">No image</span>
    },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category', render: (val) => <span className="text-xs bg-red-100 text-orange-700 px-2 py-0.5 rounded-full">{val}</span> },
    { key: 'location', label: 'Location', render: (val) => <span className="text-xs text-gray-500">{val}</span> },
    { key: 'year', label: 'Year', render: (val) => <span className="text-xs text-gray-500">{val}</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Portfolio Items"
        description="Manage the portfolio section on the homepage."
        count={items.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset portfolio items to default?')) resetSection('portfolioItems'); }}
      />

      <AdminTable columns={columns} rows={items} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No portfolio items yet." />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Portfolio Item' : 'Edit Portfolio Item'}
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        onSubmit={handleSubmit}
      >
        <Field label="Project Title" required>
          <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Lumina Jewellery Boutique" />
        </Field>
        <Field label="Image URL" hint="Use /path/to/image.webp or https:// URL">
          <Input value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} placeholder="https://..." />
        </Field>
        {form.img && (
          <img src={form.img} alt="" className="w-full h-32 object-cover rounded-lg bg-gray-100" onError={e => { e.target.style.display='none'; }} />
        )}
        <Field label="Description">
          <Textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Category">
            <Select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              options={CATEGORIES.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
            />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Sydney, NSW" />
          </Field>
          <Field label="Year">
            <Input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2024" />
          </Field>
        </div>
        <Field label="Tags" hint="Press Enter to add tags">
          <TagInput value={form.tags} onChange={tags => setForm(f => ({ ...f, tags }))} />
        </Field>
      </AdminModal>
    </div>
  );
}
