import { IngredientModel, IngredientTypes } from '../../models/ingredient-model';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  PLACE_INGREDIENT_AFTER,
  PLACE_INGREDIENT_BEFORE
} from '../actions/burger-constructor';


export type IngredientsReducerActionType = {
  type: string
  ingredient: IngredientModel
  ingredientReorderWith: IngredientModel
}

interface ConstructorStateType  {
  ingredients: IngredientModel[],
  finalPrice: number
}

const initialState: ConstructorStateType  = {
  ingredients: [],
  finalPrice: 0
}

const calculateFinalPrice = (ingredients: IngredientModel[]) => {
  return ingredients.reduce((acc: number, ing: IngredientModel) => {
    return acc + ing.price;
  }, 0);
};

export const constructorReducer = (state = initialState, action: IngredientsReducerActionType) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      let newIngredients = []
      if (action.ingredient.type === IngredientTypes.Bun) {
        const chosenIngredients = state.ingredients.filter((ing: IngredientModel) => ing.type !== IngredientTypes.Bun)
        newIngredients = [action.ingredient, ...chosenIngredients, action.ingredient]
      } else {
        const bun = state.ingredients.find( ing => ing.type === IngredientTypes.Bun)
        const chosenIngredients  = state.ingredients.filter((ing: IngredientModel) => ing.type !== IngredientTypes.Bun)
        newIngredients = bun ?  [bun, ...chosenIngredients, action.ingredient, bun] :  [...chosenIngredients, action.ingredient]
      }
      return { ...state, ingredients: newIngredients, finalPrice: calculateFinalPrice(newIngredients)}
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const newIngredients = state.ingredients.filter((ing: IngredientModel) => ing !== action.ingredient);
      return {...state, ingredients: newIngredients, finalPrice: calculateFinalPrice(newIngredients)}
    }

    case PLACE_INGREDIENT_AFTER: {
      const newIngredients = state.ingredients.filter((ing: IngredientModel) => ing !== action.ingredient);
      const index = newIngredients.findIndex( ing => ing === action.ingredientReorderWith);
      newIngredients.splice(index + 1, 0, action.ingredient);
      return {...state, ingredients: newIngredients}
    }

    case PLACE_INGREDIENT_BEFORE: {
      const newIngredients = state.ingredients.filter((ing: IngredientModel) => ing !== action.ingredient);
      const index = newIngredients.findIndex( ing => ing === action.ingredientReorderWith);
      newIngredients.splice(index, 0, action.ingredient);
      return {...state, ingredients: newIngredients}
    }

    default: {
      return state;
    }
  }
};
