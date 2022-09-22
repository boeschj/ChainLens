const CracoAntDesignPlugin = require("craco-antd");
const { getThemeVariables } = require("antd/dist/theme");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#5d5d5f",
          "@link-color": "#5d5d5f",
          "@text-color": "#fffff", // major text color
          "@text-color-secondary": "#ffffffff", // secondary text color
          "@link-hover-color": "#fffffff",
          "@link-active-color": "#fffffff",

          "@border-radius-base": "10px", // major border radius
          "@border-color-base": "#18181b", // major border color
          "@border-width-base": "1px", // width of the border for a component
          "@tag-default-color": "#ffffff",
          "@tag-default-bg": "#ffffff",
        },
      },
    },
  ],
};
