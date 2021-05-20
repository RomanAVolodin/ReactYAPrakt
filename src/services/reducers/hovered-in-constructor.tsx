import { IngredientModel } from '../../models/ingredient-model';
import { CLEAR_HOVERED_IN_CONSTRUCTOR, SET_HOVERED_IN_CONSTRUCTOR } from '../actions/hovered-in-constructor';


interface IngredientHoverAction {
  type: string
  ingredient: IngredientModel
}

interface IngredientsHoverStateType  {
  ingredient: IngredientModel | null
}

const initialState: IngredientsHoverStateType  = {
  ingredient: null
}


export const ingredientHoverInconstructorReducer = (state = initialState, action: IngredientHoverAction) => {
  switch (action.type) {
    case SET_HOVERED_IN_CONSTRUCTOR: {
      return {...state, ingredient: action.ingredient}
    }
    case CLEAR_HOVERED_IN_CONSTRUCTOR: {
      return {...state, ingredient: null}
    }
    default: {
      return state;
    }
  }
};