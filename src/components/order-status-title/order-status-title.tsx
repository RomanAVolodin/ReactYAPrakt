import React from 'react';
import { IOrder } from '../../models/order';

export const OrderStatusTitle = ({ order }: { order: IOrder }) => {
  return order.status === 'done' ? (
    <p className="text text_type_main-medium text_success_color mt-1" style={{ fontSize: 14 }}>
      Выполнен
    </p>
  ) : order.status === 'created' ? (
    <p className="text text_type_main-medium  mt-1" style={{ fontSize: 14 }}>
      Создан
    </p>
  ) : (
    <p className="text text_type_main-medium text_danger_color mt-1" style={{ fontSize: 14 }}>
      Готовится
    </p>
  );
};

export default OrderStatusTitle;
