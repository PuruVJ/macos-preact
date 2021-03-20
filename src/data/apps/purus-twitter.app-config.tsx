import { PlaceholderApp } from '__/components/apps/Placeholder/Placeholder';
import { createAppConfig } from '__/helpers/create-app-config';

export const purusTwitterAppConfig = createAppConfig({
  title: `Puru's Twitter`,
  resizable: true,
  Component: ({ appID }: any) => <PlaceholderApp appID={appID} />,

  shouldOpenWindow: false,
  externalAction: () => window.open('https://twitter.com/puruvjdev', '_blank'),

  dockBreaksBefore: true,
});
