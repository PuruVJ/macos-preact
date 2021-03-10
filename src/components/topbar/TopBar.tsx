import { mdiApple, mdiAppleAirplay, mdiWifiStrength4 } from '@mdi/js';
import { FC } from 'preact/compat';
import styled from 'styled-components';
import { VolumeLowSVG } from '__/assets/sf-icons/VolumeLowSVG';
import { theme } from '__/theme';
import { AppIcon } from '../utils/AppIcon';
import { ButtonBase } from '../utils/ButtonBase';
import { ActionCenterToggle } from './ActionCenter/ActionCenterToggle';
import { MenuBar } from './menubar/MenuBar';
import { TopBarIconButton } from './TopBarIconButton';
import { TopBarTime } from './TopBarTime';

export const TopBar: FC = () => {
  return (
    <Header>
      <AppleIconButton>
        <AppIcon size={18} path={mdiApple} />
      </AppleIconButton>

      <MenuBar />

      <Spacer />

      <TopBarIconButton>
        <AppIcon size={24} path={mdiAppleAirplay} />
      </TopBarIconButton>

      <TopBarIconButton>
        <AppIcon size={24} path={mdiWifiStrength4} />
      </TopBarIconButton>

      <TopBarIconButton>
        <VolumeLowSVG />
      </TopBarIconButton>

      <ActionCenterToggle />

      <ButtonBase>
        <TopBarTime />
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
  backdrop-filter: blur(12px);

  color: ${theme.colors.light.contrast};
  fill: ${theme.colors.light.contrast};

  button {
    font-weight: 500;
    font-size: 0.8rem;
    font-family: ${theme.typography.fontFamily};

    letter-spacing: 0.3px;

    position: relative;

    height: 100%;
  }
`;

const AppleIconButton = styled(ButtonBase)`
  border-radius: 30px;

  padding: 0 0.5rem;
  margin: 0 0.6rem;
`;

const Spacer = styled.span`
  flex: 1 1 auto;
`;
