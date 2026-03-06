// src/dashboard/DashboardCharts.jsx
import { Traffic } from "@mui/icons-material";
import SalesBarChart from "../sales-bar-chart";
import TrafficSourceChart from "../traffic-source-chart";
export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-[380px] transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-gray-100">Monthly Case Flow (2026)</h2>
          <button className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            🔄 Sync
          </button>
        </div>

        {/* Chart height controller */}
        <div className="h-[300px]">
          <SalesBarChart />
        </div>
      </div>
      <TrafficSourceChart />
    </div>
  );
}
