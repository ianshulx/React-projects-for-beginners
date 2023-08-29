import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
