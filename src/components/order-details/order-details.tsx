import React, { useContext, useEffect, useState } from 'react';
import styles from './order-details.module.css';
import OrderPlacedImage from '../../images/order_placed.svg';
import { ChosenIngredientsContext } from '../services/chosen-ingredients-context';
import { orderApiUrl } from '../../utils/apiURLs';

const OrderDetails = () => {
  const { chosenIngredients } = useContext(ChosenIngredientsContext);
  const [orderNumber, setOrderNumber] = useState(undefined)

  useEffect( () => {
    const postData = {
      ingredients: chosenIngredients.map(ingredient => ingredient._id)
    }

    fetch(orderApiUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then((resp) => resp.json())
      .then( data => {
          setOrderNumber(data.order.number)
        }
      )
      .catch((err) => {
        console.error(err);
      });
  }, [chosenIngredients])

  return (
    <div className={styles.Container}>
      {orderNumber ?
        <p className="text text_type_digits-large mt-2 glow_text">
          {orderNumber}
        </p> :
        <p className="text text_type_digits-medium mt-2 glow_text">
          Loading ...
        </p>
      }
      <p className="text text_type_main-medium mt-3 mb-5">
        идентификатор заказа
      </p>

      <img src={OrderPlacedImage} alt='' />

      <p className="text text_type_main-medium mt-5 " style={{fontSize: 14}}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-medium mt-2 mb-5 gray_text" style={{fontSize: 14}}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}


export default OrderDetails;