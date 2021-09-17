module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor:theme => ({
        'secondary':'#2CDCE1',
      }),
      textColor: theme => theme('colors'),
     textColor: {
       'skytext':'#2CDCE1'
     },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
