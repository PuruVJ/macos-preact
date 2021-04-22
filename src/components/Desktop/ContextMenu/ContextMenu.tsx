import { RefObject } from 'preact';
import { contextMenuConfig } from '__/data/menu/context.menu.config';
import { useContextMenu } from '__/hooks';
import css from './ContextMenu.module.scss';

type Props = {
  outerRef: RefObject<HTMLDivElement>;
};

const ContextMenu = ({ outerRef }: Props) => {
  const { xPos, yPos, isMenuVisible } = useContextMenu(outerRef);

  const defMenu = contextMenuConfig.default;

  return isMenuVisible ? (
    <div class={css.contextContainer} style={{ top: yPos, left: xPos }}>
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
