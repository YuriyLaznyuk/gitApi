import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../src/features/counter/counterSlice";
import gitReducer from "../src/features/git/gitSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gitApi: gitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
