import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Trash2 } from 'lucide-react';
import ProgressBar from './progress-bar';
import { STATUS_STEPS, STATUS_CONFIG } from './activity-data';

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: i * 0.1, duration: 0.45, ease: 'easeOut' },
    }),
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -8 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
};

const ClientCard = ({ client, index, onStatusChange, onDelete }) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const config = STATUS_CONFIG[client.status] ?? STATUS_CONFIG['Submitted'];

    const handleSave = () => {
        if (selectedStatus && selectedStatus !== client.status) {
            onStatusChange(client.id, selectedStatus);
            setSelectedStatus('');
            setIsDropdownOpen(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            layout
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-visible"
        >
            <div className="p-5">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-1">
                    <button
                        onClick={() => setShowImage((prev) => !prev)}
                        className="flex items-center gap-3 text-left group"
                    >
                        <motion.img
                            src={client.avatar}
                            alt={client.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        />
                        <div>
                            <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm">
                                {client.name}
                            </p>
                            <p className="text-xs text-slate-400 font-mono">{client.id}</p>
                        </div>
                    </button>

                    {/* Case Type Badge & Delete Actions */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                            {client.caseType}
                        </span>
                        
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#fee2e2', color: '#dc2626' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDelete(client.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-500 transition-colors bg-white outline-none"
                            title="Delete Case from Activity Feed"
                        >
                            <Trash2 className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>

                {/* Expanded Avatar Image (on click) */}
                <AnimatePresence>
                    {showImage && (
                        <motion.div
                            key="avatar-expanded"
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, scale: 0.6, rotate: 8, transition: { duration: 0.25 } }}
                            className="flex justify-center my-4"
                        >
                            <img
                                src={client.avatar}
                                alt={client.name}
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-200 shadow-xl"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated Progress Bar */}
                <ProgressBar status={client.status} />

                {/* Status Dropdown + Save - Custom Implementation */}
                <div className="flex items-center gap-2 mt-3 relative" ref={dropdownRef}>

                    <div className="flex-1 relative">
                        {/* Dropdown Trigger */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg hover:border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 outline-none transition-all"
                        >
                            <span className={!selectedStatus ? 'text-slate-400' : 'text-slate-700 font-medium'}>
                                {selectedStatus || 'Select Status'}
                            </span>
                            <motion.div
                                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            </motion.div>
                        </motion.button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
                                >
                                    <div className="py-1 max-h-48 overflow-y-auto">
                                        {STATUS_STEPS.map((status, index) => (
                                            <motion.button
                                                key={status}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03, duration: 0.2 }}
                                                onClick={() => {
                                                    setSelectedStatus(status);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors
                                                    ${selectedStatus === status ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}
                                                `}
                                            >
                                                {status}
                                                {selectedStatus === status && (
                                                    <Check className="w-4 h-4 text-indigo-600" />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleSave}
                        disabled={!selectedStatus || selectedStatus === client.status}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 h-[42px]"
                    >
                        Save
                    </motion.button>
                </div>

                {/* Current Status Label */}
                <div className="mt-3 flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">Current Status:</span>
                    <motion.span
                        key={client.status}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.badgeBg} ${config.textColor}`}
                    >
                        {client.status}
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
};

export default ClientCard;
