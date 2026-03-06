import React from 'react';
import { useAuditLogs } from '@/components/auditlogs/hooks/use-auditlogs.jsx';
import { useDashboardStats } from '@/components/auditlogs/hooks/use-dashboard-stats.jsx';
import AuditTable from '../components/auditlogs/audit/audit-table.jsx';
import FiltersPanel from '../components/auditlogs/audit/filter-panel.jsx';
import Pagination from '../components/auditlogs/audit/pagination.jsx';
import StatsGrid from '../components/auditlogs/audit/stats-grid.jsx';
import ErrorState from '../components/ui/errorstate.jsx';

const Auditlogs = () => {
    const { logs, pagination, filters, loading, error, updateFilters, refresh } = useAuditLogs();
    const { stats } = useDashboardStats();

    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold text-white">Audit Logs</h1>
                    <p className="text-sm text-slate-500 mt-1">Monitor all system events and legal case activities</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live monitoring
                </div>
            </div>

            <StatsGrid stats={stats} />

            <FiltersPanel filters={filters} onUpdate={updateFilters} />

            {error
                ? <ErrorState message={error} onRetry={refresh} />
                : (
                    <>
                        <AuditTable logs={logs} loading={loading} />
                        <Pagination
                            pagination={pagination}
                            onPageChange={(page) => updateFilters({ page })}
                        />
                    </>
                )
            }
        </div>
    );
};

export default Auditlogs;