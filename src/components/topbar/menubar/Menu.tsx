import clsx from 'clsx';
import { useRef } from 'preact/hooks';
import { RovingTabIndexProvider, useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';
import { ButtonBase } from '__/components/utils/ButtonBase';
import css from './Menu.module.scss';

type MenuProps = {
  menu: any;
};

export const Menu = ({ menu }: MenuProps) => {
  return (
    <div class={css.container} tabIndex={-1}>
      <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
        {Object.keys<string>(menu || {}).map((key) => (
          <>
            <MenuItemButton
              key={key}
              class={clsx(css.menuItem, menu[key].disabled && css.disabled)}
              disabled={menu[key].disabled}
            >
              {menu[key].title}
            </MenuItemButton>
            {menu[key].breakAfter && <div key={`divider-${key}`} class={css.divider} />}
          </>
        ))}
      </RovingTabIndexProvider>
    </div>
  );
};

const MenuItemButton = ({
  children,
  disabled = false,
  ...props
}: React.ComponentProps<typeof ButtonBase>) => {
  const ref = useRef<HTMLButtonElement>();

  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(ref, disabled);

  useFocusEffect(focused, ref);

  return (
    <ButtonBase
      tabIndex={tabIndex}
      ref={ref}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};
