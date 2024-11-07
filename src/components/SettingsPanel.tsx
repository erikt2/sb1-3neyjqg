import React, { useState } from 'react';
import { Settings, ChevronDown, Briefcase, User, X, DollarSign, Plus, CreditCard } from 'lucide-react';
import { useAccounts } from '../context/AccountContext';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const { accounts, currentAccount, addAccount, switchAccount } = useAccounts();
  const [year, setYear] = useState(2024);
  const [currency, setCurrency] = useState('USD');
  const navigate = useNavigate();

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
  ];

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAccountName.trim()) {
      addAccount(newAccountName.trim(), 'business');
      setNewAccountName('');
      setIsCreating(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-white"
      >
        <Settings className="w-4 h-4" />
        <span>Settings</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-80 bg-gray-900 h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Account Switcher */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">CURRENT ACCOUNT</h3>
                <Dropdown
                  value={currentAccount?.id || ''}
                  onChange={(id) => switchAccount(id)}
                  items={accounts.map(account => ({
                    id: account.id,
                    label: account.name,
                    icon: account.type === 'business' ? 
                      <Briefcase className="w-4 h-4" /> : 
                      <User className="w-4 h-4" />
                  }))}
                />

                {isCreating ? (
                  <form onSubmit={handleCreateAccount} className="space-y-2">
                    <input
                      type="text"
                      value={newAccountName}
                      onChange={(e) => setNewAccountName(e.target.value)}
                      placeholder="Business Name"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreating(false);
                          setNewAccountName('');
                        }}
                        className="flex-1 px-3 py-1.5 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors rounded-lg hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Business Account</span>
                  </button>
                )}
              </div>

              {/* Year Selector */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">YEAR</h3>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  {[2023, 2024, 2025].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Currency Selector */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">CURRENCY</h3>
                <Dropdown
                  value={currency}
                  onChange={setCurrency}
                  items={currencies.map(curr => ({
                    id: curr.code,
                    label: `${curr.name} (${curr.symbol})`,
                    icon: <DollarSign className="w-4 h-4" />
                  }))}
                />
              </div>

              <div className="border-t border-gray-800 pt-6 space-y-2">
                <button
                  onClick={() => handleNavigation('/settings')}
                  className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>Account Settings</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    handleNavigation('/settings');
                    setTimeout(() => document.querySelector('[data-tab="subscription"]')?.click(), 100);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>Subscription & Billing</span>
                  <CreditCard className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsPanel;