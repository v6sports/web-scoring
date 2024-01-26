import { IinningTracker } from "@/app/interfaces/inningsTracker.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reduce } from "video.js/dist/types/utils/obj";

const initialState: IinningTracker = {
  inning_number: -1,
  match_id: -1,
  out_method: -1,
} as IinningTracker;
export const inningsTrackSlice = createSlice({
  name: "inningsTracker",
  initialState,
  reducers: {
    setFielder: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        fielder_player_id: action.payload,
      };
    },
    resetFielder: (state) => {
      return {
        ...state,
        fielder_player_id: -1,
      };
    },
    setBatsman: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        batsman_player_id: action.payload,
      };
    },
    resetBatsman: (state) => {
      return {
        ...state,
        batsman_player_id: -1,
      };
    },
    setBowler: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        bolwer_player_id: action.payload,
      };
    },
    resetBowler: (state) => {
      return {
        ...state,
        bolwer_player_id: -1,
      };
    },
    setBallNumber: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        ball_number: action.payload,
      };
    },
    resetBallNumber: (state) => {
      return {
        ...state,
        ball_number: -1,
      };
    },
    setInningNumber: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        inning_number: action.payload,
      };
    },
    resetInningNumber: (state) => {
      return {
        ...state,
        inning_number: -1,
      };
    },
    setMatchId: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        match_id: action.payload,
      };
    },
    resetMatchId: (state) => {
      return {
        ...state,
        match_id: -1,
      };
    },
    setOutMethod: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        out_method: action.payload,
      };
    },
    resetOutMethod: (state) => {
      return {
        ...state,
        out_method: -1,
      };
    },
    setOverNumber: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        over_number: action.payload,
      };
    },
    resetOverNumber: (state) => {
      return {
        ...state,
        over_number: -1,
      };
    },
  },
});

export const {
  setFielder,
  resetFielder,
  setBallNumber,
  resetBallNumber,
  setBatsman,
  resetBatsman,
  setBowler,
  resetBowler,
  setInningNumber,
  resetInningNumber,
  setOutMethod,
  resetOutMethod,
  setMatchId,
  resetMatchId,
  setOverNumber,
  resetOverNumber,
} = inningsTrackSlice.actions;
export default inningsTrackSlice.reducer;
