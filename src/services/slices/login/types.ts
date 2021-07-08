import { IInputFieldStateType } from '../../../models/input-field-state-type';
import { SliceActions } from '../../types/slice-actions-type';
import { loginSlice } from './login';

export type TLoginStateType = {
  email: IInputFieldStateType;
  password: IInputFieldStateType;
  name: IInputFieldStateType;
  verification_code: IInputFieldStateType;
  isDataTransfering: boolean,
  isDataTransferingCompleted: boolean,
  isErrorWhileDataTransfer: boolean,
}

export type TLoginSliceActionsType = SliceActions<typeof loginSlice.actions>;