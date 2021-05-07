import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../models/ingredient-model';
import Ingredient from '../ingredient/ingredient';
import styles from '../ingredient/ingredient.module.css';
import PropTypes from 'prop-types';
import ingredientPropType from '../../models/ingredient-model-prop-type';

const BurgerIngredients = (props: {
  ingredients: IngredientModel[];
  onChoose: CallableFunction;
}) => {
  const [currentPage, setCurrentPage] = useState<string>('bun');
  const { ingredients, onChoose } = props;

  const setCurrent = (cur: string) => {
    setCurrentPage(cur);
  };

  return (
    <section className={styles.ingredients_list_container}>
      <div className="text text_type_main-medium mb-3 p-1">Соберите бургер</div>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={currentPage === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentPage === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={currentPage === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients_panel}>
        {ingredients
          .filter((ing) => ing.type === currentPage)
          .map((ing) => (
            <Ingredient key={ing._id} ingredient={ing} onChoose={onChoose} />
          ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
  onChoose: PropTypes.func.isRequired,
};

export default BurgerIngredients;
