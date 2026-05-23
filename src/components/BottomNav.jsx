import React from 'react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'add',
      label: 'Add Spend',
      icon: (
        <div className="bg-brand-primary text-white p-3 rounded-full shadow-button transform -translate-y-4 hover:bg-brand-primaryHover active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      )
    },
    {
      id: 'history',
      label: 'Log',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      id: 'report',
      label: 'Summary',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border/60 shadow-sm safe-bottom z-40 select-none">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-6">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const isAdd = item.id === 'add';

          if (isAdd) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab('add')}
                className="relative flex flex-col items-center justify-center -top-1 focus:outline-none focus:ring-0"
                aria-label="Add spending"
              >
                {item.icon}
                <span className="text-[10px] font-extrabold text-brand-primary mt-1 tracking-wider uppercase">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl btn-bounce focus:outline-none focus:ring-0 ${
                isActive 
                  ? 'text-brand-primary font-bold' 
                  : 'text-brand-textMuted hover:text-brand-text'
              }`}
            >
              <div className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-105' : ''}`}>
                {item.icon}
              </div>
              <span className="text-xs font-semibold tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
