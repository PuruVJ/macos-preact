import { ComponentChildren } from 'preact';
import { useTheme } from '__/hooks';
import css from './ActionCenterSurface.module.scss';

interface ActionCenterSurfaceProps {
  grid: [[columnStart: number, columnSpan: number], [rowStart: number, rowSpan: number]];
  children: ComponentChildren;
}

export const ActionCenterSurface = ({ grid, children }: ActionCenterSurfaceProps) => {
  const [[columnStart, columnSpan], [rowStart, rowSpan]] = grid;
  const [theme] = useTheme();

  return (
    <section
      className={css.container}
      style={
        {
          '--column-start': columnStart,
          '--column-span': columnSpan,
          '--row-start': rowStart,
          '--row-span': rowSpan,

          '--border-size': `${theme === 'dark' ? 0.4 : 0}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  );
};
