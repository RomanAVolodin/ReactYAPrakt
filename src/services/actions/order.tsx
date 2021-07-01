import { Dispatch } from 'redux';
import { IngredientModel } from '../../models/ingredient-model';
import { placeOrderRequest } from '../../utils/api';

export const ORDER_IS_PROCESSING = 'ORDER_IS_PROCESSING';
export const ORDER_COMPLETED = 'ORDER_COMPLETED';
export const ORDER_PROCESS_FAILED = 'ORDER_PROCESS_FAILED';

export const placeOrder = (chosenIngredients: IngredientModel[]) => (dispatch: Dispatch) => {
  const dataToPost = {
    ingredients: chosenIngredients.map((ingredient) => ingredient._id),
  };

  dispatch({
    type: ORDER_IS_PROCESSING,
  });

  return placeOrderRequest(dataToPost)
    .then((data) => {
      if (!data.success) {
        throw new Error('Ошибка получения данных');
      }
      dispatch({
        type: ORDER_COMPLETED,
        order: {
          name: data.name,
          number: data.order.number,
          ingredients: dataToPost,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: ORDER_PROCESS_FAILED,
        message: err.message,
      });
    });
};
