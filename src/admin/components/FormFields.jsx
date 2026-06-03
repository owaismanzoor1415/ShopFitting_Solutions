export function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
    />
  );
}

export function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      rows={props.rows || 3}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-y"
    />
  );
}

export function Select({ options, ...props }) {
  return (
    <select
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function TagInput({ value = [], onChange, placeholder = 'Add tag...' }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val && !value.includes(val)) {
        onChange([...value, val]);
        e.target.value = '';
      }
    }
  }
  function remove(tag) {
    onChange(value.filter(t => t !== tag));
  }
  return (
    <div className="border border-gray-300 rounded-lg p-2 flex flex-wrap gap-1.5 min-h-[42px]">
      {value.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 bg-red-100 text-orange-700 text-xs px-2 py-1 rounded-full">
          {tag}
          <button type="button" onClick={() => remove(tag)} className="hover:text-red-500">×</button>
        </span>
      ))}
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 min-w-[100px] text-sm outline-none bg-transparent"
      />
    </div>
  );
}
