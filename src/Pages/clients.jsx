import Clientheader from "@/components/clientcomp/client-header"
import ClientPage from "@/components/clientcomp/client-page"
import { AnimatePresence } from "framer-motion";
import IntakeFormModal from "@/components/clientintake/intake-for-modal";
import { useState, useEffect } from "react";

const Clients = () => {
    const [showForm, setShowForm] = useState(false);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch clients from the backend on mount
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/clients`);
                const data = await res.json();
                if (data.success) setClients(data.data);
            } catch (err) {
                console.error("Failed to fetch clients:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    // Called by the form on successful submission — prepends the new client
    const handleClientCreated = (newClient) => {
        setClients(prev => [newClient, ...prev]);
    };

    return (
        <>
            <Clientheader />
            <ClientPage
                clients={clients}
                loading={loading}
                onOpenForm={() => setShowForm(true)}
            />
            <AnimatePresence>
                {showForm && (
                    <IntakeFormModal
                        onClose={() => setShowForm(false)}
                        onClientCreated={handleClientCreated}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Clients