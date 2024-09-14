import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';  
import filterReducer from './filterSlice';  

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;