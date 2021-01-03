import { Provider } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import DefaultBackground from '__/assets/wallpapers/3-light.jpg';
import { Dock } from '__/components/dock/Dock';
import { MenuBar } from '__/components/menubar/MenuBar';
import { GlobalProvider } from '__/global-provider';
import { useTheme } from '__/hooks/use-theme';

export const Desktop = () => {
  const [,] = useTheme();

  return (
    <>
      <Reset />
      <GlobalProvider>
        <Main>
          <MenuBar />
          <Provider>
            <Dock />
          </Provider>
        </Main>

        <BackgroundCover aria-hidden="true" />
      </GlobalProvider>
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
