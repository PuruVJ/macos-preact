import { Provider } from 'jotai';
import { render } from 'preact';
import './theme.css';
import { Desktop } from './views/desktop/Desktop';

render(
  <Provider>
    <Desktop />
  </Provider>,
  document.getElementById('root')!,
);
