import { IOrder } from '../../../models/order';
import { SliceActions } from '../../types/slice-actions-type';
import { feedSlice } from './feed';

export type TFeedStateType = {
  orders: IOrder[];
  isFetchingFeed: boolean;
  isErrorWhileFetchingFeed: boolean;
  order?: IOrder;
  isFetchingOrder: boolean;
  isErrorWhileFetchingOrder: boolean;
  total: number;
  totalToday: number;
};

export type TFeedFetchedType = {
  orders: IOrder[];
  total: number;
  totalToday: number;
};

export type TFeedSliceActionsType = SliceActions<typeof feedSlice.actions>;