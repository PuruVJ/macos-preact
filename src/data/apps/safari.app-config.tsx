import { PlaceholderApp } from '__/components/apps/Placeholder/Placeholder';
import { createAppConfig } from '__/helpers/create-app-config';

export const safariAppConfig = createAppConfig({
  title: 'Safari',
  resizable: true,
  Component: ({ appID }: any) => <PlaceholderApp appID={appID} />,
});
