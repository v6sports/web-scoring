import { configureStore } from "@reduxjs/toolkit";
import matchSliceReducer from "./features/slices/matchSlice";

import ballByBallSlice from "./features/slices/ballByBallSlice";
import { TypedUseSelectorHook, UseSelector, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    matchSliceReducer,
    ballByBallSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
