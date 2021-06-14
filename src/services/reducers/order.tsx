import { ORDER_COMPLETED, ORDER_IS_PROCESSING, ORDER_PROCESS_FAILED } from '../actions/order';
import { toast } from 'react-toastify';
import { Order } from '../../models/order';

interface OrderFetchingAction {
  type: string;
  order: Order;
  message?: string;
}

interface OrderStateType {
  order: Order;
  isFetching: boolean;
  isErrorWhileFetching: boolean;
}

export const initialState: OrderStateType = {
  order: { name: '', number: '', status: 'pending', ingredients: [] },
  isFetching: false,
  isErrorWhileFetching: false,
};

export const orderReducer = (state = initialState, action: OrderFetchingAction) => {
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
