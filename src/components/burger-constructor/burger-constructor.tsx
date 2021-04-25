import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { IngredientModel } from '../../models/ingredient-model';
import styles from './burger-constructor.module.css';
import ingredientPropType from '../../models/ingredient-model-prop-type';
import Modal from '../modal-window/modal';
import OrderDetails from '../order/order-details/order-details';

const BurgerConstructor = ({ chosen_ingredients }: { chosen_ingredients: IngredientModel[] }) => {

  const [orderCompleted, setOrderCompleted] = useState<boolean>(false)

  const calculateFinalPrice = () => {
    return chosen_ingredients.reduce((acc: number, ing: IngredientModel) => {
      const price = ing.type === 'bun' ? ing.price * 2 : ing.price;
      return acc + price;
    }, 0);
  };

  const placeOrder = () => {
    setOrderCompleted(!orderCompleted)
  }

  return (
    <section className={styles.container}>
      {chosen_ingredients
        .filter((i: IngredientModel) => i.type === 'bun')
        .map((ing: IngredientModel, index: number) => (
          <div key={index} className="mt-1">
            <ConstructorElement
              thumbnail={ing.image_mobile}
              text={ing.name}
              price={ing.price}
              isLocked={true}
              type="top"
            />
          </div>
        ))}

      <div
        className={[
          styles.ingredients_scrollable_container,
          chosen_ingredients.filter((i: IngredientModel) => i.type !== 'bun').length > 5
            ? styles.scrollbar_appeared
            : null,
        ].join(' ')}
      >
        {chosen_ingredients
          .filter((i: IngredientModel) => i.type !== 'bun')
          .map((ing: IngredientModel, index: number) => (
            <div key={index} className={[styles.constructor_element_container, 'mt-1'].join(' ')}>
              <DragIcon type="primary" />
              <ConstructorElement thumbnail={ing.image_mobile} text={ing.name} price={ing.price} />
            </div>
          ))}
      </div>

      {chosen_ingredients
        .filter((i: IngredientModel) => i.type === 'bun')
        .map((ing: IngredientModel, index: number) => (
          <div key={index} className="mt-1">
            <ConstructorElement
              thumbnail={ing.image_mobile}
              text={ing.name}
              price={ing.price}
              isLocked={true}
              type="bottom"
            />
          </div>
        ))}

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
        <OrderDetails ingredients={chosen_ingredients} />
      </Modal>

    </section>
  );
};

BurgerConstructor.propTypes = {
  chosen_ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
};

export default BurgerConstructor;
