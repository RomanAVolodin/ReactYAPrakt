import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IngredientModel, IngredientTypes } from '../../models/ingredient-model';
import styles from './burger-constructor.module.css';
import ingredientPropType from '../../models/ingredient-model-prop-type';
import Modal from '../modal-window/modal';
import OrderDetails from '../order-details/order-details';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  WRAP_INGREDIENTS_IN_CONSTRUCTOR,
} from '../../services/actions/burger-constructor';
import { useDrop } from 'react-dnd';
import IngredientInConstructor from '../ingredient-in-constructor/ingredient-in-constructor';
import { SortableContainer } from 'react-sortable-hoc';
import { useHistory, useLocation } from 'react-router-dom';

const BurgerConstructor: React.FC = () => {
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);
  const { ingredients, finalPrice } = useSelector((state: RootState) => state.burgerConstructor);
  const isDragging = useSelector((state: RootState) => state.draggingIngredient.ingredient);
  const dispatcher = useDispatch();
  const user = useSelector( (state: RootState) => state.auth.user);
  const history = useHistory();
  const location = useLocation();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(ingredient: IngredientModel) {
      dispatcher({ type: ADD_INGREDIENT_TO_CONSTRUCTOR, ingredient: { ...ingredient } });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const placeOrder = () => {
    if (!ingredients.find((ing) => ing.type === IngredientTypes.Bun)) {
      toast.warn('Заказ не может быть сформирован, не выбрана булка :(');
      return;
    }
    if (user) {
      setOrderCompleted(true);
    } else {
      history.push({ pathname: '/login', state: { from: location } })
    }

  };

  const hideOrder = () => {
    setOrderCompleted(false);
  };

  const chosenBun =
    ingredients[0] && ingredients[0].type === IngredientTypes.Bun ? ingredients[0] : null;

  const SortableList = SortableContainer(({ items }: { items: IngredientModel[] }) => {
    return (
      <div>
        {items.map((ing, index) => (
          <IngredientInConstructor
            key={`${index}-${ing._id}`}
            index={chosenBun ? index + 1 : index}
            ingredient={ing}
          />
        ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    dispatcher({
      type: WRAP_INGREDIENTS_IN_CONSTRUCTOR,
      indexesOfTransferedElement: { from: oldIndex, to: newIndex },
    });
  };

  return (
    <section
      onDrop={(e) => e.preventDefault()}
      className={`${styles.container} ${isDragging && styles.on_drag_ready} ${
        isHover && styles.on_drag_hover
      } `}
      ref={dropTarget}
    >
      {chosenBun && (
        <div className="mt-1">
          <ConstructorElement
            thumbnail={chosenBun.image_mobile}
            text={chosenBun.name}
            price={chosenBun.price}
            isLocked={true}
            type="top"
          />
        </div>
      )}

      <div
        className={[
          styles.ingredients_scrollable_container,
          ingredients.filter((i: IngredientModel) => i.type !== IngredientTypes.Bun).length > 5
            ? styles.scrollbar_appeared
            : null,
        ].join(' ')}
      >
        <SortableList
          items={ingredients.filter((i: IngredientModel) => i.type !== IngredientTypes.Bun)}
          onSortEnd={onSortEnd}
          distance={1}
        />
      </div>

      {chosenBun && (
        <div className="mt-1">
          <ConstructorElement
            thumbnail={chosenBun.image_mobile}
            text={chosenBun.name}
            price={chosenBun.price}
            isLocked={true}
            type="bottom"
          />
        </div>
      )}

      {finalPrice > 0 && (
        <div className={[styles.final_price, 'mt-3 mb-3'].join(' ')}>
          <span className="text text_type_digits-default mr-1">{finalPrice}</span>
          <CurrencyIcon type="primary" />

          <div className="ml-5" onClick={placeOrder}>
            <Button type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        </div>
      )}

      <Modal show={orderCompleted} onCloseClick={hideOrder}>
        <OrderDetails />
      </Modal>

      {ingredients.length === 0 && isDragging && (
        <div className={`text text_type_digits-default ${styles.empty_dropzone}`}>
          <p>Сладывать тут:)</p>
        </div>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  chosen_ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
};

export default BurgerConstructor;
