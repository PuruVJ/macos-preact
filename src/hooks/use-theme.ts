import { useEffect, useState } from 'react';

export function useTheme() {
  // Media query
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const localValue = localStorage.getItem('theme:type') as 'light' | 'dark';

  const [theme, setTheme] = useState<'light' | 'dark' | ''>('');

  useEffect(() => {
    setTheme(localValue || systemTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme:type', theme);

    document.body.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme];
}
