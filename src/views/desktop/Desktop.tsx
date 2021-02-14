import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Reset } from 'styled-reset';
import DefaultDarkBackground from '__/assets/wallpapers/3-1.jpg';
import DefaultLightBackground from '__/assets/wallpapers/3-2.jpg';
import { Dock } from '__/components/dock/Dock';
import { MenuBar } from '__/components/menubar/MenuBar';
import { useTheme } from '__/hooks/use-theme';
import type { TTheme } from '__/stores/theme.store';

export const Desktop = () => {
  const [theme] = useTheme();

  return (
    <>
      <Reset />
      <GlobalStyles />

      <Main>
        <MenuBar />
        <Dock />
      </Main>
      <Helmet>
        <link rel="prefetch" href={DefaultLightBackground} />
        <link rel="prefetch" href={DefaultDarkBackground} />
      </Helmet>

      <BackgroundCover theme={theme} aria-hidden="true" />
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

  ${({ theme }) =>
    css`
      background-image: url(${theme === 'light' ? DefaultLightBackground : DefaultDarkBackground});
    `}

  will-change: background-image;

  background-repeat: none;
  background-size: cover;
  background-position: center;
`;
