import clsx from 'clsx';
import { TrafficLights } from '__/components/Desktop/Window/TrafficLights';
import { ButtonsArea } from './ButtonsArea/ButtonsArea';
import css from './Calculator.module.scss';

export const Calculator = () => {
  return (
    <section className={css.container}>
      <header className={clsx('app-window-drag-handle', css.header)}>
        <TrafficLights appID="calculator" />
      </header>
      <section className={css.showArea}>0</section>
      <ButtonsArea />
    </section>
  );
};
