import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React, { ReactElement } from 'react';

export const GlobalProvider = ({ children }: { children: ReactElement[] }) => (
  <ThemeProvider
    theme={createMuiTheme({
      props: { MuiButtonBase: { disableTouchRipple: true, disableRipple: true } },
    })}
  >
    {children}
  </ThemeProvider>
);
