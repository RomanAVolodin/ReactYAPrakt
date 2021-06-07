import styles from './modal-detailed.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import React from 'react';

const IngredientDetails: React.FC = () => {
  const ingredient = useSelector((state: RootState) => state.detailedIngredient.ingredient);

  return !ingredient ? (
    <h3>choose ingredient</h3>
  ) : (
    <div className={styles.Container}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <div className="text text_type_main-default">{ingredient.name}</div>
      <div className="text default mt-3" style={{ textAlign: 'center', fontSize: 14 }}>
        {ingredient.description ||
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
      </div>
      <div className={[styles.NumbersContainer, 'text text_type_main-default mt-3'].join(' ')}>
        <div>
          Калории,ккал
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div>
          Белки,г
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div>
          Жиры,г
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div>
          Углеводы,г
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
