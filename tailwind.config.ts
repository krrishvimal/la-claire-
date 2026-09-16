/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFBFD',
          100: '#F7F3FB',
          200: '#EDE4F7',
          300: '#DCCCEF',
          400: '#C2A7E2',
          500: '#9F8EC2',
          600: '#846FA8',
          700: '#68548A',
          800: '#4D3B68',
          900: '#2A1D3B',
        },
        plum: {
          DEFAULT: '#23182B',
          light: '#3C2D49',
          dark: '#160E1C',
        },
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F4EFEA',
          300: '#EAE1D7',
          DEFAULT: '#FAF8F5',
        },
        gold: {
          light: '#E5D3B3',
          DEFAULT: '#C5A880',
          dark: '#A68858',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
