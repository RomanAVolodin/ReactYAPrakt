import React, { useState }  from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./main-page.module.css";
import ingredients from "../../utils/data";
import { IngredientModel } from "../../models/ingredient-model";


const MainPage = () => {
    const [chosenIngredients, setChosenIngredients] = useState<IngredientModel[]>([]);
    const addToChosenIngredients = (ingredient: IngredientModel) => {
        setChosenIngredients([...chosenIngredients, ingredient])
    };

    return (
      <main className={[styles.container, "mt-4"].join(" ")}>
        <BurgerIngredients
          ingredients={ingredients}
          onChoose={addToChosenIngredients}
        />
        {chosenIngredients.length > 0 && (
          <BurgerConstructor
            chosen_ingredients={chosenIngredients}
          />
        )}
      </main>
    );

}

export default MainPage;
