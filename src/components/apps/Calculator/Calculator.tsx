import clsx from 'clsx';
import { CalculatorButtonsArea } from './CalculatorButtonsArea/CalculatorButtonsArea';
import css from './Calculator.module.scss';

const Calculator = () => {
  return (
    <section class={css.container}>
      <header class={clsx('app-window-drag-handle', css.header)}></header>
      <CalculatorButtonsArea />
    </section>
  );
};

export default Calculator;
