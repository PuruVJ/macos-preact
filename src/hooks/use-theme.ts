import { useAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'preact/hooks';
import { themeAtom, Theme } from '__/stores/theme.store';

// This is needed here
let isFirstUpdate = true;

console.log(1);
const localValue = localStorage.getItem<Theme>('theme:type');
const systemTheme: Theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/**
 * Sitewide theme
 */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    isFirstUpdate && setTheme(localValue || systemTheme);
  }, []);

  useLayoutEffect(() => {
    // Needed, because without it, the theme after reload stays light only
    if (isFirstUpdate) return void (isFirstUpdate = false);

    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme] as const;
}
