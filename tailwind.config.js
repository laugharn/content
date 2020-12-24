const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

let fontSize = {}
Object.entries(defaultTheme.fontSize).forEach(([key, value]) => {
  fontSize[key] = value[0]
})

const config = {
  plugins: [require('@tailwindcss/forms')],
  theme: {
    colors,
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontSize,
    screens: {
      lg: '1024px',
    },
  },
}

module.exports = config
