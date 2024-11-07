export const calculateMonthData = (transactions: Transaction[]) => {
  const revenue = transactions
    .filter(t => t.category === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter(t => t.category === 'expenses')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const netCashFlow = revenue - expenses;
  
  return {
    revenue,
    expenses,
    netCashFlow
  };
};

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: 'revenue' | 'expenses';
  month: string;
}