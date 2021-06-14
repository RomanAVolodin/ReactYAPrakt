import React from 'react';
import { Order, orderPropType } from '../../models/order';
import styles from './orders-list.module.css';
import OrderInList from '../order-in-list/order-in-list';
import PropTypes from 'prop-types';

const OrdersList = ({ orders }: { orders: Order[] }) => {
  return (
    <div className={styles.container}>
      {orders.map((order: Order, index: number) => (
        <OrderInList key={index} order={order} />
      ))}
    </div>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
};

export default OrdersList;
