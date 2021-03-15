import { Provider } from 'jotai';
import { render } from 'preact';
import { StrictMode, Suspense } from 'react';
import './theme.css';
import { Desktop } from './views/desktop/Desktop';

render(
  <Suspense fallback={<span />}>
    <StrictMode>
      <Provider>
        <Desktop />
      </Provider>
    </StrictMode>
  </Suspense>,
  document.getElementById('root') as Element,
);
