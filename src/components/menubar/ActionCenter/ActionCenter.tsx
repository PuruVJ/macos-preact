import React, { FC } from 'react';
import styled from 'styled-components';
import { MenuShell } from '../MenuShell';
import { ActionCenterSurface } from './ActionCenterSurface';

export const ActionCenter: FC<{}> = ({}) => {
  return (
    <MenuShell>
      <Container>
        {/* Main Controls: Wifi, Bluetooth, Airdrop */}
        <ActionCenterSurface
          grid={[
            [1, 6],
            [1, 4],
          ]}
        ></ActionCenterSurface>

        {/* Theme Switcher */}
        <ActionCenterSurface
          grid={[
            [7, 6],
            [1, 2],
          ]}
        ></ActionCenterSurface>

        {/* Keyboard Brightness */}
        <ActionCenterSurface
          grid={[
            [7, 3],
            [3, 2],
          ]}
        ></ActionCenterSurface>

        {/* Screen Mirroring */}
        <ActionCenterSurface
          grid={[
            [10, 3],
            [3, 2],
          ]}
        ></ActionCenterSurface>

        {/* Display */}
        <ActionCenterSurface
          grid={[
            [1, 12],
            [5, 2],
          ]}
        ></ActionCenterSurface>

        {/* Sound */}
        <ActionCenterSurface
          grid={[
            [1, 12],
            [7, 2],
          ]}
        ></ActionCenterSurface>

        {/* Accessibility */}
        <ActionCenterSurface
          grid={[
            [1, 3],
            [9, 2],
          ]}
        ></ActionCenterSurface>
      </Container>
    </MenuShell>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1.375rem;
  gap: 0.75rem;
`;
