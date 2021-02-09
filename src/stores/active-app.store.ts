import { atom } from 'jotai';

type Apps = 'finder';

export const activeAppStore = atom<Apps>('finder');
