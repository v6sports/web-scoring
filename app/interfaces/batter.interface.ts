export interface batter {
  matchId: number | string;
  inningNumber: number | string;
  batsmanList: batsmanDetails;
  playerId?: string | number;
  timeStamp?: string;
}

export interface batsmanDetails {
  name?: string;
  player_id: string;
  user_id?: string;
  boundariesInFour: number;
  boundariesInSix: number;
  numberOfBallsPlayed: number;
  runs: number;
	timeStamp?: string;
}
