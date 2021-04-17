import clsx from 'clsx';
import useContextMenu from '__/hooks/use-context-menu';
import css from './ContextMenu.module.scss';

const ContextMenu = ({ outerRef }) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);

  if (menu) {
    return (
      <div className={css.contextContainer} style={{ position: 'absolute', top: yPos, left: xPos }}>
        <p className={css.menuItem}>New Folder</p>
        <div className={css.divider}></div>
        <p className={css.menuItem}>Get Info</p>
        <p className={css.menuItem}>Change Desktop Background</p>
        <div className={css.divider}></div>
        <p className={css.menuItem}>Use Stacks</p>
        <p className={clsx(css.disabled, css.menuItem)}>Disabled</p>
        <p className={css.menuItem}>Sort By</p>
        <p className={css.menuItem}>Clean Up</p>
        <p className={css.menuItem}>Clean Up By</p>
        <p className={css.menuItem}>Show View Options</p>
      </div>
    );
  }
  return <></>;
};

export default ContextMenu;
