const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        btnet: '#e60012',
        bgcolor: '#e7e3dc',
        btnetgray: '#505050'
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      minWidth: {
        '36': '9rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
      maxHeight: {
        '3/4': '75%',
      },
    },
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '700px',
        lg: '800px',
        xl: '920px',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, addComponents, e, config }) {
      const newUtilities = {
        '.horizontal-tb': {
          writingMode: 'horizontal-tb',
        },
        '.vertical-rl': {
          writingMode: 'vertical-rl'
        },
        '.vertical-lr': {
          writingMode: 'vertical-lr'
        },
        '.text-shadow': {
          textShadow: '0 0 8px var(--text-shadow)'
        }
      }
      addUtilities(newUtilities)
    }),
  ]
}
