import { CLEAR_INGREDIENT_PREVIEW, SET_INGREDIENT_AS_PREVIEW } from '../actions/ingredient-detail';
import { fakeIngredient } from '../../utils/tests-utils';
import {
  getIngredientById,
  ingredientsDetailedReducer as reducer,
  initialState,
} from './ingredient-detail';
import feedFakeData from '../../utils/feed-fake-data';
import { getIngredients } from '../slices/ingredients';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('IngredientDetail редюсер', () => {
  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Возвращает ингредиент при передаче его в превью', () => {
    expect(
      reducer(initialState, {
        type: SET_INGREDIENT_AS_PREVIEW,
        ingredient: fakeIngredient,
      }),
    ).toEqual({ ingredient: fakeIngredient });
  });

  it('Возвращает initialState при очистке store', () => {
    expect(
      reducer(initialState, {
        type: CLEAR_INGREDIENT_PREVIEW,
        ingredient: fakeIngredient,
      }),
    ).toEqual(initialState);
  });

  it('Получить ингредиент по ID', () => {
    const expectedActions = [
      { type: CLEAR_INGREDIENT_PREVIEW },
      { type: SET_INGREDIENT_AS_PREVIEW, ingredient: feedFakeData[0].ingredients[0] },
    ];
    const store = mockStore({ ingredients: { ingredients: feedFakeData[0].ingredients } });

    return store.dispatch(getIngredientById(feedFakeData[0].ingredients[0]._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Получить ингредиент по не существующему ID', () => {
    const expectedActions = [{ type: CLEAR_INGREDIENT_PREVIEW }];
    const store = mockStore({ ingredients: { ingredients: feedFakeData[0].ingredients } });

    return store.dispatch(getIngredientById('fake_id')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
