import React from 'react';
import { Order, orderPropType } from '../../models/order';


export const OrderStatusTitle = ({order}: {order: Order}) => {
  return order.status === 'done' ?
      (
        <p className="text text_type_main-medium mt-1" style={{fontSize: 14}}>
          Выполнен
        </p>
      ) : order.status === 'canceled' ?
      (
        <p className="text text_type_main-medium text_danger_color mt-1"  style={{fontSize: 14}}>
          Отменен
        </p>
      ) : (
        <p className="text text_type_main-medium text_success_color mt-1"  style={{fontSize: 14}}>
          Готовится
        </p>
      );
}

OrderStatusTitle.propTypes = {
  order: orderPropType.isRequired,
};

export default OrderStatusTitle;