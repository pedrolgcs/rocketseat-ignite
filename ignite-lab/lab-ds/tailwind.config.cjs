/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      transparent: 'transparent',

      'gray-100': '#e1e1e6',
      'gray-200': '#c4c4cc',
      'gray-400': '#7c7c8a',
      'gray-800': '#202024',
      'gray-900': '#121214',

      'cyan-300': '#9be1fb',
      'cyan-500': '#81d8f7',
    },
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 32,
    },
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
    },
  },
};
