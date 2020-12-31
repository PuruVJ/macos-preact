import { useEffect, useState } from 'react';

export function useTheme() {
  // Media query
  const systemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [theme, setTheme] = useState<'light' | 'dark'>(systemDarkTheme ? 'dark' : 'light');

  useEffect(() => {
    const localValue = localStorage.getItem('theme:type');

    if (!localValue) {
      // Nothing in localStorage. Default to user's preference
      setTheme(systemDarkTheme ? 'dark' : 'light');
    }

    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme];
}
