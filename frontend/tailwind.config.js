/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f3d0fe',
          300: '#e8a9fb',
          400: '#d975f5',
          500: '#c44eea',
          600: '#a52dcb',
          700: '#8820a6',
          800: '#711c88',
          900: '#5d1a6e',
        },
        ink: {
          50: '#f8f7f4',
          100: '#efede8',
          200: '#dcd9d0',
          300: '#c1bcb0',
          400: '#a39b8c',
          500: '#8c836f',
          600: '#746d5c',
          700: '#5e594c',
          800: '#4e4940',
          900: '#2a2720',
          950: '#1a1814',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            color: theme('colors.ink.800'),
            h1: { fontFamily: theme('fontFamily.serif').join(', ') },
            h2: { fontFamily: theme('fontFamily.serif').join(', ') },
            h3: { fontFamily: theme('fontFamily.serif').join(', ') },
            a: { color: theme('colors.brand.600') },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
