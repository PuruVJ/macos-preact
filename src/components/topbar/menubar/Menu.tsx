import clsx from 'clsx';
import { motion, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'preact/hooks';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { useTheme } from '__/hooks';
import css from './Menu.module.scss';

type MenuProps = {
  menu: any;
  forceHidden: boolean;
  isHidden: boolean;
};

export const Menu = ({ menu, forceHidden, isHidden }: MenuProps) => {
  const ref = useRef<HTMLDivElement>();
  const [theme] = useTheme();

  const opacity = useSpring(1);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    // Menu closed from outside. Close with animation
    if (forceHidden) return opacity.set(0);

    // No animation on open or on consecutive menu open/close
    opacity.updateAndNotify(+!isHidden);
  }, [isHidden, forceHidden]);

  return (
    <motion.div
      style={{ opacity }}
      className={clsx(css.container, theme === 'dark' && css.dark)}
      ref={ref}
      tabIndex={-1}
    >
      {Object.keys(menu).map((key: any) => (
        <>
          <ButtonBase
            className={clsx({ [css.disabled]: menu[key].disabled, [css.menuItem]: true })}
            disabled={menu[key].disabled}
            key={key}
          >
            {menu[key].title}
          </ButtonBase>
          {menu[key].breakAfter && <div className={css.divider} key={`${key}-divider`} />}
        </>
      ))}
    </motion.div>
  );
};
