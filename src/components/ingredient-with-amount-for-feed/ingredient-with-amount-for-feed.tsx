import React from 'react';
import { IngredientWithAmount, ingredientWithAmountPropType } from '../../models/ingredient-model';
import styles from './ingredient-with-amount-for-feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientWithAmountForFeed = ({
  ingredientWithAmount,
}: {
  ingredientWithAmount: IngredientWithAmount;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_name}>
        <div className={styles.ingredient_image}>
          <img
            src={ingredientWithAmount.ingredient.image_mobile}
            alt={ingredientWithAmount.ingredient.name}
          />
        </div>
        <p className="text text_type_main-default ml-5">{ingredientWithAmount.ingredient.name}</p>
      </div>
      <div className={styles.amount_price}>
        <p className="text text_type_digits-default">{ingredientWithAmount.amount}</p>
        <p className="text text_type_main-default ml-2 mr-2">x</p>
        <p className="text text_type_digits-default mr-3">
          {ingredientWithAmount.ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

IngredientWithAmountForFeed.propTypes = {
  ingredientWithAmount: ingredientWithAmountPropType.isRequired,
};

export default IngredientWithAmountForFeed;
