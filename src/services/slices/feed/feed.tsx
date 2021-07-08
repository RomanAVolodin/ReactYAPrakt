import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Reducer } from 'redux';
import { IOrder } from '../../../models/order';
import { TRootState } from '../../reducers';
import { TAppDispatch } from '../../types/app-dispatch';
import { TFeedFetchedType, TFeedSliceActionsType, TFeedStateType } from './types';

export const initialState: TFeedStateType = {
  orders: [],
  isFetchingFeed: false,
  isErrorWhileFetchingFeed: false,
  order: undefined,
  isFetchingOrder: false,
  isErrorWhileFetchingOrder: false,
  total: 0,
  totalToday: 0,
};

export const getFeed = () => (dispatch: TAppDispatch) => {
  const { feedSocketInit } = feedSlice.actions;
  dispatch(feedSocketInit());
};

export const getOrderFromFeed = (id: string) => (
  dispatch: TAppDispatch,
  getState: () => TRootState,
) => {
  const { orderFetched, orderFetchError, orderIsFetching } = feedSlice.actions;
  const feedOrders = getState().feed.orders as IOrder[];
  if (!feedOrders.length) {
    return;
  }
  dispatch(orderIsFetching());
  const order = feedOrders.find((fo) => fo.number === id);
  if (!order) {
    dispatch(orderFetchError());
    toast.error('Заказ не найден среди всех заказов');
  } else {
    dispatch(orderFetched(order));
  }
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    feedFetched(state: TFeedStateType, action: PayloadAction<TFeedFetchedType>) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    feedSocketInit(state: TFeedStateType) {
      state.isFetchingFeed = true;
      state.isErrorWhileFetchingFeed = false;
    },
    feedSocketClose(state: TFeedStateType) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    myFeedSocketInit(state: TFeedStateType) {
      state.isFetchingFeed = true;
      state.isErrorWhileFetchingFeed = false;
    },
    feedFetchError(state: TFeedStateType) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = true;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    orderFetched(state: TFeedStateType, action: PayloadAction<IOrder>) {
      state.isFetchingOrder = false;
      state.isErrorWhileFetchingOrder = false;
      state.order = action.payload;
    },
    orderIsFetching(state: TFeedStateType) {
      state.isFetchingOrder = true;
      state.isErrorWhileFetchingOrder = false;
    },
    orderFetchError(state: TFeedStateType) {
      state.isFetchingOrder = false;
      state.isErrorWhileFetchingOrder = true;
      state.order = undefined;
    },
  },
});

export const { feedSocketInit, myFeedSocketInit, feedFetched, feedSocketClose } = feedSlice.actions;

export const feedSliceReducer = feedSlice.reducer as Reducer<
  TFeedStateType,
  TFeedSliceActionsType
  >;