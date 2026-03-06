import React from 'react';

const StatCard = ({ label, value, sub, color = 'text-white', icon }) => (
  <div className="glass rounded-xl p-5 animate-fade-in-up">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className={`text-3xl font-display font-bold mt-1 ${color}`}>{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      </div>
      <div className="w-10 h-10 rounded-lg bg-ink-700 flex items-center justify-center text-slate-400">
        {icon}
      </div>
    </div>
  </div>
);

const StatsGrid = ({ stats }) => {
  if (!stats) return null;
  const { total, bySeverity, avgVelocityScore } = stats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Total Events"
        value={total.toLocaleString()}
        sub="All time"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>}
      />
      <StatCard
        label="Critical Events"
        value={bySeverity.CRITICAL}
        color="text-rose-400"
        sub={`${bySeverity.WARNING} warnings`}
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
      />
      <StatCard
        label="Avg Velocity"
        value={`${avgVelocityScore}%`}
        color="text-gold-400"
        sub="Performance score"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>}
      />
      <StatCard
        label="Info Events"
        value={bySeverity.INFO}
        color="text-blue-400"
        sub="Routine operations"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
      />
    </div>
  );
};

export default StatsGrid;