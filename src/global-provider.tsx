import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { HelmetProvider } from 'react-helmet-async';
import { theme } from './theme';

export const GlobalProvider = ({ children }: { children: ReactElement[] }) => (
  <ThemeProvider theme={theme}>
    <HelmetProvider>{children}</HelmetProvider>
  </ThemeProvider>
);
