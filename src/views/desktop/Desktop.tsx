import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import DefaultBackground from '__/assets/wallpapers/3-2.jpg';
import { Dock } from '__/components/dock/Dock';
import { MenuBar } from '__/components/menubar/MenuBar';
import { useTheme } from '__/hooks/use-theme';

const GlobalStyles = createGlobalStyle`
html,
body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;

  font-family: var(--app-font-family);

  will-change: none;

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

export const Desktop = () => {
  const [,] = useTheme();

  return (
    <>
      <Reset />
      <GlobalStyles />
      <Main>
        <MenuBar />
        <Dock />
      </Main>

      <BackgroundCover aria-hidden="true" />
    </>
  );
};

const Main = styled.main`
  height: 100%;
  width: 100%;
`;

const BackgroundCover = styled.div`
  height: 100%;
  width: 100%;

  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;

  background-image: url(${DefaultBackground});
  background-repeat: none;
  background-size: cover;
  background-position: center;
`;
