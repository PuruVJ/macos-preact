import { useAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'preact/compat';
import { Rnd } from 'react-rnd';
import { App } from '__/components/apps/App';
import { appsConfig } from '__/data/apps/apps-config';
import { randint } from '__/helpers/random';
import { activeAppStore, activeAppZIndexStore, AppID } from '__/stores/apps.store';
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

  const { resizable, width, height } = appsConfig[appID];

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
        height,
        width,
        x: ((3 / 2) * document.body.clientWidth + randX) / 2,
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
        <App appID={appID} />
      </section>
    </Rnd>
  );
};
