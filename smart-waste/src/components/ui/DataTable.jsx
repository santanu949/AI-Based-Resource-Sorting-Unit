import React from 'react';
import { Database } from 'lucide-react';

const DataTable = ({ dataLog }) => {
  return (
    <div className="glass-card flex flex-col w-full h-full">
      <div className="flex items-center gap-2 p-4 border-b border-white/10 bg-white/5">
        <Database size={18} className="text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-200">Sensor Data Log</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-3 border-b border-white/10 font-medium">No.</th>
              <th className="p-3 border-b border-white/10 font-medium">Timestamp</th>
              <th className="p-3 border-b border-white/10 font-medium">Moisture</th>
              <th className="p-3 border-b border-white/10 font-medium">Proximity</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dataLog.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500 italic">
                  No data logged yet
                </td>
              </tr>
            ) : (
              dataLog.map((log, index) => (
                <tr 
                  key={index} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-3 text-gray-400">{index + 1}</td>
                  <td className="p-3 text-gray-300 font-mono">{log.timestamp}</td>
                  <td className="p-3 text-accent font-medium">{log.moisture}</td>
                  <td className="p-3 text-primary font-medium">{log.proximity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
