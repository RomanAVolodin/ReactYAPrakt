import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { feedSlice as slice, getFeed, getOrderFromFeed, initialState } from './feed';
import feedFakeData from '../../../utils/feed-fake-data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Feed slice', () => {
  const reducer = slice.reducer;

  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Список получен - стейт', () => {
    expect(reducer(initialState, {
      type: 'feed/feedFetched',
      payload: {orders: [], total: 0, totalToday: 0}})).toEqual({
      ...initialState,
      isFetchingFeed: false,
      isErrorWhileFetchingFeed: false
    });
  });

  it('Список в процессе получения - стейт', () => {
    expect(reducer(initialState, { type: 'feed/feedSocketInit'})).toEqual({
      ...initialState,
      isFetchingFeed: true,
      isErrorWhileFetchingFeed: false
    });
  });

  it('Ошибка при получения списка - стейт', () => {
    expect(reducer(initialState, { type: 'feed/feedFetchError'})).toEqual({
      ...initialState,
      isFetchingFeed: false,
      isErrorWhileFetchingFeed: true,
      orders: []
    });
  });

  it('Заказ получен из списка - стейт', () => {
    expect(reducer(initialState, { type: 'feed/orderFetched', payload: feedFakeData[0]})).toEqual({
      ...initialState,
      isFetchingOrder: false,
      isErrorWhileFetchingOrder: false,
      order: feedFakeData[0]
    });
  });

  it('Заказ получается из списка - стейт', () => {
    expect(reducer(initialState, { type: 'feed/orderIsFetching'})).toEqual({
      ...initialState,
      isFetchingOrder: true,
      isErrorWhileFetchingOrder: false
    });
  });

  it('Ошибка получения заказа из списка - стейт', () => {
    expect(reducer(initialState, { type: 'feed/orderFetchError'})).toEqual({
      ...initialState,
      isFetchingOrder: false,
      isErrorWhileFetchingOrder: true,
      order: undefined
    });
  });

});