import { atom } from 'jotai';
import type React from 'react';
import IconCalendar from '__/assets/app-icons/calendar/256.png';
import IconFacetime from '__/assets/app-icons/facetime/256.png';
import IconFinder from '__/assets/app-icons/finder/256.png';
import IconGithub from '__/assets/app-icons/github/256.png';
import IconLaunchpad from '__/assets/app-icons/launchpad/256.png';
import IconMail from '__/assets/app-icons/mail/256.png';
import IconMaps from '__/assets/app-icons/maps/256.png';
import IconMessages from '__/assets/app-icons/messages/256.png';
import IconPhotos from '__/assets/app-icons/photos/256.png';
import IconSafari from '__/assets/app-icons/safari/256.png';
import IconSystemPreferences from '__/assets/app-icons/system-preferences/256.png';
import IconPurusTwitter from '__/assets/app-icons/purus-twitter/256.png';

export interface IDockItem {
  appName: string;
  icon: string;
  isOpen: boolean;
  action?: (e: React.KeyboardEvent | React.MouseEvent) => void;
  breakBefore?: boolean;
}

const createDockConfig = <T>(et: { dockItems: { [key in keyof T]: IDockItem } }) => et;

const initialState = createDockConfig({
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
    messages: {
      appName: 'Messages',
      icon: IconMessages,
      isOpen: false,
    },
    mail: {
      appName: 'Mail',
      icon: IconMail,
      isOpen: false,
    },
    maps: {
      appName: 'Maps',
      icon: IconMaps,
      isOpen: false,
    },
    photos: {
      appName: 'Photos',
      icon: IconPhotos,
      isOpen: false,
    },
    facetime: {
      appName: 'Facetime',
      icon: IconFacetime,
      isOpen: false,
    },
    calendar: {
      appName: 'Calendar',
      icon: IconCalendar,
      isOpen: false,
    },
    systemPreferences: {
      appName: 'System Preferences',
      icon: IconSystemPreferences,
      isOpen: false,
    },
    purusTwitter: {
      appName: `My Twitter`,
      icon: IconPurusTwitter,
      isOpen: false,
      breakBefore: true,
      action: () => {
        window.open('https://twitter.com/puruvjdev', '_blank');
      },
    },

    viewSource: {
      appName: 'View Source',
      icon: IconGithub,
      isOpen: false,
      action: () => {
        window.open('https://github.com/puruvj/macos-web', '_blank');
      },
    },
  },
});

const dockItemsStore = atom(initialState);

export { dockItemsStore };
