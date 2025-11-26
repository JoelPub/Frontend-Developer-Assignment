import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import contentReducer from '../features/content/contentSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
