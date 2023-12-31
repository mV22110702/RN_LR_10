import { configureStore } from '@reduxjs/toolkit';
import { basketSlice } from '../../../slices/basket/basket.slice';
import { apiSlice } from '../../../slices/api/api.slice';

export const store = configureStore({
  reducer: {
    [basketSlice.name]: basketSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
