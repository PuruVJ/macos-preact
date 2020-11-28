import { createMuiTheme, Theme } from '@material-ui/core';

export const theme: Theme = createMuiTheme({
  palette: {
    type:
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      import.meta.env.MODE !== 'development'
        ? 'dark'
        : 'light',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      `'Inter'`,
      `"Helvetica Neue"`,
      `"Helvetica"`,
      `"Arial"`,
      'sans-serif',
    ].join(', '),
  },

  spacing: (factor) => `${factor}rem`,

  overrides: {
    MuiButtonBase: {
      root: {
        letterSpacing: '1px',
      },
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
