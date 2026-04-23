import React from 'react';
import { Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Cpu size={16} />
          <span>Arduino Smart Waste Management Dashboard</span>
        </div>
        
        <div className="text-gray-500 text-xs">
          Team No. 22 - Sahil Narayan Mahale & Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
