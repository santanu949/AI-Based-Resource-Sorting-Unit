import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const SerialMonitor = ({ serialLog }) => {
  const monitorRef = useRef(null);

  useEffect(() => {
    if (monitorRef.current) {
      monitorRef.current.scrollTop = monitorRef.current.scrollHeight;
    }
  }, [serialLog]);

  return (
    <div className="glass-card flex flex-col h-64 w-full">
      <div className="flex items-center gap-2 p-3 border-b border-white/10 bg-white/5">
        <Terminal size={16} className="text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-200">Serial Monitor</h2>
      </div>
      
      <div 
        ref={monitorRef}
        className="flex-1 overflow-y-auto p-4 bg-black/40 font-mono text-xs text-gray-300 custom-scrollbar"
      >
        {serialLog.length === 0 ? (
          <div className="text-gray-600 italic">Waiting for data...</div>
        ) : (
          serialLog.map((log, index) => (
            <div key={index} className="mb-1 hover:text-white transition-colors">
              <span className="text-gray-500 mr-2">❯</span>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SerialMonitor;
