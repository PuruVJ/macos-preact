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
          columnStart={1}
          columnSpan={6}
          rowStart={1}
          rowSpan={4}
        ></ActionCenterTile>

        {/* Do not disturb */}
        <ActionCenterTile
          columnStart={7}
          columnSpan={6}
          rowStart={1}
          rowSpan={2}
        ></ActionCenterTile>

        {/* Keyboard Brightness */}
        <ActionCenterTile
          columnStart={7}
          columnSpan={3}
          rowStart={3}
          rowSpan={2}
        ></ActionCenterTile>

        {/* Screen Mirroring */}
        <ActionCenterTile
          columnStart={10}
          columnSpan={3}
          rowStart={3}
          rowSpan={2}
        ></ActionCenterTile>

        {/* Display */}
        <ActionCenterTile
          columnStart={1}
          columnSpan={12}
          rowStart={5}
          rowSpan={2}
        ></ActionCenterTile>

        {/* Display */}
        <ActionCenterTile
          columnStart={1}
          columnSpan={12}
          rowStart={7}
          rowSpan={2}
        ></ActionCenterTile>

        {/* Accessibility */}
        <ActionCenterTile
          columnStart={1}
          columnSpan={3}
          rowStart={9}
          rowSpan={2}
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
