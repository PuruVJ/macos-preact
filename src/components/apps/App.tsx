import { AppID } from '__/stores/apps.store';
import { Calculator } from './Calculator/Calculator';
import { PlaceholderApp } from './Placeholder/Placeholder';

type AppProps = {
  appID: AppID;
};

export const App = ({ appID }: AppProps) => {
  if (appID === 'calculator') return <Calculator />;

  return <PlaceholderApp appID={appID} />;
};
