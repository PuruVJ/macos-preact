import { useAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'react';
// import { themeAtom, TTheme } from '__/stores/theme.store';

import { atom } from 'jotai';

export type TTheme = 'light' | 'dark';

export const themeAtom = atom<TTheme>('light');

export function useTheme() {
  // Media query
  const systemTheme: TTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const localValue = localStorage.getItem('theme:type') as TTheme;

  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    setTheme(localValue || systemTheme);
  }, []);

  useLayoutEffect(() => {
    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme] as const;
}
