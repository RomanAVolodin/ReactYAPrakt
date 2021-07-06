import { IIngredientModel } from './ingredient-model';

export interface IOrder {
  name: string;
  number: string;
  status: 'done' | 'pending' | 'created' | string;
  ingredients: IIngredientModel[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderToProceed {
  name: string,
  number: string,
  ingredients: {ingredients: string[]},
}

export interface IOrderInSocket {
  name: string;
  number: string;
  status: 'done' | 'pending' | 'created' | string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}
