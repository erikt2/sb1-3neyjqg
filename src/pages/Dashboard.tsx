import React from 'react';
import MonthPanel from '../components/MonthPanel';
import YearSummary from '../components/YearSummary';
import Header from '../components/Header';
import MonthlyBarGraph from '../components/MonthlyBarGraph';
import { calculateMonthData } from '../utils/data';
import { useTransactions } from '../context/TransactionContext';

function Dashboard() {
  const { transactions } = useTransactions();
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthlyData = months.reduce((acc, month, index) => {
    const monthTransactions = transactions.filter(t => t.month === month);
    const monthData = calculateMonthData(monthTransactions);
    
    const previousMonth = index > 0 ? months[index - 1] : null;
    const previousMonthData = previousMonth ? acc[previousMonth] : null;
    
    acc[month] = {
      ...monthData,
      openingBalance: previousMonthData ? previousMonthData.closingBalance : 0,
      closingBalance: (previousMonthData ? previousMonthData.closingBalance : 0) + monthData.netCashFlow
    };
    
    return acc;
  }, {} as { [key: string]: any });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="border-t border-gray-800">
        <div className="max-w-[1800px] min-w-[1024px] mx-auto px-12 py-12">
          <Header />
          
          <div className="grid grid-cols-1 xl:grid-cols-7 gap-x-4 gap-y-6 mt-12">
            <div className="xl:col-span-6">
              <MonthlyBarGraph monthlyData={monthlyData} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6">
                {months.map((month, index) => (
                  <MonthPanel 
                    key={month} 
                    month={month}
                    previousMonthData={index > 0 ? monthlyData[months[index - 1]] : undefined}
                    currentMonthData={monthlyData[month]}
                  />
                ))}
              </div>
            </div>
            
            <div className="xl:col-span-1">
              <YearSummary monthlyData={monthlyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;