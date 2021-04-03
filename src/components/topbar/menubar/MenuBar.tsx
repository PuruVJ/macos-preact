import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { activeMenuStore } from '__/stores/active-menu.store';
import { menuBarMenusStore } from '__/stores/menubar.store';
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
          // plugins={[sticky]}
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
            <ButtonBase
              className={clsx({
                [css.menuButton]: true,
                defaultMenu: menuID === 'default',
                active: activeMenu[menuID],
              })}
              style={{ '--scale': activeMenu[menuID] ? 1 : 0 } as React.CSSProperties}
            >
              {currentAppMenus[menuID].title}
            </ButtonBase>
          </span>
        </Tippy>
      ))}
    </>
  );
};
