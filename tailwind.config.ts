import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      // strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
} satisfies Config
