import { IScoreBallByBall } from "@/app/interfaces/scoreBallByBall.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IScoreBallByBall = {
  assist_by: -1,
} as IScoreBallByBall;
export const scoreBallByBallSlice = createSlice({
  name: "scoreBallByBall",
  initialState,
  reducers: {
    setScoreBallByBall: (state, action: PayloadAction<IScoreBallByBall>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setScoreBallByBall } = scoreBallByBallSlice.actions;
export default scoreBallByBallSlice.reducer;
