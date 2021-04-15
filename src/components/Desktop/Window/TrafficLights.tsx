import { useImmerAtom } from 'jotai/immer';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { AppID, openAppsStore } from '__/stores/apps.store';
import css from './TrafficLights.module.scss';

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
      <ButtonBase className={css.closeLight} onClick={closeApp} />
      <ButtonBase className={css.minimizeLight} />
      <ButtonBase className={css.stretchLight} onClick={maximizeApp} />
    </div>
  );
};
