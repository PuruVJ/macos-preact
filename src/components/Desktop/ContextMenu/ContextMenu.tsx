import useContextMenu from '__/hooks/use-context-menu';
import css from './ContextMenu.module.scss';
import { contextMenuConfig } from '__/data/menu/context.menu.config';

type Props = {
  outerRef: React.LegacyRef<HTMLElement> | undefined;
};

const ContextMenu = ({ outerRef }: Props) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);
  const defMenu = contextMenuConfig.default;
  if (menu) {
    return (
      <div className={css.contextContainer} style={{ position: 'absolute', top: yPos, left: xPos }}>
        {Object.keys(defMenu).map((key) => (
          <>
            <p className={css.menuItem}>{defMenu[key].title}</p>
            {(defMenu[key] as any).breakAfter && <div className={css.divider}></div>}
          </>
        ))}
      </div>
    );
  }
  return <></>;
};

export default ContextMenu;
