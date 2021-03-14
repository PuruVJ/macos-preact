import Tippy from '@tippyjs/react/headless';
import { transparentize } from 'color2k';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import styled, { css } from 'styled-components';
import { sticky } from 'tippy.js';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { activeMenuStore } from '__/stores/active-menu.store';
import { menuBarMenusStore } from '__/stores/menubar.store';
import { theme } from '__/theme';
import { Menu } from './Menu';

const popperOptions = {
  modifiers: [
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration: false,
      },
    },
  ],
};

export const MenuBar = () => {
  const [currentAppMenus] = useAtom(menuBarMenusStore);
  const [activeMenu, setActiveMenu] = useImmerAtom(activeMenuStore);

  const menuIDList = Object.keys(currentAppMenus);

  const tippyOnMount = (menuID: Unpacked<typeof menuIDList>) =>
    setActiveMenu((val) => {
      val[menuID] = true;
      return val;
    });

  const tippyOnHide = (menuID: Unpacked<typeof menuIDList>) =>
    setActiveMenu((val) => {
      val[menuID] = false;
      return val;
    });

  return (
    <>
      {menuIDList.map((menuID) => (
        <Tippy
          key={menuID}
          trigger="focusin mouseenter"
          hideOnClick={false}
          placement="bottom-start"
          sticky
          zIndex={99999999}
          plugins={[sticky]}
          onMount={() => tippyOnMount(menuID)}
          popperOptions={popperOptions}
          onHide={() => tippyOnHide(menuID)}
          interactive
          appendTo={document.body}
          render={(attrs) => (
            <div {...attrs}>
              {/* @ts-ignore */}
              <Menu menu={currentAppMenus[menuID].menu} />
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
    </>
  );
};

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
