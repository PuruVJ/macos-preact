export type OperatorT = '+' | '-' | '*' | '/';
export type DigitT = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CalculatorKeyT = DigitT | OperatorT | 'AC' | '=' | '%' | '.' | '+/-';

export enum Mode {
  InsertFirstNumber = 'InsertFirstNumber',
  InsertDecimalFirstNumber = 'InsertDecimalFirstNumber',
  OperatorPressed = 'OperatorPressed',
  InsertSecondNumber = 'InsertSecondNumber',
  InsertDecimalSecondNumber = 'InsertDecimalSecondNumber',
  ShowingResult = 'ShowingResult',
}

export interface IState {
  mode: Mode;
  firstNumber: number;
  secondNumber: number;
  operator: OperatorT | null;
  result: string;
}

export const initialState: IState = {
  mode: Mode.InsertFirstNumber,
  firstNumber: 0,
  secondNumber: 0,
  operator: null,
  result: '0',
};

export type ActionT = { type: 'Press'; payload: CalculatorKeyT };

function getMathResult({
  first,
  operator,
  second,
}: {
  first: number;
  operator: OperatorT;
  second: number;
}): number {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return first / second;
  }
}

function isDecimal(number: number) {
  return String(number).includes('.');
}

function isOperator(value: unknown): value is OperatorT {
  return ['+', '-', '*', '/'].includes(value as OperatorT);
}

function isDigit(value: unknown): value is DigitT {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(value as DigitT);
}

function getInsertedNumberResult({
  mode,
  existingNumber,
  result,
  digit,
}: {
  mode: Mode;
  existingNumber: number;
  digit: DigitT;
  result: string;
}) {
  const isOperatorPressed = [Mode.OperatorPressed, Mode.ShowingResult].includes(mode);

  if (isOperatorPressed) {
    return { updatedResult: `${digit}`, updatedNumber: digit };
  }

  const isDecimalMode = [Mode.InsertDecimalFirstNumber, Mode.InsertDecimalSecondNumber].includes(
    mode,
  );
  const isDecimalNumberThatEndsWithDot = isDecimalMode && !isDecimal(existingNumber);

  const updatedResult = isDecimalNumberThatEndsWithDot
    ? `${existingNumber}.${digit}`
    : `${existingNumber === 0 ? '' : existingNumber}${digit}`;

  const updatedNumber = isDecimalNumberThatEndsWithDot
    ? Number(`${existingNumber}.${digit}`)
    : Number(`${result}${digit}`);

  return { updatedResult, updatedNumber };
}

export function calculatorReducer(state: IState, action: ActionT): IState {
  const payload = action.payload;
  const { mode, firstNumber, secondNumber, operator, result } = state;

  const isFirstNumberInput = [Mode.InsertFirstNumber, Mode.InsertDecimalFirstNumber].includes(mode);

  function getEquationResult() {
    if (isFirstNumberInput || operator == null) {
      return firstNumber;
    }
    return getMathResult({ first: firstNumber, second: secondNumber, operator });
  }

  if (isDigit(payload)) {
    const { updatedResult, updatedNumber } = getInsertedNumberResult({
      mode,
      existingNumber: isFirstNumberInput ? firstNumber : secondNumber,
      digit: payload,
      result: result,
    });

    return {
      ...state,
      mode: mode === Mode.OperatorPressed ? Mode.InsertSecondNumber : mode,
      result: updatedResult,
      ...(isFirstNumberInput ? { firstNumber: updatedNumber } : { secondNumber: updatedNumber }),
    };
  }

  if (payload === '.') {
    const isDecimalNumberMode = [
      Mode.InsertDecimalFirstNumber,
      Mode.InsertDecimalSecondNumber,
    ].includes(mode);

    if (isDecimalNumberMode) return state;

    return {
      ...state,
      mode: isFirstNumberInput ? Mode.InsertDecimalFirstNumber : Mode.InsertDecimalSecondNumber,
      result: isFirstNumberInput ? `${firstNumber}.` : `${secondNumber}.`,
      ...(isFirstNumberInput ? { firstNumber } : { secondNumber }),
    };
  }

  if (isOperator(payload)) {
    const builtNumberResult = result.endsWith('.') ? result.substr(0, result.length - 1) : result;
    const updatedResult = isFirstNumberInput
      ? builtNumberResult
      : getMathResult({ first: firstNumber, second: secondNumber, operator: payload });
    return {
      ...state,
      mode: Mode.OperatorPressed,
      operator: payload,
      firstNumber: Number(updatedResult),
      result: `${updatedResult}`,
    };
  }

  if (payload === '=') {
    const updatedResult = getEquationResult();
    return {
      ...state,
      mode: Mode.ShowingResult,
      result: `${updatedResult}`,
      firstNumber: updatedResult,
    };
  }

  return initialState;
}
