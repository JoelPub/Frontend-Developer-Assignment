import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filters/filterSlice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});