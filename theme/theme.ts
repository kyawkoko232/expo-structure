// theme.js
import { createTheme } from "@shopify/restyle";
import palette from "./palette";
import { spacing, borderRadii } from "./spacing";
import { textVariants } from "./textVariants";

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
});


// Export themes
const themes = {
  light: lightTheme,
  dark: darkTheme,
  auto: 'auto',
};


export type Theme = typeof lightTheme;

export { themes };
