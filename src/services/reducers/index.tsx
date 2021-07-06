import { combineReducers } from 'redux';

import { constructorReducer } from './burger-constructor/burger-constructor';
import { orderReducer } from './order/order';
import { ingredientsDetailedReducer } from './ingredient-detail/ingredient-detail';
import { ingredientsDraggingReducer } from './ingredient-dragging/ingredient-dragging';
import { ingredientsSliceReducer } from '../slices/ingredients/ingredients';
import { loginSliceReducer } from '../slices/login/login';
import { feedSliceReducer } from '../slices/feed/feed';
import { authSliceReducer } from '../slices/auth/auth';

export const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  detailedIngredient: ingredientsDetailedReducer,
  draggingIngredient: ingredientsDraggingReducer,
  login: loginSliceReducer,
  feed: feedSliceReducer,
  auth: authSliceReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
