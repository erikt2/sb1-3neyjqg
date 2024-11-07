import React from 'react';
import { TrendingUp, ArrowDownCircle, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface YearSummaryProps {
  monthlyData: {
    [key: string]: {
      revenue: number;
      expenses: number;
      netCashFlow: number;
      openingBalance: number;
      closingBalance: number;
    };
  };
}

function YearSummary({ monthlyData }: YearSummaryProps) {
  const calculateYearlyTotals = () => {
    const months = Object.values(monthlyData);
    return {
      revenue: months.reduce((sum, month) => sum + month.revenue, 0),
      expenses: months.reduce((sum, month) => sum + month.expenses, 0),
      netCashFlow: months.reduce((sum, month) => sum + month.netCashFlow, 0),
      openingBalance: months[0].openingBalance,
      closingBalance: months[months.length - 1].closingBalance
    };
  };

  const yearData = calculateYearlyTotals();

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 h-full">
      <div className="bg-blue-500 bg-opacity-10 px-6 py-4 border-b border-blue-500/20">
        <h2 className="font-bold text-xl text-blue-400">YEAR SUMMARY</h2>
      </div>

      <div className="p-6 space-y-8">
        <SummaryCard
          icon={<TrendingUp className="w-6 h-6 text-blue-400" />}
          label="Total Revenue"
          value={yearData.revenue}
        />
        
        <SummaryCard
          icon={<ArrowDownCircle className="w-6 h-6 text-red-400" />}
          label="Total Expenses"
          value={yearData.expenses}
          negative
        />
        
        <SummaryCard
          icon={<Wallet className="w-6 h-6 text-green-400" />}
          label="Net Cash Flow"
          value={yearData.netCashFlow}
        />

        <div className="border-t border-gray-800 pt-6 space-y-4">
          <DataRow label="Opening Balance" value={yearData.openingBalance} />
          <DataRow label="Closing Balance" value={yearData.closingBalance} />
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  negative?: boolean;
}

function SummaryCard({ icon, label, value, negative }: SummaryCardProps) {
  const getValueColor = (val: number) => {
    if (val > 0) return 'text-green-400';
    if (val < 0) return 'text-red-400';
    return 'text-gray-300';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-xl font-bold ${getValueColor(negative ? -value : value)}`}>
          {formatCurrency(value)}
        </p>
      </div>
    </div>
  );
}

interface DataRowProps {
  label: string;
  value: number;
}

function DataRow({ label, value }: DataRowProps) {
  const getValueColor = (val: number) => {
    if (val > 0) return 'text-green-400';
    if (val < 0) return 'text-red-400';
    return 'text-gray-300';
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className={`font-medium ${getValueColor(value)}`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}

export default YearSummary;