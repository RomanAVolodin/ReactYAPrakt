import { IngredientModel } from '../../../models/ingredient-model';
import {
  SET_INGREDIENT_DRAGGING,
  CLEAR_INGREDIENT_DRAGGING,
} from '../../actions/ingredient-dragging';

export interface ISetIngredientDragging {
  readonly type: typeof SET_INGREDIENT_DRAGGING;
  readonly ingredient: IngredientModel;
}

export interface IClearIngredientDragging {
  readonly type: typeof CLEAR_INGREDIENT_DRAGGING;
  readonly ingredient: IngredientModel;
}

export type IIngredientDraggingActions = ISetIngredientDragging | IClearIngredientDragging;

interface IngredientsDraggingStateType {
  ingredient: IngredientModel | null;
}

export const initialState: IngredientsDraggingStateType = {
  ingredient: null,
};

export const ingredientsDraggingReducer = (
  state = initialState,
  action: IIngredientDraggingActions,
): IngredientsDraggingStateType => {
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
