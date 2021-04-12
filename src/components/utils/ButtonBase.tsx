import css from './ButtonBase.module.scss';

export const ButtonBase = ({
  children,
  disabled = false,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }) => {
  const { className, ...rest } = props;

  return (
    <button disabled={disabled} className={`${className} ${css.button}`} {...rest}>
      {children}
    </button>
  );
};
