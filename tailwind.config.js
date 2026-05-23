/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#FAF8F5',          // elegant warm neutral cream
          primary: '#B68282',     // beautiful softer dusty rose
          primaryHover: '#A67272',

          secondary: '#E8C2CA',   // soft blush pink
          accent: '#F3EFE9',      // soft warm beige
          card: '#FFFFFF',
          text: '#4A3E3D',        // soft mocha charcoal
          textMuted: '#8E7E7C',   // muted warm grey
          border: '#EAE3DB',      // delicate warm border
        },
        // Muted category accent colors
        refined: {
          blueBg: '#EDF7FD',      // soft sky blue bg
          blueText: '#3A7596',    // muted sky blue text
          greenBg: '#EEF9F6',     // soft mint bg
          greenText: '#3B7E6F',   // muted mint text
          yellowBg: '#F7F2E8',    // soft beige bg
          yellowText: '#8E744A',  // muted yellow/beige text
          purpleBg: '#F3F0F9',    // soft lavender bg
          purpleText: '#6C5994',  // muted lavender text
          orangeBg: '#FAF0E6',    // soft peach bg
          orangeText: '#A8634B',  // muted orange text
          pinkBg: '#FAF0F2',      // soft blush bg
          pinkText: '#A9586D',    // muted pink text
          slateBg: '#F1F2F4',     // warm slate bg
          slateText: '#5B616E',   // warm slate text
          tealBg: '#EAF6F5',      // soft ocean teal bg
          tealText: '#2E7977',    // muted ocean teal text
          amberBg: '#FDFBFA',     // mocha bg
          amberText: '#93725F',   // mocha text
        }
      },
      boxShadow: {
        'sm': '0 2px 8px rgb(142 126 124 / 0.05)',
        'soft': '0 6px 20px rgb(142 126 124 / 0.06)',
        'soft-lg': '0 10px 30px rgb(142 126 124 / 0.08)',
        'button': '0 4px 12px rgb(195 139 139 / 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
