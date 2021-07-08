export interface IIngredientModel {
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

export enum EIngredientTypes {
  Bun = 'bun',
  Sause = 'sauce',
  Main = 'main',
}

export interface IIngredientWithAmount {
  ingredient: IIngredientModel;
  amount: number;
}
