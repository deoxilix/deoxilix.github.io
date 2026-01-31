import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#428bca',
        'iphone-green': '#34C759',
        'zinc': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        'green': {
          500: '#22c55e',
        },
      },
    },
    fontFamily: {
      lato: ['var(--font-lato)', 'sans-serif'],
      jaapokki: ['var(--font-jaapokki)', 'sans-serif'],
      garamond: ['var(--font-garamond)', 'serif'],
    },
  },
  plugins: [],
}
export default config
