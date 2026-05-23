import React, { useState, useEffect } from 'react';
import { getExpenses, addExpense, deleteExpense, saveExpenses } from './utils/storage';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import HistoryList from './components/HistoryList';
import Analytics from './components/Analytics';
import BottomNav from './components/BottomNav';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [expenses, setExpenses] = useState([]);

  // Load expenses on mount
  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const handleAddExpense = (amount, category, note) => {
    const updated = addExpense(amount, category, note);
    setExpenses(updated);
  };

  const handleDeleteExpense = (id) => {
    const updated = deleteExpense(id);
    setExpenses(updated);
  };

  const handleClearAll = () => {
    saveExpenses([]);
    setExpenses([]);
  };

  const handleResetSampleData = () => {
    localStorage.removeItem('mom_expense_tracker_data');
    setExpenses(getExpenses());
  };

  return (
    <div className="flex-1 bg-stone-100 min-h-screen flex flex-col font-sans select-none antialiased">
      {/* Premium minimal phone wrap for desktop/large screens */}
      <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto bg-brand-bg shadow-soft-lg border-x border-brand-border/60 min-h-screen flex flex-col pb-24">
        {activeTab === 'home' && (
          <Dashboard 
            expenses={expenses} 
            onAddExpense={handleAddExpense} 
            setActiveTab={setActiveTab} 
          />
        )}
        
        {activeTab === 'add' && (
          <ExpenseForm 
            onAddExpense={handleAddExpense} 
            setActiveTab={setActiveTab} 
          />
        )}
        
        {activeTab === 'history' && (
          <HistoryList 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense} 
          />
        )}
        
        {activeTab === 'report' && (
          <Analytics 
            expenses={expenses} 
            onClearAll={handleClearAll} 
            onResetSampleData={handleResetSampleData} 
          />
        )}
      </main>

      {/* Navigation bottom bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
