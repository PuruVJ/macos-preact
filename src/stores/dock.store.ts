import { atom } from 'jotai';
import { TApp } from './apps.store';

export interface IDockItem {
  appName: string;
  isOpen: boolean;
  action?: (e: any) => void;
  breakBefore?: boolean;
}

const createDockConfig = <T>(et: Record<keyof T | TApp, IDockItem>) => et;

const initialState = createDockConfig({
  finder: {
    appName: 'Finder',
    isOpen: true,
  },
  launchpad: {
    appName: 'Launchpad',
    isOpen: false,
  },
  safari: {
    appName: 'Safari',
    isOpen: false,
  },
  messages: {
    appName: 'Messages',
    isOpen: false,
  },
  mail: {
    appName: 'Mail',
    isOpen: false,
  },
  maps: {
    appName: 'Maps',
    isOpen: false,
  },
  photos: {
    appName: 'Photos',
    isOpen: false,
  },
  facetime: {
    appName: 'Facetime',
    isOpen: false,
  },
  calendar: {
    appName: 'Calendar',
    isOpen: false,
  },
  'system-preferences': {
    appName: 'System Preferences',
    isOpen: false,
  },

  'purus-twitter': {
    appName: `My Twitter`,
    isOpen: true,
    breakBefore: true,
    action: () => {
      window.open('https://twitter.com/puruvjdev', '_blank');
    },
  },
  github: {
    appName: 'View Source',
    isOpen: true,
    action: () => {
      window.open('https://github.com/puruvj/macos-web', '_blank');
    },
  },
});

export const dockItemsStore = atom(initialState);
