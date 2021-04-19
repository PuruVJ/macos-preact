import { mdiApple } from '@mdi/js';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useTimeout } from '__/hooks';
import { AppIcon } from '../utils/AppIcon';
import css from './StartupChime.module.scss';

export const StartupChime = () => {
  const ref = useRef<HTMLButtonElement>();
  const audioRef = useRef<HTMLAudioElement>();

  const [hiddenSplashScreen, setHiddenSplashScreen] = useState(false);

  useEffect(() => {
    ref.current?.click();
    // Disable playing again and again in dev environment
    if (import.meta.env.PROD) audioRef.current.play();
  }, []);

  useTimeout(() => {
    setHiddenSplashScreen(true);
  }, 3000);

  return (
    <>
      <div
        className={clsx({
          [css.splashScreen]: true,
          [css.hidden]: hiddenSplashScreen || import.meta.env.DEV,
        })}
        hidden={hiddenSplashScreen}
      >
        <AppIcon path={mdiApple} fill="white" size={100} />
      </div>

      <button hidden ref={ref}></button>

      <audio hidden src="/assets/sounds/mac-startup-sound.mp3" ref={audioRef} />
    </>
  );
};
