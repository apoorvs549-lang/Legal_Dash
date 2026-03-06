import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";

const ClientPage= ({ clients = [], loading, onOpenForm }) => {
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
              value: clients.filter(c => c.status === "Active").length || "0",
            },
            {
              label: "Matters In Progress",
              value: clients.filter(c => c.status === "Review").length || "0",
            },
            {
              label: "Total Clients",
              value: clients.length || "0",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#F8FAFC] border border-[#E2E8F0] 
                         rounded-xl px-7 py-6"
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
          <div className="absolute -top-6 left-[2.5%] w-[95%]
                          rounded-xl
                          bg-gradient-to-r from-blue-500 to-blue-500
                          px-6 py-4
                          text-white font-semibold
                          shadow-lg">
            Recent Clients
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {["Client Name", "Case Type", "Status", "Date Added"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-7 py-3 text-left
                                 text-[11px] font-semibold
                                 text-[#94A3B8]
                                 tracking-[0.08em] uppercase"
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
                    colSpan="4"
                    className="px-7 py-10 text-center text-[#475569] text-sm"
                  >
                    Loading clients...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-7 py-10 text-center text-[#475569] text-sm"
                  >
                    No clients yet. Click "Create Your Form" to add one.
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

export default ClientPage ;