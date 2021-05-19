import {
  INGREDIENTS_IS_FETCHING,
  INGREDIENTS_FETCHING_OK,
  INGREDIENTS_FETCHING_FAIL
} from '../actions/ingredients';
import { IngredientModel } from '../../models/ingredient-model';
import { toast } from 'react-toastify';

interface IngredientsFetchingAction {
  type: string
  ingredients: IngredientModel[],
  message?: string
}

interface IngredientsStateType  {
  ingredients: IngredientModel[],
  isFetching: boolean,
  isErrorWhileFetching: boolean
}

const initialState: IngredientsStateType  = {
  ingredients: [],
  isFetching: false,
  isErrorWhileFetching: false
}


export const ingredientsReducer = (state = initialState, action: IngredientsFetchingAction) => {
  switch (action.type) {
    case INGREDIENTS_IS_FETCHING: {
      return {...state, isFetching: true, isErrorWhileFetching: false}
    }
    case INGREDIENTS_FETCHING_OK: {
      return {...state, ingredients: action.ingredients, isFetching: false, isErrorWhileFetching: false}
    }
    case INGREDIENTS_FETCHING_FAIL: {
      toast.error(action.message)
      return {...state, ingredients: [], isFetching: false, isErrorWhileFetching: true}
    }
    default: {
      return state;
    }
  }
};