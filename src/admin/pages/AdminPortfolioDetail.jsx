import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/AdminDataContext';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import PageHeader from '../components/PageHeader';
import { Field, Input, Textarea, Select, TagInput } from '../components/FormFields';
import { Plus, Trash2 } from 'lucide-react';

const CATEGORIES = ['jewellery', 'supermarket', 'cafe', 'fashion', 'kiosk', 'beauty', 'other'];
const EMPTY_STAT = { label: '', value: '' };
const EMPTY = {
  slug: '', title: '', category: 'jewellery', location: '', year: new Date().getFullYear().toString(),
  tags: [], desc: '', longDesc: '', images: [], stats: [], services: []
};

export default function AdminPortfolioDetail() {
  const { data, addItem, editItem, deleteItem, resetSection, slugify } = useAdminData();
  const items = data.portfolioDetail;
  const { slug } = useParams();
  const navigate = useNavigate();

  const [modal, setModal] = useState({ open: false, mode: 'add', index: null });
  const [form, setForm] = useState(EMPTY);

  function openAdd() { setForm(EMPTY); setModal({ open: true, mode: 'add', index: null }); }
  function openEdit(row, index) {
    setForm({
      ...row,
      tags: [...(row.tags || [])],
      images: [...(row.images || [])],
      stats: (row.stats || []).map(s => ({ ...s })),
      services: [...(row.services || [])],
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
    if (modal.mode === 'add') addItem('portfolioDetail', { ...form, slug: newSlug });
    else editItem('portfolioDetail', modal.index, { ...form, slug: newSlug });
    setModal({ open: false });
    if (slug) navigate('/admin/portfolio-detail');
  }

  function handleDelete(index) {
    if (window.confirm('Delete this portfolio detail page?')) deleteItem('portfolioDetail', index);
  }

  function addStat() { setForm(f => ({ ...f, stats: [...f.stats, { ...EMPTY_STAT }] })); }
  function updateStat(i, key, val) { setForm(f => { const s = [...f.stats]; s[i] = { ...s[i], [key]: val }; return { ...f, stats: s }; }); }
  function removeStat(i) { setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) })); }

  function addImage() { setForm(f => ({ ...f, images: [...f.images, ''] })); }
  function updateImage(i, val) { setForm(f => { const imgs = [...f.images]; imgs[i] = val; return { ...f, images: imgs }; }); }
  function removeImage(i) { setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) })); }

  const columns = [
    {
      key: 'slug', label: 'Slug',
      render: (val) => (
        <a
          href={`/admin/portfolio-detail/${val}`}
          className="font-mono text-xs text-blue-600 hover:underline cursor-pointer"
          onClick={(e) => { e.preventDefault(); navigate(`/admin/portfolio-detail/${val}`); }}
        >
          /portfolio/{val}
        </a>
      )
    },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category', render: (val) => <span className="text-xs bg-red-100 text-orange-700 px-2 py-0.5 rounded-full">{val}</span> },
    { key: 'location', label: 'Location', render: (val) => <span className="text-xs text-gray-500">{val}</span> },
    { key: 'year', label: 'Year', render: (val) => <span className="text-xs text-gray-400">{val}</span> },
    { key: 'images', label: 'Images', render: (val) => <span className="text-xs text-gray-400">{(val || []).length} img(s)</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Portfolio Detail Pages"
        description="Manage individual portfolio project pages (accessible via /portfolio/:slug)."
        count={items.length}
        onAdd={openAdd}
        onReset={() => { if (window.confirm('Reset portfolio detail to default?')) resetSection('portfolioDetail'); }}
      />

      <AdminTable columns={columns} rows={items} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No portfolio detail pages yet." />

      <AdminModal
        title={modal.mode === 'add' ? 'Add Portfolio Detail' : 'Edit Portfolio Detail'}
        isOpen={modal.open}
        onClose={() => { setModal({ open: false }); if (slug) navigate('/admin/portfolio-detail'); }}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Project Title" required>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Lumina Jewellery Boutique" />
          </Field>
          <Field label="URL Slug" hint="Auto-generated if empty">
            <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="lumina-jewellery-boutique" />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Category">
            <Select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              options={CATEGORIES.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))} />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Sydney, NSW" />
          </Field>
          <Field label="Year">
            <Input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2024" />
          </Field>
        </div>
        <Field label="Short Description">
          <Textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
        </Field>
        <Field label="Long Description">
          <Textarea rows={4} value={form.longDesc} onChange={e => setForm(f => ({ ...f, longDesc: e.target.value }))} />
        </Field>
        <Field label="Tags" hint="Press Enter to add">
          <TagInput value={form.tags} onChange={tags => setForm(f => ({ ...f, tags }))} />
        </Field>
        <Field label="Services Used" hint="Press Enter to add service names">
          <TagInput value={form.services} onChange={services => setForm(f => ({ ...f, services }))} placeholder="Add service..." />
        </Field>

        {/* Stats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Stats</label>
            <button onClick={addStat} className="flex items-center gap-1 text-xs text-red-700 hover:text-orange-700">
              <Plus className="w-3 h-3" /> Add Stat
            </button>
          </div>
          <div className="space-y-2">
            {form.stats.map((stat, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label (e.g. Project Size)" />
                <Input value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Value (e.g. 120sqm)" />
                <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
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
                <button onClick={() => removeImage(i)} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </AdminModal>
    </div>
  );
}