import { mdiApple } from '@mdi/js';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRef } from 'preact/hooks';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useOutsideClick } from '__/hooks';
import { activeMenuStore, menuBarMenusStore } from '__/stores/menubar.store';
import { AppIcon } from '../../utils/AppIcon';
import { Menu } from './Menu';
import css from './MenuBar.module.scss';

export const MenuBar = () => {
  const [currentAppMenus] = useAtom(menuBarMenusStore);
  const [activeMenu, setActiveMenu] = useAtom(activeMenuStore);

  const parentRef = useRef<HTMLDivElement>();

  useOutsideClick(parentRef, () => {
    setActiveMenu('');

    // To override the animation
  });

  return (
    <div className={css.container} ref={parentRef}>
      {Object.keys(currentAppMenus).map((menuID) => (
        <div key={menuID}>
          <span style={{ height: '100%' }}>
            <ButtonBase
              onClick={() => {
                setActiveMenu(menuID);
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
            <Menu menu={currentAppMenus[menuID].menu} />
          </div>
        </div>
      ))}
    </div>
  );
};
