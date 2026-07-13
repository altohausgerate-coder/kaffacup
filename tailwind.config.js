/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#32534c',
        'primary-dark': '#1e3a33',
        accent: '#6B3A2A',
        mint: '#f0f5f2',
        cream: '#FEFCF3',
      },
      fontFamily: {
        display: ['Luckiest Guy', 'cursive'],
        heading: ['Nunito Sans', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(50, 83, 76, 0.1)',
        'card-hover': '0 12px 40px rgba(50, 83, 76, 0.18)',
        glow: '0 0 40px rgba(255, 200, 100, 0.15)',
      },
    },
  },
  plugins: [],
}
