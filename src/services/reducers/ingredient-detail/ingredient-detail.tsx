import { IIngredientModel } from '../../../models/ingredient-model';
import {
  SET_INGREDIENT_AS_PREVIEW,
  CLEAR_INGREDIENT_PREVIEW,
} from '../../actions/ingredient-detail';
import { toast } from 'react-toastify';
import { TRootState } from '../index';
import { TAppDispatch } from '../../types/app-dispatch';
import { TIngredientsDetailViewActions, TIngredientsDetailViewStateType } from './types';


export const initialState: TIngredientsDetailViewStateType = {
  ingredient: null,
};

export const getIngredientById = (id: string) => (
  dispatch: TAppDispatch,
  getState: () => TRootState,
) => {
  const ingredients = getState().ingredients.ingredients;
  dispatch({ type: CLEAR_INGREDIENT_PREVIEW });
  return new Promise<IIngredientModel>((resolve, reject) => {
    const ingredient = ingredients.find((i) => i._id === id);
    if (ingredient) {
      resolve(ingredient);
    } else {
      reject('Ингредиент с таким ID не найден');
    }
  })
    .then((data) => {
      dispatch({ type: SET_INGREDIENT_AS_PREVIEW, ingredient: data });
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const ingredientsDetailedReducer = (
  state = initialState,
  action: TIngredientsDetailViewActions,
): TIngredientsDetailViewStateType => {
  switch (action.type) {
    case SET_INGREDIENT_AS_PREVIEW: {
      return { ...state, ingredient: action.ingredient };
    }
    case CLEAR_INGREDIENT_PREVIEW: {
      return { ...state, ingredient: null };
    }
    default: {
      return state;
    }
  }
};
