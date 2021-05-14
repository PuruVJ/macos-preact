import clsx from 'clsx';
import { CalculatorButtonsArea } from './CalculatorButtonsArea/CalculatorButtonsArea';
import css from './Calculator.module.scss';

const Calculator = () => {
  return (
    <section class={css.container}>
      <header class={clsx('app-window-drag-handle', css.header)}></header>
      <section class={css.showArea}>0</section>
      <CalculatorButtonsArea />
    </section>
  );
};

export default Calculator;
