import { atom } from 'jotai';
import { appsConfig } from '__/data/apps/apps-config';

export type TApp = keyof typeof appsConfig;

export const openAppsStore = atom<Record<TApp, boolean>>({
  finder: true,
});

export const activeAppStore = atom<TApp>('finder');
