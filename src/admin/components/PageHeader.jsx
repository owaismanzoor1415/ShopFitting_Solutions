import { Plus, RotateCcw } from 'lucide-react';

export default function PageHeader({ title, description, count, onAdd, addLabel = 'Add New', onReset, resetLabel = 'Reset to Default' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        {count !== undefined && (
          <span className="inline-block mt-1 text-xs bg-red-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
            {count} item{count !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {resetLabel}
          </button>
        )}
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}
