import React, { useState, useRef, RefObject, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { EIngredientTypes } from '../../models/ingredient-model';
import Ingredient from '../ingredient/ingredient';
import styles from '../ingredient/ingredient.module.css';
import { useSelector } from 'react-redux';
import { TRootState } from '../../services/reducers';

const BurgerIngredients: React.FC = () => {
  const { ingredients, isFetching, isErrorWhileFetching } = useSelector(
    (state: TRootState) => state.ingredients,
  );

  const [currentIngredientType, setCurrentIngredientType] = useState<string>(EIngredientTypes.Bun);

  let ingredientsTypes = [
    {
      type: EIngredientTypes.Bun,
      name: 'Булки',
      headerRef: useRef<HTMLDivElement>(null),
      offsetTop: 999,
    },
    {
      type: EIngredientTypes.Sause,
      name: 'Соусы',
      headerRef: useRef<HTMLDivElement>(null),
      offsetTop: 999,
    },
    {
      type: EIngredientTypes.Main,
      name: 'Начинки',
      headerRef: useRef<HTMLDivElement>(null),
      offsetTop: 999,
    },
  ];

  const ingredsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const { target } = event;
      if (target) {
        const scrollTop = (target as HTMLDivElement).scrollTop;

        const closest = {
          type: ingredientsTypes[0].type,
          offsetTop: ingredientsTypes[0].offsetTop,
        };
        ingredientsTypes.forEach((it) => {
          if (it.headerRef.current && it.headerRef.current.parentElement) {
            const offsetTop = Math.abs(
              it.headerRef.current.offsetTop -
                it.headerRef.current.parentElement.offsetTop -
                scrollTop,
            );
            if (offsetTop <= closest.offsetTop) {
              closest.type = it.type;
              closest.offsetTop = offsetTop;
            }
          }
        });
        setCurrentIngredientType(closest.type);
      }
    };

    const scrollableElement = ingredsContainer.current;
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', handleScroll);
      }
    };
  });

  const setCurrentTab = (cur: string) => {
    setCurrentIngredientType(cur);

    const it = ingredientsTypes.find((ingT) => ingT.type === cur);
    if (it) {
      const ref: RefObject<HTMLDivElement> = it.headerRef;
      const currentElement: HTMLElement | null = ref.current;
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return isFetching ? (
    <h1>Loading...</h1>
  ) : isErrorWhileFetching ? (
    <div>Error while loading</div>
  ) : (
    <section className={styles.ingredients_list_container}>
      <div className="text text_type_main-medium mb-3 p-1">Соберите бургер</div>
      <div style={{ display: 'flex' }}>
        {ingredientsTypes.map((ingredientsType) => (
          <Tab
            key={ingredientsType.type}
            value={ingredientsType.type}
            active={currentIngredientType === ingredientsType.type}
            onClick={setCurrentTab}
          >
            {ingredientsType.name}
          </Tab>
        ))}
      </div>
      <div className={styles.ingredients_panel} ref={ingredsContainer}>
        {ingredientsTypes.map((ingredientsType) => (
          <React.Fragment key={ingredientsType.type}>
            <div
              ref={ingredientsType.headerRef}
              className={[
                styles.ingredients_panel_title,
                'text text_type_main-medium mb-3 p-1',
              ].join(' ')}
            >
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

export default BurgerIngredients;
