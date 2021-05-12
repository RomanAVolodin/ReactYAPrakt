import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { IngredientModel, IngredientTypes } from '../../models/ingredient-model';
import styles from './burger-constructor.module.css';
import ingredientPropType from '../../models/ingredient-model-prop-type';
import Modal from '../modal-window/modal';
import OrderDetails from '../order-details/order-details';
import { ChosenIngredientsContext } from '../services/chosen-ingredients-context';
import { IngredientsReducerAction } from '../../models/ingredients-reducer-type';

const BurgerConstructor = () => {

  const [orderCompleted, setOrderCompleted] = useState<boolean>(false)
  const { chosenIngredients, ingredientsDispatcher } = useContext(ChosenIngredientsContext);

  const calculateFinalPrice = () => {
    return chosenIngredients.reduce((acc: number, ing: IngredientModel) => {
      return acc + ing.price;
    }, 0);
  };

  const placeOrder = () => {
    setOrderCompleted(!orderCompleted)
  }

  const chosenBun = chosenIngredients[0].type === IngredientTypes.Bun ? chosenIngredients[0] : null

  return (
    <section className={styles.container}>
      { chosenBun &&
        <div className="mt-1">
          <ConstructorElement
            thumbnail={chosenBun.image_mobile}
            text={chosenBun.name}
            price={chosenBun.price}
            isLocked={true}
            type="top"
          />
      </div> }

      <div
        className={[
          styles.ingredients_scrollable_container,
          chosenIngredients.filter((i: IngredientModel) => i.type !== IngredientTypes.Bun).length > 5
            ? styles.scrollbar_appeared
            : null,
        ].join(' ')}
      >

        {chosenIngredients
          .filter((i: IngredientModel) => i.type !== IngredientTypes.Bun)
          .map((ing: IngredientModel, index: number) => (
            <div key={index} className={[styles.constructor_element_container, 'mt-1'].join(' ')}>
              <DragIcon type="primary" />
              <ConstructorElement
                thumbnail={ing.image_mobile}
                text={ing.name}
                price={ing.price}
                handleClose={() => ingredientsDispatcher({type: IngredientsReducerAction.Remove, ingredient: ing})}
              />
            </div>
          ))}
      </div>

      { chosenBun &&
        <div className="mt-1">
          <ConstructorElement
            thumbnail={chosenBun.image_mobile}
            text={chosenBun.name}
            price={chosenBun.price}
            isLocked={true}
            type="bottom"
          />
      </div> }

      {calculateFinalPrice() > 0 && (
        <div className={[styles.final_price, 'mt-3 mb-3'].join(' ')}>
          <span className="text text_type_digits-default mr-1">{calculateFinalPrice()}</span>
          <CurrencyIcon type="primary" />

          <div className="ml-5"  onClick={placeOrder}>
            <Button type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        </div>
      )}

      <Modal show={orderCompleted} onCloseClick={placeOrder}>
        <OrderDetails />
      </Modal>

    </section>
  );
};

BurgerConstructor.propTypes = {
  chosen_ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
};

export default BurgerConstructor;
