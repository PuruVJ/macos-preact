import { AppID } from '__/stores/apps.store';
import { Calculator } from './Calculator/Calculator';
import { PlaceholderApp } from './Placeholder/Placeholder';
import { VSCode } from './VSCode/VSCode';
import { Calendar } from './Calendar/Calendar';

type AppNexusProps = {
  appID: AppID;
  isBeingDragged: boolean;
};

export const AppNexus = ({ appID, isBeingDragged }: AppNexusProps) => {
  if (appID === 'calculator') return <Calculator />;
  if (appID === 'vscode') return <VSCode isBeingDragged={isBeingDragged} />;
  if (appID === 'calendar') return <Calendar />;

  return <PlaceholderApp appID={appID} />;
};
