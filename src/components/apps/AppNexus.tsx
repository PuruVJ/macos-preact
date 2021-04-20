import { AppID } from '__/stores/apps.store';
import { Calculator } from './Calculator/Calculator';
import { PlaceholderApp } from './Placeholder/Placeholder';
import { VSCode } from './VSCode/VSCode';

type AppNexusProps = {
  appID: AppID;
  isBeingDragged: boolean;
};

export const AppNexus = ({ appID, isBeingDragged }: AppNexusProps) => {
  if (appID === 'calculator') return <Calculator />;
  if (appID === 'vscode') return <VSCode isBeingDragged={isBeingDragged} />;

  return <PlaceholderApp appID={appID} />;
};
