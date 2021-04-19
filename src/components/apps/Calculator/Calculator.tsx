import clsx from 'clsx';
import { CalculatorButtonsArea } from './ButtonsArea/CalculatorButtonsArea';
import css from './Calculator.module.scss';

export const Calculator = () => {
  return (
    <section className={css.container}>
      <header className={clsx('app-window-drag-handle', css.header)}></header>
      <section className={css.showArea}>0</section>
      <CalculatorButtonsArea />
    </section>
  );
};
