import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

interface MonthPanelProps {
  month: string;
  previousMonthData?: MonthData;
  currentMonthData: MonthData;
}

interface MonthData {
  revenue: number;
  expenses: number;
  netCashFlow: number;
  openingBalance: number;
  closingBalance: number;
}

function MonthPanel({ month, previousMonthData, currentMonthData }: MonthPanelProps) {
  const navigate = useNavigate();
  
  const getComparisonColor = (current: number, previous: number | undefined, isExpense = false) => {
    if (!previous) return 'text-gray-300';
    if (isExpense) {
      if (current < previous) return 'text-green-400';
      if (current > previous) return 'text-red-400';
    } else {
      if (current > previous) return 'text-green-400';
      if (current < previous) return 'text-red-400';
    }
    return 'text-gray-300';
  };

  return (
    <div 
      onClick={() => navigate(`/month/${month}`)}
      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
    >
      <div className="bg-gray-800 px-6 py-4">
        <h3 className="font-bold text-lg text-white">{month.toUpperCase()}</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <DataRow 
            label="Revenue" 
            value={currentMonthData.revenue}
            colorClass={getComparisonColor(currentMonthData.revenue, previousMonthData?.revenue)}
          />
          <DataRow 
            label="Expenses" 
            value={currentMonthData.expenses} 
            colorClass={getComparisonColor(currentMonthData.expenses, previousMonthData?.expenses, true)}
          />
          <DataRow 
            label="Net Cash Flow" 
            value={currentMonthData.netCashFlow}
            colorClass={getComparisonColor(currentMonthData.netCashFlow, previousMonthData?.netCashFlow)}
          />
        </div>
        
        <div className="border-t border-gray-800 pt-4 space-y-3">
          <DataRow 
            label="Opening Balance" 
            value={currentMonthData.openingBalance}
            colorClass={getComparisonColor(currentMonthData.openingBalance, previousMonthData?.openingBalance)}
          />
          <DataRow 
            label="Closing Balance" 
            value={currentMonthData.closingBalance}
            colorClass={getComparisonColor(currentMonthData.closingBalance, previousMonthData?.closingBalance)}
          />
        </div>
      </div>
    </div>
  );
}

interface DataRowProps {
  label: string;
  value: number;
  colorClass: string;
}

function DataRow({ label, value, colorClass }: DataRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`${colorClass} font-medium`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}

export default MonthPanel;