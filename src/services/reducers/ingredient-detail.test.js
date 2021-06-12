import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { CLEAR_INGREDIENT_PREVIEW, SET_INGREDIENT_AS_PREVIEW } from '../actions/ingredient-detail';
import { fakeIngredient } from '../../utils/tests-utils';
import { getIngredientById, ingredientsDetailedReducer as reducer, initialState } from './ingredient-detail';
import ingredients from '../../utils/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('IngredientDetail редюсер', () => {

  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('Возвращает ингредиент при передаче его в превью', () => {
    expect(reducer(initialState, {
      type: SET_INGREDIENT_AS_PREVIEW,
      ingredient: fakeIngredient
    })).toEqual({ ingredient: fakeIngredient });
  });

  it('Возвращает initialState при очистке store', () => {
    expect(reducer(initialState, {
      type: CLEAR_INGREDIENT_PREVIEW,
      ingredient: fakeIngredient
    })).toEqual(initialState);
  });

});