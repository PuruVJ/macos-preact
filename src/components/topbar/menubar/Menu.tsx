import clsx from 'clsx';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useTheme } from '__/hooks';
import css from './Menu.module.scss';

type MenuProps = {
  menu: any;
};

export const Menu = ({ menu }: MenuProps) => {
  const [theme] = useTheme();

  return (
    <div className={clsx(css.container, theme === 'dark' && css.dark)} tabIndex={-1}>
      {Object.keys<string>(menu).map((key) => (
        <span key={key}>
          <ButtonBase
            className={clsx(css.menuItem, menu[key].disabled && css.disabled)}
            disabled={menu[key].disabled}
          >
            {menu[key].title}
          </ButtonBase>
          {menu[key].breakAfter && <div className={css.divider} />}
        </span>
      ))}
    </div>
  );
};
