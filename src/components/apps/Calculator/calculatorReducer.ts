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

// TODO: migrate to class instead of adding params
function getUpdatedResult({
  firstNumber,
  secondNumber,
  operator,
  mode,
}: {
  operator: OperatorT | null;
  secondNumber: number;
  firstNumber: number;
  mode: Mode;
}) {
  if (operator == null) {
    return firstNumber;
  }
  // TODO: reuse
  const isFirstNumberInput = [Mode.InsertFirstNumber, Mode.InsertDecimalFirstNumber].includes(mode);
  if (isFirstNumberInput) {
    return firstNumber;
  }
  return getMathResult({ first: firstNumber, second: secondNumber, operator });
}

export function calculatorReducer(state: IState, action: ActionT): IState {
  const payload = action.payload;
  const { mode, firstNumber, secondNumber, operator, result } = state;

  if (isDigit(payload)) {
    const isFirstNumberInput = [Mode.InsertFirstNumber, Mode.InsertDecimalFirstNumber].includes(
      mode,
    );

    const { updatedResult, updatedNumber } = getInsertedNumberResult({
      mode,
      existingNumber: isFirstNumberInput ? firstNumber : secondNumber,
      digit: payload,
      result: mode === Mode.OperatorPressed ? '' : result,
    });

    return {
      ...state,
      mode: mode === Mode.OperatorPressed ? Mode.InsertSecondNumber : mode,
      result: updatedResult,
      ...(isFirstNumberInput ? { firstNumber: updatedNumber } : { secondNumber: updatedNumber }),
    };
  }

  if (payload === '.') {
    if (mode === Mode.InsertDecimalFirstNumber) return state;
    return {
      ...state,
      mode: Mode.InsertDecimalFirstNumber,
      result: `${firstNumber}.`,
      firstNumber: firstNumber,
    };
  }

  if (isOperator(payload)) {
    return {
      ...state,
      mode: Mode.OperatorPressed,
      operator: payload,
      result: result.endsWith('.') ? result.substr(0, result.length - 1) : result,
    };
  }

  if (payload === '=') {
    const updatedResult = getUpdatedResult({ secondNumber, operator, firstNumber, mode });
    return {
      ...state,
      mode: Mode.ShowingResult,
      result: `${updatedResult}`,
    };
  }

  return initialState;
}
