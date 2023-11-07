import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },

      gridTemplateAreas: {
        header: ['logo empty user', 'search search search'],
        'header-wide': ['logo search user'],
      },

      gridTemplateColumns: {
        header: 'auto 1fr',
        'header-wide': 'auto 1fr auto',
      },

      gridTemplateRows: {
        app: 'min-content max-content',
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    require('tailwind-scrollbar'),
  ],
}
export default config
