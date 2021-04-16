import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'preact/hooks';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useOutsideClick } from '__/hooks';
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
  const [forceClosed, setForceClosed] = useState(false);

  const parentRef = useRef<HTMLDivElement>();

  useOutsideClick(parentRef, () => {
    // If no menu open, then ignore
    // set force close here cuz clicking anywhere else makes the menu stay closed after clicking on it
    if (activeMenu === '') return setForceClosed(false);

    setActiveMenu('');

    // To override the animation
    setForceClosed(true);
  });

  return (
    <div className={css.container} ref={parentRef}>
      {Object.keys(currentAppMenus).map((menuID) => (
        <Tippy
          key={menuID}
          visible={activeMenu === menuID}
          placement="bottom-start"
          animation={true}
          offset={[0, 4.5]}
          popperOptions={{ ...popperOptions, strategy: 'fixed' }}
          onHide={() => setForceClosed(false)}
          interactive
          render={(attrs) => (
            <div {...attrs}>
              <Menu
                isHidden={activeMenu !== menuID}
                forceHidden={forceClosed}
                menu={currentAppMenus[menuID].menu}
              />
            </div>
          )}
        >
          <span style={{ height: '100%' }}>
            <ButtonBase
              onClick={() => setActiveMenu(menuID)}
              onMouseOver={() => activeMenu && setActiveMenu(menuID)}
              className={clsx({
                [css.menuButton]: true,
                [css.defaultMenu]: menuID === 'default',
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
