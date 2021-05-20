import { IngredientModel } from '../../models/ingredient-model';
import styles from './ingredient-in-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  PLACE_INGREDIENT_AFTER,
  PLACE_INGREDIENT_BEFORE,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from '../../services/actions/burger-constructor';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import {
  CLEAR_HOVERED_IN_CONSTRUCTOR,
  SET_HOVERED_IN_CONSTRUCTOR,
} from '../../services/actions/hovered-in-constructor';
import { RootState } from '../../services/reducers';

enum HoveringDirection {
  FromTop,
  FromBottom
}

export const IngredientInConstructor = ({ ingredient }: { ingredient: IngredientModel}) => {
  const dispatcher = useDispatch();
  const hoveredInConstructor = useSelector( (state: RootState) => state.hoveredInConstructorIngredient.ingredient);

  const [{ opacity, isDragging }, dragRef] = useDrag({
    type: 'ingredients-in-constructor',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.1 : 1,
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    if (!isDragging) {
      dispatcher({ type: CLEAR_HOVERED_IN_CONSTRUCTOR })
    }
  }, [isDragging, dispatcher])

  const [hoveredFrom, setHoveredFrom] = useState<HoveringDirection>(HoveringDirection.FromBottom)

  const dropRefBefore = useDrop({
    accept: 'ingredients-in-constructor',
    drop(ingredientDroppped: IngredientModel) {
      dispatcher({
        type: PLACE_INGREDIENT_BEFORE,
        ingredient: ingredientDroppped,
        ingredientReorderWith: ingredient}
      )
    }
  })[1]

  const dropRefAfter = useDrop({
    accept: 'ingredients-in-constructor',
    drop(ingredientDroppped: IngredientModel) {
      dispatcher({
        type: PLACE_INGREDIENT_AFTER,
        ingredient: ingredientDroppped,
        ingredientReorderWith: ingredient}
      )
    }
  })[1]

  const dropRef = useDrop({
    accept: 'ingredients-in-constructor',
    hover: (draggingIngredient: IngredientModel, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return
      }

      dispatcher({type: SET_HOVERED_IN_CONSTRUCTOR, ingredient})

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (hoverClientY < hoverMiddleY) {
        setHoveredFrom(HoveringDirection.FromTop)
      }

      if (hoverClientY > hoverMiddleY) {
        setHoveredFrom(HoveringDirection.FromBottom)
      }
    }
  })[1]

  const ref = useRef<HTMLDivElement>(null);

  dragRef(dropRef(ref));

  return !isDragging ? (
    <>
      <div ref={dropRefBefore}
           className={`${styles.drag_placeholder} 
           ${hoveredInConstructor === ingredient && hoveredFrom === HoveringDirection.FromBottom ? styles.drag_placeholder_opened : ''}`}
      />
      <div style={{ opacity }} ref={ref} className={[styles.constructor_element_container, 'mt-1'].join(' ')}>
        <DragIcon type="primary" />
        <ConstructorElement
          thumbnail={ingredient.image_mobile}
          text={ingredient.name}
          price={ingredient.price}
          handleClose={() => dispatcher({type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient })}
        />
      </div>
      <div ref={dropRefAfter}
           className={`${styles.drag_placeholder} 
           ${hoveredInConstructor === ingredient && hoveredFrom === HoveringDirection.FromTop ? styles.drag_placeholder_opened : ''}`}
      />
    </>
  ) : null
}