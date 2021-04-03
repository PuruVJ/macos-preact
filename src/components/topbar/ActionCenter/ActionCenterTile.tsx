import { ComponentChildren } from 'preact';
import { theme } from '__/theme';
import css from './ActionCenterTile.module.scss';

interface IActionCenterTileProps {
  grid: [number, number];
  children: ComponentChildren;
}

export const ActionCenterTile = ({ grid, children }: IActionCenterTileProps) => {
  return (
    <div
      className={css.container}
      style={{ '--row-start': grid[0], '--row-span': grid[1] } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
