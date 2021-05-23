import { IngredientModel } from '../../models/ingredient-model';
import { SET_INGREDIENT_AS_PREVIEW, CLEAR_INGREDIENT_PREVIEW } from '../actions/ingredient-detail';


interface IngredientsDetailviewAction {
  type: string
  ingredient: IngredientModel
}

interface IngredientsDetailviewStateType  {
  ingredient: IngredientModel | null
}

const initialState: IngredientsDetailviewStateType  = {
  ingredient: null
}


export const ingredientsDetailedReducer = (state = initialState, action: IngredientsDetailviewAction) => {
  switch (action.type) {
    case SET_INGREDIENT_AS_PREVIEW: {
      return {...state, ingredient: action.ingredient}
    }
    case CLEAR_INGREDIENT_PREVIEW: {
      return {...state, ingredient: null}
    }
    default: {
      return state;
    }
  }
};