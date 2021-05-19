import { IngredientModel } from '../../models/ingredient-model';
import styles from './ingredient-in-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  PLACE_INGREDIENT_AFTER,
  PLACE_INGREDIENT_BEFORE,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from '../../services/actions/burger-constructor';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

export const IngredientInConstructor = ({ ingredient }: { ingredient: IngredientModel }) => {
  const dispatcher = useDispatch();

  const [{ opacity, isDragging }, dragRef] = useDrag({
    type: 'ingredients-in-constructor',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isHoverBefore }, dropTargetBefore] = useDrop({
    accept: 'ingredients-in-constructor',
    drop(ingredientDroppped: IngredientModel) {
      dispatcher({type: PLACE_INGREDIENT_BEFORE, ingredient: ingredientDroppped, ingredientReorderWith: ingredient})
    },
    collect: monitor => ({
      isHoverBefore: monitor.isOver(),
    })
  });

  const [{ isHoverAfter }, dropTargetAfter] = useDrop({
    accept: 'ingredients-in-constructor',
    drop(ingredientDroppped: IngredientModel) {
      dispatcher({type: PLACE_INGREDIENT_AFTER, ingredient: ingredientDroppped, ingredientReorderWith: ingredient})
    },
    collect: monitor => ({
      isHoverAfter: monitor.isOver(),
    })
  });

  return (
    <>
      { !isDragging &&
        <div ref={dropTargetBefore}
             className={`${styles.reorder_placeholder} ${isHoverBefore ? styles.reorder_placeholder_hover : ''}`}>
        </div>
      }

      <div style={{opacity}} ref={dragRef} className={[styles.constructor_element_container, 'mt-1'].join(' ')}>
        <DragIcon type="primary" />
        <ConstructorElement
          thumbnail={ingredient.image_mobile}
          text={ingredient.name}
          price={ingredient.price}
          handleClose={() => dispatcher({type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient })}
        />
      </div>

      { !isDragging &&
        <div ref={dropTargetAfter}
             className={`${styles.reorder_placeholder} ${isHoverAfter ? styles.reorder_placeholder_hover : ''}`}>
        </div>
      }
    </>

  )
}