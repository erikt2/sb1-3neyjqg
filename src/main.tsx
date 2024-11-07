import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TransactionProvider } from './context/TransactionContext';
import { AuthProvider } from './context/AuthContext';
import { AccountProvider } from './context/AccountContext';
import { SettingsProvider } from './context/SettingsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <AccountProvider>
          <TransactionProvider>
            <App />
          </TransactionProvider>
        </AccountProvider>
      </SettingsProvider>
    </AuthProvider>
  </StrictMode>
);