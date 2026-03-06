import DashboardStats from "./dashboard-stats";
import DashboardCharts from "./dashboard-charts";
import { ThemeToggle } from "../theme-toggle";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <ThemeToggle />
      </div>
      <DashboardStats />
      <DashboardCharts />
    </div>
  );
}
