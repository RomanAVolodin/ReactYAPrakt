import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import { IngredientModel, IngredientTypes } from '../../models/ingredient-model';
import styles from './burger-constructor.module.css';
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
  const draggingIngredient = useSelector((state: RootState) => state.draggingIngredient.ingredient);
  const dispatcher = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
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

  const placeOrder = (): void => {
    if (!ingredients.find((ing) => ing.type === IngredientTypes.Bun)) {
      toast.warn('Заказ не может быть сформирован, не выбрана булка :(');
      return;
    }
    if (user) {
      setOrderCompleted(true);
    } else {
      history.push({ pathname: '/login', state: { from: location } });
    }
  };

  const hideOrder = (): void => {
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

  const chosenInnerIngredients = useMemo(() => {
    return ingredients.filter(i => i.type !== IngredientTypes.Bun)
  }, [ingredients]);

  return (
    <section
      onDrop={(e) => e.preventDefault()}
      className={styles.container}
      ref={dropTarget}
    >
      { !chosenBun &&
        <div className={`constructor-element 
        constructor-element_pos_top 
        ${styles.fake_ingredient} 
        ${draggingIngredient && draggingIngredient.type === IngredientTypes.Bun && styles.on_drag_ready}`}>
          <span className="constructor-element__row">
            Выберите булку для Вашего бургера
          </span>
        </div>
      }

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
          chosenInnerIngredients.length > 5
            ? styles.scrollbar_appeared
            : null,
        ].join(' ')}
      >
        {! chosenInnerIngredients.length &&
          <div className={`constructor-element 
          ${styles.fake_ingredient} 
          ${draggingIngredient && draggingIngredient.type !== IngredientTypes.Bun && styles.on_drag_ready}`}>
            <span className="constructor-element__row">
              Добавьте ингредиенты
            </span>
          </div>
        }
          <SortableList
            items={chosenInnerIngredients}
            onSortEnd={onSortEnd}
            distance={1}
          />
      </div>

      { !chosenBun &&
      <div className={`constructor-element 
        constructor-element_pos_bottom
        ${styles.fake_ingredient} 
        ${draggingIngredient && draggingIngredient.type === IngredientTypes.Bun && styles.on_drag_ready}`}>
          <span className="constructor-element__row">
            Выберите булку для Вашего бургера
          </span>
      </div>
      }

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
        <div className={[styles.final_price, 'mt-3 mb-1'].join(' ')}>
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

      {draggingIngredient && (
        <div className={`text text_type_digits-default ${styles.empty_dropzone} ${styles.drop_sign}`}>
          { !isHover ? <p>Перетаскивай дальше...</p> : <p>Бросай</p> }
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
