import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { Transaction } from '../utils/data';

interface TransactionSectionProps {
  title: string;
  category: 'revenue' | 'expenses';
  headerClass: string;
  description: string;
  amount: string;
  transactions: Transaction[];
  onDescriptionChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

function TransactionSection({
  title,
  category,
  headerClass,
  description,
  amount,
  transactions,
  onDescriptionChange,
  onAmountChange,
  onAdd,
  onRemove
}: TransactionSectionProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point with up to 2 decimal places
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      onAmountChange(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className={`${headerClass} px-4 py-2 font-medium`}>
        {title}
      </div>
      <div className="divide-y divide-gray-800">
        <div className="p-4">
          <div className="grid grid-cols-12 gap-2">
            <input
              type="text"
              placeholder="Item Name"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="col-span-7 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-500"
            />
            <input
              inputMode="decimal"
              placeholder="$0.00"
              value={amount}
              onChange={handleAmountChange}
              onKeyPress={handleKeyPress}
              className="col-span-3 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-500"
            />
            <button
              onClick={onAdd}
              className="col-span-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        <div className="px-4 py-3 space-y-0 max-h-[300px] overflow-y-auto">
          {transactions.map((transaction, index) => (
            <div key={transaction.id}>
              <div className="flex items-center justify-between group py-2">
                <span className="text-gray-300 text-sm">{transaction.description}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 text-sm">{formatCurrency(transaction.amount)}</span>
                  <button
                    onClick={() => onRemove(transaction.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {index < transactions.length - 1 && (
                <div className="border-t border-gray-800/50"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionSection;