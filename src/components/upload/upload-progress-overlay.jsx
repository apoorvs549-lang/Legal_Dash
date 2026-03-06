import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * UploadProgressOverlay
 * Shows a dark overlay with:
 *  1. Animated circular progress ring counting 0→100%
 *  2. Once complete, morphs into a green checkmark tick
 *
 * Props:
 *  - visible: boolean  — mount/unmount
 *  - onDone: fn        — called after tick animation finishes
 */
const UploadProgressOverlay = ({ visible, onDone }) => {
  const [phase, setPhase] = useState("progress"); // "progress" | "tick"

  // SVG circle params
  const SIZE = 160;
  const STROKE = 10;
  const R = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  // Animated 0→100 counter
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, [0, 100], [CIRCUMFERENCE, 0]);
  const displayNum = useTransform(progress, (v) => Math.round(v));

  // Reset and kick off animation each time visible becomes true
  useEffect(() => {
    if (!visible) {
      setPhase("progress");
      progress.set(0);
      return;
    }

    setPhase("progress");
    progress.set(0);

    const controls = animate(progress, 100, {
      duration: 1.6,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => {
        // Short pause then flip to tick
        setTimeout(() => {
          setPhase("tick");
          // Let tick animate, then notify parent
          setTimeout(onDone, 900);
        }, 220);
      },
    });

    return () => controls.stop();
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,12,18,0.82)", backdropFilter: "blur(4px)" }}
        >
          <div className="relative flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>

            {/* ── PHASE: progress ring ── */}
            <AnimatePresence>
              {phase === "progress" && (
                <motion.div
                  key="ring"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)" }}>
                    {/* Track */}
                    <circle
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={R}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth={STROKE}
                    />
                    {/* Animated fill — gradient via linearGradient */}
                    <defs>
                      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#4ade80" />
                      </linearGradient>
                    </defs>
                    <motion.circle
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={R}
                      fill="none"
                      stroke="url(#ringGrad)"
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      style={{ strokeDashoffset: dashOffset }}
                    />
                  </svg>

                  {/* Percentage label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      style={{
                        fontSize: 30,
                        fontWeight: 700,
                        fontVariantNumeric: "tabular-nums",
                        background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <CounterDisplay value={displayNum} />%
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── PHASE: success tick ── */}
            <AnimatePresence>
              {phase === "tick" && (
                <motion.div
                  key="tick"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Outer glow ring */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05, duration: 0.35 }}
                    style={{
                      width: SIZE,
                      height: SIZE,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)",
                      position: "absolute",
                    }}
                  />

                  <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                    {/* Circle */}
                    <motion.circle
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={R}
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    {/* Checkmark path */}
                    <motion.path
                      d={`M ${SIZE * 0.28} ${SIZE * 0.5} L ${SIZE * 0.44} ${SIZE * 0.66} L ${SIZE * 0.72} ${SIZE * 0.36}`}
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth={STROKE * 1.1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.25, duration: 0.38, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** Reads from a MotionValue and re-renders as it changes */
const CounterDisplay = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    return value.on("change", (v) => setDisplay(v));
  }, [value]);
  return <>{display}</>;
};

export default UploadProgressOverlay;