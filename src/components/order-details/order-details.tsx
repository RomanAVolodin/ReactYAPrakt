import React, { useEffect } from 'react';
import styles from './order-details.module.css';
import OrderPlacedImage from '../../images/order_placed.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { placeOrder } from '../../services/actions/order';

const OrderDetails: React.FC = () => {
  const dispatcher = useDispatch();
  const chosenIngredients = useSelector((state: RootState) => state.burgerConstructor.ingredients);

  useEffect(() => {
    dispatcher(placeOrder(chosenIngredients));
  }, [dispatcher, chosenIngredients]);

  const orderNumber = useSelector((state: RootState) => state.order.order.number);

  return (
    <div className={styles.Container}>
      {orderNumber ? (
        <p className="text text_type_digits-large mt-2 glow_text">{orderNumber}</p>
      ) : (
        <p className="text text_type_digits-medium mt-2 glow_text">Loading ...</p>
      )}
      <p className="text text_type_main-medium mt-3 mb-5">идентификатор заказа</p>

      <img src={OrderPlacedImage} alt="" />

      <p className="text text_type_main-medium mt-5 " style={{ fontSize: 14 }}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-medium mt-2 mb-5 gray_text" style={{ fontSize: 14 }}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
