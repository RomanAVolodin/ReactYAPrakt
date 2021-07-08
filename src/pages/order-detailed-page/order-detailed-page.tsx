import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { feedSocketInit, getOrderFromFeed, myFeedSocketInit } from '../../services/slices/feed/feed';
import { TRootState } from '../../services/reducers';
import styles from './order-detailed-page.module.css';
import { IIngredientModel, IIngredientWithAmount } from '../../models/ingredient-model';
import IngredientWithAmountForFeed from '../../components/ingredient-with-amount-for-feed/ingredient-with-amount-for-feed';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderStatusTitle from '../../components/order-status-title/order-status-title';
import { TLocationState } from '../../models/location-state';
import { useDispatch, useSelector } from '../../utils/hooks';

const OrderDetailedPage: React.FC = () => {
  const { order_id } = useParams<{ order_id: string }>();
  const { order, isErrorWhileFetchingOrder } = useSelector((state: TRootState) => state.feed);
  const dispatch = useDispatch();
  const location = useLocation();
  const match = useRouteMatch();

  const { from } = location.state ? (location.state as TLocationState) : { from: null };

  const ingredients: IIngredientWithAmount[] = useMemo(() => {
    const result: IIngredientWithAmount[] = [];

    if (!order) return [];

    const ingredients = order.ingredients;
    ingredients.forEach((ingredient: IIngredientModel | undefined) => {
      const index = result.findIndex((ingrWA) => ingrWA.ingredient._id === ingredient?._id);
      if (index === -1) {
        if (ingredient) result.push({ ingredient: ingredient, amount: 1 });
      } else {
        if (ingredient) result[index].amount += 1;
      }
    });
    return result;
  }, [order]);

  const { orders } = useSelector((state: TRootState) => state.feed);

  const allIngredients = useSelector((state: TRootState) => state.ingredients.ingredients);

  useEffect(() => {
    if (allIngredients.length && !orders.length) {
      match.path === '/feed/:order_id' ? dispatch(feedSocketInit()) : dispatch(myFeedSocketInit());
    }
  }, [dispatch, allIngredients, orders, match]);

  useEffect(() => {
    if (orders.length) {
      dispatch(getOrderFromFeed(order_id));
    }
  }, [dispatch, order_id, orders]);

  const totalPrice = useMemo(() => {
    return ingredients.map((ing) => ing.ingredient.price * ing.amount).reduce((a, b) => a + b, 0);
  }, [ingredients]);

  const LoaderOrError: React.FC = () =>
    useMemo(
      () => (
        <div className={styles.container}>
          {isErrorWhileFetchingOrder ? (
            <p className="text text_type_main-default text_color_inactive">
              Ошибка получения данных
            </p>
          ) : (
            <p className="text text_type_main-default text_color_inactive">Получение данных...</p>
          )}
        </div>
      ),
      [],
    );

  return !order ? (
    <LoaderOrError />
  ) : (
    <div className={styles.container}>
      {from?.pathname !== '/profile/orders' && from?.pathname !== '/feed' && (
        <p className="text text_type_digits-medium mb-10">#{order?.number}</p>
      )}
      <div className={styles.inner}>
        <p className="text text_type_main-medium mb-10 mt-10">{order.name}</p>
        <OrderStatusTitle order={order} />
        <p className="text text_type_main-medium mt-10">Состав:</p>

        <div className={styles.ingredients_list}>
          {ingredients.map((ingredient, index) =>
            ingredient ? (
              <IngredientWithAmountForFeed key={index} ingredientWithAmount={ingredient} />
            ) : null,
          )}
        </div>

        <div className={styles.date_price}>
          <p className="text text_type_main-default text_color_inactive">
            {order.createdAt} i-GMT+3
          </p>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-3">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailedPage;
