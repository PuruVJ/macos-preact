import { GlobalProvider } from '../../global-provider';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export function Desktop() {
  return (
    <>
      <GlobalProvider>
        <span></span>

        <Helmet>
          <title>MacOS Web</title>
        </Helmet>
      </GlobalProvider>
    </>
  );
}
