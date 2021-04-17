import clsx from 'clsx';
import { FC } from 'preact/compat';
import { ButtonBase } from '../utils/ButtonBase';
import css from './TopBarIconButton.module.scss';

export const TopBarIconButton: FC<React.ComponentProps<typeof ButtonBase>> = (props) => (
  <ButtonBase {...props} className={clsx(css.button, props.className)} />
);
