import React, { useState } from 'react';
import { IngredientModel } from '../../models/ingredient-model';
import styles from './ingredient.module.css';
import { CheckMarkIcon, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal-window/modal';
import IngredientDetails from './modal-detailed/ingredient-details';
import PropTypes from 'prop-types';
import ingredientPropType from '../../models/ingredient-model-prop-type';

const Ingredient = ({
  ingredient,
  onChoose,
}: {
  ingredient: IngredientModel;
  onChoose: CallableFunction;
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [modalShown, setModalShown] = useState<boolean>(false)

  const increaseAmount = () => {
    if (amount > 0 && ingredient.type === 'bun') return;
    onChoose(ingredient);
    setAmount(amount + 1);
  };

  const showModal = () => {
    setModalShown(!modalShown);
  }

  return (
    <div
      className={[styles.ingredient_container, 'mt-2 text text_type_main-default'].join(' ')}
    >
      <img src={ingredient.image_mobile} alt="" onClick={showModal} />
      <div className={[styles.price, "text text_type_digits-default"].join(" ")}>
        <span className="mr-1">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p>{ingredient.name}</p>
      {amount > 0 && <Counter count={amount} size="small" />}

      <Modal title="Детали ингредиента" show={modalShown} onCloseClick={showModal}>
          <IngredientDetails ingredient={ingredient} />
      </Modal>

      <div className={styles.DetailPopup} onClick={increaseAmount}>
        <CheckMarkIcon type="success" />
      </div>


    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onChoose: PropTypes.func.isRequired,
};

export default Ingredient;
