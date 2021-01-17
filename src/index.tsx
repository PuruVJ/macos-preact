import { Provider } from 'jotai';
import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Desktop } from './views/desktop/Desktop';

ReactDOM.render(
  <Suspense fallback={<span />}>
    <StrictMode>
      <Provider>
        <Desktop />
      </Provider>
    </StrictMode>
  </Suspense>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
