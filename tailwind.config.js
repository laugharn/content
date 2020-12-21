const { useDebugValue } = require("react");
const defaultTheme = require("tailwindcss/defaultTheme");

let fontSize = {};
Object.entries(defaultTheme.fontSize).forEach(([key, value]) => {
  fontSize[key] = value[0];
});

const config = {
  theme: {
    fontSize,
  },
};

module.exports = {};
