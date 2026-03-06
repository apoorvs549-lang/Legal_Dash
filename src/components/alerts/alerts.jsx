"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AlertItem from "./AlertItem";

const initialAlerts = [
  { id: 1, type: "secondary", text: "A simple secondary alert with" },
  { id: 2, type: "success", text: "A simple success alert with" },
  { id: 3, type: "error", text: "A simple error alert with" },
  { id: 4, type: "warning", text: "A simple warning alert with" },
  { id: 5, type: "info", text: "A simple info alert with" },
  { id: 6, type: "light", text: "A simple light alert with" },
  { id: 7, type: "dark", text: "A simple dark alert with" },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <h2 className="text-xl font-semibold">Alerts</h2>

      <AnimatePresence>
        {alerts.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
