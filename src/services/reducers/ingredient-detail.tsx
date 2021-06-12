import { IngredientModel } from '../../models/ingredient-model';
import { SET_INGREDIENT_AS_PREVIEW, CLEAR_INGREDIENT_PREVIEW } from '../actions/ingredient-detail';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { RootState } from './index';

interface IngredientsDetailviewAction {
  type: string;
  ingredient: IngredientModel;
}

export interface IngredientsDetailviewStateType {
  ingredient: IngredientModel | null;
}

export const initialState: IngredientsDetailviewStateType = {
  ingredient: null,
};

export const getIngredientById = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const ingredients = getState().ingredients.ingredients;
  dispatch({ type: CLEAR_INGREDIENT_PREVIEW });
  new Promise<IngredientModel>((resolve, reject) => {
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
  action: IngredientsDetailviewAction,
) => {
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
