import React from 'react';
import SerialMonitor from '../components/ui/SerialMonitor';
import DataTable from '../components/ui/DataTable';

const MonitorPage = ({ serialLog, dataLog }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full">
        <SerialMonitor serialLog={serialLog} />
      </div>

      <div className="w-full">
        <DataTable dataLog={dataLog} />
      </div>
    </div>
  );
};

export default MonitorPage;
