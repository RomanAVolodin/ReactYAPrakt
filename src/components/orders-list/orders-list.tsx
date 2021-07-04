import React from 'react';
import { Order } from '../../models/order';
import styles from './orders-list.module.css';
import OrderInList from '../order-in-list/order-in-list';

const OrdersList = ({ orders }: { orders: Order[] }) => {
  return (
    <div className={styles.container}>
      {orders.map((order, index) => (
        <OrderInList key={index} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
