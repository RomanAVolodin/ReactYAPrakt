import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

export interface IInputFieldStateType {
  type: 'text' | 'email' | 'password';
  value: string;
  name: string;
  placeholder?: string;
  isError: boolean;
  errorText?: string;
  icon?: keyof TICons;
}
