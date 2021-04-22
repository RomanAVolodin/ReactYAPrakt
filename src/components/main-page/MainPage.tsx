import React from "react";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import styles from "./MainPage.module.css";
import ingredients from "../../utils/data";
import { IngredientModel } from "../../models/IngredientModel";

class MainPage extends React.Component<
  any,
  { chosen_ingredients: IngredientModel[] }
> {
  state = {
    chosen_ingredients: [],
  };

  addToChosenIngredients = (ingredient: IngredientModel) => {
    const ing: IngredientModel[] = this.state.chosen_ingredients;
    ing.push(ingredient);
    this.setState({ chosen_ingredients: ing });
  };

  render() {
    return (
      <section className={[styles.container, "mt-4"].join(" ")}>
        <BurgerIngredients
          ingredients={ingredients}
          onChoose={this.addToChosenIngredients}
        />
        {this.state.chosen_ingredients.length > 0 && (
          <BurgerConstructor
            chosen_ingredients={this.state.chosen_ingredients}
          />
        )}
      </section>
    );
  }
}

export default MainPage;
