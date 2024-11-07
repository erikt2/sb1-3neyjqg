import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface MonthlyBarGraphProps {
  monthlyData: {
    [key: string]: {
      revenue: number;
      expenses: number;
    };
  };
}

function MonthlyBarGraph({ monthlyData }: MonthlyBarGraphProps) {
  const months = Object.keys(monthlyData);
  const maxValue = Math.max(
    ...months.flatMap(month => [monthlyData[month].revenue, monthlyData[month].expenses])
  );

  const getBarHeight = (value: number) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
      <div className="flex items-stretch h-24 gap-x-1">
        {months.map((month) => (
          <div key={month} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full flex justify-center gap-1 flex-1">
              {/* Tooltip */}
              <div className="absolute -top-6 hidden group-hover:flex flex-col items-center z-10">
                <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  <div>Revenue: {formatCurrency(monthlyData[month].revenue)}</div>
                  <div>Expenses: {formatCurrency(monthlyData[month].expenses)}</div>
                </div>
                <div className="w-2 h-2 bg-gray-800 transform rotate-45 translate-y-1/2"></div>
              </div>

              {/* Revenue Bar */}
              <div className="w-1.5 h-full flex items-end">
                <div 
                  className="w-full bg-green-500 rounded-t transition-all duration-300"
                  style={{ height: getBarHeight(monthlyData[month].revenue) }}
                ></div>
              </div>

              {/* Expenses Bar */}
              <div className="w-1.5 h-full flex items-end">
                <div 
                  className="w-full bg-red-500 rounded-t transition-all duration-300"
                  style={{ height: getBarHeight(monthlyData[month].expenses) }}
                ></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 mt-1">{month.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-2 pt-2 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-xs text-gray-400">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-xs text-gray-400">Expenses</span>
        </div>
      </div>
    </div>
  );
}

export default MonthlyBarGraph;