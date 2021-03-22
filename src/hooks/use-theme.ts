import { useAtom } from 'jotai';
import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import { themeAtom, TTheme } from '__/stores/theme.store';

export function useTheme() {
  const localValue = localStorage.getItem<TTheme>('theme:type');
  // Media query
  const systemTheme: TTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  // This is needed here
  const isFirstUpdate = useRef(true);

  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    setTheme(localValue || systemTheme);
  }, []);

  useLayoutEffect(() => {
    // Needed, because without it, the theme after reload stays light only
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return () => {};
    }

    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme] as const;
}
