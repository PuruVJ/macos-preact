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
  result: string;
}

export const initialState: IState = {
  mode: Mode.InsertFirstNumber,
  firstNumber: 0,
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

function isDigit(value: unknown): value is DigitT {
  switch (value) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return true;
    default:
      return false;
  }
}

export function calculatorReducer(state: IState, action: ActionT): IState {
  const payload = action.payload;
  const { mode, firstNumber, result } = state;

  if (isDigit(payload)) {
    if (mode === Mode.InsertDecimalFirstNumber && !isDecimal(firstNumber)) {
      return {
        ...state,
        result: `${firstNumber}.${payload}`,
        firstNumber: Number(`${firstNumber}.${payload}`),
      };
    }

    return {
      ...state,
      result: `${firstNumber === 0 ? '' : firstNumber}${payload}`,
      firstNumber: Number(`${result}${payload}`),
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

  return initialState;
}
