import { rootReducer as reducer } from './index';

describe('Index combine редюсер', () => {
  it('Должен вернуть state по умолчанию', () => {
    const state = { ingredients: [], isFetching: false, isErrorWhileFetching: false };
    expect(reducer(undefined, {}).ingredients).toEqual(state);
  });
});
