import { createMuiTheme, Theme } from '@material-ui/core';

export const theme: Theme = createMuiTheme({
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

  overrides: {
    MuiButton: {
      root: {
        letterSpacing: '1px',
      },
    },
  },
});
