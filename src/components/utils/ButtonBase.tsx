import clsx from 'clsx';
import { forwardRef } from 'preact/compat';
import css from './ButtonBase.module.scss';

export const ButtonBase = forwardRef<HTMLButtonElement, JSX.IntrinsicElements['button']>(
  ({ children, disabled = false, ...props }, ref) => {
    const { class: className, ...rest } = props;

    return (
      <button disabled={disabled} ref={ref} class={clsx(className, css.button)} {...rest}>
        {children}
      </button>
    );
  },
);
