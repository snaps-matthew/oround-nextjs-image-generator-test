import toggle from 'app/store/modules/toggle';
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

export function makeStore(): any {
  return configureStore({
    reducer: {
      toggle,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
