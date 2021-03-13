import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { StartupChime } from '__/components/Desktop/StartupChime';
import { WindowsArea } from '__/components/Desktop/WindowsArea/WindowsArea';
import { Dock } from '__/components/dock/Dock';
import { TopBar } from '__/components/topbar/TopBar';
import { useTheme } from '__/hooks/use-theme';
import { brightnessStore } from '__/stores/brightness.store';
import type { TTheme } from '__/stores/theme.store';

const DarkBackground = '/assets/wallpapers/3-1.jpg';
const LightBackground = '/assets/wallpapers/3-2.jpg';

export const Desktop = () => {
  const [theme] = useTheme();
  const [brightness] = useAtom(brightnessStore)

  useEffect(() => {
    preloadImage(DarkBackground);
    preloadImage(LightBackground);
  }, []);

  return (
    <>
      <StartupChime />

      <Reset />
      <GlobalStyles />

      <Main style={{opacity: `${brightness}%`}}>
        <TopBar />
        <WindowsArea />
        <Dock />
      </Main>

      <BackgroundCover style={{opacity: `${brightness}%`}} theme={theme} aria-hidden="true" />
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

  overflow: hidden;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #000;
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

  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const BackgroundCover = styled.div<{ theme: TTheme }>`
  height: 100%;
  width: 100%;

  z-index: -2;
  position: fixed;
  top: 0;
  left: 0;

  background-image: url(${({ theme }) => (theme === 'light' ? LightBackground : DarkBackground)});

  will-change: background-image;

  background-repeat: none;
  background-size: cover;
  background-position: center;
`;

function preloadImage(path: string) {
  const img = new Image();
  img.src = path;
}
