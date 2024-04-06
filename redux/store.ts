import { configureStore } from "@reduxjs/toolkit";

import matchSliceReducer from "./features/slices/matchSlice";
import ballByBallSlice from "./features/slices/ballByBallSlice";
import { TypedUseSelectorHook, UseSelector, useSelector } from "react-redux";
import scoreBallByBallSlice from "./features/slices/scoreBallByBallSlice";
import inningsTrackSlice from "./features/slices/inningsTrackSlice";
import loadingSlice from "./features/slices/scoreboardProgressSlice";
import battingPlayerSlice from "./features/slices/teams/battingTeamSlice";
import bowlingPlayerSlice from "./features/slices/teams/bowlingTeamSlice";
import matchSaveSlice from "./features/slices/matchSaveSlice";
import appealSlice from "./features/slices/appealSlice";
import updateEachBallSlice from "./features/slices/updateEachBallSlice";
export const store = configureStore({
  reducer: {
    matchSliceReducer,
    ballByBallSlice,
    scoreBallByBallSlice,
    inningsTrackSlice,
    loadingSlice,
    matchSaveSlice,
    appealSlice,
    battingPlayerSlice,
    bowlingPlayerSlice,
    updateEachBallSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
