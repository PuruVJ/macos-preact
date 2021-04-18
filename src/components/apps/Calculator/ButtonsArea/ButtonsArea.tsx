import clsx from 'clsx';
import { ButtonBase } from '__/components/utils/ButtonBase';
import css from './ButtonsArea.module.scss';

export const ButtonsArea = () => {
  return (
    <section className={css.container}>
      <ButtonBase className={css.topRowButton}>AC</ButtonBase>
      <ButtonBase className={css.topRowButton}>+/-</ButtonBase>
      <ButtonBase className={css.topRowButton}>%</ButtonBase>
      <ButtonBase className={css.operationButton}>/</ButtonBase>

      <ButtonBase className={css.numberButton}>7</ButtonBase>
      <ButtonBase className={css.numberButton}>8</ButtonBase>
      <ButtonBase className={css.numberButton}>9</ButtonBase>
      <ButtonBase className={css.operationButton}>X</ButtonBase>

      <ButtonBase className={css.numberButton}>4</ButtonBase>
      <ButtonBase className={css.numberButton}>5</ButtonBase>
      <ButtonBase className={css.numberButton}>6</ButtonBase>
      <ButtonBase className={css.operationButton}>-</ButtonBase>

      <ButtonBase className={css.numberButton}>1</ButtonBase>
      <ButtonBase className={css.numberButton}>2</ButtonBase>
      <ButtonBase className={css.numberButton}>3</ButtonBase>
      <ButtonBase className={css.operationButton}>+</ButtonBase>

      <ButtonBase
        className={clsx(css.numberButton, css.curvedBottomLeftButton)}
        style={{ gridColumn: '1 / span 2' }}
      >
        0
      </ButtonBase>
      <ButtonBase className={css.numberButton}>,</ButtonBase>
      <ButtonBase className={clsx(css.operationButton, css.curvedBottomRightButton)}>=</ButtonBase>
    </section>
  );
};
