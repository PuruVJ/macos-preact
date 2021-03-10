import { atom } from 'jotai';
import { TApp } from './apps.store';

export interface IDockItem {
  appName: string;
  icon: string;
  isOpen: boolean;
  action?: (e: any) => void;
  breakBefore?: boolean;
}

const pathById = (id: string) => `/assets/app-icons/${id}/256.png`;

const createDockConfig = <T>(et: Record<keyof T, IDockItem>) => et;

const initialState = createDockConfig({
  finder: {
    appName: 'Finder',
    icon: pathById('finder'),
    isOpen: true,
  },
  launchpad: {
    appName: 'Launchpad',
    icon: pathById('launchpad'),
    isOpen: false,
  },
  safari: {
    appName: 'Safari',
    icon: pathById('safari'),
    isOpen: false,
  },
  messages: {
    appName: 'Messages',
    icon: pathById('messages'),
    isOpen: false,
  },
  mail: {
    appName: 'Mail',
    icon: pathById('mail'),
    isOpen: false,
  },
  maps: {
    appName: 'Maps',
    icon: pathById('maps'),
    isOpen: false,
  },
  photos: {
    appName: 'Photos',
    icon: pathById('photos'),
    isOpen: false,
  },
  facetime: {
    appName: 'Facetime',
    icon: pathById('facetime'),
    isOpen: false,
  },
  calendar: {
    appName: 'Calendar',
    icon: pathById('calendar'),
    isOpen: false,
  },
  systemPreferences: {
    appName: 'System Preferences',
    icon: pathById('system-preferences'),
    isOpen: false,
  },

  purusTwitter: {
    appName: `My Twitter`,
    icon: pathById('purus-twitter'),
    isOpen: true,
    breakBefore: true,
    action: () => {
      window.open('https://twitter.com/puruvjdev', '_blank');
    },
  },
  viewSource: {
    appName: 'View Source',
    icon: pathById('github'),
    isOpen: true,
    action: () => {
      window.open('https://github.com/puruvj/macos-web', '_blank');
    },
  },
});

export const dockItemsStore = atom(initialState);
