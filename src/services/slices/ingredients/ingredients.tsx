import { IngredientModel } from '../../../models/ingredient-model';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { getIngredientsRequest } from '../../../utils/api';

interface IngredientsStateType {
  ingredients: IngredientModel[];
  isFetching: boolean;
  isErrorWhileFetching: boolean;
}

export const initialState: IngredientsStateType = {
  ingredients: [],
  isFetching: false,
  isErrorWhileFetching: false,
};

export const getIngredients = () => (dispatch: Dispatch) => {
  const {
    ingredientsFetched,
    ingredientsFetchError,
    ingredientsAreFetching,
  } = ingredientsSlice.actions;

  dispatch(ingredientsAreFetching());
  return getIngredientsRequest()
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error('Ошибка получения данных');
      }
      dispatch(ingredientsFetched(data.data));
    })
    .catch((err) => {
      dispatch(ingredientsFetchError());
      toast.error(err.message);
    });
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsFetched(state, { payload }) {
      state.isFetching = false;
      state.isErrorWhileFetching = false;
      state.ingredients = payload;
    },
    ingredientsAreFetching(state) {
      state.isFetching = true;
      state.isErrorWhileFetching = false;
    },
    ingredientsFetchError(state) {
      state.isFetching = false;
      state.isErrorWhileFetching = true;
      state.ingredients = [];
    },
  },
});
