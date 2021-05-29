/* `useWallpaperName` starts here */

import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';
import { useRef } from 'react';
import { WallpaperID } from '__/data/wallpapers/wallpapers.config';
import { wallpaperNameStore } from '__/stores/wallpapers.store';

let isFirstUpdate = true;

export function useWallpaperName() {
  const { current: localWallpaperVal } = useRef(
    localStorage.getItem<WallpaperID>('wallpaper:name'),
  );
  const [wallpaperName, setWallpaperName] = useAtom(wallpaperNameStore);

  useEffect(() => {
    if (isFirstUpdate) {
      setWallpaperName(localWallpaperVal || 'big-sur-graphic');
    }
  }, []);

  useEffect(() => {
    // Needed, because without it, the theme after reload stays light only
    if (isFirstUpdate) return void (isFirstUpdate = false);

    localStorage.setItem('wallpaper:name', wallpaperName);
  }, [wallpaperName]);

  console.log([wallpaperName, setWallpaperName]);
  return [wallpaperName, setWallpaperName] as const;
}
