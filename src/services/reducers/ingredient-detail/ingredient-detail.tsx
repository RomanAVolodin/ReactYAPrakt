import { IngredientModel } from '../../../models/ingredient-model';
import {
  SET_INGREDIENT_AS_PREVIEW,
  CLEAR_INGREDIENT_PREVIEW,
} from '../../actions/ingredient-detail';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { RootState } from '../index';

export interface ISetIngredientAsPreview {
  readonly type: typeof SET_INGREDIENT_AS_PREVIEW;
  readonly ingredient: IngredientModel;
}

export interface IClearIngredientAsPreview {
  readonly type: typeof CLEAR_INGREDIENT_PREVIEW;
  readonly ingredient?: IngredientModel;
}

export type IngredientsDetailViewActions = ISetIngredientAsPreview | IClearIngredientAsPreview;

export interface IngredientsDetailViewStateType {
  ingredient: IngredientModel | null;
}

export const initialState: IngredientsDetailViewStateType = {
  ingredient: null,
};

export const getIngredientById = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const ingredients = getState().ingredients.ingredients;
  dispatch({ type: CLEAR_INGREDIENT_PREVIEW });
  return new Promise<IngredientModel>((resolve, reject) => {
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
  action: IngredientsDetailViewActions,
): IngredientsDetailViewStateType => {
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
