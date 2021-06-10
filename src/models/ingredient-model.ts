import PropTypes from 'prop-types';
import ingredientPropType from './ingredient-model-prop-type';

export interface IngredientModel {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  description?: string;
  __v: number;
}

export enum IngredientTypes {
  Bun = 'bun',
  Sause = 'sauce',
  Main = 'main',
}

export interface IngredientsArray {
  ingredients: IngredientModel[];
}

export interface IngredientWithAmount {
  ingredient: IngredientModel;
  amount: number;
}

export const ingredientWithAmountPropType = PropTypes.shape({
  ingredient: ingredientPropType.isRequired,
  amount: PropTypes.number.isRequired,
});

export default ingredientPropType;
