export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const getSeverityClass = (severity) => {
  const map = { INFO: 'badge-info', WARNING: 'badge-warning', CRITICAL: 'badge-critical' };
  return map[severity] || 'badge-info';
};

export const getVelocityColor = (score) => {
  if (score >= 75) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-500';
  if (score >= 25) return 'bg-orange-500';
  return 'bg-rose-500';
};

export const getActionColor = (action) => {
  if (action.startsWith('CREATE')) return 'text-emerald-400';
  if (action.startsWith('DELETE')) return 'text-rose-400';
  if (action.startsWith('UPDATE')) return 'text-blue-400';
  return 'text-slate-400';
};