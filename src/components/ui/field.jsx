import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/constants/colors";

function Field({ label, error, children, required }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.textMuted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {label}{required && <span style={{ color: COLORS.accent, marginLeft: 3 }}>*</span>}
            </label>
            {children}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        style={{ fontSize: 12, color: COLORS.error, display: "flex", alignItems: "center", gap: 4 }}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="5.5" stroke={COLORS.error} />
                            <path d="M6 3.5v3M6 8h.01" stroke={COLORS.error} strokeLinecap="round" />
                        </svg>
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
export default Field