import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Desktop } from './views/desktop/Desktop';
import './index.css';
import { Provider } from 'jotai';

ReactDOM.render(
  <Suspense fallback={<span />}>
    <React.StrictMode>
      <Provider>
        <Desktop />
      </Provider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
