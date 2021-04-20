import clsx from 'clsx';
import { RefObject } from 'preact';
import { contextMenuConfig } from '__/data/menu/context.menu.config';
import { useContextMenu, useTheme } from '__/hooks';
import css from './ContextMenu.module.scss';

type Props = {
  outerRef: RefObject<HTMLDivElement>;
};

const ContextMenu = ({ outerRef }: Props) => {
  const { xPos, yPos, isMenuVisible } = useContextMenu(outerRef);
  const [theme] = useTheme();

  const defMenu = contextMenuConfig.default;

  return isMenuVisible ? (
    <div
      class={clsx(css.contextContainer, theme === 'dark' && css.dark)}
      style={{ position: 'absolute', top: yPos, left: xPos }}
    >
      {Object.keys(defMenu).map((key) => (
        <>
          <p class={css.menuItem}>{defMenu[key].title}</p>
          {(defMenu[key] as any).breakAfter && <div class={css.divider}></div>}
        </>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default ContextMenu;
