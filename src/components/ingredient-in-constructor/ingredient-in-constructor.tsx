import { IngredientModel } from '../../models/ingredient-model';
import styles from './ingredient-in-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from '../../services/actions/burger-constructor';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';

export const IngredientInConstructor = SortableElement(({ ingredient }: { ingredient: IngredientModel}) => {
  const dispatcher = useDispatch();

  return (
      <div className={[styles.constructor_element_container, 'mt-1'].join(' ')} >
        <DragIcon type="primary" />
        <ConstructorElement
          thumbnail={ingredient.image_mobile}
          text={ingredient.name}
          price={ingredient.price}
          handleClose={() => dispatcher({type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient })}
        />
      </div>
  )
})