import { mdiClose, mdiDivision, mdiMinus, mdiPercentOutline, mdiPlusMinusVariant } from '@mdi/js';
import clsx from 'clsx';
import { AppIcon } from '__/components/utils/AppIcon';
import css from './CalculatorButtonsArea.module.scss';

export const CalculatorButtonsArea = () => {
  return (
    <section class={css.container}>
      <button class={css.topRowButton}>AC</button>
      <button class={css.topRowButton}>
        <AppIcon path={mdiPlusMinusVariant} />
      </button>
      <button class={css.topRowButton}>
        <AppIcon path={mdiPercentOutline} />
      </button>
      <button class={css.operationButton}>
        <AppIcon path={mdiDivision} />
      </button>

      <button class={css.numberButton}>7</button>
      <button class={css.numberButton}>8</button>
      <button class={css.numberButton}>9</button>
      <button class={css.operationButton}>
        <AppIcon path={mdiClose} />
      </button>

      <button class={css.numberButton}>4</button>
      <button class={css.numberButton}>5</button>
      <button class={css.numberButton}>6</button>
      <button class={css.operationButton}>
        <AppIcon path={mdiMinus} size={24} />
      </button>

      <button class={css.numberButton}>1</button>
      <button class={css.numberButton}>2</button>
      <button class={css.numberButton}>3</button>
      <button class={css.operationButton}>+</button>

      <button
        class={clsx(css.numberButton, css.curvedBottomLeftButton)}
        style={{ gridColumn: '1 / span 2' }}
      >
        0
      </button>
      <button class={css.numberButton}>,</button>
      <button class={clsx(css.operationButton, css.curvedBottomRightButton)}>=</button>
    </section>
  );
};
