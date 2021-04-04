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

export const Window = ({ appID }: WindowProps) => {
  const [activeAppZIndex] = useAtom(activeAppZIndexStore);
  const [activeApp, setActiveApp] = useAtom(activeAppStore);

  const containerRef = useRef<HTMLDivElement>();

  const [appZIndex, setAppZIndex] = useState(0);

  const randX = useMemo(() => randint(-600, 600), []);
  const randY = useMemo(() => randint(-100, 100), []);

  const { resizable } = appsConfig[appID];

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
      <section className={css.container} tabIndex={-1} ref={containerRef} onClick={focusCurrentApp}>
        <div>
          <header className={clsx({ 'app-window-drag-handle': true, [css.titleBar]: true })}>
            <TrafficLights appID={appID} />
          </header>
          <div className={css.divider} />
        </div>
        <PlaceholderApp appID={appID} />
      </section>
    </Rnd>
  );
};
