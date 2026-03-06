import { motion } from "framer-motion";
import judgeImg from "@/assets/judge-emoji.png";
import geminiImg from "@/assets/gemini_img.png";
import newimg from "@/assets/adobe.png";
const containerVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

const imgVariants = {
  hidden: { opacity: 0, rotate: -15, scale: 0.6 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
      delay: 0.15,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.3 },
  },
};

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center w-full min-h-[70vh]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[460px] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] text-center"
      >
        {/* Blue Header */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-8 pt-8 pb-5">
          <div className="w-[52px] h-[52px] rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>

          <h2 className="text-white text-[22px] font-bold font-['DM_Sans'] m-0">
            Access Denied
          </h2>

          <p className="text-white/75 text-[13px] mt-1.5">
            Lawyers-only zone
          </p>
        </div>

        {/* White Body */}
        <div className="bg-white px-8 pt-7 pb-9">
          <motion.img
            src={newimg}
            alt="Judge emoji"
            variants={imgVariants}
            initial="hidden"
            animate="visible"
            className="w-[120px] h-[120px] object-contain mx-auto mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          />

          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-base font-normal leading-relaxed text-slate-800 text-center max-w-md mx-auto"
          >
            Nice try, Suits! 💼 But this club is{" "}
            <span className="font-bold text-blue-600">
              'Lawyers Only.'
            </span>{" "}
            Go back to being a world-class Client while the pros handle the paperwork.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}