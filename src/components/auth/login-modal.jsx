import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import RoleToggle from "./role-toggle";

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 0.85, y: 30, transition: { duration: 0.2 } },
};

const tickVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.2, ease: "easeIn" } },
};

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

export default function LoginModal() {
    const { showLoginModal, setShowLoginModal, login } = useAuth();
    const [mode, setMode] = useState("info");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("Login Successful!");

    const resetForm = () => { setEmail(""); setPassword(""); setError(""); setRole("client"); };
    const goTo = (target) => { resetForm(); setMode(target); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) return setError("Email is required");
        if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email");
        if (!password.trim()) return setError("Password is required");
        if (password.length < 4) return setError("Password must be at least 4 characters");

        setSubmitting(true);

        try {
            const endpoint = mode === "signup" ? `${API_BASE}/signup` : `${API_BASE}/login`;
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(
                    mode === "signup"
                        ? { email: email.trim(), password, role }
                        : { email: email.trim(), password }
                ),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Something went wrong");

            setSubmitting(false);
            setSuccessMsg(mode === "signup" ? "Account Created!" : "Login Successful!");
            setSuccess(true);

            setTimeout(() => {
                login(data.data);
                setSuccess(false);
                setShowLoginModal(false);
                setMode("info");
                resetForm();
            }, 1400);
        } catch (err) {
            setSubmitting(false);
            setError(err.message || "Something went wrong");
        }
    };

    const handleClose = () => {
        if (submitting || success) return;
        setShowLoginModal(false);
        setMode("info");
        resetForm();
    };

    const headers = {
        info: { title: "Authentication Required", subtitle: "You are not logged in" },
        login: { title: "Welcome Back", subtitle: "Login to your account" },
        signup: { title: "Create Account", subtitle: "Sign up to get started" },
    };
    const h = headers[mode] || headers.info;

    return (
        <AnimatePresence>
            {showLoginModal && (
                <motion.div
                    key="login-overlay"
                    variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
                    onClick={handleClose}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-[6px]"
                >
                    <motion.div
                        key="login-modal"
                        variants={modalVariants} initial="hidden" animate="visible" exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[420px] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3)]"
                    >
                        {/* ── Blue Header ── */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-8 pt-8 pb-6 text-center">
                            <div className="w-[52px] h-[52px] rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mode}
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-white text-[22px] font-bold m-0 font-['DM_Sans',sans-serif]">
                                        {h.title}
                                    </h2>
                                    <p className="text-white/75 text-[13px] mt-1.5">
                                        {h.subtitle}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── White Body ── */}
                        <div className="bg-white px-8 pt-7 pb-8">
                            <AnimatePresence mode="wait">
                                {success ? (
                                    /* ───── Success Tick ───── */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="text-center py-5"
                                    >
                                        <div className="w-[72px] h-[72px] rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4">
                                            <motion.svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <motion.path
                                                    d="M8 16L14 22L24 10"
                                                    stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                                    variants={tickVariants} initial="hidden" animate="visible"
                                                />
                                            </motion.svg>
                                        </div>
                                        <p className="text-emerald-950 text-base font-semibold">{successMsg}</p>
                                        <p className="text-gray-500 text-[13px] mt-1">Redirecting you now…</p>
                                    </motion.div>

                                ) : mode === "info" ? (
                                    /* ───── Auth Required Info Screen ───── */
                                    <motion.div
                                        key="info-screen"
                                        variants={slideVariants} initial="enter" animate="center" exit="exit"
                                        className="text-center py-3"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-5">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </div>

                                        <p className="text-[15px] text-gray-700 font-medium leading-relaxed mb-2">
                                            You need to be logged in to access this section.
                                        </p>
                                        <p className="text-[13px] text-gray-400 mb-6">
                                            Please login with your credentials to continue.
                                        </p>

                                        {/* Login button */}
                                        <motion.button
                                            onClick={() => goTo("login")}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-[13px] rounded-[10px] border-none bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[15px] font-bold cursor-pointer font-['DM_Sans',sans-serif] tracking-[0.02em] mb-3.5"
                                        >
                                            Login
                                        </motion.button>

                                        <p className="text-[13px] text-gray-400 m-0">
                                            Don't have an account?{" "}
                                            <span
                                                onClick={() => goTo("signup")}
                                                className="text-blue-500 font-semibold cursor-pointer underline"
                                            >
                                                Sign Up
                                            </span>
                                        </p>

                                        <button
                                            type="button" onClick={handleClose}
                                            className="bg-transparent border-none text-gray-400 text-[13px] cursor-pointer mt-3 font-['DM_Sans',sans-serif]"
                                        >
                                            Cancel
                                        </button>
                                    </motion.div>

                                ) : (
                                    /* ───── Login OR Signup Form ───── */
                                    <motion.form
                                        key={mode}
                                        variants={slideVariants} initial="enter" animate="center" exit="exit"
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4"
                                    >
                                        {/* Role Toggle – only on signup */}
                                        {mode === "signup" && (
                                            <RoleToggle role={role} setRole={setRole} />
                                        )}

                                        {/* Email */}
                                        <div>
                                            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Email Address</label>
                                            <input
                                                type="email" value={email}
                                                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                                placeholder="you@example.com" autoFocus
                                                className="w-full px-3.5 py-3 rounded-[10px] border-[1.5px] border-gray-200 text-[14px] outline-none transition-[border-color,box-shadow] duration-200 box-border font-['DM_Sans',sans-serif] focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Password</label>
                                            <input
                                                type="password" value={password}
                                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                                placeholder="••••••••"
                                                className="w-full px-3.5 py-3 rounded-[10px] border-[1.5px] border-gray-200 text-[14px] outline-none transition-[border-color,box-shadow] duration-200 box-border font-['DM_Sans',sans-serif] focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                                            />
                                        </div>

                                        {/* Error */}
                                        <AnimatePresence>
                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                                    className="text-red-600 text-[13px] m-0 flex items-center gap-1.5"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                                    </svg>
                                                    {error}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>

                                        {/* Submit */}
                                        <motion.button
                                            type="submit" disabled={submitting}
                                            whileHover={{ scale: submitting ? 1 : 1.02 }}
                                            whileTap={{ scale: submitting ? 1 : 0.98 }}
                                            className={`mt-1 py-[13px] rounded-[10px] border-none text-white text-[15px] font-bold font-['DM_Sans',sans-serif] tracking-[0.02em] flex items-center justify-center gap-2 transition-[background] duration-200
                                                ${submitting
                                                    ? "bg-gradient-to-br from-blue-300 to-blue-400 cursor-not-allowed"
                                                    : "bg-gradient-to-br from-blue-500 to-blue-600 cursor-pointer"
                                                }`}
                                        >
                                            {submitting && (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 border-[2.5px] border-white/30 border-t-white rounded-full"
                                                />
                                            )}
                                            {mode === "login"
                                                ? (submitting ? "Logging in…" : "Log In")
                                                : (submitting ? "Creating account…" : "Sign Up")
                                            }
                                        </motion.button>

                                        {/* Toggle between login / signup */}
                                        <p className="text-[13px] text-gray-400 m-0 text-center">
                                            {mode === "login" ? (
                                                <>
                                                    Don't have an account?{" "}
                                                    <span onClick={() => goTo("signup")} className="text-blue-500 font-semibold cursor-pointer underline">
                                                        Sign Up
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    Already have an account?{" "}
                                                    <span onClick={() => goTo("login")} className="text-blue-500 font-semibold cursor-pointer underline">
                                                        Log In
                                                    </span>
                                                </>
                                            )}
                                        </p>

                                        {/* Back */}
                                        <button
                                            type="button" onClick={() => goTo("info")}
                                            className="bg-transparent border-none text-gray-400 text-[13px] cursor-pointer text-center font-['DM_Sans',sans-serif]"
                                        >
                                            ← Back
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}