import { Provider } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import DefaultBackground from '__/assets/wallpapers/3-2.jpg';
import { Dock } from '__/components/dock/Dock';
import { MenuBar } from '__/components/menubar/MenuBar';
import { useTheme } from '__/hooks/use-theme';

export const Desktop = () => {
  const [,] = useTheme();

  return (
    <>
      <Reset />
      <Provider>
        <Main>
          <MenuBar />
          <Dock />
        </Main>

        <BackgroundCover aria-hidden="true" />
      </Provider>
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
