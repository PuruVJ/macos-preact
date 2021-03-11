import { atom } from 'jotai';
import { finderMenuConfig } from '__/data/menu/finder.menu.config';
import { activeAppStore, TApp } from './apps.store';

const menuConfigs = { finder: finderMenuConfig };

export const menuBarMenusStore = atom(
  (get) => menuConfigs[get(activeAppStore) as keyof typeof menuConfigs],
);
