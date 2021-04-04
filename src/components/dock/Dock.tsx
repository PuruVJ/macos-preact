import { useMotionValue } from 'framer-motion';
import { useAtom } from 'jotai';
import { appsConfig } from '__/data/apps/apps-config';
import { openAppsStore } from '__/stores/apps.store';
import css from './Dock.module.scss';
import { DockItem } from './DockItem';

export const Dock = () => {
  const [openApps] = useAtom(openAppsStore);

  const mouseX = useMotionValue<number | null>(null);

  return (
    <section className={css.container}>
      <div
        className={css.dockEl}
        onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {Object.keys(appsConfig).map((appID) => {
          const { dockBreaksBefore } = appsConfig[appID];
          return [
            dockBreaksBefore && (
              <div className={css.divider} key={`${appID}-divider`} aria-hidden="true" />
            ),
            <DockItem
              key={appID}
              mouseX={mouseX}
              appID={appID}
              isOpen={openApps[appID]}
              {...appsConfig[appID]}
            />,
          ];
        })}
      </div>
    </section>
  );
};
