import { Provider } from 'jotai';
import { render } from 'preact';
import { Suspense } from 'react';
import './css/global.scss';
import { Desktop } from './views/desktop/Desktop';

render(
  <Suspense fallback={<span></span>}>
    <Provider>
      <Desktop />
    </Provider>
  </Suspense>,
  document.getElementById('root')!,
);
