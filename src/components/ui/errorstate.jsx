import React from 'react';

const ErrorState = ({ message, onRetry }) => (
  <div className="glass rounded-xl p-12 text-center animate-fade-in-up">
    <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </div>
    <h3 className="font-display text-lg font-semibold text-white mb-2">Failed to load</h3>
    <p className="text-sm text-slate-500 mb-5">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-5 py-2 bg-ink-700 hover:bg-ink-600 border border-white/10 rounded-lg text-sm font-medium text-white transition-colors"
      >
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;