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
  },
});

export const { updateMatchScoreBallByBall } = ballByBallSlice.actions;
export default ballByBallSlice.reducer;
