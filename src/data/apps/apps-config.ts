import { calendarAppConfig } from './calendar.app-config';
import { facetimeAppConfig } from './facetime.app-config';
import { finderAppConfig } from './finder.app-config';
import { launchpadAppConfig } from './launchpad.app-config';
import { mailAppConfig } from './mail.app-config';
import { mapsAppConfig } from './maps.app-config';
import { messagesAppConfig } from './messages.app-config';
import { photosAppConfig } from './photos.app-config';
import { safariAppConfig } from './safari.app-config';
import { systemPreferencesAppConfig } from './system-preferences.app-config';
import { purusTwitterAppConfig } from './purus-twitter.app-config';
import { viewSourceAppConfig } from './view-source.app-config';

export const appsConfig = {
  finder: finderAppConfig,
  launchpad: launchpadAppConfig,
  safari: safariAppConfig,
  messages: messagesAppConfig,
  mail: mailAppConfig,
  maps: mapsAppConfig,
  photos: photosAppConfig,
  facetime: facetimeAppConfig,
  calendar: calendarAppConfig,
  'system-preferences': systemPreferencesAppConfig,
  'purus-twitter': purusTwitterAppConfig,
  'view-source': viewSourceAppConfig,
};
