import React from 'react';
import { Droplets, Radar } from 'lucide-react';

const SensorCard = ({ type, value }) => {
  const isMoisture = type === 'moisture';
  const title = isMoisture ? 'Moisture Level' : 'Proximity Sensor';
  const icon = isMoisture ? <Droplets size={24} className="text-accent" /> : <Radar size={24} className="text-primary" />;
  
  let displayValue = '--';
  if (value !== null) {
    if (isMoisture) {
      displayValue = value;
    } else {
      displayValue = value === 1 ? 'Object Detected' : 'No Object';
    }
  }

  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
        {isMoisture ? <Droplets size={120} /> : <Radar size={120} />}
      </div>
      
      <div className="bg-white/5 p-3 rounded-xl mb-4 backdrop-blur-sm border border-white/10">
        {icon}
      </div>
      
      <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
        {title}
      </h2>
      
      <p className={`text-4xl font-bold ${isMoisture ? 'neon-text-accent' : 'neon-text-primary'}`}>
        {displayValue}
      </p>
    </div>
  );
};

export default SensorCard;
