export interface IinningTracker {
  batsman_player_id?: number | string;
  bolwer_player_id?: number | string;
  over_number?: number | string;
  ball_number?: number | string;
  out_method: string | number;
  fielder_player_id?: number | string;
  timeStamp?: string;
  match_id: number | string;
  inning_number: number | string;
  isRead?: boolean;
}
