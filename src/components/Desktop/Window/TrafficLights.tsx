import clsx from 'clsx';
import { useImmerAtom } from 'jotai/immer';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { AppID, openAppsStore } from '__/stores/apps.store';
import css from './TrafficLights.module.scss';
import { CloseIcon } from '__/assets/traffic-icons/Close.svg';
import { MinimizeIcon } from '__/assets/traffic-icons/Minimize.svg';
import { StretchIcon } from '__/assets/traffic-icons/Stretch.svg';

type TrafficLightProps = {
  appID: AppID;
  onMaximizeClick: () => void;
  className?: string | null;
};

export const TrafficLights = ({ appID, onMaximizeClick, className }: TrafficLightProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);

  const closeApp = () =>
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  const maximizeApp = () => {
    onMaximizeClick();
  };

  return (
    <div className={clsx(css.container, className)}>
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
