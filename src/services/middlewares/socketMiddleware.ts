import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  feedFetched,
  feedSocketClose,
  feedSocketInit,
  myFeedSocketInit,
} from '../slices/feed/feed';
import { IOrder, IOrderInSocket } from '../../models/order';
import { IIngredientModel } from '../../models/ingredient-model';
import { dateToFromNowDaily, getCookie } from '../../utils/utils';
import { wssFeedUrl, wssMyFeedUrl } from '../../utils/apiURLs';

export const socketMiddleware = (): Middleware => {
  return (store: MiddlewareAPI) => {
    let feedSocket: WebSocket | null = null;
    let pingInterval: ReturnType<typeof setInterval>;

    return (next: Dispatch) => (action: PayloadAction) => {
      const { dispatch, getState } = store;
      const { type } = action;

      const allIngredients = getState().ingredients.ingredients as IIngredientModel[];

      if (type === feedSocketInit.type && allIngredients.length) {
        feedSocket = new WebSocket(wssFeedUrl);
      }

      if (type === myFeedSocketInit.type && allIngredients.length) {
        const accessToken = getCookie('accessToken');
        feedSocket = new WebSocket(`${wssMyFeedUrl}?token=${accessToken}`);
      }

      if (feedSocket) {
        feedSocket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          const orders: IOrderInSocket[] = restParsedData.orders as IOrderInSocket[];
          const serializedOrders: IOrder[] = orders.length ? orders
            .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
            .map((ord) => {
              const ingredients: IIngredientModel[] = ord.ingredients
                .map((ing) => allIngredients.find((ai) => ai._id === ing))
                .filter((ing) => ing !== undefined) as IIngredientModel[];
              return {
                ...ord,
                number: ord.number.toString(),
                ingredients,
                createdAt: dateToFromNowDaily(ord.createdAt),
              };
            }) : [];
          dispatch(feedFetched({ ...restParsedData, orders: serializedOrders }));
        };

        feedSocket.onopen = (): void => {
          pingInterval = setInterval(() => {
            if (feedSocket?.readyState === 1) {
              feedSocket?.send('ping');
            }
          }, 1000);
        };

        feedSocket.onclose = (): void => {
          clearInterval(pingInterval);
        };

        if (type === feedSocketClose.type && feedSocket) {
          feedSocket.close();
        }
      }
      next(action);
    };
  };
};
