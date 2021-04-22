import clsx from 'clsx';
import { ButtonBase } from '__/components/utils/ButtonBase';
import css from './Menu.module.scss';

type MenuProps = {
  menu: any;
};

export const Menu = ({ menu }: MenuProps) => {
  return (
    <div class={css.container} tabIndex={-1}>
      {Object.keys<string>(menu).map((key) => (
        <span key={key}>
          <ButtonBase
            class={clsx(css.menuItem, menu[key].disabled && css.disabled)}
            disabled={menu[key].disabled}
          >
            {menu[key].title}
          </ButtonBase>
          {menu[key].breakAfter && <div class={css.divider} />}
        </span>
      ))}
    </div>
  );
};
