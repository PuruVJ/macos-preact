import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';
import { appsConfig } from '__/data/apps/apps-config';
import { activeAppStore, activeAppZIndexStore, openAppsStore } from '__/stores/apps.store';
import { Window } from './Window';
import css from './WindowsArea.module.scss';

export const WindowsArea = () => {
  const [openApps] = useAtom(openAppsStore);
  const [activeApp] = useAtom(activeAppStore);
  const [activeAppZIndex, setActiveAppZIndex] = useAtom(activeAppZIndexStore);

  // Update the active app Z Index here
  //
  useEffect(() => {
    setActiveAppZIndex(activeAppZIndex + 2);
  }, [activeApp]);

  return (
    <section class={css.container}>
      {Object.keys(appsConfig).map(
        (appID) =>
          openApps[appID] &&
          appsConfig[appID].shouldOpenWindow && <Window key={appID} appID={appID} />,
      )}
    </section>
  );
};
