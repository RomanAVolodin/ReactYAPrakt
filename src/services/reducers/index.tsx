import { combineReducers } from 'redux';

import { constructorReducer } from './burger-constructor/burger-constructor';
import { orderReducer } from './order/order';
import { ingredientsDetailedReducer } from './ingredient-detail/ingredient-detail';
import { ingredientsDraggingReducer } from './ingredient-dragging/ingredient-dragging';
import { ingredientsSlice } from '../slices/ingredients/ingredients';
import { loginSlice } from '../slices/login/login';
import { feedSlice } from '../slices/feed/feed';
import { authSlice } from '../slices/auth/auth';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  detailedIngredient: ingredientsDetailedReducer,
  draggingIngredient: ingredientsDraggingReducer,
  login: loginSlice.reducer,
  feed: feedSlice.reducer,
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
