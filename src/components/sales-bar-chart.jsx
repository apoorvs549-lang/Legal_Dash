// src/components/SalesBarChart.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const SalesBarChart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const data = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  datasets: [
    {
      label: "New Cases",
      data: [42, 38, 15, 22, 10, 35, 37, 40, 45, 48, 44, 50],
      backgroundColor: "#1E3A8A", // professional navy blue
      borderRadius: 6,
      barThickness: 14,
    },
    {
      label: "Cases Closed",
      data: [30, 28, 12, 18, 8, 25, 29, 32, 36, 40, 42, 38],
      backgroundColor: "#93C5FD", // soft blue
      borderRadius: 6,
      barThickness: 14,
    },
  ],
};

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
      onComplete:()=>{

      },
      delay: (context) => {
        // Stagger animation for each bar
        let delay=0;
        if(context.type==='data' && context.mode==='default'){
          delay = context.dataIndex*100;
        }
        return delay;
      },
y:{
  duration:1500,
  easing:'easeInOutQuart',
  from:(ctx)=>{
    if(ctx.type==='data'){
      const chart=ctx.chart;
      const {scales:{y}}=chart;
      return y.getPixelForValue(0);
    }
  }
}
},

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero:true,
        ticks: {
          callback: (value) => `${value / 1000}K`,
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
      className="w-full h-full"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: isVisible ? 1 : 0.95 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }}
        className="w-full h-full"
      >
        <Bar ref={chartRef} data={data} options={options} />
      </motion.div>
    </motion.div>
  );
};

export default SalesBarChart;
