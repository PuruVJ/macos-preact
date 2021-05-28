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
  InsertFirstNumber = 'InsertFirstNumber',
  InsertOperator = 'InsertOperator',
  InsertSecondNumber = 'InsertSecondNumber',
  ShowingResult = 'ShowingResult',
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
  const [result, setResult] = useState('0');

  // function renderResult() {
  //   switch (mode) {
  //     case Mode.Idle:
  //       return 0;
  //     case Mode.InsertFirstNumber:
  //       return firstNumberText;
  //     case Mode.InsertSecondNumber:
  //       return secondNumberText;
  //     case Mode.InsertOperator:
  //       return secondNumberText.length
  //         ? secondNumberText
  //         : firstNumberText.length
  //         ? firstNumberText
  //         : 0;
  //     case Mode.ShowingResult: {
  //       if (operator && firstNumberText && secondNumberText) {
  //         const result = getMathResult({
  //           first: Number(firstNumberText),
  //           operator,
  //           second: Number(secondNumberText),
  //         });
  //         return isNaN(result) ? 'Not a number' : result;
  //       }
  //       return firstNumberText;
  //     }
  //   }
  // }

  function handleReset() {
    setOperator(null);
    setFirstNumberText('');
    setSecondNumberText('');
    setMode(Mode.Idle);
    setResult('0');
  }

  function handleChangeOperator(operatorValue: Operator) {
    setOperator(operatorValue);
    setMode(Mode.InsertOperator);
  }

  function handlePressDot() {
    switch (mode) {
      case Mode.Idle: {
        const result = '0.1';
        setMode(Mode.InsertFirstNumber);
        setFirstNumberText(result);
        setResult(result);
        break;
      }
      case Mode.InsertSecondNumber: {
        const updatedResult = secondNumberText.includes('.')
          ? secondNumberText
          : `${secondNumberText}.`;
        setSecondNumberText(updatedResult);
        setResult(updatedResult);
        break;
      }
      case Mode.InsertFirstNumber: {
        const result = firstNumberText.includes('.') ? firstNumberText : `${firstNumberText}.`;
        setFirstNumberText(result);
        setResult(result);
        break;
      }
      case Mode.InsertOperator:
      case Mode.ShowingResult: {
        setMode(Mode.InsertSecondNumber);
        setFirstNumberText(result);
        setSecondNumberText('0.1');
        setOperator(null);
        setResult('0.1');
        break;
      }
    }
  }

  function handlePlusMinusOperator() {
    switch (mode) {
      case Mode.InsertFirstNumber: {
        const result = `${-Number(firstNumberText)}`;
        setFirstNumberText(result);
        setResult(result);
        break;
      }
      case Mode.InsertSecondNumber: {
        const result = `${-Number(secondNumberText)}`;
        setSecondNumberText(result);
        setResult(result);
        break;
      }
      case Mode.ShowingResult: {
        const updatedResult = `${-Number(result)}`;
        setFirstNumberText(updatedResult);
        setSecondNumberText('');
        setOperator(null);
        setResult(updatedResult);
        break;
      }
      case Mode.InsertOperator: {
        const updatedResult = `${-Number(result)}`;
        if (secondNumberText) {
          setSecondNumberText(updatedResult);
        } else {
          setFirstNumberText(updatedResult);
        }
        break;
      }
      case Mode.Idle:
        break;
    }
  }
  function handlePercentOperator() {
    switch (mode) {
      case Mode.InsertFirstNumber: {
        const updatedResult = `${Number(result) / 100}`;
        setFirstNumberText(updatedResult);
        setResult(updatedResult);
        break;
      }
      case Mode.InsertSecondNumber: {
        const updatedResult = `${Number(result) / 100}`;
        setSecondNumberText(updatedResult);
        setResult(updatedResult);
        break;
      }
      case Mode.InsertOperator: {
        const updatedResult = `${Number(result) / 100}`;
        if (secondNumberText) {
          setSecondNumberText(updatedResult);
        } else {
          setFirstNumberText(updatedResult);
        }
        setResult(updatedResult);
        break;
      }
      case Mode.ShowingResult: {
        const updatedResult = `${Number(result) / 100}`;
        if (secondNumberText) {
          setSecondNumberText(updatedResult);
        } else {
          setFirstNumberText(updatedResult);
        }
        setResult(updatedResult);
        break;
      }
    }
  }

  // After percent, when inerting first number the result appear but we can;t feed the number
  function handlePressNumber(number: number) {
    switch (mode) {
      case Mode.Idle: {
        const result = `${firstNumberText}${number}`;
        setFirstNumberText(result);
        setResult(result);
        setMode(Mode.InsertFirstNumber);
        break;
      }
      case Mode.InsertFirstNumber: {
        const result = `${firstNumberText}${number}`;
        setFirstNumberText(result);
        setResult(result);
        break;
      }
      case Mode.InsertSecondNumber: {
        const result = `${secondNumberText}${number}`;
        setSecondNumberText(result);
        setResult(result);
        break;
      }
      case Mode.InsertOperator: {
        const result = `${number}`;
        setSecondNumberText(result);
        setResult(result);
        setMode(Mode.InsertSecondNumber);
        break;
      }
      case Mode.ShowingResult: {
        setOperator(null);
        const result = `${number}`;
        setFirstNumberText(result);
        setResult(result);
        setSecondNumberText('');
        setMode(Mode.InsertFirstNumber);
      }
    }
  }

  function handleShowResult() {
    if (firstNumberText && secondNumberText && operator) {
      setFirstNumberText(result);
      const updatedResult = `${getMathResult({
        first: Number(firstNumberText),
        operator,
        second: Number(secondNumberText),
      })}`;
      setSecondNumberText(updatedResult);
      setResult(updatedResult);
    }
    if (!firstNumberText) {
      const result = '0';
      setFirstNumberText(result);
      setResult(result);
    }
    if (!secondNumberText || !operator) {
      const result = `${Number(firstNumberText)}`;
      setResult(result);
      setFirstNumberText(result);
    }
    setMode(Mode.ShowingResult);
  }

  return (
    <>
      <section class={css.showArea}>{result}</section>
      <section class={css.container}>
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
