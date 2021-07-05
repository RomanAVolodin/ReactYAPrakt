import { ORDER_COMPLETED, ORDER_IS_PROCESSING, ORDER_PROCESS_FAILED } from '../../actions/order';
import { toast } from 'react-toastify';
import { Order } from '../../../models/order';

export interface IOrderCompleted {
  readonly type: typeof ORDER_COMPLETED;
  readonly order: Order;
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
  order: Order;
  isFetching: boolean;
  isErrorWhileFetching: boolean;
};
export const initialState: TOrderStateType = {
  order: { name: '', number: '', status: 'pending', ingredients: [], createdAt: '', updatedAt: '' },
  isFetching: false,
  isErrorWhileFetching: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderStateType => {
  switch (action.type) {
    case ORDER_IS_PROCESSING: {
      return { ...state, isFetching: true, isErrorWhileFetching: false };
    }
    case ORDER_COMPLETED: {
      return { ...state, order: action.order, isFetching: false, isErrorWhileFetching: false };
    }
    case ORDER_PROCESS_FAILED: {
      toast.error(action.message);
      return { ...state, isFetching: false, isErrorWhileFetching: true };
    }
    default: {
      return state;
    }
  }
};
