import { ingredientsDraggingReducer as reducer, initialState } from './ingredient-dragging';
import { CLEAR_INGREDIENT_DRAGGING, SET_INGREDIENT_DRAGGING } from '../actions/ingredient-dragging';
import { fakeIngredient } from '../../utils/tests-utils';

describe('IngredientsDraggingReducer', () => {
  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Выбор ингредиента для перетаскивания', () => {
    expect(
      reducer(initialState, { type: SET_INGREDIENT_DRAGGING, ingredient: fakeIngredient }),
    ).toEqual({
      ...initialState,
      ingredient: fakeIngredient,
    });
  });

  it('Сброс ингредиента для перетаскивания', () => {
    expect(
      reducer(
        {
          ...initialState,
          ingredient: fakeIngredient,
        },
        { type: CLEAR_INGREDIENT_DRAGGING, ingredient: fakeIngredient },
      ),
    ).toEqual(initialState);
  });
});
