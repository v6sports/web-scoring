import { createSlice } from "@reduxjs/toolkit";
export interface iEnable {
  isEnable: boolean;
}
const initialState: iEnable = {
  isEnable: false,
} as iEnable;
export const matchSaveSlice = createSlice({
  name: "matchSave",
  initialState,
  reducers: {
    getMatchSaveStatus: (state) => {
      return {
        ...state,
      };
    },
    setMatchSaveFalseStatus: (state) => {
      return {
        isEnable: false,
      };
    },
    setMatchSaveTrueStatus: (state) => {
      return {
        isEnable: true,
      };
    },
  },
});

export const {
  getMatchSaveStatus,
  setMatchSaveFalseStatus,
  setMatchSaveTrueStatus,
} = matchSaveSlice.actions;
export default matchSaveSlice.reducer;
