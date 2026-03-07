import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

// ── Take Case Button ─────────────────────────────────────────
// States: "idle" → "loading" → "done"
const TakeCaseBtn = ({ client }) => {
  const [state, setState] = useState(client.isTaken ? "done" : "idle");

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("loading");
    
    try {
      // 1. Add to activity feed
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: client.name,
          caseType: client.caseType,
          status: "Submitted",
        }),
      });

      if (!res.ok) throw new Error("Failed to create case in activity feed");

      // 2. Mark permanently as taken in the Client Registry db
      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/clients/${client.id}/take`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}) // Fastify requires a body for application/json
      });
      
      setState("done");
    } catch (error) {
      console.error(error);
      setState("idle");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      layout
      animate={
        state === "done"
          ? { backgroundColor: "#16A34A" }
          : { backgroundColor: "#DC2626" }
      }
      whileHover={state === "idle" ? { scale: 1.06, backgroundColor: "#B91C1C" } : {}}
      whileTap={state === "idle" ? { scale: 0.95 } : {}}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`border-none rounded-lg px-4 py-1.5 text-white font-semibold text-xs tracking-[0.04em] inline-flex items-center gap-1.5 min-w-[110px] justify-center outline-none ${
        state === "idle" ? "cursor-pointer" : "cursor-default"
      } ${
        state === "done"
          ? "shadow-[0_0_0_3px_rgba(22,163,74,0.25)]"
          : "shadow-[0_2px_8px_rgba(220,38,38,0.25)]"
      }`}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            Take Case
          </motion.span>
        )}

        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-1.5"
          >
            {/* Spinning ring */}
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
              className="inline-block w-[13px] h-[13px] border-2 border-white/35 border-t-white rounded-full"
            />
            Loading...
          </motion.span>
        )}

        {state === "done" && (
          <motion.span
            key="done"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 20 }}
            className="inline-flex items-center gap-[5px]"
          >
            {/* Animated checkmark */}
            <motion.svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <motion.path
                d="M2 6.5L5.2 9.5L11 3.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </motion.svg>
            Case Taken
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ── Main Component ───────────────────────────────────────────
const ClientPage = ({ clients = [], loading, onOpenForm }) => {
  const statusColors = {
    Active: { bg: "bg-[#16A34A]/15", text: "text-[#16A34A]" },
    Review: { bg: "bg-[#C9A84C]/15", text: "text-[#C9A84C]" },
    Closed: { bg: "bg-[#94A3B8]/15", text: "text-[#94A3B8]" },
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-10">
      <div className="max-w-[960px] mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-[44px] font-bold text-[#0F172A] leading-[1.15]">
              Client Registry
            </h1>
            <p className="text-sm text-[#475569] mt-2.5">
              Manage and track all active client matters
            </p>
          </div>

          <motion.button
            onClick={onOpenForm}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 
                       bg-gradient-to-r from-blue-500 to-blue-500
                       px-7 py-3.5
                       rounded-[10px]
                       text-sm font-bold text-white
                       font-['DM_Sans']
                       tracking-[0.02em]
                       cursor-pointer"
          >
            <AddIcon className="text-white drop-shadow-sm text-[24px]" />
            Create Your Form
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Clients Under Counsel",
              value: clients.filter((c) => c.status === "Active").length || "0",
            },
            {
              label: "Matters In Progress",
              value: clients.filter((c) => c.status === "Review").length || "0",
            },
            {
              label: "Total Clients",
              value: clients.length || "0",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-7 py-6"
            >
              <p className="text-[12px] text-[#475569] tracking-[0.06em] uppercase mb-2">
                {s.label}
              </p>
              <p className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#0F172A]">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="relative bg-white shadow-md rounded-xl pt-12 border border-[#E2E8F0]">

          {/* Floating Header */}
          <div
            className="absolute -top-6 left-[2.5%] w-[95%]
                        rounded-xl
                        bg-gradient-to-r from-blue-500 to-blue-500
                        px-6 py-4
                        text-white font-semibold
                        shadow-lg"
          >
            Recent Clients
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {["Client Name", "Case Type", "Status", "Date Added", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-7 py-3 text-left text-[11px] font-semibold
                                 text-[#94A3B8] tracking-[0.08em] uppercase"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-7 py-10 text-center text-[#475569] text-sm"
                  >
                    Loading clients...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-7 py-10 text-center text-[#475569] text-sm"
                  >
                    No clients yet. Click &quot;Create Your Form&quot; to add one.
                  </td>
                </tr>
              ) : (
                clients.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="border-b border-[#E2E8F0]/30"
                  >
                    <td className="px-7 py-4 text-sm font-medium text-[#0F172A]">
                      {c.name}
                    </td>

                    <td className="px-7 py-4 text-sm text-[#475569]">
                      {c.caseType}
                    </td>

                    <td className="px-7 py-4">
                      <span
                        className={`text-[12px] font-semibold px-3 py-1 rounded-full
                          ${statusColors[c.status]?.bg}
                          ${statusColors[c.status]?.text}`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="px-7 py-4 text-sm text-[#475569]">
                      {formatDate(c.dateAdded)}
                    </td>

                    {/* ── Take Case Button Column ── */}
                    <td className="px-7 py-4">
                      <TakeCaseBtn client={c} />
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;