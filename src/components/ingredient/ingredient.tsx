import React, { useContext, useState } from 'react';
import { IngredientModel } from '../../models/ingredient-model';
import styles from './ingredient.module.css';
import { CheckMarkIcon, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal-window/modal';
import IngredientDetails from '../ingredient-detailed/ingredient-details';
import ingredientPropType from '../../models/ingredient-model-prop-type';
import { ChosenIngredientsContext } from '../services/chosen-ingredients-context';
import { IngredientsReducerAction } from '../../models/ingredients-reducer-type';

const Ingredient = ({ ingredient }: { ingredient: IngredientModel }) => {

  const [modalShown, setModalShown] = useState<boolean>(false)
  const { chosenIngredients, ingredientsDispatcher } = useContext(ChosenIngredientsContext);

  const increaseAmount = () => {
    ingredientsDispatcher({ type: IngredientsReducerAction.Add, ingredient: { ...ingredient } });
  };

  const amount = () => {
    return chosenIngredients.reduce( (accumulator: number, currentValue: IngredientModel) => {
      return currentValue._id === ingredient._id ? accumulator + 1 : accumulator
    }, 0);
  }

  const showModal = () => {
    setModalShown(true);
  }

  const hideModal = () => {
    setModalShown(false);
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
      {amount() > 0 && <Counter count={amount()} size="small" />}

      <Modal title="Детали ингредиента" show={modalShown} onCloseClick={hideModal}>
          <IngredientDetails ingredient={ingredient} />
      </Modal>

      <div className={styles.DetailPopup} onClick={increaseAmount}>
        <CheckMarkIcon type="success" />
      </div>


    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired
};

export default Ingredient;
