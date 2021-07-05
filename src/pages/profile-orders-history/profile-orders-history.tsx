import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import OrdersList from '../../components/orders-list/orders-list';
import { feedSocketClose, myFeedSocketInit } from '../../services/slices/feed/feed';

const ProfileOrdersHistory: React.FC = () => {
  const dispatch = useDispatch();

  const { orders, isFetchingFeed, isErrorWhileFetchingFeed } = useSelector(
    (state: RootState) => state.feed,
  );
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (ingredients.length && user) {
      dispatch(myFeedSocketInit());
    }
    return () => {
      dispatch(feedSocketClose());
    };
  }, [dispatch, ingredients, user]);

  return (
    <>
      {isFetchingFeed ? <div>Получение данных...</div> : <OrdersList orders={orders} />}
      {isErrorWhileFetchingFeed && <div>Ошибка при загрузке заказов</div>}
    </>
  );
};

export default ProfileOrdersHistory;
