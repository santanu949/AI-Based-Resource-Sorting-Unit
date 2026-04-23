import React from 'react';
import SensorCard from '../components/ui/SensorCard';
import SensorChart from '../components/charts/SensorChart';

const DashboardPage = ({ sensorData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SensorCard type="moisture" value={sensorData.moisture} />
        <SensorCard type="proximity" value={sensorData.proximity} />
      </div>

      <div className="w-full">
        <SensorChart sensorData={sensorData} />
      </div>
    </div>
  );
};

export default DashboardPage;
