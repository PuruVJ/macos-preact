import { transparentize } from 'color2k';
import { useMotionValue } from 'framer-motion';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { appsConfig } from '__/data/apps/apps-config';
import { openAppsStore } from '__/stores/apps.store';
import { theme } from '__/theme';
import { DockItem } from './DockItem';

/**
 * The famous MacOS Dock
 */
export const Dock = () => {
  const [openApps] = useAtom(openAppsStore);

  const mouseX = useMotionValue(0);

  return (
    <DockContainer>
      <DockEl
        onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(0)}
      >
        {Object.keys(appsConfig).map((appID) => {
          const { dockBreaksBefore } = appsConfig[appID];
          return [
            dockBreaksBefore && <Divider key={`${appID}-divider`} aria-hidden="true" />,
            <DockItem
              key={appID}
              mouseX={mouseX}
              appID={appID}
              isOpen={openApps[appID]}
              {...appsConfig[appID]}
            />,
          ];
        })}
      </DockEl>
    </DockContainer>
  );
};

const DockContainer = styled.section`
  margin-bottom: 0.3rem;
  left: 0;
  z-index: 9900;

  width: 100%;
  height: 5.2rem;

  padding: 0.4rem;

  display: flex;
  justify-content: center;
`;

const DockEl = styled.div`
  backdrop-filter: blur(5px);
  background-color: hsla(${theme.colors.light.hsl}, 0.4);

  box-shadow: inset 0 0 0 0.2px ${transparentize(theme.colors.grey[100], 0.3)},
    hsla(0, 0%, 0%, 0.3) 2px 5px 19px 7px;

  padding: 0.3rem;

  border-radius: 1.2rem;

  height: 100%;

  display: flex;
  align-items: flex-end;
`;

const Divider = styled.div`
  height: 100%;
  width: 0.2px;

  background-color: hsla(${theme.colors.dark.hsl}, 0.3);

  margin: 0 2px;
`;
