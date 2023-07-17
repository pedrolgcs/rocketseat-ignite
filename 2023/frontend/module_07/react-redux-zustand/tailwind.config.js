/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: {
            height: 0,
          },
          to: {
            height: 'var(--radix-collapsible-content-height)',
          },
        },
        slideUp: {
          from: {
            height: 'var(--radix-collapsible-content-height)',
          },
          to: {
            height: 0,
          },
        },
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-in-out',
        slideDown: 'slideDown 0.3s ease-in-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
