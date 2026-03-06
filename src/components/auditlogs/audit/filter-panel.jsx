import React from 'react';

const Select = ({ value, onChange, options, placeholder }) => (
  <select
    value={value || ''}
    onChange={(e) => onChange(e.target.value || undefined)}
    className="bg-ink-700 border border-white/10 text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-gold-500/50 appearance-none cursor-pointer min-w-[140px]"
  >
    <option value="">{placeholder}</option>
    {options.map(({ value, label }) => (
      <option key={value} value={value}>{label}</option>
    ))}
  </select>
);

const SEVERITY_OPTIONS = [
  { value: 'INFO', label: '● Info' },
  { value: 'WARNING', label: '● Warning' },
  { value: 'CRITICAL', label: '● Critical' },
];

const CASE_TYPE_OPTIONS = [
  { value: 'CIVIL', label: 'Civil' },
  { value: 'CRIMINAL', label: 'Criminal' },
  { value: 'CORPORATE', label: 'Corporate' },
  { value: 'FAMILY', label: 'Family' },
  { value: 'INTELLECTUAL_PROPERTY', label: 'IP' },
  { value: 'REAL_ESTATE', label: 'Real Estate' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date' },
  { value: 'severityScore', label: 'Severity' },
  { value: 'velocityScore', label: 'Velocity' },
];

const FiltersPanel = ({ filters, onUpdate }) => {
  const hasFilters = filters.severity || filters.caseType;

  return (
    <div className="glass rounded-xl p-4 mb-4 flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Filter</span>
      
      <Select
        value={filters.severity}
        onChange={(v) => onUpdate({ severity: v })}
        options={SEVERITY_OPTIONS}
        placeholder="All Severities"
      />
      
      <Select
        value={filters.caseType}
        onChange={(v) => onUpdate({ caseType: v })}
        options={CASE_TYPE_OPTIONS}
        placeholder="All Case Types"
      />

      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort</span>
        <Select
          value={filters.sortBy}
          onChange={(v) => onUpdate({ sortBy: v })}
          options={SORT_OPTIONS}
          placeholder="Sort by"
        />
        <button
          onClick={() => onUpdate({ order: filters.order === 'ASC' ? 'DESC' : 'ASC' })}
          className="w-9 h-9 rounded-lg bg-ink-700 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-gold-500/30 transition-colors"
          title={filters.order === 'ASC' ? 'Ascending' : 'Descending'}
        >
          {filters.order === 'ASC'
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
          }
        </button>
        {hasFilters && (
          <button
            onClick={() => onUpdate({ severity: undefined, caseType: undefined })}
            className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FiltersPanel;