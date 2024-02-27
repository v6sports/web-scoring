import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  appeal_by: -1,
  appeal_type: -1,
  appeal_umpire_end: -1,
  appeal_result: -1,
};
export const appealSlice = createSlice({
  name: "appealSlice",
  initialState,
  reducers: {
    setAppealBy: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        appeal_by: action.payload,
      };
    },
    resetAppeal: (state) => {
      return {
        appeal_by: -1,
        appeal_type: -1,
        appeal_umpire_end: -1,
        appeal_result: -1,
      };
    },
    setAppealType: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        appeal_type: action.payload,
      };
    },
    setAppealUmpireEnd: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        appeal_umpire_end: action.payload,
      };
    },
    setAppealResult: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        appeal_result: action.payload,
      };
    },
  },
});

export const {
  setAppealType,
  setAppealBy,
  setAppealResult,
  setAppealUmpireEnd,
  resetAppeal,
} = appealSlice.actions;
export default appealSlice.reducer;
