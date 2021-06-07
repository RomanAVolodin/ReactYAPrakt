import { IngredientModel } from '../../models/ingredient-model';
import { SET_INGREDIENT_DRAGGING, CLEAR_INGREDIENT_DRAGGING } from '../actions/ingredient-dragging';

interface IngredientsDraggingAction {
  type: string;
  ingredient: IngredientModel;
}

interface IngredientsDraggingStateType {
  ingredient: IngredientModel | null;
}

const initialState: IngredientsDraggingStateType = {
  ingredient: null,
};

export const ingredientsDraggingReducer = (
  state = initialState,
  action: IngredientsDraggingAction,
) => {
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
