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
  firstNumber: null | number;
  result: string;
}

export const initialState: IState = {
  firstNumber: null,
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

export function calculatorReducer(state: IState, action: ActionT): IState {
  const payload = action.payload;
  switch (payload) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9: {
      if (state.firstNumber != null) {
        if (state.firstNumber === 0) {
          return {
            result: `${payload}`,
            firstNumber: payload,
          };
        }

        return {
          result: `${state.firstNumber}${payload}`,
          firstNumber: Number(`${state.firstNumber}${payload}`),
        };
      }

      return {
        result: `${payload}`,
        firstNumber: Number(`${payload}`),
      };
    }
  }
  return initialState;
}
