import { atom } from 'jotai';
import { finderMenuConfig } from '__/data/menu/finder.menu.config';
import { activeAppStore } from './apps.store';

const menuConfigs = { finder: finderMenuConfig };

export const menuBarMenusStore = atom((get) => menuConfigs[get(activeAppStore)]);
