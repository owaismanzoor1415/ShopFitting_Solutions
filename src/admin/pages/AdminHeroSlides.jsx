import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input } from '../components/FormFields';

const EMPTY = { img: '', title: '' };

export default function AdminHeroSlides() {
  const { data, addItem, editItem, deleteItem, resetSection } = useAdminData();
  const slides = data.heroSlides;

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() {
    setForm(EMPTY);
    setModal({ open: true, mode: 'add', index: null });
  }

  function openEdit(row, index) {
    setForm({ img: row.img, title: row.title });
    setModal({ open: true, mode: 'edit', index });
  }

  function handleSubmit() {
    if (!form.title.trim() || !form.img.trim()) {
      alert('Title and Image URL are required.');
      return;
    }
    if (modal.mode === 'add') addItem('heroSlides', form);
    else editItem('heroSlides', modal.index, form);
    setModal({ open: false });
  }

  function handleDelete(index) {
    if (window.confirm('Delete this slide?')) deleteItem('heroSlides', index);
  }

  const columns = [
    {
      key: 'img', label: 'Preview',
      render: (val) => val ? (
        <img src={val} alt="slide" className="w-16 h-10 object-cover rounded-lg bg-gray-100" onError={e => { e.target.style.display='none'; }} />
      ) : <span className="text-gray-300 text-xs">No image</span>
    },
    { key: 'title', label: 'Title' },
    { key: 'img', label: 'Image URL', render: (val) => <span className="text-xs text-gray-400 truncate block max-w-[200px]">{val}</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Hero Slides"
        description="Manage the hero slideshow images and titles."
        count={slides.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset hero slides to default?')) resetSection('heroSlides'); }}
      />

      <AdminTable
        columns={columns}
        rows={slides}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage="No hero slides. Click 'Add New' to create one."
      />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Hero Slide' : 'Edit Hero Slide'}
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        onSubmit={handleSubmit}
      >
        <Field label="Slide Title" required>
          <Input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Loloma Jewellers Design"
          />
        </Field>
        <Field label="Image URL" required hint="Use a path like /Interior/image.webp or a full https:// URL">
          <Input
            value={form.img}
            onChange={e => setForm(f => ({ ...f, img: e.target.value }))}
            placeholder="/PHOTOS/example.webp"
          />
        </Field>
        {form.img && (
          <img
            src={form.img}
            alt="preview"
            className="w-full h-32 object-cover rounded-lg bg-gray-100"
            onError={e => { e.target.style.display='none'; }}
          />
        )}
      </AdminModal>
    </div>
  );
}
