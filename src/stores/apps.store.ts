import { atom } from 'jotai';
import { appsConfig } from '__/data/apps/apps-config';

export type TApp = keyof typeof appsConfig;

export const openAppsStore = atom<Record<TApp, boolean>>({
  finder: true,
  launchpad: false,
  safari: false,
  messages: false,
  mail: false,
  maps: false,
  photos: false,
  facetime: false,
  calendar: false,
  'system-preferences': false,

  'purus-twitter': true,
  'view-source': true,
});

export const activeAppStore = atom<TApp>('finder');
