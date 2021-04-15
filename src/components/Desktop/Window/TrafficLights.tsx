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
};

export const TrafficLights = ({ appID, onMaximizeClick }: TrafficLightProps) => {
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
    <div className={css.container}>
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
