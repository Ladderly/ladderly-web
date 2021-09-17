const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      secondary: {
        100: "#e9fbfc",
        200: "#bcf4f5",
        300: "#8fecef",
        400: "#63e5e9",
        500: "#36dee2",
      },
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
