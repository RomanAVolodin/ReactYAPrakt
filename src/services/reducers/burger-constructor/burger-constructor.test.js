import { constructorReducer as reducer, initialState } from './burger-constructor';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  WRAP_INGREDIENTS_IN_CONSTRUCTOR,
} from '../../actions/burger-constructor';
import {
  fakeIngredient,
  fakeIngredientBun,
  fakeIngredientBun2,
  fakeIngredientMain,
} from '../../../utils/tests-utils';

describe('BurgerConstrucor reducer', () => {
  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Добавление ингредиента в пустой бургер', () => {
    expect(
      reducer(initialState, {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        ingredient: fakeIngredient,
        indexesOfTransferedElement: { from: 0, to: 0 },
      }),
    ).toEqual({ ...initialState, ingredients: [fakeIngredient], finalPrice: fakeIngredient.price });
  });

  it('Добавление ингредиента к булкам, он помещается между ними', () => {
    const state = {
      ...initialState,
      ingredients: [fakeIngredientBun, fakeIngredientBun],
      finalPrice: 0,
    };
    expect(
      reducer(state, {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        ingredient: fakeIngredient,
        indexesOfTransferedElement: { from: 0, to: 0 },
      }),
    ).toEqual({
      ...initialState,
      ingredients: [fakeIngredientBun, fakeIngredient, fakeIngredientBun],
      finalPrice: fakeIngredientBun.price * 2 + fakeIngredient.price,
    });
  });

  it('При добавлении булки она добавляется два раза, в начало и в конец бургера', () => {
    const state = {
      ...initialState,
      ingredients: [fakeIngredient],
      finalPrice: fakeIngredient.price,
    };
    const expectedPrice = fakeIngredient.price + fakeIngredientBun.price * 2;
    const expectedState = {
      ...initialState,
      ingredients: [fakeIngredientBun, fakeIngredient, fakeIngredientBun],
      finalPrice: expectedPrice,
    };
    expect(
      reducer(state, {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        ingredient: fakeIngredientBun,
        indexesOfTransferedElement: { from: 0, to: 0 },
      }),
    ).toEqual(expectedState);
  });

  it('При добавлении булки она заменяет уже добавленную', () => {
    const state = {
      ...initialState,
      ingredients: [fakeIngredientBun, fakeIngredient, fakeIngredientBun],
      finalPrice: 0,
    };
    const expectedPrice = fakeIngredient.price + fakeIngredientBun2.price * 2;
    const expectedState = {
      ...initialState,
      ingredients: [fakeIngredientBun2, fakeIngredient, fakeIngredientBun2],
      finalPrice: expectedPrice,
    };
    expect(
      reducer(state, {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        ingredient: fakeIngredientBun2,
        indexesOfTransferedElement: { from: 0, to: 0 },
      }),
    ).toEqual(expectedState);
  });

  it('Удаление ингредиента из конструктора', () => {
    const state = {
      ...initialState,
      ingredients: [fakeIngredientBun, fakeIngredient, fakeIngredientBun],
      finalPrice: fakeIngredient.price,
    };
    const expectedPrice = fakeIngredientBun.price * 2;
    const expectedState = {
      ...initialState,
      ingredients: [fakeIngredientBun, fakeIngredientBun],
      finalPrice: expectedPrice,
    };
    expect(
      reducer(state, {
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        ingredient: fakeIngredient,
        indexesOfTransferedElement: { from: 0, to: 0 },
      }),
    ).toEqual(expectedState);
  });

  it('Сортировка ингредиентов', () => {
    const state = {
      ...initialState,
      ingredients: [fakeIngredient, fakeIngredientMain],
      finalPrice: fakeIngredient.price + fakeIngredientMain.price,
    };
    const expectedState = {
      ...initialState,
      ingredients: [fakeIngredientMain, fakeIngredient],
      finalPrice: fakeIngredient.price + fakeIngredientMain.price,
    };
    expect(
      reducer(state, {
        type: WRAP_INGREDIENTS_IN_CONSTRUCTOR,
        ingredient: null,
        indexesOfTransferedElement: { from: 0, to: 1 },
      }),
    ).toEqual(expectedState);
  });
});
