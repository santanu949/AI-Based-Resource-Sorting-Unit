import React, { useEffect, useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MAX_DATA_POINTS = 20;

const SensorChart = ({ sensorData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    moisture: [],
    proximity: []
  });
  
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    if (sensorData.moisture !== null || sensorData.proximity !== null) {
      setChartData(prev => {
        const newLabels = [...prev.labels, dataCount];
        const newMoisture = [...prev.moisture, sensorData.moisture || 0];
        // Scale proximity for better visibility on chart (0 or 1 -> 0 or 1000)
        const newProximity = [...prev.proximity, (sensorData.proximity || 0) * 1000];

        if (newLabels.length > MAX_DATA_POINTS) {
          // Reset logic as requested (chart resets after ~20 data points)
          setDataCount(1);
          return {
            labels: [0],
            moisture: [sensorData.moisture || 0],
            proximity: [(sensorData.proximity || 0) * 1000]
          };
        }
        
        setDataCount(prevCount => prevCount + 1);

        return {
          labels: newLabels,
          moisture: newMoisture,
          proximity: newProximity
        };
      });
    }
  }, [sensorData.moisture, sensorData.proximity]);

  const data = useMemo(() => {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Moisture',
          data: chartData.moisture,
          borderColor: '#10B981', // Emerald 500
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#10B981',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Proximity (Scaled)',
          data: chartData.proximity,
          borderColor: '#06B6D4', // Cyan 500
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#06B6D4',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#06B6D4',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }, [chartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 300 // Smooth but fast animation
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1050,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      }
    }
  };

  return (
    <div className="glass-card flex flex-col h-[400px] w-full p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity size={20} className="text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-200">Live Sensor Readings</h2>
      </div>
      <div className="flex-1 w-full relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SensorChart;
