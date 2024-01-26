import { configureStore } from "@reduxjs/toolkit";
import matchSliceReducer from "./features/slices/matchSlice";

import ballByBallSlice from "./features/slices/ballByBallSlice";
import { TypedUseSelectorHook, UseSelector, useSelector } from "react-redux";
import scoreBallByBallSlice from "./features/slices/scoreBallByBallSlice";
import inningsTrackSlice from "./features/slices/inningsTrackSlice";
export const store = configureStore({
  reducer: {
    matchSliceReducer,
    ballByBallSlice,
    scoreBallByBallSlice,
    inningsTrackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
