import React, { useState } from 'react';
import { CATEGORIES, formatRupee } from '../utils/storage';

export default function Analytics({ expenses, onClearAll, onResetSampleData }) {
  const [selectedMonthOffset, setSelectedMonthOffset] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const getSelectedMonthInfo = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + selectedMonthOffset);
    return {
      monthIndex: d.getMonth(),
      year: d.getFullYear(),
      label: d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    };
  };

  const monthInfo = getSelectedMonthInfo();

  const monthlyExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return expDate.getFullYear() === monthInfo.year && expDate.getMonth() === monthInfo.monthIndex;
  });

  const totalSpent = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = CATEGORIES.map((cat) => {
    const amt = monthlyExpenses
      .filter(exp => exp.category === cat.name)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return {
      ...cat,
      amount: amt,
      percentage: totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0
    };
  }).filter(cat => cat.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="flex-1 pb-28 px-6 pt-8 max-w-md mx-auto w-full select-none animate-fade-in">
      
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-text tracking-tight">
          Monthly Summary
        </h1>
        <p className="text-brand-textMuted font-semibold text-xs mt-1">
          Review and audit spending categories.
        </p>
      </div>

      {/* Month Switcher */}
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-brand-border/60 shadow-sm mb-6">
        <button
          onClick={() => setSelectedMonthOffset(selectedMonthOffset - 1)}
          className="w-8 h-8 rounded-lg bg-brand-bg hover:bg-brand-accent flex items-center justify-center text-sm font-bold text-brand-text btn-bounce border border-brand-border/40"
        >
          ◀
        </button>
        <span className="font-bold text-brand-text text-sm md:text-base">
          {monthInfo.label}
        </span>
        <button
          onClick={() => setSelectedMonthOffset(selectedMonthOffset + 1)}
          className="w-8 h-8 rounded-lg bg-brand-bg hover:bg-brand-accent flex items-center justify-center text-sm font-bold text-brand-text btn-bounce border border-brand-border/40"
        >
          ▶
        </button>
      </div>

      {/* Total Card */}
      <div className="bg-brand-accent/40 rounded-2xl p-5 border border-brand-border/50 shadow-sm text-center mb-6">
        <p className="text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-1">
          Total Spent this Month
        </p>
        <p className="text-3xl font-bold text-brand-text tracking-tight">
          {formatRupee(totalSpent)}
        </p>
        <p className="text-[10px] text-brand-textMuted mt-1">
          Tracking {monthlyExpenses.length} transactions
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-brand-text mb-4 uppercase tracking-wider">
          Spent by Category
        </h2>

        {categoryTotals.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-brand-border/60 shadow-sm">
            <p className="text-brand-textMuted text-xs font-semibold">No logs recorded for this period.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 border border-brand-border/50 shadow-sm flex flex-col gap-4">
            {categoryTotals.map((cat) => (
              <div key={cat.name} className="flex flex-col gap-1.5">
                {/* Labels */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 font-bold text-brand-text">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-brand-textMuted font-semibold">
                      ({cat.percentage}%)
                    </span>
                  </div>
                  <span className="font-bold text-brand-text">
                    {formatRupee(cat.amount)}
                  </span>
                </div>
                {/* Slim Refined Progress Bar */}
                <div className="w-full bg-brand-bg h-2 rounded-full overflow-hidden border border-brand-border/20">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.colorKey === 'blue' && 'bg-[#A3B9C9]'
                    } ${cat.colorKey === 'green' && 'bg-[#9CBFB5]'} ${
                      cat.colorKey === 'yellow' && 'bg-[#D9CDB8]'
                    } ${cat.colorKey === 'purple' && 'bg-[#B3A9C2]'} ${
                      cat.colorKey === 'orange' && 'bg-[#D2B4A6]'
                    } ${cat.colorKey === 'pink' && 'bg-[#D8B4BC]'} ${
                      cat.colorKey === 'slate' && 'bg-[#B0B5BC]'
                    } ${cat.colorKey === 'teal' && 'bg-[#96BEBA]'} ${
                      cat.colorKey === 'amber' && 'bg-[#CBB0A0]'
                    }`}

                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Options Panel */}
      <div className="bg-white rounded-2xl p-5 border border-brand-border/50 shadow-sm">
        <h3 className="text-xs font-bold text-brand-textMuted mb-3 uppercase tracking-wider">Utility Actions</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full bg-brand-accent/50 text-brand-text font-bold py-2.5 px-4 rounded-xl text-[11px] flex items-center justify-center gap-1.5 btn-bounce hover:bg-brand-accent border border-brand-border/40"
          >
            Pre-fill Sample Logs (Mock Data)
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full bg-stone-50 text-red-500 font-bold py-2.5 px-4 rounded-xl text-[11px] flex items-center justify-center gap-1.5 btn-bounce hover:bg-red-50 border border-brand-border/40"
          >
            Erase All Saved Logs (Reset App)
          </button>
        </div>
      </div>

      {/* Confirm Mock Seed */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in select-none">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs border border-brand-border shadow-soft-lg text-center">
            <h2 className="text-lg font-bold text-brand-text mb-2">Reset to mock data?</h2>
            <p className="text-brand-textMuted font-semibold text-xs leading-relaxed mb-5">
              This will overwrite your current logs with mock items to show how the application works.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-brand-accent/60 hover:bg-brand-accent text-brand-text font-bold py-2.5 px-4 rounded-xl text-xs transition-all btn-bounce border border-brand-border/40"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetSampleData();
                  setShowResetConfirm(false);
                }}
                className="flex-1 bg-brand-primary hover:bg-[#B27A7A] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all btn-bounce border-b-2 border-[#A26A6A] shadow-md"
              >
                Reset Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Clear */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in select-none">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs border border-brand-border shadow-soft-lg text-center">
            <h2 className="text-lg font-bold text-red-500 mb-2">Erase all data?</h2>
            <p className="text-brand-textMuted font-semibold text-xs leading-relaxed mb-5">
              Are you sure you want to delete all logged expenditures? This action cannot be reversed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-brand-accent/60 hover:bg-brand-accent text-brand-text font-bold py-2.5 px-4 rounded-xl text-xs transition-all btn-bounce border border-brand-border/40"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all btn-bounce border-b-2 border-red-700 shadow-md"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
