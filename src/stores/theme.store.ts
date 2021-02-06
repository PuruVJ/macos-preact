import { atom } from 'jotai';

export type TTheme = 'light' | 'dark';

export const themeAtom = atom<TTheme>('light');
