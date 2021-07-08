import { IIngredientModel } from '../../../models/ingredient-model';
import { SliceActions } from '../../types/slice-actions-type';
import { ingredientsSlice } from './ingredients';

export type TIngredientsStateType = {
  ingredients: IIngredientModel[];
  isFetching: boolean;
  isErrorWhileFetching: boolean;
};

export type TIngredientsSliceActionsType = SliceActions<typeof ingredientsSlice.actions>;