import { mdiAppleAirplay, mdiWifiStrength4 } from '@mdi/js';
import { VolumeLowSVG } from '__/assets/sf-icons/VolumeLowSVG';
import { AppIcon } from '../utils/AppIcon';
import { ButtonBase } from '../utils/ButtonBase';
import { ActionCenterToggle } from './ActionCenter/ActionCenterToggle';
import { MenuBar } from './menubar/MenuBar';
import css from './Topbar.module.scss';
import { TopBarIconButton } from './TopBarIconButton';
import { TopBarTime } from './TopBarTime';

export const TopBar = () => {
  return (
    <header id="top-bar" className={css.header}>
      <MenuBar />

      <span style={{ flex: '1 1 auto' }} />

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
    </header>
  );
};
