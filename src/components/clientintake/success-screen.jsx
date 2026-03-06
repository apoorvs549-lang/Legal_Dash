import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";
import Btn from "@/components/ui/btn";

function SuccessScreen({ onClose, clientName }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center px-10 py-[60px] text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="w-[80px] h-[80px] rounded-full flex items-center justify-center mb-7 border-2 border-green-600 bg-green-600/10"
        // style={{
        //   background: `${COLORS.success}18`,
        //   borderColor: COLORS.success,
        // }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M7 18L14 25L29 10"
            stroke={COLORS.success}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[32px] font-semibold mb-3 text-slate-900"
        style={{ fontFamily: "'Cormorant Garamond', serif" }} // font unchanged
      >
        Intake Submitted
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[15px] text-slate-600 max-w-[400px] leading-[1.7] mb-4"
      >
        Thank you,{" "}
        <strong className="text-blue-500">
          {clientName || "Client"}
        </strong>
        . Your intake form has been received. A member of our team will review
        your case and contact you within 1–2 business days.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-slate-400 mb-9"
      >
        Reference ID: #
        {Math.random().toString(36).substring(2, 10).toUpperCase()}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Btn onClick={onClose}>Return to Dashboard</Btn>
      </motion.div>
    </motion.div>
  );
}

export default SuccessScreen;