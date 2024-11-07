import React from 'react';
import { Calendar } from 'lucide-react';
import SettingsPanel from './SettingsPanel';

function Header() {
  return (
    <div className="border-b border-gray-800 pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Calendar className="w-10 h-10 text-blue-400" />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Financial Planner
            </h1>
            <p className="text-m text-gray-400 mt-1">Track your finances</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}

export default Header;