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

class WindowRnd extends Rnd {
  base?: HTMLDivElement;
}

/**
 * Extract the x and y from the transform style of the base element using Regex
 * Why using this hacking method:
 * react-rnd uses transform and translate to shift window around instead of top
 * and left and it does not provide the access to x and y values from ref
 * @param transformStyle The transform style string. e.g. translate(1123.75px, 7px)
 * @returns The window position. e.g. { x: 1123.75, y: 7 }
 */
function extractPositionFromTransformStyle(transformStyle: string): WindowPosition {
  const matched = transformStyle.matchAll(/[0-9.]+/g);
  try {
    return { x: Number(matched.next().value[0]), y: Number(matched.next().value[0]) };
  } catch {
    return { x: 0, y: 0 };
  }
}

export const Window = ({ appID }: WindowProps) => {
  const [activeAppZIndex] = useAtom(activeAppZIndexStore);
  const [activeApp, setActiveApp] = useAtom(activeAppStore);

  const containerRef = useRef<HTMLDivElement>();

  const [appZIndex, setAppZIndex] = useState(0);

  const randX = useMemo(() => randint(-600, 600), []);
  const randY = useMemo(() => randint(-100, 100), []);

  const windowRef = useRef<WindowRnd>();
  const originalSizeRef = useRef<WindowSize>({ height: 0, width: 0 });
  const originalPositionRef = useRef<WindowPosition>({
    x: 0,
    y: 0,
  });
  const transitionClearanceRef = useRef<number>();

  const { resizable } = appsConfig[appID];

  useEffect(() => {
    if (activeApp === appID) setAppZIndex(activeAppZIndex);
  }, [activeApp]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const maximizeApp = () => {
    if (!windowRef?.current?.resizableElement?.current || !windowRef?.current?.base) {
      return;
    }

    // Get desktop height and width
    const dockElementHeight = document.getElementById('dock')?.clientHeight ?? 0;
    const topBarElementHeight = document.getElementById('top-bar')?.clientHeight ?? 0;
    const desktopHeight = document.body.clientHeight - dockElementHeight - topBarElementHeight;
    const deskTopWidth = document.body.clientWidth;

    // Get current height and width
    const {
      clientWidth: windowWidth,
      clientHeight: windowHeight,
    } = windowRef.current.resizableElement.current;

    // Get current left and top position
    const { x: windowLeft, y: windowTop } = extractPositionFromTransformStyle(
      windowRef.current.base.style.transform,
    );

    // Only when maximizing (not dragging or resizing), should it have transaction
    windowRef.current.base.style.transition = 'height 0.5s, width 0.5s, transform 0.5s';

    // Prevent removing transition styles when multiple times of maximizing action takes place in a short period
    clearTimeout(transitionClearanceRef.current);

    // Transition style gets cleared after 0.5 second as transition only lasts 0.5 second
    transitionClearanceRef.current = setTimeout(() => {
      if (windowRef.current.base) {
        windowRef.current.base.style.transition = '';
      }
      transitionClearanceRef.current = 0;
    }, 500);

    // When it's already maximized, revert the window to the previous size
    if (windowWidth === deskTopWidth && windowHeight === desktopHeight) {
      windowRef.current.updateSize(originalSizeRef.current);
      windowRef.current.updatePosition(originalPositionRef.current);
    }
    // Maximize the window to the size of the desktop
    else {
      originalSizeRef.current = { width: windowWidth, height: windowHeight };
      originalPositionRef.current = { x: windowLeft, y: windowTop };

      windowRef.current.updateSize({
        height: desktopHeight,
        width: deskTopWidth,
      });

      windowRef.current.updatePosition({
        x: document.body.clientWidth / 2,
        y: 0,
      });
    }
  };

  const focusCurrentApp = () => void setActiveApp(appID);

  return (
    <Rnd
      ref={(c) => {
        if (c) windowRef.current = c;
      }}
      style={{ zIndex: appZIndex }}
      default={{
        height: 500,
        width: 600,
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
