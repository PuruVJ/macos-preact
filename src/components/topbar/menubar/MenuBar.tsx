import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRef } from 'preact/hooks';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useOutsideClick } from '__/hooks/use-click-outside';
import { activeMenuStore, menuBarMenusStore } from '__/stores/menubar.store';
import { Menu } from './Menu';
import css from './MenuBar.module.scss';

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
  const [activeMenu, setActiveMenu] = useAtom(activeMenuStore);

  const menuIDList = Object.keys(currentAppMenus);

  const parentRef = useRef<HTMLDivElement>();

  useOutsideClick(parentRef, () => {
    setActiveMenu('');
  });

  return (
    <div className={css.container} ref={parentRef}>
      {menuIDList.map((menuID, i) => (
        <Tippy
          key={menuID}
          visible={activeMenu === menuID}
          onClickOutside={console.log}
          placement="bottom-start"
          zIndex={99999999}
          popperOptions={popperOptions}
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
            <ButtonBase
              onClick={() => setActiveMenu(menuID)}
              onMouseOver={() => activeMenu && setActiveMenu(menuID)}
              className={clsx({
                [css.menuButton]: true,
                defaultMenu: menuID === 'default',
                active: activeMenu === menuID,
              })}
              style={{ '--scale': activeMenu === menuID ? 1 : 0 } as React.CSSProperties}
            >
              {currentAppMenus[menuID].title}
            </ButtonBase>
          </span>
        </Tippy>
      ))}
    </div>
  );
};
