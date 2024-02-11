import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "./battingTeamSlice";

const initialState: Player[] = [
  {
    name: "",
    username: "",
    player_id: 0,
    is_captain: 0,
    is_vicecaptain: 0,
    is_wtkeeper_active: 0,
    user_id: 0,
    avatar: "",
  },
];
export const battingTeamPlayerSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setBowlingPlayers: (state, action: PayloadAction<Player[]>) => {
      return {
        ...action.payload,
      };
    },
    getAllBowlingPlayers: (state) => {
      return state;
    },
  },
});

export const { setBowlingPlayers, getAllBowlingPlayers } =
  battingTeamPlayerSlice.actions;
export default battingTeamPlayerSlice.reducer;
