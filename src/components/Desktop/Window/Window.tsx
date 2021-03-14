import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'preact/compat';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import { appsConfig } from '__/data/apps/apps-config';
import { randint } from '__/helpers/utils';
import { activeAppStore, activeAppZIndexStore, TApp } from '__/stores/apps.store';
import { theme } from '__/theme';
import { TrafficLights } from './TrafficLights';

type WindowProps = {
  appID: TApp;
};

export const Window = ({ appID }: WindowProps) => {
  const [activeAppZIndex] = useAtom(activeAppZIndexStore);
  const [activeApp, setActiveApp] = useAtom(activeAppStore);

  const [appZIndex, setAppZIndex] = useState(0);

  const { Component, resizable } = appsConfig[appID];

  const randY = useMemo(() => randint(-100, 100), []);
  const randX = useMemo(() => randint(-600, 600), []);

  useEffect(() => {
    if (activeApp === appID) setAppZIndex(activeAppZIndex);
  }, [activeApp]);

  const setFocusOnCurrentApp = () => void setActiveApp(appID);

  return (
    <Rnd
      style={{ zIndex: appZIndex }}
      default={{
        height: 500,
        width: 600,
        x: (document.body.clientWidth - 600 + randX) / 2,
        y: (100 + randY) / 2,
      }}
      enableResizing={resizable}
      dragHandleClassName="app-window-drag-handle"
      bounds="parent"
      minWidth="200"
      minHeight="200"
      onDragStart={setFocusOnCurrentApp}
    >
      <Container tabIndex={-1} onClick={setFocusOnCurrentApp}>
        <div>
          <TitleBar className="app-window-drag-handle">
            <TrafficLights appID={appID} />
          </TitleBar>
          <Divider />
        </div>
        <Component />
      </Container>
    </Rnd>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: auto 1fr;

  background-color: ${theme.colors.light.main};

  position: relative;

  border-radius: 0.75rem;
  box-shadow: 0 0.3px 1.9px rgba(0, 0, 0, 0.021), 0 0.8px 4.5px rgba(0, 0, 0, 0.03),
    0 1.5px 8px rgba(0, 0, 0, 0.037), 0 2.4px 13.3px rgba(0, 0, 0, 0.043),
    0 4px 22px rgba(0, 0, 0, 0.05), 0 6.9px 38.4px rgba(0, 0, 0, 0.059),
    0 15px 83px rgba(0, 0, 0, 0.08);
`;

const TitleBar = styled.header`
  height: 2.5rem;
  width: 100%;

  padding: 0 0.75rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.2px;

  background-color: hsla(${theme.colors.dark.hsl}, 0.2);
`;
