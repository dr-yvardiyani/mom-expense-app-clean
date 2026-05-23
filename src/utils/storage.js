// Refined, cohesive categories with premium muted styling and cognitive emojis
export const CATEGORIES = [
  {
    name: 'Milk',
    icon: '🥛',
    bgColor: 'bg-refined-blueBg',
    textColor: 'text-refined-blueText',
    colorKey: 'blue'
  },
  {
    name: 'Vegetables',
    icon: '🥬',
    bgColor: 'bg-refined-greenBg',
    textColor: 'text-refined-greenText',
    colorKey: 'green'
  },
  {
    name: 'Grocery',
    icon: '🛒',
    bgColor: 'bg-refined-yellowBg',
    textColor: 'text-refined-yellowText',
    colorKey: 'yellow'
  },
  {
    name: 'Electricity',
    icon: '⚡',
    bgColor: 'bg-refined-purpleBg',
    textColor: 'text-refined-purpleText',
    colorKey: 'purple'
  },
  {
    name: 'Gas',
    icon: '🔥',
    bgColor: 'bg-refined-orangeBg',
    textColor: 'text-refined-orangeText',
    colorKey: 'orange'
  },
  {
    name: 'Maid',
    icon: '🧹',
    bgColor: 'bg-refined-pinkBg',
    textColor: 'text-refined-pinkText',
    colorKey: 'pink'
  },
  {
    name: 'Maintenance',
    icon: '🛠️',
    bgColor: 'bg-refined-slateBg',
    textColor: 'text-refined-slateText',
    colorKey: 'slate'
  },
  {
    name: 'Newspaper',
    icon: '📰',
    bgColor: 'bg-refined-tealBg',
    textColor: 'text-refined-tealText',
    colorKey: 'teal'
  },
  {
    name: 'Miscellaneous',
    icon: '🌸',
    bgColor: 'bg-refined-amberBg',
    textColor: 'text-refined-amberText',
    colorKey: 'amber'
  }
];

const STORAGE_KEY = 'mom_expense_tracker_data';

export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Seed data refined to sound mature and clean
const SEED_EXPENSES = [
  {
    id: 'seed-1',
    amount: 42,
    category: 'Milk',
    date: getTodayDateString(),
    note: 'Daily milk supply'
  },
  {
    id: 'seed-2',
    amount: 150,
    category: 'Vegetables',
    date: getTodayDateString(),
    note: 'Weekly fresh vegetables'
  },
  {
    id: 'seed-3',
    amount: 1200,
    category: 'Grocery',
    date: getTodayDateString(),
    note: 'Monthly groceries'
  },
  {
    id: 'seed-4',
    amount: 500,
    category: 'Maid',
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    })(),
    note: 'Part-time maid salary'
  },
  {
    id: 'seed-5',
    amount: 8,
    category: 'Newspaper',
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 2);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    })(),
    note: 'Daily morning newspaper'
  }
];

export const getExpenses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_EXPENSES));
      return SEED_EXPENSES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error accessing local storage:', error);
    return SEED_EXPENSES;
  }
};

export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch (error) {
    console.error('Error writing to local storage:', error);
    return false;
  }
};

export const addExpense = (amount, category, note = '') => {
  const expenses = getExpenses();
  const newExpense = {
    id: 'exp-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    amount: parseFloat(amount),
    category,
    date: getTodayDateString(),
    note: note.trim()
  };
  const updated = [newExpense, ...expenses];
  saveExpenses(updated);
  return updated;
};

export const deleteExpense = (id) => {
  const expenses = getExpenses();
  const updated = expenses.filter(exp => exp.id !== id);
  saveExpenses(updated);
  return updated;
};

export const formatRupee = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

// Premium, calm and supportive messaging
export const getCheerfulMessage = (todayTotal, monthlyTotal) => {
  if (todayTotal === 0) {
    return 'No transactions logged today. You have a peaceful blank canvas.';
  }
  if (todayTotal < 200) {
    return 'Moderate spending today. Your savings are neatly balanced.';
  }
  if (todayTotal < 1000) {
    return 'Your daily household logs are fully updated and secure.';
  }
  return 'A productive day of shopping. Take some time to relax now.';
};
export const getBriefGreeting = () => {
  const hr = new Date().getHours();
  if (hr < 12) return 'Good Morning';
  if (hr < 17) return 'Good Afternoon';
  return 'Good Evening';
};
