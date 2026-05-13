/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf5f0',
          100: '#f0e4d6',
          200: '#e0c9ad',
          300: '#c9a67e',
          400: '#b8895a',
          500: '#a67243',
          600: '#8f5c35',
          700: '#74472c',
          800: '#5f3a27',
          900: '#4e3023',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          700: '#2a2a2e',
          800: '#1e1e22',
          900: '#121214',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(166, 114, 67, 0.15)',
      },
    },
  },
  plugins: [],
}

