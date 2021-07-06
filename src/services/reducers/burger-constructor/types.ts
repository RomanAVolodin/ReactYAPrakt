import {
  ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  WRAP_INGREDIENTS_IN_CONSTRUCTOR,
} from '../../actions/burger-constructor';
import { IIngredientModel } from '../../../models/ingredient-model';

export interface IAddIngredientToConstructor {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly ingredient: IIngredientModel;
}

export interface IRemoveIngredientFromConstructor {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly ingredient: IIngredientModel;
}

export interface IWrapIngredientsInConstructor {
  readonly type: typeof WRAP_INGREDIENTS_IN_CONSTRUCTOR;
  readonly indexesOfTransferedElement: { from: number; to: number };
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TIngredientsReducerActionsType =
  | IAddIngredientToConstructor
  | IRemoveIngredientFromConstructor
  | IWrapIngredientsInConstructor
  | IClearConstructor;

export type TConstructorStateType = {
  ingredients: IIngredientModel[];
  finalPrice: number;
};