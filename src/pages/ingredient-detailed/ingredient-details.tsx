import styles from './modal-detailed.module.css';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { getIngredientById } from '../../services/reducers/ingredient-detail';
import { LocationState } from '../../models/location-state';

const IngredientDetails: React.FC = () => {
  const location = useLocation();
  const { from } = location.state ? (location.state as LocationState) : { from: null };

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const ingredient = useSelector((state: RootState) => state.detailedIngredient.ingredient);
  const ingredientsAll = useSelector((state: RootState) => state.ingredients.ingredients);

  useEffect(() => {
    dispatch(getIngredientById(id));
  }, [dispatch, id, ingredientsAll]);

  return !ingredientsAll.length ? (
    <h3>Loading...</h3>
  ) : !ingredient ? (
    <h3>Ингредиент не найден...</h3>
  ) : (
    <div className={styles.Container}>
      <div className={styles.inner}>
        {from?.pathname !== '/' && <h2 className="mt-20">Детали ингредиента</h2>}
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
    </div>
  );
};

export default IngredientDetails;
