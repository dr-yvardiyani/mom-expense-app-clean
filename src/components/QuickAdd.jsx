import React, { useState } from 'react';
import { CATEGORIES } from '../utils/storage';

export default function QuickAdd({ onAddExpense }) {
  const [toast, setToast] = useState('');

  // Sophisticated presets
  const PRESETS = [
    { label: 'Milk', amount: 42, icon: '🥛', note: 'Daily milk packet', category: 'Milk' },
    { label: 'Vegetables', amount: 100, icon: '🥬', note: 'Fresh produce purchase', category: 'Vegetables' },
    { label: 'Grocery', amount: 200, icon: '🛒', note: 'General household grocery', category: 'Grocery' },
    { label: 'Newspaper', amount: 8, icon: '📰', note: 'Daily morning paper', category: 'Newspaper' },
    { label: 'Milk (Double)', amount: 84, icon: '🥛', note: 'Double milk supply', category: 'Milk' },
    { label: 'Miscellaneous', amount: 50, icon: '🌸', note: 'Small household expense', category: 'Miscellaneous' },
  ];

  const handleQuickAdd = (preset) => {
    onAddExpense(preset.amount, preset.category, preset.note);
    setToast(`Added ${preset.label} for ₹${preset.amount}`);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="relative">
      
      {/* Premium Minimalist Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#4A3E3D] text-[#FAF8F5] font-semibold text-xs py-3 px-5 rounded-full shadow-soft-lg flex items-center gap-1.5 animate-fade-in border border-[#EAE3DB]/10">
          <span>✓</span> {toast}
        </div>
      )}

      {/* Preset Cards */}
      <div className="grid grid-cols-2 gap-3">
        {PRESETS.map((preset, index) => {
          const catInfo = CATEGORIES.find(c => c.name === preset.category) || {};
          
          return (
            <button
              key={index}
              onClick={() => handleQuickAdd(preset)}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-brand-border/40 hover:border-brand-border shadow-sm text-left btn-bounce no-select group"
            >
              <div className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                {preset.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-brand-text truncate">
                  {preset.label}
                </h4>
                <p className="text-[10px] text-brand-textMuted mt-0.5">
                  ₹{preset.amount}
                </p>
              </div>
              <span className="w-5 h-5 rounded-full bg-brand-accent/50 text-brand-textMuted font-bold text-[10px] flex items-center justify-center border border-brand-border/40">
                +
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
