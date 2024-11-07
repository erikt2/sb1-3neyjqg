import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { Transaction } from '../utils/data';
import { useTransactions } from '../context/TransactionContext';
import TransactionSection from '../components/TransactionSection';

interface TransactionInput {
  description: string;
  amount: string;
}

function MonthDetail() {
  const { monthName } = useParams();
  const { transactions, addTransaction, removeTransaction } = useTransactions();
  const monthTransactions = transactions.filter(t => t.month === monthName);
  
  const [revenueInput, setRevenueInput] = useState<TransactionInput>({
    description: '',
    amount: ''
  });
  
  const [expensesInput, setExpensesInput] = useState<TransactionInput>({
    description: '',
    amount: ''
  });

  const handleAddTransaction = (category: 'revenue' | 'expenses') => {
    const input = category === 'revenue' ? revenueInput : expensesInput;
    if (!input.description || !input.amount) return;

    addTransaction({
      description: input.description,
      amount: Number(input.amount),
      category,
      month: monthName || ''
    });

    if (category === 'revenue') {
      setRevenueInput({ description: '', amount: '' });
    } else {
      setExpensesInput({ description: '', amount: '' });
    }
  };

  const getTotalByCategory = (category: Transaction['category']) => {
    return monthTransactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const revenue = getTotalByCategory('revenue');
  const expenses = getTotalByCategory('expenses');
  const netCashFlow = revenue - expenses;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              to="/" 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {monthName}
              </h1>
              <p className="text-gray-400 mt-1">Financial Overview</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <TransactionSection 
                title="REVENUE"
                category="revenue"
                headerClass="bg-green-600"
                description={revenueInput.description}
                amount={revenueInput.amount}
                transactions={monthTransactions.filter(t => t.category === 'revenue')}
                onDescriptionChange={(value) => setRevenueInput(prev => ({ ...prev, description: value }))}
                onAmountChange={(value) => setRevenueInput(prev => ({ ...prev, amount: value }))}
                onAdd={() => handleAddTransaction('revenue')}
                onRemove={removeTransaction}
              />
            </div>

            <div>
              <TransactionSection 
                title="EXPENSES"
                category="expenses"
                headerClass="bg-red-500"
                description={expensesInput.description}
                amount={expensesInput.amount}
                transactions={monthTransactions.filter(t => t.category === 'expenses')}
                onDescriptionChange={(value) => setExpensesInput(prev => ({ ...prev, description: value }))}
                onAmountChange={(value) => setExpensesInput(prev => ({ ...prev, amount: value }))}
                onAdd={() => handleAddTransaction('expenses')}
                onRemove={removeTransaction}
              />
            </div>

            <div>
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="bg-blue-500 px-4 py-2 font-medium">
                  MONTH SUMMARY
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Revenue</span>
                    <span className="text-gray-300">{formatCurrency(revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Expenses</span>
                    <span className="text-gray-300">{formatCurrency(expenses)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Net Cash Flow</span>
                    <span className="text-gray-300">{formatCurrency(netCashFlow)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthDetail;