/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#EEEAE0',
        matted: '#1A1A1A',
        primary: {
          DEFAULT: '#1A1A1A', // matted black
          light: '#2A2A2A',   // slightly lighter
          dark: '#101010',    // slightly darker
        },
        accent: {
          DEFAULT: '#3B82F6', // blue-500
          light: '#60A5FA',   // blue-400
          dark: '#2563EB',    // blue-600
        },
        text: {
          primary: '#F8FAFC',  // white-ish for dark backgrounds
          secondary: '#94A3B8', // slate-400
          dark: '#334155',     // slate-700 for light backgrounds
        },
        tag: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          green: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-in-out forwards',
        'icon-change': 'iconChange 0.3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        iconChange: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

