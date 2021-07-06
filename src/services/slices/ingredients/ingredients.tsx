import { IIngredientModel } from '../../../models/ingredient-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Reducer } from 'redux';
import { getIngredientsRequest } from '../../../utils/api';
import { TAppDispatch } from '../../types/app-dispatch';
import { TIngredientsSliceActionsType, TIngredientsStateType } from './types';


export const initialState: TIngredientsStateType = {
  ingredients: [],
  isFetching: false,
  isErrorWhileFetching: false,
};

export const getIngredients = () => (dispatch: TAppDispatch) => {
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
    ingredientsFetched(
      state: TIngredientsStateType,
      action: PayloadAction<IIngredientModel[]>,
    ): void {
      state.isFetching = false;
      state.isErrorWhileFetching = false;
      state.ingredients = action.payload;
    },
    ingredientsAreFetching(state: TIngredientsStateType): void {
      state.isFetching = true;
      state.isErrorWhileFetching = false;
    },
    ingredientsFetchError(state: TIngredientsStateType): void {
      state.isFetching = false;
      state.isErrorWhileFetching = true;
      state.ingredients = [];
    },
  },
});

export const ingredientsSliceReducer = ingredientsSlice.reducer as Reducer<
  TIngredientsStateType,
  TIngredientsSliceActionsType
>;
