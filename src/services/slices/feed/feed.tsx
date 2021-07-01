import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { Order } from '../../../models/order';
import { RootState } from '../../reducers';

interface FeedStateType {
  orders: Order[];
  isFetchingFeed: boolean;
  isErrorWhileFetchingFeed: boolean;
  order?: Order;
  isFetchingOrder: boolean;
  isErrorWhileFetchingOrder: boolean;
  total: number,
  totalToday: number
}

export const initialState: FeedStateType = {
  orders: [],
  isFetchingFeed: false,
  isErrorWhileFetchingFeed: false,
  order: undefined,
  isFetchingOrder: false,
  isErrorWhileFetchingOrder: false,
  total: 0,
  totalToday: 0
};

export const getFeed = () => (dispatch: Dispatch) => {
  const { feedSocketInit } = feedSlice.actions;
  dispatch(feedSocketInit());
};

export const getOrderFromFeed = (id: string) => (dispatch: Dispatch, getState: () => RootState) => {
  const { orderFetched, orderFetchError, orderIsFetching } = feedSlice.actions;
  const feedOrders = getState().feed.orders as Order[];
  if (!feedOrders.length) {
    return
  }
  dispatch(orderIsFetching());
  const order = feedOrders.find( fo => fo.number === id);
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
    feedFetched(state, { payload }) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = false;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
    feedSocketInit(state) {
      state.isFetchingFeed = true;
      state.isErrorWhileFetchingFeed = false;
    },
    feedSocketClose(state) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    myFeedSocketInit(state) {
      state.isFetchingFeed = true;
      state.isErrorWhileFetchingFeed = false;
    },
    feedFetchError(state) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = true;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    orderFetched(state, { payload }) {
      state.isFetchingOrder = false;
      state.isErrorWhileFetchingOrder = false;
      state.order = payload;
    },
    orderIsFetching(state) {
      state.isFetchingOrder = true;
      state.isErrorWhileFetchingOrder = false;
    },
    orderFetchError(state) {
      state.isFetchingOrder = false;
      state.isErrorWhileFetchingOrder = true;
      state.order = undefined;
    },
  },
});


export const {
  feedSocketInit,
  myFeedSocketInit,
  feedFetched,
  feedSocketClose
} = feedSlice.actions;