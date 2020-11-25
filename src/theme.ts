import { createMuiTheme, Theme } from '@material-ui/core';

export const theme: Theme = createMuiTheme({
  palette: {
    type: window.matchMedia('(prefers-color-scheme: dark)').matches && false ? 'dark' : 'light',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      `"SF Pro Display"`,
      `"SF Pro Icons"`,
      `"Helvetica Neue"`,
      `"Helvetica"`,
      `"Arial"`,
      'sans-serif',
    ].join(', '),
  },

  spacing: (factor) => `${factor}rem`,

  overrides: {
    MuiButton: {
      root: {
        letterSpacing: '1px',
      },
    },
  },
});
