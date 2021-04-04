import { useAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'preact/hooks';
import { themeAtom, Theme } from '__/stores/theme.store';

// This is needed here
let isFirstUpdate = true;

const localValue = localStorage.getItem<Theme>('theme:type');

const systemTheme: Theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    setTheme(localValue || systemTheme);
  }, []);

  useLayoutEffect(() => {
    // Needed, because without it, the theme after reload stays light only
    if (isFirstUpdate) return void (isFirstUpdate = false);

    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme] as const;
}
