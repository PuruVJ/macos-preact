import { mdiBluetooth, mdiKeyboard, mdiWifiStrength4 } from '@mdi/js';
import styled, { css } from 'styled-components';
import { AirDropSVG } from '__/assets/sf-icons/AirDrop.svg';
import { MoonSVG } from '__/assets/sf-icons/Moon.svg';
import { AppIcon } from '__/components/utils/AppIcon';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useTheme } from '__/hooks/use-theme';
import { theme } from '__/theme';
import { ACSlider } from './ACSlider';
import { ActionCenterShell } from './ActionCenterShell';
import { ActionCenterSurface } from './ActionCenterSurface';
import { ActionCenterTile } from './ActionCenterTile';

export const ActionCenter = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const ThemeSVGComp = MoonSVG;

  return (
    <ActionCenterShell>
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
            [7, 6],
            [3, 2],
          ]}
        >
          <ActionCenterTile grid={[1, 1]}>
            <Toggle filled={!0}>
              <AppIcon path={mdiKeyboard} size={16} />
            </Toggle>
            Keyboard
          </ActionCenterTile>
        </ActionCenterSurface>

        {/* Display */}
        <ActionCenterSurface
          grid={[
            [1, 12],
            [5, 2],
          ]}
        >
          <Label>Display</Label>
          <ACSlider min={30} defaultValue={100} max={100} />
        </ActionCenterSurface>

        {/* Sound */}
        <ActionCenterSurface
          grid={[
            [1, 12],
            [7, 2],
          ]}
        >
          <Label>Sound</Label>
          <ACSlider
            // onChange={(val) => setBrightness(val as number)}
            defaultValue={100}
            min={30}
            max={100}
          />
        </ActionCenterSurface>
      </Container>
    </ActionCenterShell>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(1.55rem, auto);
  gap: 0.75rem;
`;

const Label = styled.div`
  font-size: 0.8rem;
  font-weight: 600;

  color: ${theme.colors.dark.main};

  margin: 0.3rem 0;
`;

const Toggle = styled(ButtonBase)<{ filled: boolean }>`
  --size: 1.7rem;
  height: var(--size);
  width: var(--size);

  padding: 0;

  display: flex;
  place-items: center;

  border-radius: 50%;

  ${({ filled }) => css`
    background-color: hsla(${theme.colors[filled ? 'primary' : 'dark'].hsl}, ${filled ? 1 : 0.1});

    svg {
      fill: hsla(${theme.colors[filled ? 'primary' : 'light'].contrastHsl}, ${filled ? 1 : 0.9});
    }
  `}
`;
