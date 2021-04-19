import { AppID } from '__/stores/apps.store';
import { Calculator } from './Calculator/Calculator';
import { PlaceholderApp } from './Placeholder/Placeholder';

type AppNexusProps = {
  appID: AppID;
};

export const AppNexus = ({ appID }: AppNexusProps) => {
  if (appID === 'calculator') return <Calculator />;

  return <PlaceholderApp appID={appID} />;
};
