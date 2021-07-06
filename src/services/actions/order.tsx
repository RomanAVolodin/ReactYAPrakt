import { IIngredientModel } from '../../models/ingredient-model';
import { placeOrderRequest } from '../../utils/api';
import { CLEAR_CONSTRUCTOR } from './burger-constructor';
import { TAppDispatch } from '../types/app-dispatch';

export const ORDER_IS_PROCESSING: 'ORDER_IS_PROCESSING' = 'ORDER_IS_PROCESSING';
export const ORDER_COMPLETED: 'ORDER_COMPLETED' = 'ORDER_COMPLETED';
export const ORDER_PROCESS_FAILED: 'ORDER_PROCESS_FAILED' = 'ORDER_PROCESS_FAILED';

export const placeOrder = (chosenIngredients: IIngredientModel[]) => (dispatch: TAppDispatch) => {
  const dataToPost = {
    ingredients: chosenIngredients.map((ingredient) => ingredient._id) as string[],
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

      dispatch({ type: CLEAR_CONSTRUCTOR });
    })
    .catch((err) => {
      dispatch({
        type: ORDER_PROCESS_FAILED,
        message: err.message,
      });
    });
};
