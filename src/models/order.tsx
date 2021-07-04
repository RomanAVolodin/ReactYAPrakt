import { IngredientModel } from './ingredient-model';

export interface Order {
  name: string;
  number: string;
  status: 'done' | 'pending' | 'created' | string;
  ingredients: IngredientModel[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderInSocket {
  name: string;
  number: string;
  status: 'done' | 'pending' | 'created' | string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}
