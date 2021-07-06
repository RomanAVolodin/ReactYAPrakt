import { ORDER_COMPLETED, ORDER_IS_PROCESSING, ORDER_PROCESS_FAILED } from '../../actions/order';
import { IOrder, IOrderInSocket, IOrderToProceed } from '../../../models/order';

export interface IOrderCompleted {
  readonly type: typeof ORDER_COMPLETED;
  readonly order: IOrder | IOrderInSocket | IOrderToProceed;
}

export interface IOrderProcessing {
  readonly type: typeof ORDER_IS_PROCESSING;
}

export interface IOrderProcessFailed {
  readonly type: typeof ORDER_PROCESS_FAILED;
  readonly message?: string;
}

export type TOrderActions = IOrderCompleted | IOrderProcessing | IOrderProcessFailed;

export type TOrderStateType = {
  order: IOrder | IOrderInSocket | IOrderToProceed;
  isFetching: boolean;
  isErrorWhileFetching: boolean;
};