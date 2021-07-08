import { CLEAR_INGREDIENT_PREVIEW, SET_INGREDIENT_AS_PREVIEW } from '../../actions/ingredient-detail';
import { IIngredientModel } from '../../../models/ingredient-model';

export interface ISetIngredientAsPreview {
  readonly type: typeof SET_INGREDIENT_AS_PREVIEW;
  readonly ingredient: IIngredientModel;
}

export interface IClearIngredientAsPreview {
  readonly type: typeof CLEAR_INGREDIENT_PREVIEW;
  readonly ingredient?: IIngredientModel;
}

export type TIngredientsDetailViewActions = ISetIngredientAsPreview | IClearIngredientAsPreview;

export type TIngredientsDetailViewStateType = {
  ingredient: IIngredientModel | null;
};
