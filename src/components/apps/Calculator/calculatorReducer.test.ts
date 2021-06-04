import { calculatorReducer, initialState, IState, Operator } from './calculatorReducer';

type Key = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | '+' | '-' | '*' | '/' | 'AC' | '=';
let state: IState = initialState;
describe('calculator', () => {
  beforeEach(() => {
    state = initialState;
  });

  function handlePress(key: Key) {
    switch (key) {
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
        return handlePressNumber(key);
      case '+':
        return handlePressOperator(Operator.Plus);
      case '-':
        return handlePressOperator(Operator.Minus);
      case '*':
        return handlePressOperator(Operator.Multiply);
      case '/':
        return handlePressOperator(Operator.Divide);
      case 'AC':
        return handlePressReset();
      case '=':
        return handleShowResult();
    }
  }

  function testEquation(keys: Key[], results: string[]) {
    expect(keys).toHaveLength(results.length);

    for (let i = 0; i < results.length; i++) {
      const key = keys[i];
      const result = results[i];
      handlePress(key);
      expect(state.result).toBe(result);
    }
  }

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
    handleShowResult();
    expect(state.result).toBe('13');
  });

  test('Simple equations', () => {
    testEquation([1, '+', 3, '='], ['1', '1', '3', '4']);
    testEquation([5, 5, '+', 2, 3, '='], ['5', '55', '55', '2', '23', '78']);
    // testEquation([1, 0, '+', 2, 4, '+', 5, '='], ['1', '10', '10', '2', '24', '34', '5', '39']);
  });
});

export {};
