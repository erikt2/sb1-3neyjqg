import React, { useState } from 'react';
import { ChevronDown, Plus, Briefcase, User } from 'lucide-react';
import { useAccounts, Account } from '../context/AccountContext';

function AccountSwitcher() {
  const { accounts, currentAccount, addAccount, switchAccount } = useAccounts();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAccountName.trim()) {
      addAccount(newAccountName.trim(), 'business');
      setNewAccountName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-white"
      >
        {currentAccount?.type === 'business' ? (
          <Briefcase className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4" />
        )}
        <span>{currentAccount?.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50">
          <div className="max-h-64 overflow-y-auto">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => {
                  switchAccount(account.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 transition-colors ${
                  currentAccount?.id === account.id ? 'bg-gray-700' : ''
                }`}
              >
                {account.type === 'business' ? (
                  <Briefcase className="w-4 h-4 text-blue-400" />
                ) : (
                  <User className="w-4 h-4 text-green-400" />
                )}
                <span className="text-white">{account.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-700 p-2">
            {isCreating ? (
              <form onSubmit={handleCreateAccount} className="space-y-2">
                <input
                  type="text"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                  placeholder="Business Name"
                  className="w-full px-3 py-1.5 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setNewAccountName('');
                    }}
                    className="flex-1 px-3 py-1.5 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center space-x-2 px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Business Account</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSwitcher;