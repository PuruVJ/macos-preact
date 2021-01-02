import { fade } from '@material-ui/core';
import { useMotionValue } from 'framer-motion';
import { useAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import { dockItemsStore } from '__/stores/dock.store';
import { theme } from '__/theme';
import { DockItem } from './DockItem';

/**
 * The famous MacOS Dock
 */
const Dock = ({}) => {
  const [{ dockItems }] = useAtom(dockItemsStore);

  const mouseX = useMotionValue<number | null>(null);

  const dockItemsKeys = Object.keys(dockItems);

  return (
    <>
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
    </>
  );
};

const DockContainer = styled.section`
  position: fixed;
  bottom: 0.3rem;
  left: 0;
  z-index: 100000000;

  width: 100%;
  height: 5rem;

  padding: 0.4rem;

  display: flex;
  justify-content: center;
`;

const DockEl = styled.div`
  backdrop-filter: blur(5px);
  background-color: rgba(${theme.colors.light.rgb}, 0.2);

  box-shadow: inset 0 0 0 0.2px ${fade(theme.colors.grey[100], 0.3)},
    rgba(0, 0, 0, 0.3) 2px 5px 19px 7px;

  padding: 0.3rem;

  border-radius: 1.2rem;

  height: 100%;

  display: flex;
  align-items: flex-end;
`;

const Divider = styled.div`
  height: 100%;
  width: 1px;

  background-color: ${fade(theme.colors.grey[700], 0.3)};

  margin: 0 2px;
`;

export { Dock };
