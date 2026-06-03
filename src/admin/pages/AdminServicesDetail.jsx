import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input, Textarea } from '../components/FormFields';
import { Plus, Trash2 } from 'lucide-react';

const EMPTY_FEATURE = { label: '', image: '' };
const EMPTY = { slug: '', title: '', tagline: '', desc: '', longDesc: '', features: [], images: [] };

export default function AdminServicesDetail() {
  const { data, addItem, editItem, deleteItem, resetSection, slugify } = useAdminData();
  const items = data.servicesDetail;
  const { slug } = useParams();
  const navigate = useNavigate();

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm(EMPTY); setModal({ open: true, mode: 'add', index: null }); }
  function openEdit(row, index) {
    setForm({
      ...row,
      features: (row.features || []).map(f => ({ ...f })),
      images: [...(row.images || [])],
    });
    setModal({ open: true, mode: 'edit', index });
  }

  useEffect(() => {
    if (slug) {
      const index = items.findIndex(item => item.slug === slug);
      if (index !== -1) openEdit(items[index], index);
    }
  }, [slug]);

  function handleSubmit() {
    if (!form.title.trim()) { alert('Title is required.'); return; }
    const newSlug = form.slug.trim() || slugify(form.title);
    if (modal.mode === 'add') addItem('servicesDetail', { ...form, slug: newSlug });
    else editItem('servicesDetail', modal.index, { ...form, slug: newSlug });
    setModal({ open: false });
    if (slug) navigate('/admin/services-detail');
  }

  function handleDelete(index) {
    if (window.confirm('Delete this service detail page?')) deleteItem('servicesDetail', index);
  }

  function addFeature() { setForm(f => ({ ...f, features: [...f.features, { ...EMPTY_FEATURE }] })); }
  function updateFeature(i, key, val) {
    setForm(f => { const feats = [...f.features]; feats[i] = { ...feats[i], [key]: val }; return { ...f, features: feats }; });
  }
  function removeFeature(i) { setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) })); }

  function addImage() { setForm(f => ({ ...f, images: [...f.images, ''] })); }
  function updateImage(i, val) { setForm(f => { const imgs = [...f.images]; imgs[i] = val; return { ...f, images: imgs }; }); }
  function removeImage(i) { setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) })); }

  const columns = [
    {
      key: 'slug', label: 'Slug',
      render: (val) => (
        <a
          href={`/admin/services-detail/${val}`}
          className="font-mono text-xs text-blue-600 hover:underline cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigate(`/admin/services-detail/${val}`); }}
        >
          /services/{val}
        </a>
      )
    },
    { key: 'title', label: 'Title' },
    { key: 'tagline', label: 'Tagline', render: (val) => <span className="text-xs text-gray-500 italic">{val}</span> },
    {
      key: 'features', label: 'Features',
      render: (val) => <span className="text-xs text-gray-400">{(val || []).length} feature(s)</span>
    },
    {
      key: 'images', label: 'Images',
      render: (val) => <span className="text-xs text-gray-400">{(val || []).length} image(s)</span>
    },
  ];

  return (
    <div>
      <PageHeader
        title="Services Detail Pages"
        description="Manage the individual service detail pages (accessible via /services/:slug)."
        count={items.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset services detail to default?')) resetSection('servicesDetail'); }}
      />

      <AdminTable columns={columns} rows={items} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No service detail pages yet." />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Service Detail Page' : 'Edit Service Detail Page'}
        isOpen={modal.open}
        onClose={() => { setModal({ open: false }); if (slug) navigate('/admin/services-detail'); }}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Page Title" required>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Retail Design & Space Planning" />
          </Field>
          <Field label="URL Slug" hint="Auto-generated from title if left empty">
            <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="design-planning" />
          </Field>
        </div>
        <Field label="Tagline">
          <Input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="Where great retail spaces begin" />
        </Field>
        <Field label="Short Description">
          <Textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
        </Field>
        <Field label="Long Description">
          <Textarea rows={5} value={form.longDesc} onChange={e => setForm(f => ({ ...f, longDesc: e.target.value }))} />
        </Field>

        {/* Features */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Features</label>
            <button onClick={addFeature} className="flex items-center gap-1 text-xs text-red-700 hover:text-orange-700">
              <Plus className="w-3 h-3" /> Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {form.features.map((feat, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={feat.label} onChange={e => updateFeature(i, 'label', e.target.value)} placeholder="Feature label" />
                <Input value={feat.image} onChange={e => updateFeature(i, 'image', e.target.value)} placeholder="Image URL" />
                <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Gallery Images</label>
            <button onClick={addImage} className="flex items-center gap-1 text-xs text-red-700 hover:text-orange-700">
              <Plus className="w-3 h-3" /> Add Image
            </button>
          </div>
          <div className="space-y-2">
            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={img} onChange={e => updateImage(i, e.target.value)} placeholder="/path/to/image.webp or https://..." />
                <button onClick={() => removeImage(i)} className="text-red-400 hover:text-red-600 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </AdminModal>
    </div>
  );
}