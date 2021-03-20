import { PlaceholderApp } from '__/components/apps/Placeholder/Placeholder';
import { createAppConfig } from '__/helpers/create-app-config';

export const calendarAppConfig = createAppConfig({
  title: 'Calendar',
  resizable: true,
  Component: ({ appID }: any) => <PlaceholderApp appID={appID} />,
});
