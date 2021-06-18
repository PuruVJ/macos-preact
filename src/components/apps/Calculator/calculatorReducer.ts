export type OperatorT = '+' | '-' | '*' | '/';
export type DigitT = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CalculatorKeyT = DigitT | OperatorT | 'AC' | '=' | '%' | '.' | '+/-';

export enum Mode {
  InsertFirstNumber = 'InsertFirstNumber',
  InsertOperator = 'InsertOperator',
  InsertSecondNumber = 'InsertSecondNumber',
  ShowingResult = 'ShowingResult',
  Idle = 'Idle',
}

export interface IState {
  isCreatingDecimalNumber: boolean;
  firstNumber: number;
  result: string;
}

export const initialState: IState = {
  isCreatingDecimalNumber: false,
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
  if (isDigit(payload)) {
    if (state.isCreatingDecimalNumber && !isDecimal(state.firstNumber)) {
      return {
        ...state,
        result: `${state.firstNumber}.${payload}`,
        firstNumber: Number(`${state.firstNumber}.${payload}`),
      };
    }

    return {
      ...state,
      result: `${state.firstNumber === 0 ? '' : state.firstNumber}${payload}`,
      firstNumber: Number(`${state.result}${payload}`),
    };
  }

  if (payload === '.') {
    if (state.isCreatingDecimalNumber) return state;
    return {
      ...state,
      isCreatingDecimalNumber: true,
      result: `${state.firstNumber}.`,
      firstNumber: state.firstNumber,
    };
  }
  return initialState;
}
