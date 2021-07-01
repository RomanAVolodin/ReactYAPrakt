import { initialState, ingredientsSlice as slice, getIngredients } from './ingredients';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import feedFakeData from '../../../utils/feed-fake-data';
import { ingredientsApiUrl } from '../../../utils/apiURLs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Ingredients slice', () => {
  const reducer = slice.reducer;

  afterEach(() => {
    fetchMock.restore();
  });

  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Ингредиенты загружены', () => {
    expect(
      reducer(initialState, { type: 'ingredients/ingredientsFetched', payload: feedFakeData[0] }),
    ).toEqual({
      ...initialState,
      isFetching: false,
      isErrorWhileFetching: false,
      ingredients: feedFakeData[0],
    });
  });

  it('Ингредиенты загружаются', () => {
    expect(reducer(initialState, { type: 'ingredients/ingredientsAreFetching' })).toEqual({
      ...initialState,
      isFetching: true,
      isErrorWhileFetching: false,
    });
  });

  it('State Ошибка при загрузке ингредиентов', () => {
    expect(reducer(initialState, { type: 'ingredients/ingredientsFetchError' })).toEqual({
      ...initialState,
      isFetching: false,
      isErrorWhileFetching: true,
    });
  });

  it('Загрузка ингредиентов', () => {
    fetchMock.getOnce(ingredientsApiUrl, {
      body: { success: true, data: feedFakeData[0] },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: 'ingredients/ingredientsAreFetching', payload: undefined },
      { type: 'ingredients/ingredientsFetched', payload: feedFakeData[0] },
    ];
    const store = mockStore(initialState);

    return store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Ошибка при загрузке ингредиентов', () => {
    fetchMock.getOnce(ingredientsApiUrl, {
      body: { success: false, data: [] },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: 'ingredients/ingredientsAreFetching', payload: undefined },
      { type: 'ingredients/ingredientsFetchError', payload: undefined },
    ];
    const store = mockStore(initialState);

    return store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
