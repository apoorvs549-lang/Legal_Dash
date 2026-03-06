import SuccessScreen from "./success-screen";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressIndicator from "@/components/ui/progressIndicator";

import Step1_PersonalDetails from "./steps/personal-details";
import Step2_CaseDetails from "./steps/case-details";
import Step3_TermsConditions from "./steps/terms-and-conditions";

import Btn from "@/components/ui/btn";
import { COLORS } from "@/constants/colors";
import { saveDraft, loadDraft, clearDraft } from "@/utils/draftstorage";




function IntakeFormModal({ onClose, onClientCreated }) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [agreed, setAgreed] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState(() => loadDraft());

    useEffect(() => {
        saveDraft(formData);
    }, [formData]);

    const handleChange = useCallback((key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setErrors(prev => ({ ...prev, [key]: undefined }));
    }, []);

    const STEPS = ["Personal Details", "Case Details", "Terms"];

    const validateStep = () => {
        const newErrors = {};
        if (step === 0) {
            const required = { fullName: "Full name", email: "Email", phone: "Phone", dob: "Date of birth", address: "Address" };
            Object.entries(required).forEach(([k, label]) => {
                if (!formData[k]?.trim()) newErrors[k] = `${label} is required`;
            });
            if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address";
        }
        if (step === 1) {
            const required = { caseType: "Case type", caseDescription: "Case description", incidentDate: "Incident date", opposingParty: "Opposing party" };
            Object.entries(required).forEach(([k, label]) => {
                if (!formData[k]?.trim?.() && !formData[k]) newErrors[k] = `${label} is required`;
            });
        }
        if (step === 2 && !agreed) {
            newErrors.agreed = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        setDirection(1);
        setStep(s => s + 1);
    };

    const handleBack = () => {
        setDirection(-1);
        setStep(s => s - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;
        setSubmitting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/clients`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.fullName,
                    caseType: formData.caseType,
                    status: "Active",
                }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to submit");
            clearDraft();
            setSubmitted(true);
            if (onClientCreated) onClientCreated(result.data);
        } catch (err) {
            setErrors(prev => ({ ...prev, submit: err.message }));
        } finally {
            setSubmitting(false);
        }
    };

    const stepVariants = {
        enter: d => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: d => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
    };

    return (
        <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: COLORS.bg,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <div style={{
                borderBottom: `1px solid ${COLORS.border}`,
                padding: "20px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: COLORS.surface,
                position: "sticky",
                top: 0,
                zIndex: 10,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6" }} />
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: COLORS.text, letterSpacing: "0.04em" }}>
                        CLIENT INTAKE FORM
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: COLORS.textDim }}>Draft auto-saved</span>
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: COLORS.textMuted, fontSize: 20, lineHeight: 1 }}
                    >
                        ✕
                    </motion.button>
                </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 24px" }}>
                <div style={{ width: "100%", maxWidth: 640 }}>
                    {submitted ? (
                        <SuccessScreen onClose={onClose} clientName={formData.fullName} />
                    ) : (
                        <>
                            <ProgressIndicator currentStep={step} steps={STEPS} />

                            <div style={{ overflow: "hidden", position: "relative" }}>
                                <AnimatePresence custom={direction} mode="wait">
                                    <motion.div
                                        key={step}
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {step === 0 && <Step1_PersonalDetails data={formData} onChange={handleChange} errors={errors} />}
                                        {step === 1 && <Step2_CaseDetails data={formData} onChange={handleChange} errors={errors} />}
                                        {step === 2 && <Step3_TermsConditions agreed={agreed} onToggle={() => { setAgreed(v => !v); setErrors(p => ({ ...p, agreed: false })); }} error={errors.agreed} />}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Submit Error */}
                            {errors.submit && (
                                <p style={{ color: "#DC2626", fontSize: 13, marginTop: 12, textAlign: "center" }}>
                                    ⚠ {errors.submit}
                                </p>
                            )}

                            {/* Navigation */}
                            <div style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    {step > 0 && (
                                        <Btn variant="ghost" onClick={handleBack} disabled={submitting}>← Back</Btn>
                                    )}
                                </div>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <Btn variant="ghost" onClick={onClose} disabled={submitting}>Cancel</Btn>
                                    {step < 2 ? (
                                        <Btn onClick={handleNext}>
                                            Continue →
                                        </Btn>
                                    ) : (
                                        <Btn onClick={handleSubmit} disabled={!agreed || submitting}>
                                            {submitting ? "Submitting..." : "Submit Intake"}
                                        </Btn>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
export default IntakeFormModal