import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import { CloseIcon } from '__/assets/traffic-icons/Close.svg';
import { MinimizeIcon } from '__/assets/traffic-icons/Minimize.svg';
import { StretchIcon } from '__/assets/traffic-icons/Stretch.svg';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { activeAppStore, AppID, openAppsStore } from '__/stores/apps.store';
import css from './TrafficLights.module.scss';

type TrafficLightProps = {
  appID: AppID;
  onMaximizeClick: () => void;
  className?: string | null;
};

export const TrafficLights = ({ appID, onMaximizeClick, className }: TrafficLightProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);
  const [activeApp] = useAtom(activeAppStore);

  const closeApp = () =>
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  const maximizeApp = () => {
    onMaximizeClick();
  };

  return (
    <div className={clsx(css.container, activeApp !== appID && css.unFocussed, className)}>
      <ButtonBase className={css.closeLight} onClick={closeApp}>
        <CloseIcon />
      </ButtonBase>
      <ButtonBase className={css.minimizeLight}>
        <MinimizeIcon />
      </ButtonBase>
      <ButtonBase className={css.stretchLight} onClick={maximizeApp}>
        <StretchIcon />
      </ButtonBase>
    </div>
  );
};
