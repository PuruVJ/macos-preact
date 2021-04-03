import { useImmerAtom } from 'jotai/immer';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { AppID, openAppsStore } from '__/stores/apps.store';
import css from './TrafficLights.module.scss';

type TrafficLightProps = {
  appID: AppID;
};

export const TrafficLights = ({ appID }: TrafficLightProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);

  const closeApp = () =>
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  return (
    <div className={css.container}>
      <ButtonBase className={css.closeLight} onClick={closeApp} />
      <ButtonBase className={css.stretchLight} />
      <ButtonBase className={css.minimizeLight} />
    </div>
  );
};
