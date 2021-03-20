import { PlaceholderApp } from '__/components/apps/Placeholder/Placeholder';
import { createAppConfig } from '__/helpers/create-app-config';

export const finderAppConfig = createAppConfig({
  title: 'Finder',
  resizable: true,
  Component: ({ appID }: any) => <PlaceholderApp appID={appID} />,
});
