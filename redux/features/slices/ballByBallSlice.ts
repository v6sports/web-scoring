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
    emptyExtras: (state) => {
      return {
        ...state,
        extra_type: "",
        extras: -1,
      };
    },
    setBatterOnStrike: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        on_strike: action.payload,
      };
    },
    resetBatterOnStrike: (state) => {
      return {
        ...state,
        on_strike: -1,
      };
    },

    setBatterNonStrike: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        non_strike: action.payload,
      };
    },
    resetBatterNonStrike: (state) => {
      return {
        ...state,
        non_strike: -1,
      };
    },
    setBowlerOnAttack: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        on_attack: action.payload,
      };
    },
    setBowlerEmpty: (state) => {
      return {
        ...state,
        on_attack: -1,
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

export const {
  updateMatchScoreBallByBall,
  updateExtras,
  updateBolwingLength,
  updateBatterShot,
  setBatterOnStrike,
  setBatterNonStrike,
  setBowlerOnAttack,
  setBowlerEmpty,
  resetBatterNonStrike,
  resetBatterOnStrike,
  emptyExtras,
} = ballByBallSlice.actions;
export default ballByBallSlice.reducer;
