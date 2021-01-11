import { mdiBluetooth, mdiWifiStrength4 } from '@mdi/js';
import React, { FC, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { AirDropSVG } from '__/assets/sf-icons/AirDrop.svg';
import { MoonSVG } from '__/assets/sf-icons/Moon.svg';
import { AppIcon } from '__/components/utils/AppIcon';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useTheme } from '__/hooks/use-theme';
import { theme } from '__/theme';
import { MenuShell } from '../MenuShell';
import { ActionCenterSurface } from './ActionCenterSurface';
import { ActionCenterTile } from './ActionCenterTile';

export const ActionCenter: FC<{}> = ({}) => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  }, [theme]);

  const ThemeSVGComp = MoonSVG;

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
              <AirDropSVG size={16} />
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
        >
          <ActionCenterTile grid={[1, 1]}>
            <Toggle onClick={toggleTheme} filled={theme === 'dark'}>
              <ThemeSVGComp size={16} />
            </Toggle>
            Dark mode
          </ActionCenterTile>
        </ActionCenterSurface>

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
  grid-auto-rows: 1.55rem;
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
    background-color: hsla(
      ${theme.colors[props.filled ? 'primary' : 'dark'].hsl},
      ${props.filled ? 1 : 0.1}
    );

    svg {
      fill: hsla(
        ${theme.colors[props.filled ? 'primary' : 'light'].contrastHsl},
        ${props.filled ? 1 : 0.9}
      );
    }
  `}
`;
