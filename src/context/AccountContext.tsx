import React, { createContext, useContext, useState } from 'react';

export interface Account {
  id: string;
  name: string;
  type: 'personal' | 'business';
  createdAt: string;
}

interface AccountContextType {
  accounts: Account[];
  currentAccount: Account | null;
  addAccount: (name: string, type: Account['type']) => void;
  switchAccount: (id: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const defaultAccount: Account = {
    id: 'default',
    name: 'Personal Account',
    type: 'personal',
    createdAt: new Date().toISOString()
  };

  const [accounts, setAccounts] = useState<Account[]>([defaultAccount]);
  const [currentAccount, setCurrentAccount] = useState<Account>(defaultAccount);

  const addAccount = (name: string, type: Account['type']) => {
    const newAccount: Account = {
      id: crypto.randomUUID(),
      name,
      type,
      createdAt: new Date().toISOString()
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const switchAccount = (id: string) => {
    const account = accounts.find(a => a.id === id);
    if (account) {
      setCurrentAccount(account);
    }
  };

  return (
    <AccountContext.Provider value={{ accounts, currentAccount, addAccount, switchAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccounts() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
}