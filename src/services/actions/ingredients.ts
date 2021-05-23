import { Dispatch } from 'redux';
import { ingredientsApiUrl } from '../../utils/apiURLs';

export const INGREDIENTS_IS_FETCHING = 'INGREDIENTS_IS_FETCHING';
export const INGREDIENTS_FETCHING_OK = 'INGREDIENTS_FETCHING_OK';
export const INGREDIENTS_FETCHING_FAIL = 'INGREDIENTS_FETCHING_FAIL';

export const getIngredients = () => (dispatch: Dispatch) => {

    dispatch({
      type: INGREDIENTS_IS_FETCHING
    });

    fetch(ingredientsApiUrl)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Произошла ошибка сети');
        }
        return resp.json()
      })
      .then((data) => {
          if (!data.success) {
            throw new Error('Ошибка получения данных');
          }
          dispatch({
            type: INGREDIENTS_FETCHING_OK,
            ingredients: data.data
          });
        }
      )
      .catch((err) => {
        dispatch({
          type: INGREDIENTS_FETCHING_FAIL,
          message: err.message
        });
      });

}
