import React, { createContext } from 'react';

import IconFinder from '../assets/app-icons/finder/256.png';
import IconLaunchpad from '../assets/app-icons/launchpad/256.png';
import IconSafari from '../assets/app-icons/safari/256.png';
import IconSystemPreferences from '../assets/app-icons/system-preferences/256.png';
import IconGithub from '../assets/app-icons/github/256.png';

export interface IDockItem {
  appName: string;
  icon: string;
  isOpen: boolean;
  action?: (e: React.KeyboardEvent | React.MouseEvent) => void;
  breakBefore?: boolean;
}

const initialState: { dockItems: { [key: string]: IDockItem } } = {
  dockItems: {
    finder: {
      appName: 'Finder',
      icon: IconFinder,
      isOpen: true,
    },
    launchpad: {
      appName: 'Launchpad',
      icon: IconLaunchpad,
      isOpen: false,
    },
    safari: {
      appName: 'Safari',
      icon: IconSafari,
      isOpen: false,
    },
    systemPreferences: {
      appName: 'System Preferences',
      icon: IconSystemPreferences,
      isOpen: false,
    },

    viewSource: {
      appName: 'View Source',
      icon: IconGithub,
      isOpen: false,
      breakBefore: true,
      action: () => {
        window.open('https://github.com/puruvj/macos-web', '_blank');
      },
    },
  },
};

const DockItemsContext = createContext(initialState);

const DockItemsProvider = ({ children }) => {
  return <DockItemsContext.Provider value={initialState}>{children}</DockItemsContext.Provider>;
};

export { DockItemsProvider, DockItemsContext };
