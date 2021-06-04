import { useReducer } from 'react';
import { mdiClose, mdiDivision, mdiMinus, mdiPercentOutline, mdiPlusMinusVariant } from '@mdi/js';
import clsx from 'clsx';
import { AppIcon } from '__/components/utils/AppIcon';
import { ActionT, calculatorReducer, initialState, IState, Operator } from './calculatorReducer';
import css from './Calculator.module.scss';

const Calculator = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, ActionT>>(
    calculatorReducer,
    initialState,
  );

  const { result } = state;

  function handleReset() {
    dispatch({ type: 'Reset' });
  }

  function handleChangeOperator(operatorValue: Operator) {
    dispatch({ type: 'ChangeOperator', payload: { operatorValue } });
  }

  function handlePressDot() {
    dispatch({ type: 'PressDot' });
  }

  function handlePlusMinusOperator() {
    dispatch({ type: 'PlusMinusOperator' });
  }

  function handlePercentOperator() {
    dispatch({ type: 'PercentOperator' });
  }

  // After percent, when inerting first number the result appear but we can;t feed the number
  function handlePressNumber(number: number) {
    dispatch({ type: 'PressNumber', payload: { number } });
  }

  function handleShowResult() {
    dispatch({ type: 'ShowResult' });
  }

  return (
    <section class={css.container}>
      <header class={clsx('app-window-drag-handle', css.header)} />
      <section class={css.showArea}>{result}</section>
      <section class={css.buttonsContainer}>
        <button class={css.topRowButton} onClick={handleReset}>
          AC
        </button>
        <button class={css.topRowButton} onClick={handlePlusMinusOperator}>
          <AppIcon path={mdiPlusMinusVariant} />
        </button>
        <button class={css.topRowButton} onClick={handlePercentOperator}>
          <AppIcon path={mdiPercentOutline} />
        </button>
        <button class={css.operationButton} onClick={() => handleChangeOperator(Operator.Divide)}>
          <AppIcon path={mdiDivision} />
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(7)}>
          7
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(8)}>
          8
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(9)}>
          9
        </button>
        <button class={css.operationButton} onClick={() => handleChangeOperator(Operator.Multiply)}>
          <AppIcon path={mdiClose} />
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(4)}>
          4
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(5)}>
          5
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(6)}>
          6
        </button>
        <button class={css.operationButton} onClick={() => handleChangeOperator(Operator.Minus)}>
          <AppIcon path={mdiMinus} size={24} />
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(1)}>
          1
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(2)}>
          2
        </button>
        <button class={css.numberButton} onClick={() => handlePressNumber(3)}>
          3
        </button>
        <button class={css.operationButton} onClick={() => handleChangeOperator(Operator.Plus)}>
          +
        </button>
        <button
          class={clsx(css.numberButton, css.curvedBottomLeftButton)}
          style={{ gridColumn: '1 / span 2' }}
          onClick={() => handlePressNumber(0)}
        >
          0
        </button>
        <button class={css.numberButton} onClick={() => handlePressDot()}>
          .
        </button>
        <button
          class={clsx(css.operationButton, css.curvedBottomRightButton)}
          onClick={handleShowResult}
        >
          =
        </button>
      </section>
    </section>
  );
};

export default Calculator;
