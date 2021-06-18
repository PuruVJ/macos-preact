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
});

export {};
