import { motion } from "framer-motion";

const ROLES = [
    { value: "client", label: "Client", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
    { value: "lawyer", label: "Lawyer", icon: "M12 2L2 7l10 5 10-5-10-5z" },
];

export default function RoleToggle({ role, setRole }) {
    return (
        <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                Register as
            </label>
            <div className="flex gap-2.5 w-full">
                {ROLES.map((r) => {
                    const isActive = role === r.value;
                    return (
                        <motion.button
                            key={r.value}
                            type="button"
                            onClick={() => setRole(r.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className={`flex-1 flex items-center justify-center gap-2 py-[11px] rounded-[10px] text-[13px] font-semibold cursor-pointer font-['DM_Sans',sans-serif] transition-all duration-200 relative overflow-hidden border-[1.5px]
                                ${isActive
                                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                                    : "border-gray-200 bg-white text-gray-500"
                                }`}
                        >
                            {/* Icon */}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={isActive ? "#2563EB" : "#9CA3AF"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {r.value === "client" ? (
                                    <>
                                        <path d={r.icon} />
                                        <circle cx="12" cy="7" r="4" />
                                    </>
                                ) : (
                                    <>
                                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                        <line x1="4" y1="22" x2="4" y2="15" />
                                    </>
                                )}
                            </svg>
                            {r.label}

                            {/* Active indicator dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="role-indicator"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute top-1.5 right-1.5"
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
