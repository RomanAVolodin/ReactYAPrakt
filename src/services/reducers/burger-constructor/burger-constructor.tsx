import { IngredientModel, IngredientTypes } from '../../../models/ingredient-model';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  WRAP_INGREDIENTS_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
} from '../../actions/burger-constructor';

export interface IAddIngredientToConstructor {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly ingredient: IngredientModel;
}

export interface IRemoveIngredientFromConstructor {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly ingredient: IngredientModel;
}

export interface IWrapIngredientsInConstructor {
  readonly type: typeof WRAP_INGREDIENTS_IN_CONSTRUCTOR;
  readonly indexesOfTransferedElement: { from: number; to: number };
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type IngredientsReducerActionsType =
  | IAddIngredientToConstructor
  | IRemoveIngredientFromConstructor
  | IWrapIngredientsInConstructor
  | IClearConstructor;

interface ConstructorStateType {
  ingredients: IngredientModel[];
  finalPrice: number;
}

export const initialState: ConstructorStateType = {
  ingredients: [],
  finalPrice: 0,
};

const calculateFinalPrice = (ingredients: IngredientModel[]) => {
  return ingredients.reduce((acc, ing) => {
    return acc + ing.price;
  }, 0);
};

export const constructorReducer = (
  state = initialState,
  action: IngredientsReducerActionsType,
): ConstructorStateType => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      let newIngredients = [];
      if (action.ingredient.type === IngredientTypes.Bun) {
        const chosenIngredients = state.ingredients.filter(
          (ing) => ing.type !== IngredientTypes.Bun,
        );
        newIngredients = [action.ingredient, ...chosenIngredients, action.ingredient];
      } else {
        const bun = state.ingredients.find((ing) => ing.type === IngredientTypes.Bun);
        const chosenIngredients = state.ingredients.filter(
          (ing) => ing.type !== IngredientTypes.Bun,
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
