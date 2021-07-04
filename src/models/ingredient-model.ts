export interface IngredientModel {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  description?: string;
  __v: number;
}

export enum IngredientTypes {
  Bun = 'bun',
  Sause = 'sauce',
  Main = 'main',
}

export interface IngredientWithAmount {
  ingredient: IngredientModel;
  amount: number;
}
