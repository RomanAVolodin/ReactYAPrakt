import React, { useMemo } from 'react';
import { Order, orderPropType } from '../../models/order';
import styles from './order-in-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import OrderStatusTitle from '../order-status-title/order-status-title';

const OrderInList = ({ order }: { order: Order }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const totalPrice = useMemo(() => {
    return order.ingredients
      .map((ing) => (ing ? ing.price : 0))
      .reduce((a: number, b: number) => a + b, 0);
  }, [order.ingredients]);

  const MAX_ELEMENTS_AMOUNT = 6;

  return (
    <div
      className={styles.container}
      onClick={() =>
        history.push({ pathname: `${match.url}/${order.number}`, state: { from: location } })
      }
    >
      <div className={styles.order_number_date}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">{order.createdAt} i-GMT+3</p>
      </div>
      <p className="text text_type_main-medium">{order.name}</p>

      <OrderStatusTitle order={order} />

      <div className={styles.ingredient_and_price_container}>
        <div className={styles.ingredient_container}>
          {order.ingredients.map((ingredient, index) =>
            index < MAX_ELEMENTS_AMOUNT ? (
              <div key={index} className={styles.ingredient_image}>
                <img src={ingredient?.image_mobile} alt={ingredient?.name} />
                {order.ingredients.length - MAX_ELEMENTS_AMOUNT > 0 && index === 0 ? (
                  <p
                    style={{ position: 'absolute', top: 17, left: 15 }}
                    className="text text_type_digits-default"
                  >
                    +{order.ingredients.length - MAX_ELEMENTS_AMOUNT}
                  </p>
                ) : null}
              </div>
            ) : null,
          )}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default pr-3">{totalPrice}</span>{' '}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrderInList.propTypes = {
  order: orderPropType.isRequired,
};

export default OrderInList;
