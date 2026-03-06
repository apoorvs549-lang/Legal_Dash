import React from "react";

export default function StatCard({
  icon,
  title,
  value,
  footer,
  footerColor = "text-gray-500",
  iconBg = "bg-black",
}) {
  return (
    <div className="relative pt-12 bg-gray-200 dark:bg-gray-800 rounded-xl p-6 shadow-sm min-w-[250px] transition-colors duration-300">
      {/* Icon */}
      <div
        className={`absolute -top-6 left-6 flex items-center justify-center w-14 h-14 rounded-xl shadow-md text-white ${iconBg}`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="absolute top-2.5 right-6 flex flex-col gap-2">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-right">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-right">{value}</h3>
      </div>

      <div className="mt-16">
        <div className="h-px bg-gray-300 dark:bg-gray-700" />
        <p className={`text-sm ${footerColor} pt-2 `}>{footer}</p> </div>
    </div>
  );
}
