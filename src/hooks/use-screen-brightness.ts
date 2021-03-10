import { get, set } from 'idb-keyval';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useLayoutEffect } from 'preact/hooks';
import { throttle } from 'throttle-debounce';
import { SETTINGS } from '__/constants/SETTINGS';

const brightnessAtom = atom<number>(100);

export function useScreenBrightness() {
  const [brightness, setBrightness] = useAtom(brightnessAtom);

  /** This will get the initial brightness from */
  async function syncInitialBrightness() {
    const localVal = await get<number>(SETTINGS.PREFERENCES.SCREEN_BRIGHTNESS);
    setBrightness((localVal || 1) * 100);
  }

  /** Update local brightness as state is changed */
  async function updateBrightness() {
    const val = brightness / 100;
    await set(SETTINGS.PREFERENCES.SCREEN_BRIGHTNESS, val);

    // Apply the filter
    document.body.style.filter = `brightness(${val})`;
  }

  const throttledUpdateBrightness = useCallback(throttle(10, updateBrightness), [brightness]);

  useEffect(() => {
    syncInitialBrightness();
  }, []);

  useLayoutEffect(() => {
    throttledUpdateBrightness();
  }, [brightness]);

  return [brightness, setBrightness] as const;
}
