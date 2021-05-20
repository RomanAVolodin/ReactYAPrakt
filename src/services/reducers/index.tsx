import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { ingredientsDetailedReducer } from './ingredient-detail';
import { ingredientsDraggingReducer } from './ingredient-dragging';
import { ingredientHoverInconstructorReducer } from './hovered-in-constructor';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  detailedIngredient: ingredientsDetailedReducer,
  draggingIngredient: ingredientsDraggingReducer,
  hoveredInConstructorIngredient: ingredientHoverInconstructorReducer
});

export type RootState = ReturnType<typeof rootReducer>
