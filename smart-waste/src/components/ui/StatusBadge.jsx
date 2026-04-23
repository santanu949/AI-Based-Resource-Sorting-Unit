import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const StatusBadge = ({ isConnected, error }) => {
  if (error) {
    return (
      <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full border border-red-500/30">
        <WifiOff size={18} />
        <span className="text-sm font-medium">Connection Failed</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
        isConnected
          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      }`}
    >
      {isConnected ? (
        <>
          <div className="relative flex h-3 w-3 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-sm font-medium">Connected to Arduino</span>
        </>
      ) : (
        <>
          <WifiOff size={18} />
          <span className="text-sm font-medium">Not Connected</span>
        </>
      )}
    </div>
  );
};

export default StatusBadge;
