import { CalculatorKeyT, calculatorReducer, initialState, IState } from './calculatorReducer';

let state: IState = initialState;
describe('calculatorReducer', () => {
  beforeEach(() => {
    state = initialState;
  });

  function expectResultToBe(result: string) {
    expect(state.result).toBe(result);
  }

  function testEquation(keys: CalculatorKeyT[], results: string[]) {
    expect(keys).toHaveLength(results.length);

    for (let i = 0; i < results.length; i++) {
      const key = keys[i];
      const result = results[i];
      state = calculatorReducer(state, { type: 'Press', payload: key });
      expect(state.result).toBe(result);
    }

    // Reset state
    state = initialState;
  }

  function performPresses(keys: CalculatorKeyT[]) {
    keys.forEach((key) => {
      state = calculatorReducer(state, { type: 'Press', payload: key });
    });
  }

  describe('Creating first number', () => {
    it('show 0 at start', () => {
      expectResultToBe('0');
    });

    it('shows the pressed number', () => {
      testEquation([0], ['0']);
      testEquation([1], ['1']);
      testEquation([2], ['2']);
      testEquation([3], ['3']);
      testEquation([4], ['4']);
      testEquation([5], ['5']);
      testEquation([6], ['6']);
      testEquation([7], ['7']);
      testEquation([8], ['8']);
      testEquation([9], ['9']);
    });

    it('shows compound number', () => {
      performPresses([1, 2, 3, 4, 5]);
      expectResultToBe('12345');

      state = initialState;

      performPresses([1, 2]);
      expectResultToBe('12');
    });

    it('handle multiple zero number correctly', () => {
      performPresses([0, 0, 0]);
      expectResultToBe('0');
    });

    it('handle number after multiple zero number correctly', () => {
      performPresses([0, 0, 2, 1, 0]);
      expectResultToBe('210');
    });

    it('shows decimal number after .', () => {
      performPresses([1, '.']);
      expectResultToBe('1.');
    });

    it('blocks multiple .', () => {
      performPresses([1, '.', '.', '.']);
      expectResultToBe('1.');

      state = initialState;

      performPresses([1, '.', '.', '.', 1]);
      expectResultToBe('1.1');

      state = initialState;

      performPresses([1, '.', '.', '.', 1, '.', '.', '.']);
      expectResultToBe('1.1');
    });

    it('enable writing numbers after the dot', () => {
      performPresses([3, '.', 1, 2]);
      expectResultToBe('3.12');
    });

    it('shows 0. when start with .', () => {
      performPresses(['.']);
      expectResultToBe('0.');

      state = initialState;

      performPresses(['.', '.']);
      expectResultToBe('0.');
    });

    it('create decimal number that start with zero when creating . at first', () => {
      performPresses(['.', 1, 2, 3]);
      expectResultToBe('0.123');
    });

    it('handle decimal number with multiple does', () => {
      performPresses(['.', 1, 2, 3, '.']);
      expectResultToBe('0.123');

      state = initialState;

      performPresses(['.', 1, 2, 3, '.', 4, 5]);
      expectResultToBe('0.12345');

      state = initialState;

      performPresses([2, '.', 1, 2, 3, '.', 4, 5]);
      expectResultToBe('2.12345');
    });
  });

  describe('Operator', () => {
    it('keep input after pressing', () => {
      performPresses([5, '+']);
      expectResultToBe('5');
    });

    it('should remove . after number that ends with dot', () => {
      performPresses([5, '.', '+']);
      expectResultToBe('5');
    });

    it('should keep the result when changing operators', () => {
      performPresses([5, '+', '-']);
      expectResultToBe('5');
    });

    it('should enable build second number after operator', () => {
      performPresses([5, 5, '+', 1, 2, 3]);
      expectResultToBe('123');
    });

    it('should perform math equation when pressing operator after equation', () => {
      performPresses([1, 0, '+', 1, 2, 3, '+']);
      expectResultToBe('133');
    });

    it('should init number feeds after operators', () => {
      performPresses([1, 0, '+', 2, 0, '+', 3, 5]);
      expectResultToBe('35');
    });

    it('should support multiple operation equations', () => {
      performPresses([1, 0, '+', 2, 0, '+', 3, '+']);
      expectResultToBe('33');
    });

    it('should calculate multiple operator types', () => {
      performPresses([6, '+', 4, '-', 2, '+']);
      expectResultToBe('8');
    });

    it('should enable replace operator', () => {
      performPresses([6, '/', '-', 4, '=']);
      expectResultToBe('2');
    });

    it('should enable replace operator - ', () => {
      performPresses([6, '-', 2, '/', '-', 4, '/']);
      expectResultToBe('0');
    });
  });

  describe('Equal Operator', () => {
    it('should return 0 when pressing at first', () => {
      performPresses(['=']);
      expectResultToBe('0');
    });

    it('should return math result', () => {
      performPresses([1, '+', 1, '=']);
      expectResultToBe('2');
    });

    it('should return the number if no operator', () => {
      performPresses([1, 1, '=']);
      expectResultToBe('11');
    });

    it('should reset input after =', () => {
      performPresses([1, 1, '=', 5]);
      expectResultToBe('5');
    });

    it('double equal should keep the same result if no operator', () => {
      performPresses([1, 1, '=', '=']);
      expectResultToBe('11');
    });

    it('should perform the same operator on result after double =', () => {
      performPresses([1, '+', 2, '=', '=']);
      expectResultToBe('5');
    });

    it('should add numbers to result', () => {
      performPresses([1, 1, '=', '=', '+', 2, '=']);
      expectResultToBe('13');
    });

    it('should enable math of decimal numbers', () => {
      performPresses([1, '.', 1, '+', 2, '=']);
      expectResultToBe('3.1');
    });

    it('should show dot after second number', () => {
      performPresses([1, '+', 2, '.']);
      expectResultToBe('2.');
    });

    it('should refer . after operator as 0.', () => {
      performPresses([1, '.', 1, '+', '.']);
      expectResultToBe('0.');
    });

    it('should do math with decimal numbers', () => {
      performPresses([1, '.', 1, '+', 2, '.', 1, '=']);
      expectResultToBe('3.2');
    });

    it('dot after operator result should create new number', () => {
      performPresses([1, '.', 1, '+', 2, '.', '.', 1, '=', '.']);
      expectResultToBe('0.');
    });

    it('should do math with floating point numbers bug', () => {
      // Given this weired JS behavior:
      expect(3.2 + 0.1).toBe(3.3000000000000003);

      performPresses([3, '.', 1, '+', 0, '.', 1, '=']);
      expectResultToBe('3.2');
    });

    it('should do math with decimal numbers', () => {
      performPresses([1, '.', 1, '+', 2, '.', '.', 1, '+', '.', 1, '=']);
      expectResultToBe('3.3');
    });

    it('reset equation after =', () => {
      performPresses([6, '=', 4, '=', '=']);
      expectResultToBe('4');
    });

    it('should reset equation on dot after =', () => {
      performPresses([5, '*', 2, '=', '.', 5, '=']);
      expectResultToBe('0.5');
    });
  });

  describe('+/- Operator', () => {
    it('do nothing on 0', () => {
      performPresses(['+/-']);
      expectResultToBe('0');
    });

    it('should invert number positive sign', () => {
      performPresses([5, '+/-']);
      expectResultToBe('-5');
    });

    it('should invert negative positive sign', () => {
      performPresses([0, '-', 5, '=', '+/-']);
      expectResultToBe('5');
    });

    it('should invert result if after result', () => {
      performPresses([0, '-', 5, '=', '+/-', '+', 2, '=']);
      expectResultToBe('7');
    });

    it('should be able to build negative number', () => {
      performPresses([5, '+/-', '+', 2, '=']);
      expectResultToBe('-3');
    });

    it('should not effect if insert before', () => {
      performPresses(['+/-', 5, '=']);
      expectResultToBe('5');
    });

    it('should change the inserted number for math', () => {
      performPresses([3, '+', 2, '+/-', '=']);
      expectResultToBe('1');
    });
  });

  describe('% Operator', () => {
    it('should divide number by 100', () => {
      performPresses([5, '%']);
      expectResultToBe('0.05');
    });

    it('should operate on negative numbers', () => {
      performPresses([0, '-', 5, '=', '%']);
      expectResultToBe('-0.05');
    });

    it('should operate on the number input after =', () => {
      performPresses([0, '-', 5, '=', '%', '+', 2, '=']);
      expectResultToBe('1.95');
    });

    it('should work on first number', () => {
      performPresses([5, '%', '+', 2, '=']);
      expectResultToBe('2.05');
    });

    it('should not effect if insert before', () => {
      performPresses(['%', 5, '=']);
      expectResultToBe('5');
    });

    it('should change the inserted number for math', () => {
      performPresses([3, '+', 2, '%', '=']);
      expectResultToBe('3.02');
    });
  });
});

export {};
