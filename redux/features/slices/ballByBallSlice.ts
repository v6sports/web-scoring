import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IballByBall = {
  assist_by: -1,
} as IballByBall;
export const ballByBallSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    updateMatchScoreBallByBall: (state, action: PayloadAction<IballByBall>) => {
      return {
        ...action.payload,
      };
    },
    updateExtras: (state, action: PayloadAction<IballByBall>) => {
      return {
        ...state,
        extra_type: action.payload.extra_type,
        extras: action.payload.extras,
      };
    },
    updateBolwingLength: (state, action: PayloadAction<IballByBall>) => {
      return {
        ...state,
        extra_type: action.payload.extra_type,
        extras: action.payload.extras,
      };
    },
    updateBatterShot: (state, action: PayloadAction<IballByBall>) => {
      return {
        ...state,
        extra_type: action.payload.extra_type,
        extras: action.payload.extras,
      };
    },
  },
});

export const { updateMatchScoreBallByBall, updateExtras } =
  ballByBallSlice.actions;
export default ballByBallSlice.reducer;
