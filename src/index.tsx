import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Desktop } from './views/desktop/Desktop';
import './index.css';

ReactDOM.render(
  <Suspense fallback={<span />}>
    <React.StrictMode>
      <Desktop />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
