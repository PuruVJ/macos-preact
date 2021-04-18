import useRaf from '@rooks/use-raf';
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import { RefObject } from 'preact';
import { useRef } from 'preact/hooks';
import { AppConfig } from '__/helpers/create-app-config';
import { activeAppStore, AppID, openAppsStore } from '__/stores/apps.store';
import { ButtonBase } from '../utils/ButtonBase';
import css from './DockItem.module.scss';

type DockItemProps = AppConfig & {
  mouseX: MotionValue<number | null>;
  appID: AppID;
  isOpen: boolean;
};

export function DockItem({
  title,
  externalAction,
  mouseX,
  appID,
  isOpen,
  shouldOpenWindow,
}: DockItemProps) {
  const [, setOpenApps] = useImmerAtom(openAppsStore);
  const [, setActiveApp] = useAtom(activeAppStore);

  const ref = useRef<HTMLImageElement>();

  const { width } = useDockHoverAnimation(mouseX, ref);

  function openApp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!shouldOpenWindow) return void externalAction?.(e);

    setOpenApps((apps) => {
      apps[appID] = true;
      return apps;
    });
    setActiveApp(appID);
  }

  return (
    <section>
      <span>
        <ButtonBase
          className={css.dockItemButton}
          aria-label={`Launch ${title}`}
          onClick={(e) => openApp(e)}
        >
          <p className={css.tooltip}>{title}</p>
          <motion.img
            ref={ref}
            src={`/assets/app-icons/${appID}/256.png`}
            draggable={false}
            style={{ width, willChange: 'width' }}
          />
          <div className={css.dot} style={{ '--opacity': +isOpen } as React.CSSProperties} />
        </ButtonBase>
      </span>
    </section>
  );
}

const baseWidth = 57.6;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.618,
  baseWidth * 2.618,
  baseWidth * 1.618,
  baseWidth * 1.1,
  baseWidth,
];

const useDockHoverAnimation = (
  mouseX: MotionValue<number | null>,
  ref: RefObject<HTMLImageElement>,
) => {
  const distance = useMotionValue(beyondTheDistanceLimit);
  const widthPX = useSpring(useTransform(distance, distanceInput, widthOutput), {
    stiffness: 1100,
    damping: 60,
  });

  const width = useTransform(widthPX, (width) => `${width / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return { width };
};
