import { Iscoreboard } from "@/app/interfaces/matchScoreboard.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Iscoreboard = {
  match_id: -1,
} as Iscoreboard;
export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    getMatchScoreboardInformation: (state, action: PayloadAction<Iscoreboard>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { getMatchScoreboardInformation } = matchSlice.actions;
export default matchSlice.reducer;
