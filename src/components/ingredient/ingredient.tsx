import React, {useState} from "react";
import { IngredientModel } from "../../models/ingredient-model";
import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


const Ingredient = ({ingredient, onChoose}: { ingredient: IngredientModel, onChoose: CallableFunction }) => {
    const [amount, setAmount] = useState<number>(0);

    const increaseAmount = () => {
      if (amount > 0 && ingredient.type === "bun") return;
      onChoose(ingredient);
      setAmount(amount + 1);
    };

    return (
      <div
        onClick={increaseAmount}
        className={[
          styles.ingredient_container,
          "mt-2 text text_type_main-small",
        ].join(" ")}
      >
        <img src={ingredient.image_mobile} alt="" />
        <p className="text text_type_digits-default">
          <span className="mr-1">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p>{ingredient.name}</p>
        {amount > 0 && (
          <Counter count={amount} size="small" />
        )}
      </div>
    );

}

export default Ingredient;
