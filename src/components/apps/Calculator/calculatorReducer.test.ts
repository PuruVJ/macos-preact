import { calculatorReducer, initialState, IState, Operator } from './calculatorReducer';

let state: IState = initialState;
describe('calculator', () => {
  beforeEach(() => {
    state = initialState;
  });

  function handlePressNumber(number: number) {
    state = calculatorReducer(state, {
      type: 'PressNumber',
      payload: { number },
    });
  }

  function handlePressDot() {
    state = calculatorReducer(state, {
      type: 'PressDot',
    });
  }

  function handlePressReset() {
    state = calculatorReducer(state, {
      type: 'Reset',
    });
  }

  function handlePressOperator(operator: Operator) {
    state = calculatorReducer(state, {
      type: 'ChangeOperator',
      payload: { operatorValue: operator },
    });
  }

  function handleShowResult() {
    state = calculatorReducer(state, {
      type: 'ShowResult',
    });
  }

  test('Show number', () => {
    expect(state.result).toBe('0');
    handlePressNumber(1);
    expect(state.result).toBe('1');
    handlePressNumber(2);
    expect(state.result).toBe('12');
    handlePressNumber(3);
    expect(state.result).toBe('123');
  });

  test('Reset number', () => {
    handlePressNumber(1);
    expect(state.result).toBe('1');
    handlePressReset();
    expect(state.result).toBe('0');
    handlePressNumber(3);
    expect(state.result).toBe('3');
    handlePressNumber(4);
    expect(state.result).toBe('34');
  });

  test('Decimal number', () => {
    handlePressNumber(1);
    expect(state.result).toBe('1');
    handlePressDot();
    expect(state.result).toBe('1.');
    handlePressDot();
    expect(state.result).toBe('1.');
    handlePressNumber(3);
    expect(state.result).toBe('1.3');
    handlePressDot();
    expect(state.result).toBe('1.3');
  });

  test('Simple Math', () => {
    handlePressNumber(6);
    expect(state.result).toBe('6');
    handlePressOperator(Operator.Plus);
    expect(state.result).toBe('6');
    handlePressNumber(7);
    expect(state.result).toBe('7');
    handleShowResult()
    expect(state.result).toBe('13');
  });
});

export {};
