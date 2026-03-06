import { X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // shadcn helper

const variantClasses = {
  secondary: "bg-slate-600 text-white",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-white",
  info: "bg-blue-600 text-white",
  light: "bg-slate-200 text-slate-700",
  dark: "bg-zinc-900 text-white",
};

export default function AlertItem({ alert, onClose }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "flex items-center justify-between rounded-lg px-6 py-4",
        variantClasses[alert.type]
      )}
    >
      <p className="text-sm">
        {alert.text}{" "}
        <a href="#" className="font-semibold underline">
          an example link
        </a>
        . Give it a click if you like.
      </p>

      <button
        onClick={onClose}
        className="ml-4 rounded p-1 opacity-80 transition hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
