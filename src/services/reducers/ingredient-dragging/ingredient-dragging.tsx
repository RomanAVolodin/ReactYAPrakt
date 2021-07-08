import {
  SET_INGREDIENT_DRAGGING,
  CLEAR_INGREDIENT_DRAGGING,
} from '../../actions/ingredient-dragging';
import { TIngredientDraggingActions, TIngredientsDraggingStateType } from './types';


export const initialState: TIngredientsDraggingStateType = {
  ingredient: null,
};

export const ingredientsDraggingReducer = (
  state = initialState,
  action: TIngredientDraggingActions,
): TIngredientsDraggingStateType => {
  switch (action.type) {
    case SET_INGREDIENT_DRAGGING: {
      return { ...state, ingredient: action.ingredient };
    }
    case CLEAR_INGREDIENT_DRAGGING: {
      return { ...state, ingredient: null };
    }
    default: {
      return state;
    }
  }
};
