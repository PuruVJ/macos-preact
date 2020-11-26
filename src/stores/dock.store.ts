import { createStore } from 'restater';
import type React from 'react';

export interface IDockItem {
  appName: string;
  icon: string;
  isOpen: boolean;
  action?: (e: React.KeyboardEvent | React.MouseEvent) => void;
  breakBefore?: boolean;
}

const fullPathOf = (path: string) =>
  new URL(`../assets/app-icons/${path}/256.png`, import.meta.url).href;

const initialState = {
  dockItems: <{ [key: string]: IDockItem }>{
    finder: {
      appName: 'Finder',
      icon: fullPathOf('finder'),
      isOpen: true,
    },
    launchpad: {
      appName: 'Launchpad',
      icon: fullPathOf('launchpad'),
      isOpen: false,
    },
    safari: {
      appName: 'Safari',
      icon: fullPathOf('safari'),
      isOpen: false,
    },
    systemPreferences: {
      appName: 'System Preferences',
      icon: fullPathOf('system-preferences'),
      isOpen: false,
    },

    viewSource: {
      appName: 'View Source',
      icon: fullPathOf('github'),
      isOpen: false,
      breakBefore: true,
      action: () => {
        window.open('https://github.com/puruvj/macos-web', '_blank');
      },
    },
  },
};

const [DockItemsProvider, DockItemsStore] = createStore(initialState);

export { DockItemsProvider, DockItemsStore };
