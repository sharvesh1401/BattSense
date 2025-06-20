/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#CBD83B',       // Pear green (same as old pear)
        'primary-dark': '#b0c02b', // Darker pear green for hover
        secondary: '#A88AED',     // Indigo (same as old indigo)
        'secondary-dark': '#8669d1', // Darker indigo for hover
        ivory: '#FFFEEC',         // Neutral/Foreground (same as old ivory)
        highlight: '#6BEF88',     // Soft green for success/signal
        neutral: {
          800: '#1f1f1f',       // Dark shade for card/input backgrounds
          900: '#121212',       // Darker shade for card/input backgrounds
        },
        // Old 'pear', 'indigo', 'ivory' are effectively replaced by new names.
        // 'color-text' is removed as default text color will be ivory on black bg.
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        countUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'texture-scroll': { // New keyframes for texture scroll
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '20px 20px' }, // Assuming a 20px tile
        },
      },
      animation: { // Ensure 'animation' is correctly extended
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'count-up': 'countUp 1.5s ease-out',
        'texture-scroll': 'texture-scroll 3s linear infinite', // New animation
      },
    },
  },
  plugins: [],
};