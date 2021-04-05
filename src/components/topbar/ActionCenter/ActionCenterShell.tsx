import { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useTheme } from '__/hooks';
import css from './ActionCenterShell.module.scss';

interface IMenuShell {
  children: ComponentChildren;
}

export const ActionCenterShell = ({ children }: IMenuShell) => {
  const ref = useRef<HTMLElement>();
  const [theme] = useTheme();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <section
      className={css.container}
      style={{ '--border-size': `${theme === 'dark' ? 0.5 : 0}px` } as React.CSSProperties}
      ref={ref}
      tabIndex={-1}
    >
      {children}
    </section>
  );
};
