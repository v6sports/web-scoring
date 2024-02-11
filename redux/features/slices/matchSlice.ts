import { Iscoreboard } from "@/app/interfaces/matchScoreboard.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Iscoreboard = {
  match_id: -1,
} as Iscoreboard;
export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    getMatchScoreboardInformation: (
      state,
      action: PayloadAction<Iscoreboard>
    ) => {
      return {
        ...action.payload,
      };
    },
		setInningNumber: (state, action: PayloadAction<number>) => {
			return {
        ...state,
        inning_number: action.payload,
      };
		},
    setLastOverBolwedBy: (state, action: PayloadAction<string|number>) => {
      return {
        ...state,
        lastOverBolwedBy: action.payload,
      };
    },
    resetLastOverBolwedBy: (state) => {
      return {
        ...state,
        lastOverBolwedBy: -1,
      };
    },
  },
});

export const { getMatchScoreboardInformation,setLastOverBolwedBy,resetLastOverBolwedBy,setInningNumber } = matchSlice.actions;
export default matchSlice.reducer;
