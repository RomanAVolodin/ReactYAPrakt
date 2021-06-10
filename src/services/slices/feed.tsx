import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { Order } from '../../models/order';
import feedFakeData from '../../utils/feed-fake-data';

interface FeedStateType {
  orders: Order[];
  isFetchingFeed: boolean;
  isErrorWhileFetchingFeed: boolean;
  order?: Order;
  isFetchingOrder: boolean;
  isErrorWhileFetchingOrder: boolean;
}

const initialState: FeedStateType = {
  orders: [],
  isFetchingFeed: false,
  isErrorWhileFetchingFeed: false,
  order: undefined,
  isFetchingOrder: false,
  isErrorWhileFetchingOrder: false,
};

export const getFeed = () => (dispatch: Dispatch) => {
  const { feedFetched, feedFetchError, feedIsFetching } = feedSlice.actions;

  // может еще понадобиться для формирования фейковых данных
  // const feedData = feedFakeData.map( order => {
  //     const amountOfIngreds = Math.floor(Math.random() * 9) + 3;
  //     const result = [];
  //     for (let i = 0; i < amountOfIngreds; i++) {
  //       const index = Math.floor(Math.random() * ingredients.length);
  //       result.push(ingredients[index]);
  //     }
  //     return {...order, ingredients: result}
  //   })

  dispatch(feedIsFetching());
  new Promise<Order[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(feedFakeData);
    }, 400);
  })
    .then((data) => {
      dispatch(feedFetched(data));
    })
    .catch((err) => {
      dispatch(feedFetchError());
      toast.error(err.message);
    });
};

export const getOrderFromFeed = (id: string) => (dispatch: Dispatch) => {
  const { orderFetched, orderFetchError, orderIsFetching } = feedSlice.actions;
  dispatch(orderIsFetching());
  new Promise<Order>((resolve, reject) => {
    setTimeout(() => {
      const order = feedFakeData.find((o) => o.number === id);
      if (order) {
        resolve(order);
      } else {
        reject('Заказ с таким номером не найден');
      }
    }, 400);
  })
    .then((data) => {
      dispatch(orderFetched(data));
    })
    .catch((err) => {
      dispatch(orderFetchError());
      toast.error(err.message);
    });
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    feedFetched(state, { payload }) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = false;
      state.orders = payload;
    },
    feedIsFetching(state) {
      state.isFetchingFeed = true;
      state.isErrorWhileFetchingFeed = false;
    },
    feedFetchError(state) {
      state.isFetchingFeed = false;
      state.isErrorWhileFetchingFeed = true;
      state.orders = [];
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
