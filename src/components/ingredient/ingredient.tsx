import React, { useEffect } from 'react';
import { IIngredientModel } from '../../models/ingredient-model';
import styles from './ingredient.module.css';
import {
  CheckMarkIcon,
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { TRootState } from '../../services/reducers';
import { ADD_INGREDIENT_TO_CONSTRUCTOR } from '../../services/actions/burger-constructor';
import {
  CLEAR_INGREDIENT_DRAGGING,
  SET_INGREDIENT_DRAGGING,
} from '../../services/actions/ingredient-dragging';
import { useHistory, useLocation } from 'react-router-dom';

const Ingredient = ({ ingredient }: { ingredient: IIngredientModel }) => {
  const ingredients = useSelector((state: TRootState) => state.burgerConstructor.ingredients);
  const dispatcher = useDispatch();

  const [{ opacity, isDragging }, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dispatcher({
      type: isDragging ? SET_INGREDIENT_DRAGGING : CLEAR_INGREDIENT_DRAGGING,
      ingredient: ingredient,
    });
  }, [isDragging, ingredient, dispatcher]);

  const increaseAmount = (): void => {
    dispatcher({ type: ADD_INGREDIENT_TO_CONSTRUCTOR, ingredient: { ...ingredient } });
  };

  const amount = (): number => {
    return ingredients.reduce((accumulator, currentValue) => {
      return currentValue._id === ingredient._id ? accumulator + 1 : accumulator;
    }, 0);
  };

  const location = useLocation();
  const history = useHistory();

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      className={[styles.ingredient_container, 'mt-2 text text_type_main-default'].join(' ')}
    >
      <img
        src={ingredient.image_mobile}
        alt=""
        onClick={() =>
          history.push({ pathname: `/ingredients/${ingredient._id}`, state: { from: location } })
        }
      />
      <div className={[styles.price, 'text text_type_digits-default'].join(' ')}>
        <span className="mr-1">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="title">{ingredient.name}</p>
      {amount() > 0 && <Counter count={amount()} size="small" />}

      <div className={styles.DetailPopup} onClick={increaseAmount}>
        <CheckMarkIcon type="success" />
      </div>
    </div>
  );
};

export default Ingredient;
