import { mdiApple, mdiAppleAirplay, mdiWifiStrength4 } from '@mdi/js';
import Tippy from '@tippyjs/react/headless';
import { transparentize } from 'color2k';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import styled, { css } from 'styled-components';
import { sticky } from 'tippy.js';
import { VolumeLowSVG } from '__/assets/sf-icons/VolumeLowSVG';
import { activeMenuStore } from '__/stores/active-menu.store';
import { menuBarMenusStore } from '__/stores/menubar.store';
import { theme } from '__/theme';
import { AppIcon } from '../utils/AppIcon';
import { ButtonBase } from '../utils/ButtonBase';
import { ActionCenterToggle } from './ActionCenter/ActionCenterToggle';
import { Menu } from './menubar/Menu';
import { TopBarTime } from './TopBarTime';
import { TopBarIconButton } from './TopBarIconButton';

const TopBar = (): React.ReactElement => {
  const [currentAppMenus] = useAtom(menuBarMenusStore);
  const [activeMenu, setActiveMenu] = useImmerAtom(activeMenuStore);

  return (
    <Header>
      <AppleIconButton>
        <AppIcon size={18} path={mdiApple} />
      </AppleIconButton>

      {/* @ts-ignore */}
      {Object.keys(currentAppMenus).map((menuID: keyof typeof currentAppMenus) => (
        <Tippy
          key={menuID}
          trigger={`focusin mouseenter`}
          hideOnClick={false}
          placement="bottom-start"
          sticky
          zIndex={99999999}
          plugins={[sticky]}
          onMount={() =>
            void setActiveMenu((val) => {
              val[menuID] = true;
              return val;
            })
          }
          popperOptions={{
            modifiers: [
              {
                name: 'computeStyles',
                options: {
                  gpuAcceleration: false,
                },
              },
            ],
          }}
          onHide={() =>
            void setActiveMenu((val) => {
              val[menuID] = false;
              return val;
            })
          }
          interactive
          appendTo={document.body}
          render={(attrs) => (
            <div {...attrs}>
              {/* @ts-ignore */}
              <Menu menu={currentAppMenus[menuID].menu}>Hello</Menu>
            </div>
          )}
        >
          <span style={{ height: '100%' }}>
            <MenuButton isDefaultMenu={menuID === 'default'} active={activeMenu[menuID]}>
              {currentAppMenus[menuID].title}
            </MenuButton>
          </span>
        </Tippy>
      ))}

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

const MenuButton = styled(ButtonBase)<{ active: boolean; isDefaultMenu: boolean }>`
  font-weight: 500;

  border-radius: 0.25rem;

  position: relative;

  padding: 0 0.5rem;

  ${({ isDefaultMenu }) =>
    isDefaultMenu &&
    css`
      font-weight: 600 !important;
      margin: 0 6px;
    `}

  &::after {
    --scale: ${({ active }) => (active ? 1 : 0)};

    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    height: 100%;
    width: 100%;

    border-radius: inherit;

    transform: scale(var(--scale), var(--scale));
    transform-origin: center center;

    transition: transform 100ms ease;

    background-color: ${transparentize(theme.colors.grey[100], 0.7)};
  }
`;

const Spacer = styled.span`
  flex: 1 1 auto;
`;

export { TopBar };
