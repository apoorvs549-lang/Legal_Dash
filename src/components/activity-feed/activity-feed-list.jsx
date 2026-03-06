import { useState } from 'react';
import { motion } from 'framer-motion';
import ClientCard from './client-card';
import { INITIAL_CLIENTS, STATUS_CONFIG } from './activity-data';

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
    const [clients, setClients] = useState(INITIAL_CLIENTS);

    const handleStatusChange = (id, newStatus) => {
        setClients((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityFeedList;
