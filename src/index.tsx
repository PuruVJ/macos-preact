import { Provider } from 'jotai';
import { render } from 'preact';
import { Suspense } from 'react';
import './theme.css';
import { Desktop } from './views/desktop/Desktop';

render(
  <Suspense fallback={<span />}>
    <Provider>
      <Desktop />
    </Provider>
  </Suspense>,
  document.getElementById('root') as Element,
);
