import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'preact/compat';
import { Rnd } from 'react-rnd';
import { PlaceholderApp } from '__/components/apps/Placeholder/Placeholder';
import { appsConfig } from '__/data/apps/apps-config';
import { randint } from '__/helpers/random';
import { activeAppStore, activeAppZIndexStore, AppID } from '__/stores/apps.store';
import { TrafficLights } from './TrafficLights';
import css from './Window.module.scss';

type WindowProps = {
  appID: AppID;
};

type WindowSize = {
  width: string | number;
  height: string | number;
};

type WindowPosition = {
  x: number;
  y: number;
};

export const Window = ({ appID }: WindowProps) => {
  const [activeAppZIndex] = useAtom(activeAppZIndexStore);
  const [activeApp, setActiveApp] = useAtom(activeAppStore);

  const containerRef = useRef<HTMLDivElement>();

  const [appZIndex, setAppZIndex] = useState(0);

  const randX = useMemo(() => randint(-600, 600), []);
  const randY = useMemo(() => randint(-100, 100), []);

  const [originalSize, setOriginalSize] = useState<WindowSize>({ height: 0, width: 0 });
  const [originalPosition, setOriginalPosition] = useState<WindowPosition>({
    x: 0,
    y: 0,
  });
  const [windowSize, setWindowSize] = useState<WindowSize>({ height: 500, width: 600 });
  const [windowPosition, setWindowPosition] = useState<WindowPosition>({
    x: ((3 / 2) * document.body.clientWidth + randX) / 2,
    y: (100 + randY) / 2,
  });

  const { resizable } = appsConfig[appID];

  useEffect(() => {
    if (activeApp === appID) setAppZIndex(activeAppZIndex);
  }, [activeApp]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const maximizeApp = () => {
    const dockElementHeight = document.getElementById('dock')?.clientHeight ?? 0;
    const topBarElementHeight = document.getElementById('top-bar')?.clientHeight ?? 0;

    const desktopHeight = document.body.clientHeight - dockElementHeight - topBarElementHeight;
    const deskTopWidth = document.body.clientWidth;

    // When it's already maximized, revert the window to the previous size
    if (windowSize.width === deskTopWidth && windowSize.height === desktopHeight) {
      setWindowSize(originalSize);
      setWindowPosition(originalPosition);
    }
    // Maximize the window to the size of the desktop
    else {
      setOriginalSize(windowSize);
      setOriginalPosition(windowPosition);
      setWindowSize({
        height: desktopHeight,
        width: deskTopWidth,
      });
      setWindowPosition({
        x: document.body.clientWidth / 2,
        y: 0,
      });
    }
  };

  const focusCurrentApp = () => void setActiveApp(appID);

  return (
    <Rnd
      className={css.window}
      style={{ zIndex: appZIndex }}
      size={windowSize}
      position={windowPosition}
      enableResizing={resizable}
      dragHandleClassName="app-window-drag-handle"
      bounds="parent"
      minWidth="300"
      minHeight="300"
      onDragStart={focusCurrentApp}
    >
      <section className={css.container} tabIndex={-1} ref={containerRef} onClick={focusCurrentApp}>
        <div>
          <header className={clsx({ 'app-window-drag-handle': true, [css.titleBar]: true })}>
            <TrafficLights appID={appID} onMaximizeClick={maximizeApp} />
          </header>
          <div className={css.divider} />
        </div>
        <PlaceholderApp appID={appID} />
      </section>
    </Rnd>
  );
};
