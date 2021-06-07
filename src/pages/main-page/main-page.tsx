import React from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import styles from './main-page.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MainPage: React.FC = () => {
  const { ingredients } = useSelector((state: RootState) => state.burgerConstructor);
  const draggingIngredient = useSelector((state: RootState) => state.draggingIngredient.ingredient);

  return (
    <main className={[styles.container, 'mt-4'].join(' ')}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        {(ingredients.length > 0 || draggingIngredient) && <BurgerConstructor />}
      </DndProvider>
    </main>
  );
};

export default MainPage;
