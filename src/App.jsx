import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSerialPort } from './hooks/useSerialPort';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardPage from './pages/DashboardPage';
import MonitorPage from './pages/MonitorPage';
import StatusBadge from './components/ui/StatusBadge';
import { Plug } from 'lucide-react';

function App() {
  const {
    connect,
    disconnect,
    isConnected,
    error,
    sensorData,
    serialLog,
    dataLog
  } = useSerialPort();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header & Connection Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Waste Bin Status</h2>
              <p className="text-gray-400 text-sm">Monitor real-time data from Arduino sensors</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <StatusBadge isConnected={isConnected} error={error} />
              
              <button
                onClick={isConnected ? disconnect : connect}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg active:scale-95 ${
                  isConnected
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:shadow-red-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                }`}
              >
                <Plug size={18} />
                {isConnected ? 'Disconnect' : 'Connect to Arduino'}
              </button>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route 
              path="/" 
              element={<DashboardPage sensorData={sensorData} />} 
            />
            <Route 
              path="/monitor" 
              element={<MonitorPage serialLog={serialLog} dataLog={dataLog} />} 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
