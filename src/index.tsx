import { Provider } from 'jotai';
import { StrictMode, Suspense } from 'react';
import { render } from 'preact';
import './theme.css';
import { Desktop } from './views/desktop/Desktop';
import { HelmetProvider } from 'react-helmet-async';

render(
  <Suspense fallback={<span />}>
    <StrictMode>
      <Provider>
        <HelmetProvider>
          <Desktop />
        </HelmetProvider>
      </Provider>
    </StrictMode>
  </Suspense>,
  document.getElementById('root') as Element,
);

if (import.meta.hot) {
  import.meta.hot?.accept();
}
