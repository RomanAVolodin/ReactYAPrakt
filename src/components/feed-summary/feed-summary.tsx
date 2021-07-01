import React, { useMemo } from 'react';
import styles from './feed-summary.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

export const FeedSummary: React.FC = () => {
  const { total, totalToday, orders } = useSelector( (state: RootState) => state.feed);

  const ordersReady = useMemo(() => {
    return orders.filter( order => order.status === 'done')
  }, [orders]);

  const ordersNotReady = useMemo(() => {
    return orders.filter( order => order.status !== 'done')
  }, [orders]);

  return (
    <div className={styles.container}>
      <div className={styles.orders_numbers}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={[styles.orders_numbers_column, styles.orders_ready].join(' ')}>
            { ordersReady.map( order => (
              <p key={order.number} className="text text_type_digits-default mb-3">{ order.number }</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={styles.orders_numbers_column}>
            { ordersNotReady.map( order => (
              <p key={order.number}  className="text text_type_digits-default mb-3">{ order.number }</p>
            ))}
          </div>
        </div>
      </div>
      <p className="text text_type_main-medium mb-2 mt-10">Выполнено за все время:</p>
      <p className="text text_type_digits-large glow_text">{ total }</p>
      <p className="text text_type_main-medium mb-2 mt-10">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large glow_text">{ totalToday }</p>
    </div>
  );
};
