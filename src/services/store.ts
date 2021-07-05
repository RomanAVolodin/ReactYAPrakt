import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middlewares/socketMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [socketMiddleware(), ...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
});
