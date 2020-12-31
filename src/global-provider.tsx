import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export const GlobalProvider = ({ children }: { children: ReactElement[] }) => (
  <HelmetProvider>
    <ThemeProvider
      theme={createMuiTheme({
        props: { MuiButtonBase: { disableTouchRipple: true, disableRipple: true } },
      })}
    >
      {children}
    </ThemeProvider>
  </HelmetProvider>
);
