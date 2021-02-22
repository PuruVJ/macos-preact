import { mdiApple } from '@mdi/js';
import { useEffect, useRef, useState } from 'react';
import Sound from 'react-sound';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { StartupChime } from '__/components/Desktop/StartupChime';
import { Dock } from '__/components/dock/Dock';
import { MenuBar } from '__/components/menubar/MenuBar';
import { AppIcon } from '__/components/utils/AppIcon';
import { useTheme } from '__/hooks/use-theme';
import { useTimeout } from '__/hooks/use-timeout';
import type { TTheme } from '__/stores/theme.store';

const DarkBackground = '/assets/wallpapers/3-1.jpg';
const LightBackground = '/assets/wallpapers/3-2.jpg';

export const Desktop = () => {
  const [theme] = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const [playStatus, setPlayStatus] = useState<'PLAYING' | 'STOPPED' | 'PAUSED'>('PAUSED');

  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  useEffect(() => {
    preloadImage(DarkBackground);
    preloadImage(LightBackground);
    ref.current?.click();
    // Disable playing again and again in dev environment
    if (import.meta.env.PROD) setPlayStatus('PLAYING');
  }, []);

  useTimeout(() => {
    setHideSplashScreen(true);
  }, 3000);

  return (
    <>
      <Reset />
      <GlobalStyles />

      <SplashScreen isHidden={hideSplashScreen || import.meta.env.DEV}>
        <AppIcon path={mdiApple} fill="white" size={100} />
      </SplashScreen>

      <button hidden ref={ref} onClick={() => {}}>
        Hello
      </button>

      <Main>
        <MenuBar />
        <Dock />
      </Main>

      <BackgroundCover theme={theme} aria-hidden="true" />
      <HiddenBackgroundCover />

      <StartupChime />
    </>
  );
};

const GlobalStyles = createGlobalStyle`
html,
body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;

  font-family: var(--app-font-family);


  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;

  transition: background-color 150ms ease-in, background 150ms ease-in;
}

#root {
  width: 100%;
  height: 100%;
}

*:focus {
  outline: none;
}
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
`;

const SplashScreen = styled.div<{ isHidden: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9999999999;

  height: 100vh;
  width: 100vw;

  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;

  background-color: #000;
`;

const BackgroundCover = styled.div<{ theme: TTheme }>`
  height: 100%;
  width: 100%;

  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;

  background-image: url(${({ theme }) => (theme === 'light' ? LightBackground : DarkBackground)});

  will-change: background-image;

  background-repeat: none;
  background-size: cover;
  background-position: center;
`;

const HiddenBackgroundCover = styled.div`
  background-image: url(${LightBackground});
  background-image: url(${DarkBackground});

  display: none;
`;

function preloadImage(path: string) {
  const img = new Image();
  img.src = path;
}
