import React, { FC } from 'react';
import styled from 'styled-components';
import { MenuShell } from '../MenuShell';
import { ActionCenterTile } from './ActionCenterTile';

export const ActionCenter: FC<{}> = ({}) => {
  return (
    <MenuShell>
      <Container>
        {/* Main Controls: Wifi, Bluetooth, Airdrop */}
        <ActionCenterTile
          grid={[
            [1, 6],
            [1, 4],
          ]}
        ></ActionCenterTile>

        {/* Theme Switcher */}
        <ActionCenterTile
          grid={[
            [7, 6],
            [1, 2],
          ]}
        ></ActionCenterTile>

        {/* Keyboard Brightness */}
        <ActionCenterTile
          grid={[
            [7, 3],
            [3, 2],
          ]}
        ></ActionCenterTile>

        {/* Screen Mirroring */}
        <ActionCenterTile
          grid={[
            [10, 3],
            [3, 2],
          ]}
        ></ActionCenterTile>

        {/* Display */}
        <ActionCenterTile
          grid={[
            [1, 12],
            [5, 2],
          ]}
        ></ActionCenterTile>

        {/* Sound */}
        <ActionCenterTile
          grid={[
            [1, 12],
            [7, 2],
          ]}
        ></ActionCenterTile>

        {/* Accessibility */}
        <ActionCenterTile
          grid={[
            [1, 3],
            [9, 2],
          ]}
        ></ActionCenterTile>
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
