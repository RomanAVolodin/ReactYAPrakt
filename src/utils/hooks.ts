import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { TRootState } from '../services/reducers';
import { TAppDispatch } from '../services/types/app-dispatch';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TIngredientsReducerActionsType } from '../services/reducers/burger-constructor/types';
import { TIngredientsDetailViewActions } from '../services/reducers/ingredient-detail/types';
import { TIngredientDraggingActions } from '../services/reducers/ingredient-dragging/types';
import { TOrderActions } from '../services/reducers/order/types';
import { TAuthSliceActionsType } from '../services/slices/auth/auth';
import { TFeedSliceActionsType } from '../services/slices/feed/types';
import { TIngredientsSliceActionsType } from '../services/slices/ingredients/types';
import { TLoginSliceActionsType } from '../services/slices/login/types';


export type TApplicationActions = TIngredientsReducerActionsType |
  TIngredientsDetailViewActions |
  TIngredientDraggingActions |
  TOrderActions |
  TAuthSliceActionsType |
  TFeedSliceActionsType |
  TIngredientsSliceActionsType |
  TLoginSliceActionsType
  ;

export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
  >;

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();