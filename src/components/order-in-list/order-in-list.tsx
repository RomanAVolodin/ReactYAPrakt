import React, { useMemo } from 'react';
import { Order, orderPropType } from '../../models/order';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import styles from './order-in-list.module.css';
import { IngredientModel } from '../../models/ingredient-model';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import OrderStatusTitle from '../order-status-title/order-status-title';


const OrderInList = ({ order }: { order: Order }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const ingredientsAll = useSelector((state: RootState) => state.ingredients.ingredients);

  const ingredients: (IngredientModel | undefined)[] = useMemo(
    () => order.ingredients.map((oi) => ingredientsAll.find((ing: IngredientModel) => ing._id === oi)).reverse(),
    [ingredientsAll, order],
  );

  const totalPrice = useMemo(() => {
    return ingredients.map(ing => ing ? ing.price : 0).reduce((a: number, b: number) => a + b, 0);
  }, [ingredients])

  const MAX_ELEMENTS_AMOUNT = 6;

  return (
    <div className={styles.container} onClick={() => history.push({pathname: `${match.url}/${order.number}`, state: { from: location }})}>
      <div className={styles.order_number_date}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className="text text_type_main-medium">{order.name}</p>

      <OrderStatusTitle order={order} />

      <div className={styles.ingredient_and_price_container}>
        <div className={styles.ingredient_container}>
          {ingredients.map((ingredient, index) =>
            index < MAX_ELEMENTS_AMOUNT ? (
              <div key={index} className={styles.ingredient_image}>
                <img src={ingredient?.image_mobile} alt={ingredient?.name} />
                {ingredients.length - MAX_ELEMENTS_AMOUNT > 0 && index === 0 ? (
                  <p
                    style={{ position: 'absolute', top: 17, left: 15 }}
                    className="text text_type_digits-default"
                  >
                    +{ingredients.length - MAX_ELEMENTS_AMOUNT}
                  </p>
                ) : null}
              </div>
            ) : null,
          )}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default pr-3">
            { totalPrice }
          </span> <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrderInList.propTypes = {
  order: orderPropType.isRequired,
};

export default OrderInList;