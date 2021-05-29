import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';
import { wallpapersConfig } from '__/data/wallpapers/wallpapers.config';
import { smallerClosestValue } from '__/helpers/smaller-closest-value';
import { wallpaperImageStore } from '__/stores/wallpapers.store';
import { useInterval } from './use-interval';
import { useTheme } from './use-theme';
import { useWallpaperName } from './use-wallpaper-name';

let isInitialized = false;

export const useTimelyWallpapers = () => {
  const [wallpaperName, setWallpaperName] = useWallpaperName();
  const [currWallpaperImg, setCurrWallpaperImg] = useAtom(wallpaperImageStore);
  const [theme, setTheme] = useTheme();

  function handler() {
    if (wallpapersConfig[wallpaperName].type === 'standalone') return;
    // console.log({ wallpaperName });
    /** Only dynamic and light/dark wallpaper logic to tackle */
    // Now check if user really wants the change to happen.

    const date = new Date();
    const hour = date.getHours();

    const wallpaperTimestampsMap = wallpapersConfig[wallpaperName].wallpaperTimestamps;
    const timestamps = Object.keys(wallpaperTimestampsMap);

    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    if (hour > maxTimestamp || hour < minTimestamp) {
      // Go for the min timestamp value
      setCurrWallpaperImg(wallpaperTimestampsMap?.[maxTimestamp] || currWallpaperImg);
      setTheme('dark');
      return;
    }

    // Now set the right timestamp
    const chosenTimeStamp = smallerClosestValue(timestamps, hour);
    setCurrWallpaperImg(wallpaperTimestampsMap?.[chosenTimeStamp] || currWallpaperImg);
    setTheme('light');
  }

  useEffect(() => {
    handler();
  }, [wallpaperName]);

  useInterval(() => {
    // Return if this instance has already been initialised
    if (isInitialized) return;

    handler();
  }, 60 * 1000);

  return [currWallpaperImg, setCurrWallpaperImg] as const;
};
