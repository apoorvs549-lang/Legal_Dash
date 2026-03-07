import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClientCard from './client-card';
import { STATUS_CONFIG } from './activity-data';

const ActivityFeedHeader = ({ clients }) => {
    const stats = [
        { label: 'Total Cases', value: clients.length },
        {
            label: 'In Progress',
            value: clients.filter((c) => c.status !== 'Closed' && c.status !== 'Submitted').length,
        },
        { label: 'Closed', value: clients.filter((c) => c.status === 'Closed').length },
    ];

    return (
        <div className="mb-8">
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-slate-800 mb-1">Activity Feed</h1>
                <p className="text-sm text-slate-400">Track and manage case status progression for each client</p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
                className="grid grid-cols-3 gap-4 mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm"
                    >
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
                            {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const ActivityFeedList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cases`);
                const result = await res.json();
                if (result.success && result.data) {
                    // Prepend real cases and append mock data as fallback if desired
                    const liveCases = result.data.map(c => ({
                        id: c.id,
                        name: c.name,
                        caseType: c.caseType,
                        status: c.status,
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=6366f1&color=fff&size=80`
                    }));
                    setClients(liveCases);
                }
            } catch (err) {
                console.error("Failed to fetch assigned cases:", err);
            }
        };
        fetchCases();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic UI update
        setClients((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        
        // Push status change to backend (assuming PUT /api/v1/cases/:id exists, if not this is a safe placeholder)
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cases/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleDelete = async (id) => {
        // Optimistic UI update for immediate snapping
        setClients((prev) => prev.filter((c) => c.id !== id));

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cases/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Failed to delete case from database");
        } catch (err) {
            console.error("Failed to delete case:", err);
            // Optionally, we could re-fetch cases here if the delete failed
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 rounded-xl shadow-sm">
            <div className="max-w-4xl mx-auto">
                <ActivityFeedHeader clients={clients} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {clients.map((client, i) => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            index={i}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityFeedList;
