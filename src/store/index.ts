import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filters/filterSlice';
import contentReducer from '../features/content/contentSlice'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;