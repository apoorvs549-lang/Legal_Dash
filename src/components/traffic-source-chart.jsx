// src/components/TrafficSourceChart.jsx
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TrafficSourceChart() {
  const containerref = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ["Desktop", "Tablet", "Phone"],
    datasets: [
      {
        data: [0, 0, 0], // 👈 start empty
        backgroundColor: ["#4F46E5", "#059669", "#D97706"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  });

  useEffect(() => {
    // 🔥 trigger animation AFTER first paint
    requestAnimationFrame(() => {
      setChartData({
        labels: ["Desktop", "Tablet", "Phone"],
        datasets: [
          {
            data: [63, 15, 22],
            backgroundColor: ["#4F46E5", "#059669", "#D97706"],
            borderWidth: 0,
            cutout: "70%",
          },
        ],
      });
    });
  }, []);





  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: "easeOutCubic"
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div ref={containerref} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-full transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Traffic Source</h2>

      <div className="h-[220px]">
        {<Doughnut data={chartData} options={options} />}
      </div>

      {/* Labels */}
      <div className="flex justify-around mt-4 text-sm">
        <div className="text-center">
          🖥️
          <p className="font-medium dark:text-gray-200">Desktop</p>
          <p className="text-gray-500 dark:text-gray-400">63%</p>
        </div>
        <div className="text-center">
          📱
          <p className="font-medium dark:text-gray-200">Tablet</p>
          <p className="text-gray-500 dark:text-gray-400">15%</p>
        </div>
        <div className="text-center">
          ☎️
          <p className="font-medium dark:text-gray-200">Phone</p>
          <p className="text-gray-500 dark:text-gray-400">22%</p>
        </div>
      </div>
    </div>
  );
}
