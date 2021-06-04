import { IngredientModel } from '../../models/ingredient-model';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ingredientsApiUrl } from '../../utils/apiURLs';
import { Dispatch } from 'redux';

interface IngredientsStateType {
  ingredients: IngredientModel[];
  isFetching: boolean;
  isErrorWhileFetching: boolean;
}

const initialState: IngredientsStateType = {
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
  fetch(ingredientsApiUrl)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Произошла ошибка сети');
      }
      return resp.json();
    })
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
