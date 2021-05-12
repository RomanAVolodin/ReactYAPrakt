import React, { useReducer } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './main-page.module.css';
import { IngredientModel, IngredientTypes } from '../../models/ingredient-model';
import ingredientPropType from '../../models/ingredient-model-prop-type';
import PropTypes from 'prop-types';
import { IngredientsReducerAction, IngredientsReducerType } from '../../models/ingredients-reducer-type';
import { ChosenIngredientsContext } from '../services/chosen-ingredients-context';


const MainPage = ({ ingredients }: { ingredients: IngredientModel[] }) => {

  const ingredientsReducer = (chosenIngredients: IngredientModel[], action: IngredientsReducerType) => {
    switch (action.type) {
      case IngredientsReducerAction.Add:
        if (action.ingredient.type === IngredientTypes.Bun) {
          chosenIngredients = chosenIngredients.filter((ing: IngredientModel) => ing.type !== IngredientTypes.Bun)
          return [action.ingredient, ...chosenIngredients, action.ingredient];
        }
        return [...chosenIngredients, action.ingredient];
      case IngredientsReducerAction.Remove:
        return chosenIngredients.filter((ing: IngredientModel) => ing !== action.ingredient);
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [chosenIngredients, ingredientsDispatcher] = useReducer(ingredientsReducer, [], undefined);

  return (
    <main className={[styles.container, 'mt-4'].join(' ')}>
      <ChosenIngredientsContext.Provider value={{ chosenIngredients, ingredientsDispatcher }}>
        <BurgerIngredients ingredients={ingredients} />
        { chosenIngredients.length > 0 &&
        <BurgerConstructor />
        }
      </ChosenIngredientsContext.Provider>

    </main>
  );
};

MainPage.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default MainPage;
