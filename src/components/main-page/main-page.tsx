import React, { useState } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './main-page.module.css';
import { IngredientModel } from '../../models/ingredient-model';
import ingredientPropType from '../../models/ingredient-model-prop-type';
import PropTypes from 'prop-types';


const MainPage = ({ ingredients }: { ingredients: IngredientModel[] }) => {
  const [chosenIngredients, setChosenIngredients] = useState<IngredientModel[]>([]);


  const addToChosenIngredients = (ingredient: IngredientModel) => {
    setChosenIngredients([...chosenIngredients, ingredient]);
  };

  return (
    <main className={[styles.container, 'mt-4'].join(' ')}>
      <BurgerIngredients ingredients={ingredients} onChoose={addToChosenIngredients} />
      { chosenIngredients.length > 0 &&
        <BurgerConstructor chosen_ingredients={chosenIngredients} />
      }
    </main>
  );
};

MainPage.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default MainPage;
