import { AppID } from '__/stores/apps.store';
import { Calculator } from './Calculator/Calculator';
import { PlaceholderApp } from './Placeholder/Placeholder';
import { VSCode } from './VSCode/VSCode';

type AppNexusProps = {
  appID: AppID;
};

export const AppNexus = ({ appID }: AppNexusProps) => {
  if (appID === 'calculator') return <Calculator />;
  if (appID === 'vscode') return <VSCode />;

  return <PlaceholderApp appID={appID} />;
};
