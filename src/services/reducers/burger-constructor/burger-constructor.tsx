import { IIngredientModel, EIngredientTypes } from '../../../models/ingredient-model';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  WRAP_INGREDIENTS_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
} from '../../actions/burger-constructor';
import { TConstructorStateType, TIngredientsReducerActionsType } from './types';

export const initialState: TConstructorStateType = {
  ingredients: [],
  finalPrice: 0,
};

const calculateFinalPrice = (ingredients: IIngredientModel[]) => {
  return ingredients.reduce((acc, ing) => {
    return acc + ing.price;
  }, 0);
};

export const constructorReducer = (
  state = initialState,
  action: TIngredientsReducerActionsType,
): TConstructorStateType => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      let newIngredients = [];
      if (action.ingredient.type === EIngredientTypes.Bun) {
        const chosenIngredients = state.ingredients.filter(
          (ing) => ing.type !== EIngredientTypes.Bun,
        );
        newIngredients = [action.ingredient, ...chosenIngredients, action.ingredient];
      } else {
        const bun = state.ingredients.find((ing) => ing.type === EIngredientTypes.Bun);
        const chosenIngredients = state.ingredients.filter(
          (ing) => ing.type !== EIngredientTypes.Bun,
        );
        newIngredients = bun
          ? [bun, ...chosenIngredients, action.ingredient, bun]
          : [...chosenIngredients, action.ingredient];
      }
      return {
        ...state,
        ingredients: newIngredients,
        finalPrice: calculateFinalPrice(newIngredients),
      };
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const newIngredients = state.ingredients.filter((ing) => ing !== action.ingredient);
      return {
        ...state,
        ingredients: newIngredients,
        finalPrice: calculateFinalPrice(newIngredients),
      };
    }

    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [],
        finalPrice: calculateFinalPrice([]),
      };
    }

    case WRAP_INGREDIENTS_IN_CONSTRUCTOR: {
      const newIngredients = [...state.ingredients];
      const cutOut = newIngredients.splice(action.indexesOfTransferedElement.from, 1);
      newIngredients.splice(action.indexesOfTransferedElement.to, 0, cutOut[0]);
      return { ...state, ingredients: newIngredients };
    }

    default: {
      return state;
    }
  }
};
