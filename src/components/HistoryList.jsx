import React, { useState } from 'react';
import { CATEGORIES, formatRupee } from '../utils/storage';

export default function HistoryList({ expenses, onDeleteExpense }) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory = filterCategory === 'All' || exp.category === filterCategory;
    const matchesSearch = 
      exp.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.amount.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    onDeleteExpense(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const getGroupedExpenses = () => {
    const groups = {};
    filteredExpenses.forEach((exp) => {
      if (!groups[exp.date]) {
        groups[exp.date] = [];
      }
      groups[exp.date].push(exp);
    });
    return groups;
  };

  const grouped = getGroupedExpenses();
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  const formatFriendlyDate = (dateStr) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';
    
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="flex-1 pb-28 px-6 pt-8 max-w-md mx-auto w-full select-none animate-fade-in">
      
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-text tracking-tight">
          Transaction Log
        </h1>
        <p className="text-brand-textMuted font-semibold text-xs mt-1">
          Review and audit recorded logs.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white rounded-2xl p-4 border border-brand-border/60 shadow-sm mb-6 flex flex-col gap-4">
        
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-1.5">
            Search entries
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-brand-textMuted">🔍</span>
            <input
              id="search"
              type="text"
              placeholder="Search note or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-brand-bg pl-9 pr-4 py-2.5 rounded-xl text-xs font-semibold text-brand-text border border-brand-border/60 focus:border-brand-primary focus:outline-none transition-all placeholder:text-stone-300"
            />
          </div>
        </div>

        {/* Categories filters */}
        <div>
          <label className="block text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-1.5">
            Filter by Category
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => setFilterCategory('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all btn-bounce ${
                filterCategory === 'All'
                  ? 'bg-brand-primary text-white shadow-button'
                  : 'bg-brand-bg text-brand-textMuted border border-brand-border/40'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const isActive = filterCategory === cat.name;
              return (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => setFilterCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all btn-bounce ${
                    isActive
                      ? `${cat.bgColor} ${cat.textColor} border border-brand-primary shadow-sm`
                      : 'bg-brand-bg text-brand-textMuted border border-brand-border/40'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Log list */}
      {sortedDates.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-brand-border/60 shadow-sm">
          <p className="text-brand-text font-bold text-sm">No expenses found</p>
          <p className="text-brand-textMuted text-xs mt-1">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {sortedDates.map((date) => (
            <div key={date}>
              {/* Daily Header */}
              <div className="flex justify-between items-center px-1 mb-2">
                <h3 className="font-bold text-xs text-brand-textMuted uppercase tracking-wider">
                  {formatFriendlyDate(date)}
                </h3>
                <span className="text-[10px] font-bold text-brand-text bg-brand-accent/50 py-1 px-2.5 rounded-full border border-brand-border/40">
                  {formatRupee(grouped[date].reduce((sum, e) => sum + e.amount, 0))}
                </span>
              </div>

              {/* Items Card */}
              <div className="flex flex-col bg-white rounded-2xl border border-brand-border/50 shadow-sm divide-y divide-brand-border/40">
                {grouped[date].map((exp) => {
                  const catInfo = CATEGORIES.find(c => c.name === exp.category) || {};
                  return (
                    <div
                      key={exp.id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${catInfo.bgColor || 'bg-brand-accent/30'} flex items-center justify-center text-lg`}>
                          {catInfo.icon || '🌸'}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-brand-text leading-tight">
                            {exp.category}
                          </h4>
                          <p className="text-brand-textMuted text-[10px] mt-0.5 font-semibold">
                            {exp.note || 'No description added'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-brand-text">
                          -{formatRupee(exp.amount)}
                        </span>
                        <button
                          onClick={() => handleDeleteClick(exp.id)}
                          className="w-8 h-8 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-400 hover:text-red-500 flex items-center justify-center text-sm btn-bounce border border-brand-border/40"
                          aria-label="Delete expense"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Premium minimal delete modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in select-none">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs border border-brand-border shadow-soft-lg text-center">
            <h2 className="text-lg font-bold text-brand-text mb-2">Delete entry?</h2>
            <p className="text-brand-textMuted font-semibold text-xs leading-relaxed mb-5">
              Are you sure you want to remove this transaction? This log record will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 bg-brand-accent/60 hover:bg-brand-accent text-brand-text font-bold py-2.5 px-4 rounded-xl text-xs transition-all btn-bounce border border-brand-border/40"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all btn-bounce border-b-2 border-red-700 shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
