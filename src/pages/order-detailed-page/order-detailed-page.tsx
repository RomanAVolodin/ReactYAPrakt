import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { feedSocketInit, getOrderFromFeed } from '../../services/slices/feed/feed';
import { RootState } from '../../services/reducers';
import styles from './order-detailed-page.module.css';
import { IngredientModel, IngredientWithAmount } from '../../models/ingredient-model';
import IngredientWithAmountForFeed from '../../components/ingredient-with-amount-for-feed/ingredient-with-amount-for-feed';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderStatusTitle from '../../components/order-status-title/order-status-title';
import { LocationState } from '../../models/location-state';

const OrderDetailedPage: React.FC = () => {
  const { order_id } = useParams<{ order_id: string }>();
  const { order, isErrorWhileFetchingOrder } = useSelector(
    (state: RootState) => state.feed,
  );
  const dispatch = useDispatch();
  const location = useLocation();

  const { from } = location.state ? (location.state as LocationState) : { from: null };

  const ingredients: IngredientWithAmount[] = useMemo(() => {
    const result: IngredientWithAmount[] = [];

    if (!order) return [];

    const ingredients = order.ingredients;
    ingredients.forEach((ingredient: IngredientModel | undefined) => {
      const index = result.findIndex((ingrWA) => ingrWA.ingredient._id === ingredient?._id);
      if (index === -1) {
        if (ingredient) result.push({ ingredient: ingredient, amount: 1 });
      } else {
        if (ingredient) result[index].amount += 1;
      }
    });
    return result;
  }, [order]);

  const { orders } = useSelector(
    (state: RootState) => state.feed,
  );

  const allIngredients = useSelector( (state: RootState) => state.ingredients.ingredients);

  useEffect(() => {
    if (allIngredients.length && !orders.length) {
      dispatch(feedSocketInit());
    }
  }, [dispatch, allIngredients, orders]);

  useEffect(() => {
    if (orders.length) {
      dispatch(getOrderFromFeed(order_id));
    }
  }, [dispatch, order_id, orders]);

  const totalPrice = useMemo(() => {
    return ingredients
      .map((ing) => ing.ingredient.price * ing.amount)
      .reduce((a: number, b: number) => a + b, 0);
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

  return !order  ? (
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
          {ingredients.map((ingredient: IngredientWithAmount, index: number) =>
            ingredient ? (
              <IngredientWithAmountForFeed key={index} ingredientWithAmount={ingredient} />
            ) : null,
          )}
        </div>

        <div className={styles.date_price}>
          <p className="text text_type_main-default text_color_inactive">{order.createdAt} i-GMT+3</p>
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
