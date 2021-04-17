import 'preact/debug';
import { Provider } from 'jotai';
import { render } from 'preact';
import './css/global.scss';
import { Desktop } from './views/desktop/Desktop';

render(
  <Provider>
    <Desktop />
  </Provider>,
  document.getElementById('root')!,
);
