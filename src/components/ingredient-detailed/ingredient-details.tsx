import { IngredientModel } from '../../models/ingredient-model';
import styles from './modal-detailed.module.css';
import ingredientPropType from '../../models/ingredient-model-prop-type';


const IngredientDetails = ({ingredient}: {ingredient: IngredientModel}) => {
  return (
    <div className={styles.Container}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <div className="text text_type_main-default">
        {ingredient.name}
      </div>
      <div className="text default mt-3" style={{textAlign: 'center', fontSize: 14}}>
        {ingredient.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
      </div>
      <div className={[styles.NumbersContainer, "text text_type_main-default mt-3"].join(" ")}>
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
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired
};

export default IngredientDetails;