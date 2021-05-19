import { IngredientModel } from './ingredient-model';

export enum  IngredientsReducerAction {
  Add,
  Remove
}

export type IngredientsReducerType = {
  type: IngredientsReducerAction
  ingredient: IngredientModel
}