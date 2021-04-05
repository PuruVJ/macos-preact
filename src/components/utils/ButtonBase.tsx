import clsx from 'clsx';
import { FC } from 'preact/compat';
import css from './ButtonBase.module.scss';

export const ButtonBase: FC<React.HTMLProps<HTMLButtonElement>> = ({
  children,
  disabled,
  ...props
}) => {
  const { className, ...rest } = props;
  return (
    // @ts-ignore
    <button
      disabled={disabled}
      className={clsx({ [className as string]: true, [css.button]: true })}
      {...rest}
    >
      {children}
    </button>
  );
};
