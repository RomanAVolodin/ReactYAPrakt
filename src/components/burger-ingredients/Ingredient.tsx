import React from "react";
import { IngredientModel } from "../../models/IngredientModel";
import styles from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

class Ingredient extends React.Component<
  { ingredient: IngredientModel; onChoose: CallableFunction },
  any
> {
  state = {
    amount: 0,
  };

  increaseAmount = () => {
    if (this.state.amount > 0 && this.props.ingredient.type === "bun") return;
    this.props.onChoose(this.props.ingredient);
    this.setState((prev: { amount: number }) => ({
      ...prev,
      amount: prev.amount + 1,
    }));
  };

  render() {
    return (
      <div
        onClick={this.increaseAmount}
        className={[
          styles.ingredient_container,
          "mt-2 text text_type_main-small",
        ].join(" ")}
      >
        <img src={this.props.ingredient.image_mobile} alt="" />
        <p className="text text_type_digits-default">
          <span className="mr-1">{this.props.ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p>{this.props.ingredient.name}</p>
        {this.state.amount > 0 && (
          <Counter count={this.state.amount} size="small" />
        )}
      </div>
    );
  }
}

export default Ingredient;
