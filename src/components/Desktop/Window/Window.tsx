import { useAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'preact/compat';
import { Rnd } from 'react-rnd';
import styled, { CSSProperties } from 'styled-components';
import { appsConfig } from '__/data/apps/apps-config';
import { randint } from '__/helpers/random';
import { activeAppStore, activeAppZIndexStore, AppID } from '__/stores/apps.store';
import { theme } from '__/theme';
import { TrafficLights } from './TrafficLights';

type WindowProps = {
  appID: AppID;
};

export const Window = ({ appID }: WindowProps) => {
  const [activeAppZIndex] = useAtom(activeAppZIndexStore);
  const [activeApp, setActiveApp] = useAtom(activeAppStore);

  const containerRef = useRef<HTMLDivElement>();

  const [appZIndex, setAppZIndex] = useState(0);

  const randX = useMemo(() => randint(-600, 600), []);
  const randY = useMemo(() => randint(-100, 100), []);

  const { Component, resizable } = appsConfig[appID];

  useEffect(() => {
    if (activeApp === appID) setAppZIndex(activeAppZIndex);
  }, [activeApp]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const focusCurrentApp = () => void setActiveApp(appID);

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
      minWidth="300"
      minHeight="300"
      onDragStart={focusCurrentApp}
    >
      <Container tabIndex={-1} ref={containerRef} onClick={focusCurrentApp}>
        <div>
          <TitleBar className="app-window-drag-handle">
            <TrafficLights appID={appID} />
          </TitleBar>
          <Divider />
        </div>
        <Component appID={appID} />
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
  box-shadow: 0 33px 81px rgba(0, 0, 0, 0.31);
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
