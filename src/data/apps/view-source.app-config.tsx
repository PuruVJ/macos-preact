import { PlaceholderApp } from '__/components/apps/Placeholder/Placeholder';
import { createAppConfig } from '__/helpers/create-app-config';

export const viewSourceAppConfig = createAppConfig({
  title: `View Source`,
  resizable: true,
  Component: ({ appID }: any) => <PlaceholderApp appID={appID} />,

  shouldOpenWindow: false,
  externalAction: () => window.open('https://github.com/puruvj/macos-web', '_blank'),
});
