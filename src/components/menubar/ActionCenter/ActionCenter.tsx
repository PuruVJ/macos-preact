import { mdiBluetooth, mdiMoonFirstQuarter, mdiWifiStrength4 } from '@mdi/js';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { DoNotDisturbSVG } from '__/assets/sf-icons/do-not-disturb';
import { AppIcon } from '__/components/utils/AppIcon';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { MenuShell } from '../MenuShell';
import { ActionCenterSurface } from './ActionCenterSurface';
import { ActionCenterTile } from './ActionCenterTile';

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
        >
          {/* Wifi goes here */}
          <ActionCenterTile grid={[1, 1]}>
            <Toggle filled={!0}>
              <AppIcon path={mdiWifiStrength4} size={16} />
            </Toggle>
            Wi-Fi
          </ActionCenterTile>

          {/* Bluetooth */}
          <ActionCenterTile grid={[2, 1]}>
            <Toggle filled={!0}>
              <AppIcon path={mdiBluetooth} size={18} />
            </Toggle>
            Bluetooth
          </ActionCenterTile>

          {/* Airdrop */}
          <ActionCenterTile grid={[3, 1]}>
            <Toggle filled={!!0}>
              <DoNotDisturbSVG size={16} />
            </Toggle>
            Airdrop
          </ActionCenterTile>
        </ActionCenterSurface>

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
  grid-auto-rows: 1.6rem;
  gap: 0.75rem;
`;

const Toggle = styled(ButtonBase)<{ filled: boolean }>`
  --size: 1.7rem;
  height: var(--size);
  width: var(--size);

  padding: 0;

  display: flex;
  place-items: center;

  border-radius: 50%;

  ${(props) => css`
    background-color: rgba(
      var(--app-color-${props.filled ? 'primary' : 'dark'}-rgb),
      ${props.filled ? 1 : 0.1}
    );
  `}

  svg {
    ${(props) => css`
      /* fill: var(--app-color-${props.filled ? 'primary-contrast' : 'light'}); */
      fill: rgba(
        var(--app-color-${props.filled ? 'primary' : 'light'}-contrast-rgb),
        ${props.filled ? 1 : 0.9}
      );
    `}
  }
`;
