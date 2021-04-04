import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { motion, useSpring } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRef, useState } from 'preact/hooks';
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
  const [forceClosed, setForceCLosed] = useState(false);

  const menuIDList = Object.keys(currentAppMenus);

  const parentRef = useRef<HTMLDivElement>();

  useOutsideClick(parentRef, () => {
    // If no menu open, then ignore
    if (activeMenu === '') return setForceCLosed(false);

    setActiveMenu('');

    // To override the animation
    setForceCLosed(true);
  });

  return (
    <div className={css.container} ref={parentRef}>
      {menuIDList.map((menuID) => (
        <Tippy
          key={menuID}
          visible={activeMenu === menuID}
          placement="bottom-start"
          animation={true}
          zIndex={99999999}
          popperOptions={popperOptions}
          onHide={() => setForceCLosed(false)}
          interactive
          appendTo={document.body}
          render={(attrs) => (
            <div {...attrs}>
              {/* @ts-ignore */}
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
