import { mdiClose, mdiDivision, mdiEqual, mdiMinus, mdiPlus, mdiPlusMinusVariant } from '@mdi/js';
import clsx from 'clsx';
import { AppIcon } from '__/components/utils/AppIcon';
import { ButtonBase } from '__/components/utils/ButtonBase';
import css from './CalculatorButtonsArea.module.scss';

export const CalculatorButtonsArea = () => {
  return (
    <section class={css.container}>
      <ButtonBase class={css.topRowButton}>AC</ButtonBase>
      <ButtonBase class={css.topRowButton}>
        <AppIcon path={mdiPlusMinusVariant} />
      </ButtonBase>
      <ButtonBase class={css.topRowButton}>%</ButtonBase>
      <ButtonBase class={css.operationButton}>
        <AppIcon path={mdiDivision} />
      </ButtonBase>

      <ButtonBase class={css.numberButton}>7</ButtonBase>
      <ButtonBase class={css.numberButton}>8</ButtonBase>
      <ButtonBase class={css.numberButton}>9</ButtonBase>
      <ButtonBase class={css.operationButton}>
        <AppIcon path={mdiClose} />
      </ButtonBase>

      <ButtonBase class={css.numberButton}>4</ButtonBase>
      <ButtonBase class={css.numberButton}>5</ButtonBase>
      <ButtonBase class={css.numberButton}>6</ButtonBase>
      <ButtonBase class={css.operationButton}>
        <AppIcon path={mdiMinus} size={24} />
      </ButtonBase>

      <ButtonBase class={css.numberButton}>1</ButtonBase>
      <ButtonBase class={css.numberButton}>2</ButtonBase>
      <ButtonBase class={css.numberButton}>3</ButtonBase>
      <ButtonBase class={css.operationButton}>
        <AppIcon path={mdiPlus} />
      </ButtonBase>

      <ButtonBase
        class={clsx(css.numberButton, css.curvedBottomLeftButton)}
        style={{ gridColumn: '1 / span 2' }}
      >
        0
      </ButtonBase>
      <ButtonBase class={css.numberButton}>,</ButtonBase>
      <ButtonBase class={clsx(css.operationButton, css.curvedBottomRightButton)}>
        <AppIcon path={mdiEqual} />
      </ButtonBase>
    </section>
  );
};
