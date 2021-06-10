import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { getFeed } from '../../services/slices/feed';
import OrdersList from '../orders-list/orders-list';

const FeedList: React.FC = () => {
  const dispatch = useDispatch();

  const { orders, isFetchingFeed, isErrorWhileFetchingFeed } = useSelector(
    (state: RootState) => state.feed,
  );

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return (
    <div>
      <p className="text text_type_main-large mb-10 mt-15">Лента заказов</p>
      {isFetchingFeed ? <div>Получение данных...</div> : <OrdersList orders={orders} />}

      {isErrorWhileFetchingFeed && <div>Ошибка при загрузке заказов</div>}
    </div>
  );
};

export default FeedList;
