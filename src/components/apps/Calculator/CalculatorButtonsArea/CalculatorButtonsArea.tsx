import { mdiClose, mdiDivision, mdiMinus, mdiPercentOutline, mdiPlusMinusVariant } from '@mdi/js';
import clsx from 'clsx';
import { AppIcon } from '__/components/utils/AppIcon';
import css from './CalculatorButtonsArea.module.scss';
import { useState } from 'preact/hooks';

enum Operator {
  Plus = 'Plus',
  Minus = 'Minus',
  Multiply = 'Multiply',
  Divide = 'Divide',
}

enum Mode {
  InitFirstNumber = 'InitFirstNumber',
  Operator = 'Operator',
  InitSecondNumber = 'InitSecondNumber',
  ShowResult = 'ShowResult',
  Idle = 'Idle',
}

function getMathResult({
  first,
  operator,
  second,
}: {
  first: number;
  operator: Operator;
  second: number;
}): number {
  switch (operator) {
    case Operator.Plus:
      return first + second;
    case Operator.Minus:
      return first - second;
    case Operator.Multiply:
      return first * second;
    case Operator.Divide:
      return first / second;
  }
}

export const CalculatorButtonsArea = () => {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [firstNumberText, setFirstNumberText] = useState('');
  const [secondNumberText, setSecondNumberText] = useState('');
  const [mode, setMode] = useState(Mode.Idle);

  function renderResult() {
    switch (mode) {
      case Mode.Idle:
        return 0;
      case Mode.InitFirstNumber:
        return firstNumberText;
      case Mode.InitSecondNumber:
        return secondNumberText;
      case Mode.Operator:
        return secondNumberText.length
          ? secondNumberText
          : firstNumberText.length
          ? firstNumberText
          : 0;
      case Mode.ShowResult: {
        if (operator && firstNumberText && secondNumberText) {
          const result = getMathResult({
            first: Number(firstNumberText),
            operator,
            second: Number(secondNumberText),
          });
          return isNaN(result) ? 'Not a number' : result;
        }
        return firstNumberText;
      }
    }
  }

  function handleReset() {
    setOperator(null);
    setFirstNumberText('');
    setSecondNumberText('');
    setMode(Mode.Idle);
  }

  function handleChangeOperator(operatorValue: Operator) {
    if (secondNumberText && operator && firstNumberText) {
      setFirstNumberText(
        `${getMathResult({
          first: Number(firstNumberText),
          operator,
          second: Number(secondNumberText),
        })}`,
      );
      setSecondNumberText('');
    }
    if (!firstNumberText) {
      setFirstNumberText('0');
    }
    setOperator(operatorValue);
    setMode(Mode.Operator);
  }

  function handlePressDot() {
    switch (mode) {
      case Mode.Idle: {
        setFirstNumberText(() => '0.1');
        break;
      }
      case Mode.InitSecondNumber: {
        setSecondNumberText((num) => (num.includes('.') ? num : `${num}.`));
        break;
      }
      case Mode.InitFirstNumber: {
        setFirstNumberText((num) => (num.includes('.') ? num : `${num}.`));
        break;
      }
    }
  }

  function handlePlusMinusOperator() {
    switch (mode) {
      case Mode.InitFirstNumber: {
        setFirstNumberText((num) => `${-Number(num)}`);
        break;
      }
      case Mode.InitSecondNumber: {
        setSecondNumberText((num) => `${-Number(num)}`);
        break;
      }
    }
  }
  function handlePercentOperator() {
    switch (mode) {
      case Mode.InitFirstNumber: {
        setFirstNumberText((num) => `${Number(num) / 100}`);
        break;
      }
      case Mode.InitSecondNumber: {
        setSecondNumberText((num) => `${Number(num) / 100}`);
        break;
      }
    }
  }

  function handlePressNumber(number: number) {
    switch (mode) {
      case Mode.Idle:
      case Mode.InitFirstNumber: {
        setFirstNumberText((existNumber) => `${existNumber}${number}`);
        setMode(Mode.InitFirstNumber);
        break;
      }
      case Mode.InitSecondNumber: {
        setSecondNumberText((existNumber) => `${existNumber}${number}`);
        break;
      }
      case Mode.Operator: {
        setMode(Mode.InitSecondNumber);
        setSecondNumberText(`${number}`);
        break;
      }
      case Mode.ShowResult: {
        setOperator(null);
        setFirstNumberText(`${number}`);
        setSecondNumberText('');
        setMode(Mode.InitFirstNumber);
      }
    }
  }

  function handleShowResult() {
    setMode(Mode.ShowResult);
  }

  return (
    <>
      <section class={css.showArea}>{renderResult()}</section>
      <section class={css.container}>
        <button class={css.topRowButton} onClick={handleReset}>
          AC
        </button>
        <button class={css.topRowButton}>
          <AppIcon path={mdiPlusMinusVariant} onClick={handlePlusMinusOperator} />
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
      <div>
        {JSON.stringify({
          operator,
          firstNumberText,
          secondNumberText,
          mode,
        })}
      </div>
    </>
  );
};
