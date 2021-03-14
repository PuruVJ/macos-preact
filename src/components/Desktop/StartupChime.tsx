import { mdiApple } from '@mdi/js';
import { useEffect, useRef, useState } from 'preact/hooks';
import Sound from 'react-sound';
import styled, { css, keyframes } from 'styled-components';
import { useTimeout } from '__/hooks/use-timeout';
import { AppIcon } from '../utils/AppIcon';

export const StartupChime = () => {
  const ref = useRef<HTMLButtonElement>();
  const [playStatus, setPlayStatus] = useState<'PLAYING' | 'STOPPED' | 'PAUSED'>('PAUSED');

  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  useEffect(() => {
    ref.current?.click();
    // Disable playing again and again in dev environment
    if (import.meta.env.PROD) setPlayStatus('PLAYING');
  }, []);

  useTimeout(() => {
    setHideSplashScreen(true);
  }, 3000);

  return (
    <>
      <SplashScreen isHidden={hideSplashScreen || import.meta.env.DEV}>
        <AppIcon path={mdiApple} fill="white" size={100} />
      </SplashScreen>

      <button hidden ref={ref}>
        Hello
      </button>

      <Sound
        url="/assets/sounds/mac-startup-sound.mp3"
        onFinishedPlaying={() => setPlayStatus('STOPPED')}
        playStatus={playStatus}
      />
    </>
  );
};

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  99.99999999999% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    display: none;
    z-index: -23;
  }
`;

const SplashScreen = styled.div<{ isHidden: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 999999999999;

  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isHidden }) =>
    isHidden &&
    css`
      animation: ${fadeOutAnimation} 200ms 1;
      animation-timing-function: ease-in;
    `}

  animation-fill-mode: forwards;

  background-color: #000;
`;
