/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3'
          }
        },
        primary: {
          DEFAULT: '#2563eb',
          light: '#60a5fa',
          dark: '#1e3a8a'
        },
        secondary: {
          DEFAULT: '#4ade80',
          light: '#86efac',
          dark: '#166534'
        },
        accent: {
          DEFAULT: '#facc15',
          light: '#fde047',
          dark: '#eab308'
        }
      },
      fontFamily: {
        'sans': ['"Roboto"', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)',
        'fluid-base': 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
        'fluid-lg': 'clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)',
        'fluid-xl': 'clamp(1.56rem, 1vw + 1.31rem, 2.11rem)',
      },
      spacing: {
        'fluid-sm': 'clamp(0.5rem, 0.43vw + 0.36rem, 0.75rem)',
        'fluid-base': 'clamp(1rem, 0.87vw + 0.73rem, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 1.3vw + 1.09rem, 2.25rem)',
      }
    },
  },
  plugins: [],
};
