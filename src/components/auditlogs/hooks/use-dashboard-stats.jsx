import { useState, useEffect } from 'react';
import { fetchDashboardStats } from '@/api/index.js';
export const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardStats()
      .then(({ data }) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
};