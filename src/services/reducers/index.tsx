import { combineReducers } from 'redux';

import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { ingredientsDetailedReducer } from './ingredient-detail';
import { ingredientsDraggingReducer } from './ingredient-dragging';
import { ingredientsSlice } from '../slices/ingredients';
import { loginSlice } from '../slices/login';
import { feedSlice } from '../slices/feed';
import { authSlice } from '../slices/auth';

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
