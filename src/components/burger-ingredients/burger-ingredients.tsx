import React, { useState, useRef, RefObject } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel, IngredientTypes } from '../../models/ingredient-model';
import Ingredient from '../ingredient/ingredient';
import styles from '../ingredient/ingredient.module.css';
import PropTypes from 'prop-types';
import ingredientPropType from '../../models/ingredient-model-prop-type';

const BurgerIngredients = ({ ingredients }: { ingredients: IngredientModel[] }) => {
  const [currentIngredientType, setCurrentIngredientType] = useState<string>(IngredientTypes.Bun);

  const ingredientsTypes = [
    {
      type: IngredientTypes.Bun,
      name: 'Булки',
      headerRef: useRef<HTMLDivElement>(null),
      offsetTop: 0
    },
    {
      type: IngredientTypes.Sause,
      name: 'Соусы',
      headerRef: useRef<HTMLDivElement>(null),
      offsetTop: 0
    },
    {
      type: IngredientTypes.Main,
      name: 'Начинки',
      headerRef: useRef<HTMLDivElement>(null),
      offsetTop: 0
    },
  ]

  const setCurrentTab = (cur: string) => {
    setCurrentIngredientType(cur);

    const it = ingredientsTypes.find( ingT => ingT.type === cur)
    if (it) {
      const ref: RefObject<HTMLDivElement> = it.headerRef
      const currentElement: HTMLElement | null = ref.current
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };


  return (
    <section className={styles.ingredients_list_container}>
      <div className="text text_type_main-medium mb-3 p-1">Соберите бургер</div>
      <div style={{ display: 'flex' }}>
        { ingredientsTypes.map( ingredientsType => (
          <Tab key={ingredientsType.type} value={ingredientsType.type}
             active={currentIngredientType === ingredientsType.type} onClick={setCurrentTab}>
            {ingredientsType.name}
          </Tab>
          ))
        }
      </div>
      <div className={styles.ingredients_panel}>
        { ingredientsTypes.map( ingredientsType => (
          <React.Fragment key={ingredientsType.type}>
            <div ref={ingredientsType.headerRef} className={
              [
                styles.ingredients_panel_title,
                'text text_type_main-medium mb-3 p-1'
              ].join(' ')
            }>
              {ingredientsType.name}
            </div>
            {ingredients
              .filter((ing) => ing.type === ingredientsType.type)
              .map((ing) => (
                <Ingredient key={ing._id} ingredient={ing} />
              ))}
          </React.Fragment>
          ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired)
};

export default BurgerIngredients;
