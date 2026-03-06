import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";

function Btn({ children, onClick, disabled, variant = "primary", type = "button", style: extraStyle }) {
    const base = {
        padding: "12px 28px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        border: "none",
        outline: "none",
        letterSpacing: "0.02em",
        ...extraStyle,
    };
    const styles = {
        primary: { background: disabled ? "#93C5FD" : "#3B82F6",
  color: "#FFFFFF", opacity: disabled ? 0.5 : 1 },
        ghost: { background: "transparent", color: COLORS.textMuted, border: `1px solid ${COLORS.border}` },
        danger: { background: "transparent", color: COLORS.error, border: `1px solid ${COLORS.error}30` },
    };
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ ...base, ...styles[variant] }}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
        >
            {children}
        </motion.button>
    );
}
export default Btn