import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";
const STEP_ACTIVE_COLOR = "#3B82F6";
function ProgressIndicator({ currentStep, steps }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40 }}>
            {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;
                return (
                    <div key={index} style={{ display: "flex", alignItems: "center", flex: index < steps.length - 1 ? 1 : 0 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                            <motion.div
                                animate={{
                                    background: isComplete ? STEP_ACTIVE_COLOR : isActive ? STEP_ACTIVE_COLOR : COLORS.surfaceAlt,
                                    borderColor: isComplete || isActive ? STEP_ACTIVE_COLOR : COLORS.border,
                                    scale: isActive ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    border: `2px solid`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: isComplete || isActive ? "#f8f9fbff" : COLORS.textDim,
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            >
                                {isComplete ? (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2.5 7L5.5 10L11.5 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : index + 1}
                            </motion.div>
                            <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? STEP_ACTIVE_COLOR : COLORS.textDim, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div style={{ flex: 1, height: 1, margin: "0 8px", marginBottom: 24, position: "relative", background: COLORS.border }}>
                                <motion.div
                                    animate={{ scaleX: isComplete ? 1 : 0 }}
                                    initial={{ scaleX: 0 }}
                                    style={{ position: "absolute", inset: 0, background: STEP_ACTIVE_COLOR, transformOrigin: "left" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
export default ProgressIndicator