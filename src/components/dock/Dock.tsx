import { transparentize } from 'color2k';
import { useMotionValue } from 'framer-motion';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { dockItemsStore } from '__/stores/dock.store';
import { theme } from '__/theme';
import { DockItem } from './DockItem';

/**
 * The famous MacOS Dock
 */
export const Dock = ({}) => {
  const [{ dockItems }] = useAtom(dockItemsStore);

  const mouseX = useMotionValue<number | null>(null);

  const dockItemsKeys = Object.keys(dockItems) as (keyof typeof dockItems)[];

  return (
    <DockContainer>
      <DockEl
        onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {dockItemsKeys.map((dockTitle) => {
          const { breakBefore } = dockItems[dockTitle];
          return [
            breakBefore && <Divider key={`${dockTitle}-divider`} aria-hidden="true" />,
            <DockItem key={dockTitle} mouseX={mouseX} {...dockItems[dockTitle]} />,
          ];
        })}
      </DockEl>
    </DockContainer>
  );
};

const DockContainer = styled.section`
  position: fixed;
  bottom: 0.3rem;
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
