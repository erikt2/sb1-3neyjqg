import React, { createContext, useContext, useState } from 'react';
import { Transaction } from '../utils/data';
import { useAccounts } from './AccountContext';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactionsByAccount, setTransactionsByAccount] = useState<Record<string, Transaction[]>>({});
  const { currentAccount } = useAccounts();

  const transactions = currentAccount 
    ? transactionsByAccount[currentAccount.id] || []
    : [];

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    if (!currentAccount) return;
    
    setTransactionsByAccount(prev => ({
      ...prev,
      [currentAccount.id]: [
        ...(prev[currentAccount.id] || []),
        { ...transaction, id: crypto.randomUUID() }
      ]
    }));
  };

  const removeTransaction = (id: string) => {
    if (!currentAccount) return;
    
    setTransactionsByAccount(prev => ({
      ...prev,
      [currentAccount.id]: prev[currentAccount.id]?.filter(t => t.id !== id) || []
    }));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}