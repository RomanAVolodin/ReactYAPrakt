import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientModel } from "../../models/IngredientModel";
import Ingredient from "./Ingredient";
import styles from "./Ingredient.module.css";

class BurgerIngredients extends React.Component<
  { ingredients: IngredientModel[]; onChoose: CallableFunction },
  any
> {
  state = {
    currentPage: "bun",
  };
  setCurrent = (cur: string) => {
    this.setState({ currentPage: cur });
  };

  render() {
    return (
      <div className={styles.ingredients_list_container}>
        <div className="text text_type_main-medium mb-3 p-1">
          Соберите бургер
        </div>
        <div style={{ display: "flex" }}>
          <Tab
            value="bun"
            active={this.state.currentPage === "bun"}
            onClick={this.setCurrent}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={this.state.currentPage === "sauce"}
            onClick={this.setCurrent}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={this.state.currentPage === "main"}
            onClick={this.setCurrent}
          >
            Начинки
          </Tab>
        </div>
        <div className={styles.ingredients_panel}>
          {this.props.ingredients
            .filter((ing) => ing.type === this.state.currentPage)
            .map((ing) => (
              <Ingredient
                key={ing._id}
                ingredient={ing}
                onChoose={this.props.onChoose}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default BurgerIngredients;
