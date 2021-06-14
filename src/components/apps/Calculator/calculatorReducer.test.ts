import { CalculatorKeyT, calculatorReducer, initialState, IState } from './calculatorReducer';

let state: IState = initialState;
describe('calculatorReducer', () => {
  beforeEach(() => {
    state = initialState;
  });

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

  it('enable concatenate numbers as input', () => {
    testEquation([1, 2, 3], ['1', '12', '123']);
  });

  it('reset state when pressing AC', () => {
    testEquation([1, 'AC', 3, 4], ['1', '0', '3', '34']);
    testEquation(
      [1, '+', 1, 'AC', 3, '-', 5, '=', 'AC'],
      ['1', '1', '1', '0', '3', '3', '5', '-2', '0'],
    );
    testEquation(['AC', 'AC', 1, 'AC'], ['0', '0', '1', '0']);
  });

  it('should create decimal number', () => {
    testEquation([1, '.', '.', 3, '.'], ['1', '1.', '1.', '1.3', '1.3']);
  });

  it('start with dot', () => {
    testEquation(['.'], ['0.']);
    testEquation(['.', 4], ['0.', '0.4']);
    testEquation(['.', 4, '.'], ['0.', '0.4', '0.4']);
    testEquation(['.', 4, '.', '+', 5, '='], ['0.', '0.4', '0.4', '0.4', '5', '5.4']);
    testEquation(
      ['.', 4, '.', '+', 5, '.', 1, '='],
      ['0.', '0.4', '0.4', '0.4', '5', '5.', '5.1', '5.5'],
    );
    testEquation(['.', '.', '+', 1, '='], ['0.', '0.', '0', '1', '1']);
    testEquation(['.', '.', '+'], ['0.', '0.', '0']);
    testEquation([1, '=', '.'], ['1', '1', '0.']);
  });

  it('should simple Math', () => {
    testEquation([6, '+', 7, '='], ['6', '6', '7', '13']);
    testEquation([1, '+', 3, '='], ['1', '1', '3', '4']);
    testEquation([5, 5, '+', 2, 3, '='], ['5', '55', '55', '2', '23', '78']);
  });

  it('should equations with more than one operator', () => {
    testEquation([1, 0, '+', 2, 4, '+', 5, '='], ['1', '10', '10', '2', '24', '34', '5', '39']);
    testEquation(
      [1, 0, '+', 2, 4, '+', 5, '+', 1, 0, '='],
      ['1', '10', '10', '2', '24', '34', '5', '39', '1', '10', '49'],
    );
  });

  it('should double equal should calculate same operator', () => {
    testEquation([1, 0, '+', 2, 4, '=', '='], ['1', '10', '10', '2', '24', '34', '58']);
  });

  it('should more than two equal at row', () => {
    testEquation([2, 4, '+', 1, 0, '=', '=', '='], ['2', '24', '24', '1', '10', '34', '44', '54']);
  });

  it('should operator after equal', () => {
    testEquation([8, '*', 9, '=', '+', 5, '='], ['8', '8', '9', '72', '72', '5', '77']);
  });

  it('should change operator', () => {
    testEquation(
      [8, '+', 9, '+', '*', '-', 1, '+', '*', 2, '='],
      ['8', '8', '9', '17', '17', '17', '1', '16', '16', '2', '32'],
    );
  });

  it('should change operator', () => {
    testEquation(
      [8, '+', 9, '+', '*', '-', 1, '+', '*', 2, '='],
      ['8', '8', '9', '17', '17', '17', '1', '16', '16', '2', '32'],
    );
  });
});

export {};
