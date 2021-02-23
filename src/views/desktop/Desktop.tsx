import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { StartupChime } from '__/components/Desktop/StartupChime';
import { Dock } from '__/components/dock/Dock';
import { MenuBar } from '__/components/menubar/MenuBar';
import { useTheme } from '__/hooks/use-theme';
import type { TTheme } from '__/stores/theme.store';

const DarkBackground = '/assets/wallpapers/3-1.jpg';
const LightBackground = '/assets/wallpapers/3-2.jpg';

export const Desktop = () => {
  const [theme] = useTheme();

  useEffect(() => {
    preloadImage(DarkBackground);
    preloadImage(LightBackground);
  }, []);

  return (
    <>
      <StartupChime />

      <Reset />
      <GlobalStyles />

      <Main>
        <MenuBar />
        <Dock />
      </Main>

      <BackgroundCover theme={theme} aria-hidden="true" />
      <HiddenBackgroundCover aria-hidden />
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
