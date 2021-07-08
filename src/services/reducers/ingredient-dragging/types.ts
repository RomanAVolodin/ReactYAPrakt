import { CLEAR_INGREDIENT_DRAGGING, SET_INGREDIENT_DRAGGING } from '../../actions/ingredient-dragging';
import { IIngredientModel } from '../../../models/ingredient-model';

export interface ISetIngredientDragging {
  readonly type: typeof SET_INGREDIENT_DRAGGING;
  readonly ingredient: IIngredientModel;
}

export interface IClearIngredientDragging {
  readonly type: typeof CLEAR_INGREDIENT_DRAGGING;
  readonly ingredient: IIngredientModel;
}

export type TIngredientDraggingActions = ISetIngredientDragging | IClearIngredientDragging;

export type TIngredientsDraggingStateType = {
  ingredient: IIngredientModel | null;
};