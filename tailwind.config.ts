import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'Arial', 'sans-serif'],
        barlow: ['var(--font-body)', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          // 'orange' kept as the class name site-wide; value is now C&S red
          orange: '#C4262E',
          red: '#C4262E',
          'red-deep': '#A11F26',
          'red-tint': '#FBEDEC',
          ink: '#221A19',
          'ink-2': '#4F4745',
          line: '#E7E3E2',
          'bg-2': '#F8F6F5',
          foot: '#1A1413',
          dark: '#1A1A2E',
          gray: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
}
export default config
