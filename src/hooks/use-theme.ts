import { useEffect, useState } from 'react';

export function useTheme() {
  // Media query
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme);

  useEffect(() => {
    const localValue = localStorage.getItem('theme:type');

    if (!localValue) {
      // Nothing in localStorage. Default to user's preference
      setTheme(systemTheme);
    }

    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme];
}
