import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import OrdersList from '../orders-list/orders-list';
import styles from './feed-list.module.css';

const FeedList: React.FC = () => {

  const { orders, isFetchingFeed, isErrorWhileFetchingFeed } = useSelector(
    (state: RootState) => state.feed,
  );

  return (
    <div className={styles.container}>
      <p className="text text_type_main-large mb-10 mt-15">Лента заказов</p>
      {isFetchingFeed ? <div>Получение данных...</div> : <OrdersList orders={orders} />}

      {isErrorWhileFetchingFeed && <div>Ошибка при загрузке заказов</div>}
    </div>
  );
};

export default FeedList;
