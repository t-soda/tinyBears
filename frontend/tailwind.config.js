const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        PassionOne: ['Passion One', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'brand-purple': 'var(--clr-purple)',
        'brand-pink': 'var(--clr-pink)',
        'brand-yellow': 'var(--clr-yellow)',
        'brand-blue': 'var(--clr-blue)',
        'brand-green': 'var(--clr-green)',
        'brand-light': 'var(--clr-light)',
        'brand-background': 'var(--clr-background)'
      },
      keyframes: {
        left: {
          '0%': { right: '10%' },
          '100%': { right: '90%' }
        },
        right: {
          '0%': { right: '90%' },
          '100%': { right: '10%' }
        },
        updown: {
          '0%': { top: 0 },
          '100%': { top: '3px' }
        }
      },
      animation: {
        updown: 'updown 1s steps(2) infinite'
      }
    }
  },
  plugins: []
}
