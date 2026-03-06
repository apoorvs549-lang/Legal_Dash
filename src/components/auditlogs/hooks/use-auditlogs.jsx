import { useState, useEffect, useCallback } from 'react';
import { fetchAuditLogs } from '@/api';
export const useAuditLogs = (initialFilters = {}) => {
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 0 });
  const [filters, setFilters] = useState({ page: 1, limit: 20, sortBy: 'createdAt', order: 'DESC', ...initialFilters });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchAuditLogs(filters);
      setLogs(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const updateFilters = useCallback((updates) => {
    setFilters((prev) => ({ ...prev, ...updates, page: updates.page ?? 1 }));
  }, []);

  return { logs, pagination, filters, loading, error, updateFilters, refresh: load };
};