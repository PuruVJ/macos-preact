import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const themeAtom = atom<'light' | 'dark' | ''>('');

export function useTheme() {
  // Media query
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const localValue = localStorage.getItem('theme:type') as 'light' | 'dark';

  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    setTheme(localValue || systemTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme];
}
