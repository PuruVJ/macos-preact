import { Provider } from 'jotai';
import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Desktop } from './views/desktop/Desktop';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <Suspense fallback={<span />}>
    <StrictMode>
      <Provider>
        <HelmetProvider>
          <Desktop />
        </HelmetProvider>
      </Provider>
    </StrictMode>
  </Suspense>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot?.accept();
}
