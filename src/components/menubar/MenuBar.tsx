import { mdiApple, mdiAppleAirplay, mdiWifiStrength4 } from '@mdi/js';
import React from 'react';
import styled from 'styled-components';
import { VolumeLowSVG } from '__/assets/sf-icons/volume-low.svg';
import { theme } from '__/theme';
import { AppIcon } from '../utils/AppIcon';
import { ButtonBase } from '../utils/ButtonBase';
import { ActionCenterToggle } from './ActionCenter/ActionCenterToggle';
import { MenuBarTime } from './MenuBarTime';
import { MenuIconButton } from './MenuIconButton';

const MenuBar = (): React.ReactElement => {
  return (
    <Header>
      <AppleIconButton>
        <AppIcon size={18} path={mdiApple} />
      </AppleIconButton>
      <ButtonBase style={{ fontWeight: 600, margin: `0 6px` }}>Finder</ButtonBase>

      {/* menu buttons */}
      <MenuButton>File</MenuButton>
      <MenuButton>Edit</MenuButton>
      <MenuButton>View</MenuButton>
      <MenuButton>Go</MenuButton>
      <MenuButton>Window</MenuButton>
      <MenuButton>Help</MenuButton>

      <Spacer />

      <MenuIconButton>
        <AppIcon size={24} path={mdiAppleAirplay} />
      </MenuIconButton>

      <MenuIconButton>
        <AppIcon size={24} path={mdiWifiStrength4} />
      </MenuIconButton>

      <MenuIconButton>
        <VolumeLowSVG />
      </MenuIconButton>

      <ActionCenterToggle />

      <ButtonBase>
        <MenuBarTime />
      </ButtonBase>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  height: 1.4rem;

  background-color: hsla(${theme.colors.light.hsl}, 0.3);
  backdrop-filter: blur(6px);

  color: ${theme.colors.light.contrast};
  fill: ${theme.colors.light.contrast};

  button {
    font-weight: 500;
    font-size: 0.8rem;
    font-family: ${theme.typography.fontFamily};

    letter-spacing: 0.3px;

    position: relative;

    padding: 0 0.2rem;
    margin: 0 0.3rem;
  }
`;

const AppleIconButton = styled(ButtonBase)`
  border-radius: 30px;

  padding: 0 0.5rem;
  margin: 0 0.6rem;
`;

const MenuButton = styled(ButtonBase)`
  font-weight: 500;
`;

const Spacer = styled.span`
  flex: 1 1 auto;
`;

export { MenuBar };
