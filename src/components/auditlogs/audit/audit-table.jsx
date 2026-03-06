import React from 'react';
import { formatDate, getSeverityClass, getVelocityColor, getActionColor } from '@/utils/index.js';
const Avatar = ({ src, name, size = 'sm' }) => {
  const dim = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  return (
    <img
      src={src || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}
      alt={name}
      className={`${dim} rounded-full object-cover bg-ink-600 ring-1 ring-white/10 flex-shrink-0`}
      onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`; }}
    />
  );
};

const VelocityBar = ({ score }) => (
  <div className="flex items-center gap-2 min-w-[90px]">
    <div className="flex-1 h-1.5 bg-ink-600 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${getVelocityColor(score)}`}
        style={{ width: `${score}%` }}
      />
    </div>
    <span className="text-xs font-mono text-slate-400 w-7 text-right">{score}</span>
  </div>
);

const SeverityBadge = ({ severity }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getSeverityClass(severity)}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
    {severity}
  </span>
);

const EmptyState = () => (
  <tr>
    <td colSpan="8" className="px-6 py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-ink-700 flex items-center justify-center mx-auto mb-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7A9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
        </svg>
      </div>
      <p className="text-slate-500 text-sm">No audit logs found</p>
      <p className="text-slate-600 text-xs mt-1">Try adjusting your filters</p>
    </td>
  </tr>
);

const SkeletonRow = () => (
  <tr className="border-b border-white/5">
    {Array.from({ length: 8 }).map((_, i) => (
      <td key={i} className="px-4 py-4">
        <div className="h-4 bg-ink-700 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
      </td>
    ))}
  </tr>
);

const AuditTable = ({ logs, loading }) => (
  <div className="glass rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            {['Client', 'Lawyer', 'Case Type', 'Action', 'Bottleneck', 'Velocity', 'Severity', 'Timestamp'].map((h) => (
              <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            : logs.length === 0
            ? <EmptyState />
            : logs.map((log, idx) => (
              <tr
                key={log.id}
                className="border-b border-white/5 hover:bg-ink-700/30 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={log.client?.avatarUrl} name={log.client?.name || 'C'} />
                    <span className="font-medium text-white text-xs whitespace-nowrap">{log.client?.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={log.lawyer?.avatarUrl} name={log.lawyer?.name || 'L'} />
                    <span className="text-slate-300 text-xs whitespace-nowrap">{log.lawyer?.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs font-mono bg-ink-700 text-slate-300 px-2 py-1 rounded whitespace-nowrap">
                    {log.case?.caseType?.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`font-mono text-xs font-medium ${getActionColor(log.action)}`}>{log.action}</span>
                </td>
                <td className="px-4 py-3.5 max-w-[180px]">
                  {log.currentBottleneck
                    ? <span className="text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded truncate block">{log.currentBottleneck}</span>
                    : <span className="text-slate-600 text-xs">—</span>
                  }
                </td>
                <td className="px-4 py-3.5 min-w-[110px]">
                  <VelocityBar score={log.velocityScore} />
                </td>
                <td className="px-4 py-3.5">
                  <SeverityBadge severity={log.severity} />
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs text-slate-500 font-mono">{formatDate(log.createdAt)}</span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
);

export default AuditTable;
