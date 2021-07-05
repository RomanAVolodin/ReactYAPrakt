import React, { useEffect } from 'react';
import styles from './order-details.module.css';
import OrderPlacedImage from '../../images/order_placed.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { placeOrder } from '../../services/actions/order';
import Loader from "react-loader-spinner";


const OrderDetails: React.FC = () => {
  const dispatcher = useDispatch();
  const chosenIngredients = useSelector((state: RootState) => state.burgerConstructor.ingredients);

  useEffect(() => {
    if (chosenIngredients.length) {
      dispatcher(placeOrder(chosenIngredients));
    }
  }, [dispatcher, chosenIngredients]);

  const {  order, isFetching } = useSelector((state: RootState) => state.order);

  return (
    <div className={styles.Container}>
      {order.number && !isFetching ? (
        <>
          <p className="text text_type_digits-large mt-2 glow_text">{order.number}</p>
          <p className="text text_type_main-medium mt-3 mb-5">идентификатор заказа</p>

          <img src={OrderPlacedImage} alt="" />

          <p className="text text_type_main-medium mt-5 " style={{ fontSize: 14 }}>
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-medium mt-2 mb-5 gray_text" style={{ fontSize: 14 }}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (
        <>
          <p className="text text_type_digits-medium mt-2 mb-15 glow_text">Обработка заказа...</p>
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
