import clsx from 'clsx';
import css from './ButtonBase.module.scss';

export const ButtonBase = ({
  children,
  disabled = false,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }) => {
  const { class: className, ...rest } = props;

  return (
    <button disabled={disabled} class={clsx(className, css.button)} {...rest}>
      {children}
    </button>
  );
};
