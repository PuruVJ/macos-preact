import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRef, useState } from 'preact/hooks';
import { mdiApple } from '@mdi/js';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useOutsideClick } from '__/hooks';
import { activeMenuStore, menuBarMenusStore } from '__/stores/menubar.store';
import { Menu } from './Menu';
import css from './MenuBar.module.scss';
import { AppIcon } from '../../utils/AppIcon';

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
        <div key={menuID}>
          <span style={{ height: '100%' }}>
            <ButtonBase
              onClick={() => {
                setActiveMenu(menuID);
                setForceClosed(false);
              }}
              onMouseOver={() => activeMenu && setActiveMenu(menuID)}
              className={clsx({
                [css.menuButton]: true,
                [css.defaultMenu]: menuID === 'default',
                [css.appleIconButton]: menuID === 'apple',
              })}
              style={{ '--scale': activeMenu === menuID ? 1 : 0 } as React.CSSProperties}
            >
              {menuID === 'apple' ? (
                <AppIcon size={18} path={mdiApple} />
              ) : (
                currentAppMenus[menuID].title
              )}
            </ButtonBase>
          </span>
          <div
            className={clsx(css.menuParent)}
            style={{
              visibility: activeMenu !== menuID ? 'hidden' : 'visible',
            }}
          >
            <Menu
              isHidden={activeMenu !== menuID}
              forceHidden={forceClosed}
              menu={currentAppMenus[menuID].menu}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
