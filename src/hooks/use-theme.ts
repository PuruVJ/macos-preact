import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

export type TTheme = 'light' | 'dark';

const themeAtom = atom<TTheme>('light');

export function useTheme() {
  // Media query
  const systemTheme: TTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const localValue = localStorage.getItem('theme:type') as TTheme;

  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    setTheme(localValue || systemTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme] as const;
}
