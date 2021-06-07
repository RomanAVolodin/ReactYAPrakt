import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { getFeed } from '../../services/slices/feed';
import OrdersList from '../../components/orders-list/orders-list';

const ProfileOrdersHistory: React.FC = () => {
  const dispatch = useDispatch();

  const { orders, isFetchingFeed, isErrorWhileFetchingFeed } = useSelector(
    (state: RootState) => state.feed,
  );

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return (
    <>
      {isFetchingFeed ? (<div>Получение данных...</div>) : <OrdersList orders={orders} />}
      { isErrorWhileFetchingFeed && (
        <div>Ошибка при загрузке заказов</div>
      )}
    </>
  );
}

export default ProfileOrdersHistory;