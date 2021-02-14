import { useAtom } from 'jotai';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { themeAtom, TTheme } from '__/stores/theme.store';
// import { themeAtom, TTheme } from '__/stores/theme.store';

export function useTheme() {
  const localValue = localStorage.getItem('theme:type') as TTheme;
  // Media query
  const systemTheme: TTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const isFirstUpdate = useRef(true);

  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    setTheme(localValue || systemTheme);
  }, []);

  useLayoutEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return () => {};
    }

    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme] as const;
}
