export interface bowler {
  matchId: number | string;
  inningNumber: number | string;
  bowlerList: bowlerDetails;
  playerId?: string | number;
}

export interface bowlerDetails {
  name?: string;
  player_id: string | number | undefined;
  user_id?: string;
  wickets?: string | number;
  overNumber?: number;
  ballNumber?: number;
  isExtra?: number;
  side?: "around" | "over" | "diagonal";
  bowlingHand?: "rhb" | "lhb";
  runs: number;
	timeStamp?:string;
}
