import React from 'react';
import { IngredientModel } from '../../models/ingredient-model';
import styles from './order-details.module.css';
import OrderPlacedImage from '../../images/order_placed.svg';
import PropTypes from 'prop-types';
import ingredientPropType from '../../models/ingredient-model-prop-type';

const OrderDetails = ({ingredients}: {ingredients: IngredientModel[]}) => {
  return (
    <div className={styles.Container}>
      <p className="text text_type_digits-large mt-2 glow_text">12345</p>
      <p className="text text_type_main-medium mt-3 mb-5">
        идентификатор заказа
      </p>

      <img src={OrderPlacedImage} alt='' />

      <p className="text text_type_main-medium mt-5 " style={{fontSize: 14}}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-medium mt-2 mb-5 gray_text" style={{fontSize: 14}}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

OrderDetails.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default OrderDetails;