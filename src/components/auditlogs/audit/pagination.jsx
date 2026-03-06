import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination || !pagination.totalPages) return null;
    const { page, totalPages, total, limit } = pagination;
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const getPages = () => {
        const pages = [];
        const delta = 2;
        const range = { start: Math.max(2, page - delta), end: Math.min(totalPages - 1, page + delta) };
        pages.push(1);
        if (range.start > 2) pages.push('...');
        for (let i = range.start; i <= range.end; i++) pages.push(i);
        if (range.end < totalPages - 1) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-1 pt-4">
            <p className="text-xs text-slate-500 font-mono">
                {start}–{end} of {total} events
            </p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-ink-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6" /></svg>
                </button>
                {getPages().map((p, i) =>
                    p === '...'
                        ? <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-600 text-sm">…</span>
                        : <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page
                                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-ink-700'
                                }`}
                        >{p}</button>
                )}
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-ink-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;