import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './features/articleSlice';

export const store = configureStore({
  reducer: {
    art: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
