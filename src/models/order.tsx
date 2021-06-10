import PropTypes from 'prop-types';
import ingredientPropType, { IngredientModel } from './ingredient-model';

export interface Order {
  name: string;
  number: string;
  status: 'done' | 'canceled' | 'pending' | string;
  ingredients: IngredientModel[];
}

export const orderPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
});
