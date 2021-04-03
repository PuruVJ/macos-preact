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
    <button className={`${className} ${css.button}`} {...rest}>
      {children}
    </button>
  );
};
