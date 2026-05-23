import React, { useState } from 'react';
import { CATEGORIES } from '../utils/storage';

export default function ExpenseForm({ onAddExpense, setActiveTab }) {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Grocery');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter an amount greater than zero.');
      return;
    }

    onAddExpense(amount, selectedCategory, note);
    setSuccess(true);
    setAmount('');
    setNote('');
    
    setTimeout(() => {
      setSuccess(false);
      setActiveTab('home');
    }, 1200);
  };

  return (
    <div className="flex-1 pb-28 px-6 pt-8 max-w-md mx-auto w-full select-none animate-fade-in">
      
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-text tracking-tight">
          Add Expense
        </h1>
        <p className="text-brand-textMuted font-semibold text-xs mt-1">
          Record custom daily household purchases.
        </p>
      </div>

      {/* Success Alert */}
      {success && (
        <div className="bg-refined-greenBg border border-brand-border text-refined-greenText font-bold text-center p-4 rounded-xl shadow-sm mb-6">
          <p className="text-lg">Saved successfully</p>
        </div>
      )}

      {/* Clean Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 border border-brand-border/60 shadow-sm">
        
        {/* Amount Input */}
        <div className="mb-6">
          <label htmlFor="amount" className="block text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-2">
            Amount spent
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-2xl font-bold text-brand-textMuted">₹</span>
            <input
              id="amount"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-brand-bg pl-10 pr-4 py-3.5 rounded-xl text-2xl font-bold text-brand-text border border-brand-border/60 focus:border-brand-primary focus:outline-none transition-all placeholder:text-stone-300"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold mt-2 pl-1">⚠️ {error}</p>}
        </div>

        {/* Categories Selection */}
        <div className="mb-6">
          <label className="block text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-2">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all btn-bounce ${
                    isSelected
                      ? `${cat.bgColor} border-brand-primary shadow-sm`
                      : 'bg-brand-bg border-brand-border/40 hover:border-brand-border'
                  }`}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className={`text-[10px] font-bold truncate w-full text-center ${
                    isSelected ? cat.textColor : 'text-brand-textMuted'
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note Input */}
        <div className="mb-6">
          <label htmlFor="note" className="block text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-2">
            Description
          </label>
          <input
            id="note"
            type="text"
            placeholder="e.g. Milk packet, groceries, maid salary"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-brand-bg px-4 py-3 rounded-xl text-sm font-semibold text-brand-text border border-brand-border/60 focus:border-brand-primary focus:outline-none transition-all placeholder:text-stone-300"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-brand-primary hover:bg-[#B27A7A] text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-button btn-bounce border-b-2 border-[#A26A6A]"
        >
          Save Expense
        </button>

      </form>
    </div>
  );
}
