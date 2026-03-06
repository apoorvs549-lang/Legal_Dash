import React from "react";
import StatCard from "./statcard";
import {
  Briefcase,
  BarChart2,
  Store,
  UserPlus,
} from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      <StatCard
        icon={<Briefcase size={22} />}
        title="Bookings"
        value="281"
        footer="+55% than last week"
        footerColor="text-green-600"
        iconBg="bg-black"
      />

      <StatCard
        icon={<BarChart2 size={22} />}
        title="Today's Users"
        value="2,300"
        footer="+3% than last month"
        footerColor="text-green-600"
        iconBg="bg-blue-600"
      />

      <StatCard
        icon={<Store size={22} />}
        title="Revenue"
        value="34k"
        footer="+1% than yesterday"
        footerColor="text-green-600"
        iconBg="bg-green-600"
      />

      <StatCard
        icon={<UserPlus size={22} />}
        title="Followers"
        value="+91"
        footer="Just updated"
        iconBg="bg-pink-600"
      />
    </div>
  );
}
