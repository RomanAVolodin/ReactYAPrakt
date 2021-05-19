import React, { Dispatch } from 'react';
import { IngredientModel } from '../../models/ingredient-model';
import { IngredientsReducerType } from '../../models/ingredients-reducer-type';

type ChosenIngredientsContextType = {
  chosenIngredients: IngredientModel[];
  ingredientsDispatcher: Dispatch<IngredientsReducerType>;
};

export const ChosenIngredientsContext = React.createContext<ChosenIngredientsContextType>(
  {chosenIngredients: [], ingredientsDispatcher: () => {} }
)