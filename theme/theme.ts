// theme.js
import { createTheme } from "@shopify/restyle";
import palette from "./palette";
import { spacing, borderRadii } from "./spacing";
import { textVariants } from "./textVariants";
import { cardVariants } from './cardVariants';

// Create themes
const lightTheme = createTheme({
  colors: {
    ...palette.light,
    primary: palette.light.primary, 
    secondary: palette.light.secondary,
    accent: palette.light.accent,
    background: palette.light.background,
    text: palette.light.text,
    success: palette.light.success,
    danger: palette.light.danger,
    warning: palette.light.warning,
    info: palette.light.info,
  },
  spacing,
  borderRadii,
  textVariants,
});

const darkTheme = createTheme({
  colors: {
    ...palette.dark,
    primary: palette.dark.primary,
    secondary: palette.dark.secondary,
    accent: palette.dark.accent,
    background: palette.dark.background,
    text: palette.dark.text,
    success: palette.dark.success,
    danger: palette.dark.danger,
    warning: palette.dark.warning,
    info: palette.dark.info,
  },
  spacing,
  borderRadii,
  textVariants,
  cardVariants,
});



const coffeeTheme = createTheme({
  colors: {
    ...palette.coffee,
    primary: palette.coffee.primary,
    secondary: palette.coffee.secondary,
    accent: palette.coffee.accent,
    background: palette.coffee.background,
    text: palette.coffee.text,
    success: palette.coffee.success,
    danger: palette.coffee.danger,
    warning: palette.coffee.warning,
    info: palette.coffee.info,
    disable: palette.coffee.disable,
  },
  spacing,
  borderRadii,
  textVariants,
  cardVariants,
});


// Export themes
const themes = {
  light: lightTheme,
  coffee : coffeeTheme,
  dark: darkTheme,
  auto: 'auto',
};


export type Theme = typeof lightTheme;

export { themes };
