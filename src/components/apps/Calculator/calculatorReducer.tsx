export enum Operator {
  Plus = 'Plus',
  Minus = 'Minus',
  Multiply = 'Multiply',
  Divide = 'Divide',
}

export enum Mode {
  InsertFirstNumber = 'InsertFirstNumber',
  InsertOperator = 'InsertOperator',
  InsertSecondNumber = 'InsertSecondNumber',
  ShowingResult = 'ShowingResult',
  Idle = 'Idle',
}

export interface IState {
  operator: Operator | null;
  firstNumberText: string;
  secondNumberText: string;
  mode: Mode;
  result: string;
}

export const initialState: IState = {
  operator: null,
  firstNumberText: '',
  secondNumberText: '',
  mode: Mode.Idle,
  result: '0',
};
export type ActionT =
  | {
      type: 'Reset';
    }
  | {
      type: 'ChangeOperator';
      payload: {
        operatorValue: Operator;
      };
    }
  | {
      type: 'PressDot';
    }
  | {
      type: 'PlusMinusOperator';
    }
  | {
      type: 'PercentOperator';
    }
  | {
      type: 'PressNumber';
      payload: {
        number: number;
      };
    }
  | {
      type: 'ShowResult';
    };

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

export function calculatorReducer(state: IState, action: ActionT): IState {
  switch (action.type) {
    case 'Reset':
      return initialState;
    case 'ChangeOperator': {
      const { operatorValue } = action.payload;
      const { firstNumberText, secondNumberText, operator } = state;
      if (operator && state.mode !== Mode.InsertOperator) {
        const result = `${getMathResult({
          first: Number(firstNumberText),
          operator: operator,
          second: Number(secondNumberText),
        })}`;
        return {
          ...state,
          operator: operatorValue,
          mode: Mode.InsertOperator,
          firstNumberText: result,
          result: result,
        };
      }
      return { ...state, operator: operatorValue, mode: Mode.InsertOperator };
    }
    case 'PressDot': {
      switch (state.mode) {
        case Mode.Idle: {
          const result = '0.1';
          return {
            ...state,
            mode: Mode.InsertFirstNumber,
            firstNumberText: result,
            result: result,
          };
        }
        case Mode.InsertSecondNumber: {
          const { secondNumberText } = state;
          const updatedResult = secondNumberText.includes('.')
            ? secondNumberText
            : `${secondNumberText}.`;
          return {
            ...state,
            result: updatedResult,
            secondNumberText: updatedResult,
          };
        }
        case Mode.InsertFirstNumber: {
          const { firstNumberText } = state;
          const result = firstNumberText.includes('.') ? firstNumberText : `${firstNumberText}.`;
          return { ...state, firstNumberText: result, result: result };
        }
        case Mode.InsertOperator:
        case Mode.ShowingResult: {
          return {
            mode: Mode.InsertSecondNumber,
            firstNumberText: state.result,
            secondNumberText: '0.1',
            operator: null,
            result: '0.1',
          };
        }
      }
      return state;
    }
    case 'PlusMinusOperator': {
      switch (state.mode) {
        case Mode.InsertFirstNumber: {
          const result = `${-Number(state.firstNumberText)}`;
          return { ...state, firstNumberText: result, result };
        }
        case Mode.InsertSecondNumber: {
          const result = `${-Number(state.secondNumberText)}`;
          return { ...state, secondNumberText: result, result };
        }
        case Mode.ShowingResult: {
          const updatedResult = `${-Number(state.result)}`;
          return {
            ...state,
            firstNumberText: updatedResult,
            secondNumberText: '',
            operator: null,
            result: updatedResult,
          };
        }
        case Mode.InsertOperator: {
          const updatedResult = `${-Number(state.result)}`;
          if (state.secondNumberText) {
            return {
              ...state,
              secondNumberText: updatedResult,
            };
          } else {
            return {
              ...state,
              firstNumberText: updatedResult,
            };
          }
        }
        case Mode.Idle:
          return state;
      }
      return state;
    }
    case 'PercentOperator': {
      const { result } = state;

      switch (state.mode) {
        case Mode.InsertFirstNumber: {
          const updatedResult = `${Number(result) / 100}`;
          return {
            ...state,
            firstNumberText: updatedResult,
            result: updatedResult,
          };
        }
        case Mode.InsertSecondNumber: {
          const updatedResult = `${Number(result) / 100}`;
          return {
            ...state,
            secondNumberText: updatedResult,
            result: updatedResult,
          };
        }
        case Mode.InsertOperator:
        case Mode.ShowingResult: {
          const updatedResult = `${Number(result) / 100}`;
          if (state.secondNumberText) {
            return {
              ...state,
              secondNumberText: updatedResult,
              result: updatedResult,
            };
          } else {
            return {
              ...state,
              firstNumberText: updatedResult,
              result: updatedResult,
            };
          }
        }
      }
      return state;
    }
    case 'PressNumber': {
      const { number } = action.payload;
      switch (state.mode) {
        case Mode.Idle: {
          const result = `${state.firstNumberText}${number}`;
          return {
            ...state,
            firstNumberText: result,
            result: result,
            mode: Mode.InsertFirstNumber,
          };
        }
        case Mode.InsertFirstNumber: {
          const result = `${state.firstNumberText}${number}`;
          return { ...state, firstNumberText: result, result: result };
        }
        case Mode.InsertSecondNumber: {
          const result = `${state.secondNumberText}${number}`;
          return { ...state, secondNumberText: result, result: result };
        }
        case Mode.InsertOperator: {
          const result = `${number}`;
          return {
            ...state,
            secondNumberText: result,
            result: result,
            mode: Mode.InsertSecondNumber,
          };
        }
        case Mode.ShowingResult: {
          const result = `${number}`;
          return {
            operator: null,
            firstNumberText: result,
            result: result,
            secondNumberText: '',
            mode: Mode.InsertFirstNumber,
          };
        }
      }
      return state;
    }
    case 'ShowResult': {
      {
        const { firstNumberText, secondNumberText, operator } = state;
        if (firstNumberText && secondNumberText && operator) {
          const updatedResult = `${getMathResult({
            first: Number(firstNumberText),
            operator,
            second: Number(secondNumberText),
          })}`;
          return {
            ...state,
            mode: Mode.ShowingResult,
            firstNumberText: updatedResult,
            result: updatedResult,
          };
        }
        if (!firstNumberText) {
          return {
            ...state,
            mode: Mode.ShowingResult,
            firstNumberText: '0',
            result: '0',
          };
        }
        if (!secondNumberText || !operator) {
          const result = `${Number(firstNumberText)}`;
          return {
            ...state,
            mode: Mode.ShowingResult,
            result: result,
            firstNumberText: result,
          };
        }
      }

      return { ...state, mode: Mode.ShowingResult };
    }
    default:
      throw new Error();
  }
}
