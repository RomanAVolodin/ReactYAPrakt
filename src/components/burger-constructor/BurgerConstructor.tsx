import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { IngredientModel } from "../../models/IngredientModel";
import styles from "./BurgerConstructor.module.css";

class BurgerConstructor extends React.Component<{
  chosen_ingredients: IngredientModel[];
}> {
  calculateFinalPrice = () => {
    return this.props.chosen_ingredients.reduce(
      (acc: number, ing: IngredientModel) => {
        const price = ing.type === "bun" ? ing.price * 2 : ing.price;
        return acc + price;
      },
      0
    );
  };
  render() {
    return (
      <div className={styles.container}>
        {this.props.chosen_ingredients
          .filter((i: IngredientModel) => i.type === "bun")
          .map((ing: IngredientModel, index: number) => (
            <div key={index} className="mt-3">
              <ConstructorElement
                thumbnail={ing.image_mobile}
                text={ing.name}
                price={ing.price}
                isLocked={true}
                type="top"
              />
            </div>
          ))}

        <div style={{ maxHeight: 500, overflow: "auto" }}>
          {this.props.chosen_ingredients
            .filter((i: IngredientModel) => i.type !== "bun")
            .map((ing: IngredientModel, index: number) => (
              <div key={index} className={styles.constructor_element_container}>
                <DragIcon type="primary" />
                <ConstructorElement
                  thumbnail={ing.image_mobile}
                  text={ing.name}
                  price={ing.price}
                />
              </div>
            ))}
        </div>

        {this.props.chosen_ingredients
          .filter((i: IngredientModel) => i.type === "bun")
          .map((ing: IngredientModel, index: number) => (
            <div key={index} className="mt-3">
              <ConstructorElement
                thumbnail={ing.image_mobile}
                text={ing.name}
                price={ing.price}
                isLocked={true}
                type="bottom"
              />
            </div>
          ))}

        {this.calculateFinalPrice() > 0 && (
          <div className={[styles.final_price, "mt-3 mb-3"].join(" ")}>
            <span className="text text_type_digits-default mr-1">
              {this.calculateFinalPrice()}
            </span>
            <CurrencyIcon type="primary" />

            <span className="ml-5">
              <Button type="primary" size="large">
                Оформить заказ
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default BurgerConstructor;
