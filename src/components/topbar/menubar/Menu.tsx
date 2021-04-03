import clsx from 'clsx';
import { useEffect, useRef } from 'preact/hooks';
import { ButtonBase } from '__/components/utils/ButtonBase';
import type { IMenu } from '__/helpers/create-menu-config';
import css from './Menu.module.scss';

type MenuProps = {
  menu: IMenu<any>;
};

export const Menu = ({ menu }: MenuProps) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className={css.container} ref={ref} tabIndex={-1}>
      {Object.keys(menu).map((key: any) => [
        <ButtonBase
          className={clsx({ disabled: menu[key].disabled, [css.menuItem]: true })}
          key={key}
        >
          {menu[key].title}
        </ButtonBase>,
        menu[key].breakAfter && <div className={css.divider} key={`${key}-divider`} />,
      ])}
    </div>
  );
};
