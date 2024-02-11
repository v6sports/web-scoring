import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  name?: string;
  username?: string;
  player_id?: number;
  is_captain?: number;
  is_vicecaptain?: number;
  is_wtkeeper_active?: number;
  user_id?: number;
  avatar?: string;
}
const initialState: Player[] = [];
export const battingTeamPlayerSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setBattingPlayers: (state, action: PayloadAction<Player[]>) => {
      return {
        ...action.payload,
      };
    },

    getAllBattingPlayers: (state) => {
      return state;
    },
  },
});

export const { getAllBattingPlayers, setBattingPlayers } =
  battingTeamPlayerSlice.actions;
export default battingTeamPlayerSlice.reducer;
