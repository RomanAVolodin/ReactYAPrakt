import { orderReducer as reducer, initialState } from './order';
import { ORDER_COMPLETED, ORDER_IS_PROCESSING, ORDER_PROCESS_FAILED, placeOrder } from '../../actions/order';
import feedFakeData from '../../../utils/feed-fake-data';
import fetchMock from 'fetch-mock';
import { orderApiUrl } from '../../../utils/apiURLs';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import http from '../../../utils/http';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Order редюсер', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Обработка заказа начата', () => {
    expect(
      reducer(initialState, { type: ORDER_IS_PROCESSING, order: feedFakeData[0], message: '' }),
    ).toEqual({
      ...initialState,
      isFetching: true,
      isErrorWhileFetching: false,
    });
  });

  it('Обработка заказа закончилась', () => {
    expect(
      reducer(initialState, { type: ORDER_COMPLETED, order: feedFakeData[0], message: '' }),
    ).toEqual({
      ...initialState,
      order: feedFakeData[0],
      isFetching: false,
      isErrorWhileFetching: false,
    });
  });

  it('Обработка заказа закончилась с ошибкоц', () => {
    expect(
      reducer(initialState, { type: ORDER_PROCESS_FAILED, order: feedFakeData[0], message: '' }),
    ).toEqual({
      ...initialState,
      isFetching: false,
      isErrorWhileFetching: true,
    });
  });

  it('Отправка заказа в работу - ошибка', () => {
    const axiosMock = new MockAdapter(http);
    axiosMock.onPost(orderApiUrl, {
      body: {success: false, name: 'order', order: {number: '555'}},
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'ORDER_IS_PROCESSING' },
      { type: 'ORDER_PROCESS_FAILED', message: 'Request failed with status code 404' }
    ];
    const store = mockStore(initialState);
    return store.dispatch(placeOrder(feedFakeData[0].ingredients)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
