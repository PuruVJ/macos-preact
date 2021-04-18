import useContextMenu from '__/hooks/use-context-menu';
import css from './ContextMenu.module.scss';
import { contextMenuConfig } from '__/data/menu/context.menu.config';
import { RefObject } from 'preact';

type Props = {
  outerRef: RefObject<HTMLDivElement>;
};

const ContextMenu = ({ outerRef }: Props) => {
  const { xPos, yPos, isMenuVisible } = useContextMenu(outerRef);
  const defMenu = contextMenuConfig.default;

  return isMenuVisible ? (
    <div className={css.contextContainer} style={{ position: 'absolute', top: yPos, left: xPos }}>
      {Object.keys(defMenu).map((key) => (
        <>
          <p className={css.menuItem}>{defMenu[key].title}</p>
          {(defMenu[key] as any).breakAfter && <div className={css.divider}></div>}
        </>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default ContextMenu;
