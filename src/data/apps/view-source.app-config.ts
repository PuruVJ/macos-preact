import { PlaceholderApp } from '__/components/apps/Placeholder/Placeholder';
import { createAppConfig } from '__/helpers/create-app-config';

export const viewSourceAppConfig = createAppConfig({
  title: `Puru's Twitter`,
  resizable: true,
  Component: PlaceholderApp,

  shouldOpenWindow: false,
  externalAction: () => window.open('https://github.com/puruvj/macos-web', '_blank'),
});
