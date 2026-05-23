import React from 'react';
import { formatRupee, getCheerfulMessage, getBriefGreeting } from '../utils/storage';
import QuickAdd from './QuickAdd';

export default function Dashboard({ expenses, onAddExpense, setActiveTab }) {
  const getTodayTotal = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    return expenses
      .filter(exp => exp.date === todayStr)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getMonthTotal = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return expenses
      .filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getFullYear() === currentYear && expDate.getMonth() === currentMonth;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const todayTotal = getTodayTotal();
  const monthTotal = getMonthTotal();
  const cheerfulMessage = getCheerfulMessage(todayTotal, monthTotal);
  const timeGreeting = getBriefGreeting();

  const getFriendlyDate = () => {
    return new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const recentExpenses = expenses.slice(0, 3);

  return (
    <div className="flex-1 pb-28 px-6 pt-8 max-w-md mx-auto w-full select-none animate-fade-in">
      
      {/* Premium Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-text tracking-tight">
            {timeGreeting}, Mom
          </h1>
          <p className="text-brand-textMuted font-semibold text-xs mt-1">
            {getFriendlyDate()}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center border border-brand-border/60 text-lg font-bold text-brand-text">
          M
        </div>
      </div>

      {/* Elegant, calm status bubble */}
      <div className="bg-brand-accent/50 rounded-2xl p-4 mb-8 border border-brand-border/40 shadow-sm">
        <p className="text-xs font-semibold text-brand-text leading-relaxed">
          {cheerfulMessage}
        </p>
      </div>

      {/* Refined Stat Cards */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        
        {/* Today's Card */}
        <div className="bg-gradient-to-br from-white to-[#FAF8F5]/80 rounded-2xl p-5 border border-[#E5DDD3] shadow-[0_4px_20px_rgba(142,126,124,0.05)] relative overflow-hidden">
          <p className="text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-1">
            Today's Log
          </p>
          <p className="text-3xl font-bold text-brand-primary tracking-tight">
            {formatRupee(todayTotal)}
          </p>
          <p className="text-[10px] text-brand-textMuted mt-1">
            Updated in browser storage
          </p>
        </div>

        {/* Monthly Card */}
        <div className="bg-gradient-to-br from-[#F5F2EC] to-[#EDE9E0] rounded-2xl p-5 border border-[#DFD6CB] shadow-[0_4px_20px_rgba(142,126,124,0.04)] relative overflow-hidden">
          <p className="text-brand-textMuted font-bold text-[10px] uppercase tracking-wider mb-1">
            Monthly Log
          </p>
          <p className="text-3xl font-bold text-[#5B506E] tracking-tight">
            {formatRupee(monthTotal)}
          </p>
          <p className="text-[10px] text-brand-textMuted mt-1">
            Current calendar month summary
          </p>
        </div>


      </div>

      {/* Clean Quick Add Section */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-brand-text mb-4 uppercase tracking-wider">
          Quick Log
        </h2>
        <QuickAdd onAddExpense={onAddExpense} />
      </div>

      {/* Minimal Recent Entries */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-brand-text uppercase tracking-wider">
            Recent Activity
          </h2>
          <button 
            onClick={() => setActiveTab('history')}
            className="text-brand-primary font-bold text-xs bg-brand-accent/60 hover:bg-brand-accent py-1.5 px-3.5 rounded-full btn-bounce border border-brand-border/40"
          >
            View All
          </button>
        </div>

        {recentExpenses.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-brand-border/50 shadow-sm">
            <p className="text-brand-textMuted text-xs font-semibold">No recent logs recorded.</p>
            <button 
              onClick={() => setActiveTab('add')}
              className="mt-3 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold px-5 py-2 rounded-xl text-xs shadow-button btn-bounce"
            >
              Add New Spend
            </button>
          </div>
        ) : (
          <div className="flex flex-col bg-white rounded-2xl border border-brand-border/50 shadow-sm divide-y divide-brand-border/40">
            {recentExpenses.map((exp) => (
              <div 
                key={exp.id} 
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/50 flex items-center justify-center text-xl">
                    {exp.category === 'Milk' && '🥛'}
                    {exp.category === 'Vegetables' && '🥬'}
                    {exp.category === 'Grocery' && '🛒'}
                    {exp.category === 'Electricity' && '⚡'}
                    {exp.category === 'Gas' && '🔥'}
                    {exp.category === 'Maid' && '🧹'}
                    {exp.category === 'Maintenance' && '🛠️'}
                    {exp.category === 'Newspaper' && '📰'}
                    {exp.category === 'Miscellaneous' && '🌸'}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-text leading-tight">
                      {exp.category}
                    </h3>
                    <p className="text-brand-textMuted text-xs mt-0.5">
                      {exp.note || 'No notes added'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-brand-text">
                    -{formatRupee(exp.amount)}
                  </span>
                  <p className="text-[10px] text-brand-textMuted mt-0.5">
                    {exp.date === new Date().toISOString().split('T')[0] ? 'Today' : exp.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
