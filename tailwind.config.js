/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D5F4E',
        'primary-dark': '#1a3d30',
        accent: '#6B3A2A',
        mint: '#f0f5f2',
        cream: '#FEFCF3',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(45, 95, 78, 0.1)',
        'card-hover': '0 12px 40px rgba(45, 95, 78, 0.18)',
        glow: '0 0 40px rgba(255, 200, 100, 0.15)',
      },
    },
  },
  plugins: [],
}
